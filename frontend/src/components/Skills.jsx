import { Reveal, SectionHeading } from "./Reveal";
import { SKILLS } from "../data/portfolio";
import { Code2, LayoutTemplate, Database, CloudCog, BarChart3, Server } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ICONS = [Code2, LayoutTemplate, Database, CloudCog, BarChart3, Server];

export const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" data-testid="skills-section" className="bg-[#11131A] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
        <SectionHeading index="02" title={t("skills_title")} sub={t("skills_sub")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={group.category} delay={i * 0.07}>
                <div
                  data-testid={`skill-group-${i}`}
                  className="group h-full border border-white/10 rounded-xl bg-[#161924] p-6 hover:border-[#00F0FF]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="p-2 rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A] group-hover:bg-[#00F0FF]/10 group-hover:text-[#00F0FF] transition-colors">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display font-bold text-lg text-slate-100">{t(`skill_cat_${i}`)}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        data-testid={`skill-badge-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:border-[#FF5E1A] hover:text-[#FF5E1A] hover:scale-105 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
