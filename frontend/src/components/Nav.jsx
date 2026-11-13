import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, LANGUAGES } from "../i18n/LanguageContext";
import { ResumeMenu } from "./ResumeMenu";

export const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" data-testid="logo-mark">
    <rect width="64" height="64" rx="14" fill="#11131A" stroke="rgba(255,255,255,0.12)" />
    <path d="M14 44V20h6v9.5L31 20h8L26.5 30.5 40 44h-8.5L20 32.5V44z" fill="#FF5E1A" />
    <circle cx="46" cy="20" r="4" fill="#00F0FF" />
  </svg>
);

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    { label: t("nav_about"), href: "#about" },
    { label: t("nav_skills"), href: "#skills" },
    { label: t("nav_experience"), href: "#experience" },
    { label: t("nav_projects"), href: "#projects" },
    { label: t("nav_education"), href: "#education" },
    { label: t("nav_contact"), href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#090A0F]/85 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo-link" className="flex items-center gap-3 group">
          <LogoMark />
          <span className="font-display font-bold tracking-tight text-slate-100 group-hover:text-[#FF5E1A] transition-colors">
            GABE KIM
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-1 border border-white/10 rounded-full p-1" data-testid="lang-switcher">
            <Globe size={12} className="ml-1.5 text-slate-500" />
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                data-testid={`lang-${l.code}`}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  lang === l.code
                    ? "bg-[#FF5E1A] text-[#090A0F] font-bold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
          <ResumeMenu variant="nav" />
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-slate-200 p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-[#090A0F]/95 border-b border-white/10"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`nav-mobile-link-${l.href.slice(1)}`}
                  className="font-mono text-sm uppercase tracking-widest text-slate-300 hover:text-[#FF5E1A] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10" data-testid="lang-switcher-mobile">
                <Globe size={14} className="text-slate-500" />
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    data-testid={`lang-mobile-${l.code}`}
                    className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
                      lang === l.code
                        ? "bg-[#FF5E1A] text-[#090A0F] font-bold"
                        : "border border-white/15 text-slate-400"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div data-testid="nav-mobile-resume-button">
                <ResumeMenu variant="hero" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
