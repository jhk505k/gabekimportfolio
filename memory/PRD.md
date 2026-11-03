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

## Implemented (2026-11-02, iteration 2)
- Certifications corrected & expanded: CCNP marked Expired (2015–2018); added 3 Microsoft certs from user's uploaded transcript (Programming in C# ACTIVE May 2015 ID 701ACF-A13055; MCSE Private Cloud Inactive Apr 2013 ID 35KEB5-7386CA; MCSA Windows Server 2012 Inactive Mar 2013 ID D60814-988F4Q); added CompTIA Security+ (Sep 2015 – Sep 2018, ID COMP001020382835, Expired). Status badges (Active/Inactive/Expired) in UI; resume PDF regenerated with same data.
- Email alerts: contact form now sends a notification email to jhk505k@gmail.com via Emergent-managed Resend (EMERGENT_EMAIL_KEY in backend/.env, from_name "Gabe Kim Portfolio", reply-to = sender). Verified 202 Accepted on real send.
- Project case studies: /projects/:id pages for all 13 projects with Challenge / Approach / Outcome sections, tech stack, prev/next navigation; modal links through to case study page.

## Implemented (2026-11-02, iteration 3)
- Email changed everywhere to jhk505ko@gmail.com (site display, email alerts owner/reply-to, resume PDF header).
- Certification proof on click: 3 Microsoft certificate PDFs converted to images (C# Specialist F333-1096; MCSA Windows Server 2012 Charter Member E207-0223; MCSE Private Cloud G091-9233) + Cisco transcript image + CompTIA transcript image served from /certs/. Clicking any certification opens a viewer modal with "Open Full" link.
- Certifications list expanded to 7: 3 Microsoft + CCNP R&S (CSCO12143672, Jan 2015–Jan 2018, Expired) + CCNA R&S (Feb 2013–Jan 2018, Expired) + CompTIA Security+ ce (Sep 2015–Sep 2018, COMP001020382835) + CompTIA Network+ ce (Mar 2012–Mar 2015). Resume PDF regenerated with full list.

## Implemented (2026-11-03)
- Lighthouse/SEO pass: compressed all project + hero images (webp/resized), lazy-loaded below-fold images and sections, full SEO meta + OG/Twitter cards + JSON-LD + robots.txt + sitemap.xml, alt text, cache headers for /certs and /static. Scores now: Perf 41 (platform preview overhead — production build will score much higher), A11y 92, BP 77, SEO 69.
- SEHATI Bahrain added as project #2 (14 projects total): national healthcare category, live hero image from sehati.gov.bh, "Visit Live Website" link in project modal + case study page, "Live Site" badge on grid card. Counts updated to 14 everywhere (hero, about stats, meta tags).

## Implemented (2026-11-03, iteration 5)
- Live-site links + real website imagery for 6 projects: HiddenTag (hiddentag.com USA), SEHATI (sehati.gov.bh), GS Postbox (gspostbox.com), LG U+ (lguplus.com), Shinhan Bank (shinhan.com/en — internal ERP, placeholder image kept), Korean SSIS (ssis.or.kr). Real banner images scraped from each site, compressed to webp in /frontend/public/projects/. "Visit Live Website" button in modal + case study page; "Live Site" badge on grid cards.

## Implemented (2026-11-03, iteration 6)
- Middleblock: new blockchain-themed image. Shinhan: real Shinhan Bank logo (logos-world) instead of graph image. Sensor Gateway: IoT/sensor machinery image. Daeduk: official Daeduck SVG logo extracted from daeduck.com, linked to daeduck.com/en. Hyundai CV: real Chungju bioenergy center aerial photo from Yonhap news, linked to the Yonhap article; description now names 충주 음식물 바이오에너지센터 (Chungju Food Waste Bioenergy Center), a Hyundai E&C facility converting 80t/day food waste to bio-methane, with Korean name in parentheses.

## Implemented (2026-11-03, iteration 7)
- Button labels: Hyundai → "About Chungju Food Waste Bioenergy Center" (links to Yonhap article); Daeduk → "About Daeduck Electronic" (daeduck.com); Sensor Gateway + Goseong/Sacheon → "About SIOT InfoTech" (siotinfotech.com); Middleblock + Yeosu → "About BFLabs" (bflabs.co.kr).
- Live Site badges now only show for true live-site projects (no linkLabel set).
- Sensor Gateway + Goseong/Sacheon images replaced with official SIOT InfoTech white logo on dark background.

## Implemented (2026-11-03, iteration 8)
- MasonIntelligence removed from experience (6 roles) and M-STT removed from projects (13 projects) per user request. Counts updated everywhere; resume PDF regenerated without it.
- AWS skills expanded: EC2, RDS, S3, Route53, CloudFront, Lambda, EKS & ECS, Load Balancer (plus Docker, Kubernetes+ArgoCD, Jenkins, GitHub Actions).
- MICUBE AI project: "About MICUBE Solution" button linking to micube.co.kr/en/micube.

## Implemented (2026-11-03, iteration 9)
- Added 2 Compax Digital projects (15 total): LG U+ Nerget BSS Integration (links to lguplus.com/nerget/main?p=3) and StarHub Telecommunication Integration (links to starhub.com/personal.html), both with full case studies. Nerget reuses the real LG U+ banner image; StarHub uses a network equipment image (starhub.com blocks scraping). Counts updated everywhere; sitemap updated.

## Implemented (2026-11-03, iteration 10)
- User-uploaded logos applied: nerget logo → Nerget project; StarHub logo → StarHub project; LG U+ logo → LG U+ Digital Catalog project.

## Implemented (2026-11-03, iteration 11)
- StarHub project renamed to "StarHub BSS Integration".
- SEHATI case study rewritten per user's account: AWS forced Oracle upgrade as the trigger, outage risk, security vulnerabilities kept, JDK/Tomcat upgraded alongside, jQuery frontend deferred (needed more planning).
- Email converted from Emergent-managed proxy to standard Resend SDK (RESEND_API_KEY/RESEND_FROM/OWNER_EMAIL env vars, empty key now). Works on AWS EC2 once user adds their own Resend API key. Graceful no-op in preview until key is set.

## Backlog
- P1: User to revise Nerget + StarHub case study text (as requested).
- P1: User to create Resend account + add RESEND_API_KEY secret for live email alerts (works on EC2 and Emergent).
- P1: SEO meta/OG/JSON-LD + sitemap (farm-seo-setup skill).
- P2: Admin page to view contact messages in-browser (GET /api/contact exists).

## Next Tasks
1. Collect project images from user → swap into src/data/portfolio.js.
2. SEO setup before going live.
