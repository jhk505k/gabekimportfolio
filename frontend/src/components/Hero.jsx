import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { HERO_IMAGE, LINKS } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const ref = useRef(null);
  const { t } = useLanguage();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const imgX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-[#FF5E1A]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#00F0FF]/8 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse-glow" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400" data-testid="hero-availability">
              {t("hero_availability")}
            </span>
          </motion.div>

          <h1 className="font-display font-black tracking-tighter leading-[0.95] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl" data-testid="hero-headline">
            <MaskedLine delay={0.4}>
              <span className="text-slate-100">GABE</span>
            </MaskedLine>
            <MaskedLine delay={0.55}>
              <span className="text-[#FF5E1A]">KIM</span>
              <span className="text-[#00F0FF]">.</span>
            </MaskedLine>
            <MaskedLine delay={0.7}>
              <span className="text-stroke text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                {t("hero_role1")}
              </span>
            </MaskedLine>
            <MaskedLine delay={0.82}>
              <span className="text-stroke text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                {t("hero_role2")}
              </span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-8 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed"
            data-testid="hero-subheadline"
          >
            {t("hero_sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              data-testid="hero-projects-button"
              className="group flex items-center gap-2 bg-[#FF5E1A] text-[#090A0F] font-display font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#00F0FF] transition-colors"
            >
              {t("hero_cta_projects")}
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href={LINKS.resume}
              download
              data-testid="hero-resume-button"
              className="flex items-center gap-2 border border-white/20 text-slate-200 font-display font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#FF5E1A] hover:text-[#FF5E1A] transition-colors"
            >
              <Download size={16} /> {t("hero_cta_resume")}
            </a>
            <span className="flex items-center gap-2 font-mono text-xs text-slate-500" data-testid="hero-location">
              <MapPin size={14} className="text-[#FF5E1A]" /> {LINKS.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 hidden lg:block"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative"
            data-testid="hero-visual"
          >
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#FF5E1A]/30 to-[#00F0FF]/20 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <motion.img
                src={HERO_IMAGE}
                alt="Enterprise server infrastructure representing Gabe Kim's cloud engineering work"
                width="600"
                height="416"
                fetchpriority="high"
                style={{ x: imgX, y: imgY, scale: 1.12 }}
                className="w-full h-[26rem] object-cover"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00F0FF]">{t("hero_since")}</p>
                  <p className="font-display font-bold text-lg text-slate-100">{t("hero_role_tag")}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-black text-3xl text-[#FF5E1A]">15</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{t("hero_projects_label")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t("hero_scroll")}
        data-testid="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-[#FF5E1A] transition-colors"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
};
