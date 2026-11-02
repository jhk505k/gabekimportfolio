import { Reveal, SectionHeading } from "./Reveal";
import { EXPERIENCE } from "../data/portfolio";
import { Briefcase } from "lucide-react";

export const Experience = () => (
  <section id="experience" data-testid="experience-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
    <SectionHeading index="03" title="Experience" sub="Seven years of enterprise delivery across Seoul's most demanding engineering organizations." />
    <div className="relative">
      <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#FF5E1A] via-white/15 to-[#00F0FF]" />
      <div className="flex flex-col gap-10">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.company + job.period} delay={0.05}>
            <article
              data-testid={`experience-item-${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="relative pl-8 sm:pl-12 group"
            >
              <span className="absolute left-0 sm:left-1 top-2 w-[15px] h-[15px] rounded-full border-2 border-[#FF5E1A] bg-[#090A0F] group-hover:bg-[#FF5E1A] transition-colors" />
              <div className="border border-white/10 rounded-xl bg-[#161924] p-6 sm:p-8 group-hover:border-[#FF5E1A]/40 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-100">{job.role}</h3>
                    <p className="flex items-center gap-2 mt-1 text-sm text-[#00F0FF] font-mono">
                      <Briefcase size={14} /> {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#FF5E1A]">{job.period}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-1">{job.type}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                      <span className="text-[#FF5E1A] shrink-0 mt-0.5">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
