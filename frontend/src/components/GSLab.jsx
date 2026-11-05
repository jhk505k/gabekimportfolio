import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { ArrowUpRight, Zap, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const GSLab = () => {
  const { t } = useLanguage();

  const STATS = [
    { icon: ShieldCheck, value: "99.99%", label: t("gslab_stat1") },
    { icon: Zap, value: "<2s", label: t("gslab_stat2") },
    { icon: Clock, value: "5+ hrs", label: t("gslab_stat3") },
  ];

  return (
    <section id="gslab" data-testid="gslab-section" className="relative overflow-hidden border-y border-white/10 bg-[#0C0E14]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full bg-[#FF5E1A]/8 blur-[110px]" />
        <div className="absolute bottom-0 -left-24 w-[24rem] h-[24rem] rounded-full bg-[#00F0FF]/6 blur-[110px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-1.5 rounded-full bg-[#FF5E1A]/10 border border-[#FF5E1A]/40 text-[#FF5E1A]" data-testid="gslab-badge">
            {t("gslab_badge")}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display font-black tracking-tight leading-[1.02] text-3xl sm:text-4xl lg:text-5xl text-slate-100" data-testid="gslab-headline">
                {t("gslab_line1")}{" "}
                <span className="text-[#FF5E1A]">{t("gslab_line2")}</span>{" "}
                {t("gslab_line3")}
              </h2>
              <p className="mt-6 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed" data-testid="gslab-description">
                {t("gslab_desc")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://gslab.engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="gslab-visit-button"
                  className="group flex items-center gap-2 bg-[#FF5E1A] text-[#090A0F] font-display font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#00F0FF] transition-colors"
                >
                  {t("gslab_cta_visit")}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="https://gslab.engineer/#pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="gslab-pricing-button"
                  className="flex items-center gap-2 border border-white/20 text-slate-200 font-display font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                >
                  {t("gslab_cta_pricing")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {STATS.map(({ icon: Icon, value, label }, i) => (
                  <div key={i} data-testid={`gslab-stat-${i}`} className="border border-white/10 rounded-xl bg-[#161924] p-4 text-center">
                    <Icon size={16} className="mx-auto text-[#00F0FF] mb-2" />
                    <p className="font-display font-black text-xl text-slate-100">{value}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative mx-auto max-w-sm"
              data-testid="gslab-emblem-wrap"
            >
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#FF5E1A]/25 to-[#00F0FF]/15 blur-2xl" />
              <div className="relative rounded-3xl border border-white/15 bg-[#11131A] p-8 shadow-2xl">
                <img
                  src="/gslab/emblem.webp"
                  alt="GSLAB emblem"
                  width="400"
                  height="337"
                  loading="lazy"
                  className="w-full h-auto"
                  data-testid="gslab-emblem"
                />
                <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  {t("gslab_tagline")}
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
