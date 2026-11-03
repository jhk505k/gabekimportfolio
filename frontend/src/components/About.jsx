import { Reveal, SectionHeading } from "./Reveal";
import { SUMMARY, LINKS } from "../data/portfolio";
import { Globe, ShieldCheck, Languages } from "lucide-react";

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "15", label: "Enterprise Projects" },
  { value: "6", label: "Companies" },
  { value: "6", label: "Industries" },
];

export const About = () => (
  <section id="about" data-testid="about-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
    <SectionHeading index="01" title="About" sub="Senior engineer, enterprise craftsman." />
    <div className="grid lg:grid-cols-12 gap-10">
      <Reveal className="lg:col-span-7" delay={0.1}>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed" data-testid="about-summary">
          {SUMMARY}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Globe size={16} className="text-[#00F0FF] shrink-0" />
            <span data-testid="about-location">{LINKS.location} · U.S. Citizen · Open to relocation & remote</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <ShieldCheck size={16} className="text-[#00F0FF] shrink-0" />
            <span>Cisco, Microsoft & CompTIA certified — networking, cloud & security background</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Languages size={16} className="text-[#00F0FF] shrink-0" />
            <span>Fluent in Korean and English — 7 years delivering in Seoul's enterprise market</span>
          </div>
        </div>
      </Reveal>
      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={0.15 + i * 0.08}>
            <div
              data-testid={`about-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="group border border-white/10 rounded-xl bg-[#161924] p-6 hover:border-[#FF5E1A]/50 transition-colors"
            >
              <p className="font-display font-black text-4xl text-[#FF5E1A] group-hover:text-[#00F0FF] transition-colors">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
