import sys
sys.path.insert(0, "/app/frontend/src")
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

ACCENT = HexColor("#FF5E1A")
DARK = HexColor("#111111")
GREY = HexColor("#444444")

# Pull the data straight from the site's data file so the PDF always matches the website
src = open("/app/frontend/src/data/portfolio.js").read()

def grab(name):
    m = re.search(rf"export const {name} = (\[.*?\]);", src, re.S)
    return m.group(1)

def js_strings(block):
    return re.findall(r'"((?:[^"\\]|\\.)*)"', block)

experience_raw = grab("EXPERIENCE")
jobs = []
for chunk in re.findall(r"\{(.*?)\n  \},?", experience_raw, re.S):
    def field(f):
        m = re.search(rf'{f}: "(.*?)"', chunk)
        return m.group(1) if m else ""
    bullets_m = re.search(r"bullets: \[(.*?)\]", chunk, re.S)
    bullets = js_strings(bullets_m.group(1)) if bullets_m else []
    jobs.append((field("period"), field("role"), field("company"), field("location"), bullets))

skills_raw = grab("SKILLS")
skills = []
for chunk in re.findall(r"\{(.*?)\}", skills_raw, re.S):
    cat = re.search(r'category: "(.*?)"', chunk)
    items_m = re.search(r"items: \[(.*?)\]", chunk, re.S)
    if cat and items_m:
        skills.append((cat.group(1), js_strings(items_m.group(1))))

SUMMARY = re.search(r'export const SUMMARY =\s*\n?\s*"(.*?)";', src, re.S).group(1)

c = canvas.Canvas("/app/frontend/public/Gabe_Kim_Resume.pdf", pagesize=letter)
W, H = letter
M = 0.85 * inch
y = H - M

def ensure(need):
    global y
    if y < M + need:
        c.showPage()
        y = H - M

def text(t, size, font, color, gap, indent=0):
    global y
    c.setFont(font, size)
    c.setFillColor(color)
    max_chars = int(100 - indent * 0.9)
    for chunk in [t[i:i + max_chars] for i in range(0, len(t), max_chars)] or [""]:
        ensure(gap)
        c.drawString(M + indent * 10, y, chunk)
        y -= gap

# Header
text("GABE KIM", 22, "Helvetica-Bold", ACCENT, 28)
text("Full Stack Java Developer", 12, "Helvetica-Bold", DARK, 16)
text("Columbus, GA & Atlanta, GA  |  (706) 304-1620  |  jhk505ko@gmail.com", 9.5, "Helvetica", GREY, 13)
text("linkedin.com/in/ji-kim-5179495  |  github.com/jhk505k", 9.5, "Helvetica", GREY, 18)

text("SUMMARY", 11, "Helvetica-Bold", ACCENT, 15)
text(SUMMARY, 9, "Helvetica", GREY, 12)
y -= 8

text("SKILLS", 11, "Helvetica-Bold", ACCENT, 15)
for cat, items in skills:
    text(f"{cat}: " + ", ".join(items), 9, "Helvetica", GREY, 12)
y -= 8

text("EXPERIENCE", 11, "Helvetica-Bold", ACCENT, 15)
for period, role, company, location, bullets in jobs:
    ensure(50)
    text(f"{role} — {company} ({period})", 10.5, "Helvetica-Bold", DARK, 14)
    text(location, 8.5, "Helvetica-Oblique", GREY, 12)
    for b in bullets:
        text("• " + b, 9, "Helvetica", GREY, 11.5, indent=1)
    y -= 6

text("EDUCATION", 11, "Helvetica-Bold", ACCENT, 15)
text("M.S. Electrical & Computer Engineering — Georgia Institute of Technology, Atlanta, GA", 9.5, "Helvetica-Bold", DARK, 13)
text("Focus: Telecommunication and Computer Systems / Software", 9, "Helvetica", GREY, 12, indent=1)
text("B.S. Electrical Engineering — Georgia Institute of Technology, Atlanta, GA", 9.5, "Helvetica-Bold", DARK, 16)

text("CERTIFICATIONS", 11, "Helvetica-Bold", ACCENT, 15)
certs_raw = grab("CERTIFICATIONS")
for chunk in re.findall(r"\{(.*?)\}", certs_raw, re.S):
    def cf(f, chunk=chunk):
        m = re.search(rf'{f}: "(.*?)"', chunk)
        return m.group(1) if m else ""
    detail = [cf("issuer")]
    if cf("id"):
        detail.append("ID " + cf("id"))
    if cf("earned"):
        detail.append("earned " + cf("earned"))
    if cf("expires"):
        detail.append("expired " + cf("expires"))
    elif cf("status") and cf("status") != "Active":
        detail.append(cf("status").lower())
    text("• " + cf("name") + " — " + ", ".join(d for d in detail if d), 9, "Helvetica", GREY, 12)
text("Languages: Fluent in Korean and English", 9, "Helvetica", GREY, 12)

c.save()
print("PDF rebuilt")
