from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from html import escape
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_FROM = os.environ.get("RESEND_FROM", "Gabe Kim Portfolio <onboarding@resend.dev>")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")


def send_owner_notification(*, name: str, email: str, message: str) -> None:
    """Send the contact-form alert via standard Resend (works on any host)."""
    if not RESEND_API_KEY or not OWNER_EMAIL:
        logger.info("Email not configured (RESEND_API_KEY/OWNER_EMAIL missing); message stored only")
        return
    import resend
    resend.api_key = RESEND_API_KEY
    n, e, m = escape(name), escape(email), escape(message).replace("\n", "<br>")
    try:
        result = resend.Emails.send({
            "from": RESEND_FROM,
            "to": [OWNER_EMAIL],
            "reply_to": [email],
            "subject": f"New portfolio enquiry from {name}",
            "text": f"Name: {name}\nEmail: {email}\n\n{message}",
            "html": (
                '<table role="presentation" width="100%"><tr><td style="padding:24px;'
                'font-family:Arial,sans-serif;background:#090A0F;color:#F8FAFC">'
                f'<p style="color:#FF5E1A;font-size:12px;letter-spacing:2px;text-transform:uppercase">Gabe Kim Portfolio</p>'
                f'<h2 style="margin:8px 0 16px">New enquiry from {n}</h2>'
                f'<p style="color:#94A3B8;font-size:13px">Reply to: '
                f'<a href="mailto:{e}" style="color:#00F0FF">{e}</a></p>'
                f'<div style="margin-top:16px;padding:16px;background:#161924;border-radius:8px;'
                f'color:#F8FAFC;font-size:14px;line-height:1.6">{m}</div>'
                '</td></tr></table>'
            ),
        })
        logger.info(f"Owner notification sent via Resend: {result.get('id')}")
    except Exception as exc:
        logger.error(f"Resend notification failed: {exc}")


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


@api_router.get("/")
async def root():
    return {"message": "Gabe Kim Portfolio API"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_messages.insert_one(doc)
    # send in a thread so a slow/failed Resend call never blocks the response
    import asyncio
    await asyncio.to_thread(
        send_owner_notification, name=msg.name, email=msg.email, message=msg.message
    )
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for m in messages:
        if isinstance(m['timestamp'], str):
            m['timestamp'] = datetime.fromisoformat(m['timestamp'])
    return messages


@app.middleware("http")
async def add_cache_headers(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith(("/certs/", "/static/", "/projects/")):
        response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
