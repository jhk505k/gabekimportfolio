import { Reveal, SectionHeading } from "./Reveal";
import { LINKS } from "../data/portfolio";
import { Globe, ShieldCheck, Languages } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const About = () => {
  const { t } = useLanguage();
  const STATS = [
    { value: "8+", label: t("stat_years") },
    { value: "15", label: t("stat_projects") },
    { value: "6", label: t("stat_companies") },
    { value: "6", label: t("stat_industries") },
  ];

  return (
    <section id="about" data-testid="about-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
      <SectionHeading index="01" title={t("about_title")} sub={t("about_sub")} />
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed" data-testid="about-summary">
            {t("about_summary")}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Globe size={16} className="text-[#00F0FF] shrink-0" />
              <span data-testid="about-location">{LINKS.location} · {t("about_loc")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck size={16} className="text-[#00F0FF] shrink-0" />
              <span>{t("about_certline")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Languages size={16} className="text-[#00F0FF] shrink-0" />
              <span>{t("about_langline")}</span>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.08}>
              <div
                data-testid={`about-stat-${i}`}
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
};
