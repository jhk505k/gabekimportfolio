# Experience Updates + Downloadable Resume (Word & PDF)

Two sets of edits: (1) Experience timeline changes — rename the Boeing internship title and add a "Founder — GSLAB" entry at the top with the user's own description; (2) Replace the resume downloads with the user's newly uploaded resume, offered in both PDF and Word formats.

## Who it's for
Visitors to Gabe Kim's portfolio (recruiters, hiring managers, potential GSLAB clients) viewing the Experience timeline.

## Core changes
1. Boeing internship (2012): title changed from "Software Engineering Intern" to "IT Intern - Phantom Work Research Assistant" — in English, Korean, and Chinese.
2. New experience entry at the top of the timeline (above Compax Digital):
   - Role: Founder — GSLAB
   - Period: 2025 — Present
   - Type: Founder
   - Location: Columbus, GA & Atlanta, GA and remote
   - Four bullets (user-provided):
     - Founded GSLAB LLC to design, architect, and deploy custom web applications, cloud infrastructure, and automation systems tailored for small business owners and growing enterprises.
     - Engineer full-stack web applications and internal business tools combining custom backend logic (Java Spring Boot, Python, PostgreSQL, REST APIs) with modern frontend frameworks and AI-assisted platforms.
     - Architect high-availability cloud and edge deployment pipelines utilizing AWS (EC2, RDS), Cloudflare Pages/Edge, Docker, and automated CI/CD workflows.
     - Partner directly with business owners to replace manual operational workflows with scalable, custom-built software solutions.
3. Korean and Chinese translations for the new entry and the renamed Boeing title, matching the existing trilingual pattern.
4. Resume downloads, language-aware: the resume button (nav + hero) downloads the resume in the visitor's currently selected language — English, Korean, or Chinese — and offers both PDF and Word (.docx) formats for each.
   - English: the user's newly uploaded "Gabe Kim Resume.pdf" is the source of truth, used as-is for the PDF download. An English Word version is generated to match it.
   - Korean and Chinese: resume versions are generated from the same content, translated (matching the site's existing KO/ZH translations), each as PDF and Word.
   - The old auto-generated resume PDF is replaced.
   - Resume content reflects current experience (Founder GSLAB + renamed Boeing title), so the English uploaded file is used as-is; KO/ZH versions are built from the same translated content.

## User flow
Visitor scrolls to Experience → sees "Founder — GSLAB · 2025 — Present" as the first (newest) entry, styled like all other timeline cards → Compax Digital and earlier roles follow below → Boeing entry near the bottom shows the new "IT Intern - Phantom Work Research Assistant" title.
Visitor (in any of EN/KO/ZH) clicks the Resume button → chooses PDF or Word → the resume downloads in their selected language and chosen format.

## UI/UX feel
No visual changes — the new entry reuses the existing timeline card style (dot on the gradient line, card with role/company/period/bullets). Same look and motion as every other entry, in all three languages.

## Implementation phases
- Phase 1 (MVP, built now): Boeing title rename, Founder GSLAB entry (EN/KO/ZH), and language-aware resume downloads — English PDF (uploaded file) + English Word, plus generated Korean and Chinese resumes, each in PDF and Word — all served based on the visitor's selected language, verified on-page.
- Phase 2: Any wording/translation tweaks the user requests after reviewing the KO/ZH resumes; adjust Word resume formatting if the user wants a different layout.
- Phase 3: Not applicable — no further scope.

## Assumptions
- Dates: 2025 — Present, entry at the top of the timeline (per user's answers).
- The four GSLAB bullets are used verbatim as provided (the missing leading dash on the third bullet is treated as a typo; it's included as its own bullet).
- Type label "Founder" for the new entry, displayed like the existing "Contract" / "Full-time" labels.
- Timeline stays newest-first, so Founder GSLAB at the top keeps chronological order with 2025 — Present being the most recent period.
- The uploaded "Gabe Kim Resume.pdf" is the current, correct English resume and is used as-is for the English PDF download; English Word plus Korean and Chinese resumes (PDF + Word) are generated to match its content (including Founder GSLAB and the new Boeing title), reusing the site's existing KO/ZH translations. The previous auto-generated resume PDF is discarded.
- The resume button serves the version matching the visitor's selected language (EN/KO/ZH), with both PDF and Word format options.
- KO/ZH resume translations are generated from the same translated content already used on the site; the user can request wording changes after reviewing.
- Experience count/ordering elsewhere (case studies, stats) is unchanged — the "8 Companies" stat becomes 7 companies + GSLAB; stat left as-is unless the user wants it changed.
