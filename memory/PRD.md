# PRD — Gabe Kim Portfolio Website

## Original Problem Statement
"I want to make website about me page where I can show it to potential employer. I will upload my resume and i do need to upload some pictures of previously worked on project so have project section for each project I worked on in the resume."

## User Personas
- Primary: Gabe Kim (site owner) — Senior Full Stack Java Developer, 8+ yrs, Columbus GA, showcasing work to get hired.
- Visitor: recruiters / hiring managers evaluating senior backend & full-stack candidates.

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion (scroll reveals, hero masked line reveal, 3D parallax hero image), lenis smooth scrolling, sonner toasts. Single-page portfolio.
- Backend: FastAPI + MongoDB (motor). POST /api/contact (validated contact messages), GET /api/contact (message list), GET /api/ health.
- Assets: Resume PDF at /Gabe_Kim_Resume.pdf (generated from resume data via /app/scripts/make_resume_pdf.py). 13 domain-matched placeholder images (Unsplash/Pexels) in src/data/portfolio.js — to be replaced by user's real project pictures.
- Design: dark obsidian + electric amber (#FF5E1A) / cyan (#00F0FF), Outfit + JetBrains Mono, SVG "K" logo mark (also favicon).

## Implemented (2026-11-02)
- Kinetic hero: masked line-by-line headline reveal, mouse-tilt 3D parallax hero card, availability badge, CTAs.
- Slow editorial tech marquee (Java 17, Spring Boot, AWS, Kafka…).
- About section: resume summary + stats (8+ yrs, 13 projects, 7 companies, 6 industries).
- Skills matrix: 6 categorized groups from resume.
- Experience timeline: all 7 roles 2018–2024 with full bullet points.
- Projects: all 13 resume projects, clickable cards → modal with image, description, tech tags.
- Education (Georgia Tech MS/BS) + CCNP certification section.
- Contact: working form → POST /api/contact (stored in MongoDB) + email/phone/LinkedIn/GitHub links.
- Resume download button (nav + hero) serving generated PDF.
- Responsive verified at 375/768/1366px.

## User Choices
- Style: Bold and striking. Links: LinkedIn (linkedin.com/in/ji-kim-5179495), GitHub (github.com/jhk505k). Contact form: yes. Project images: placeholders for now (user will supply real pictures later).

## Backlog
- P0: Replace 13 placeholder project images with user's real project pictures.
- P1: Email notification to Gabe on new contact form message (Resend integration).
- P1: SEO meta/OG/JSON-LD + sitemap (farm-seo-setup skill).
- P2: Admin page to view contact messages in-browser (GET /api/contact exists).
- P2: Blog / case-study deep dives per project.

## Next Tasks
1. Collect project images from user → swap into src/data/portfolio.js.
2. Wire contact form to email delivery.
3. SEO setup before going live.
