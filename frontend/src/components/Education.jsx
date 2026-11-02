import { Reveal, SectionHeading } from "./Reveal";
import { EDUCATION, CERTIFICATIONS } from "../data/portfolio";
import { GraduationCap, Award } from "lucide-react";

export const Education = () => (
  <section id="education" data-testid="education-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
    <SectionHeading index="05" title="Education & Credentials" />
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        {EDUCATION.map((ed, i) => (
          <Reveal key={ed.degree} delay={i * 0.1}>
            <div
              data-testid={`education-item-${i}`}
              className="group flex gap-5 border border-white/10 rounded-xl bg-[#161924] p-6 sm:p-8 hover:border-[#00F0FF]/40 transition-colors"
            >
              <span className="p-3 h-fit rounded-lg bg-[#00F0FF]/10 text-[#00F0FF]">
                <GraduationCap size={24} />
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100 leading-snug">{ed.degree}</h3>
                <p className="mt-2 font-mono text-xs text-[#FF5E1A] uppercase tracking-widest">
                  {ed.school} · {ed.location}
                </p>
                {ed.detail && <p className="mt-2 text-sm text-slate-400">{ed.detail}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.name} delay={0.1 + i * 0.1}>
            <div
              data-testid={`certification-item-${i}`}
              className="group flex gap-5 border border-white/10 rounded-xl bg-[#161924] p-6 sm:p-8 hover:border-[#FF5E1A]/40 transition-colors"
            >
              <span className="p-3 h-fit rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A]">
                <Award size={24} />
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100 leading-snug">{c.name}</h3>
                {c.year && (
                  <p className="mt-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest">Certified {c.year}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
