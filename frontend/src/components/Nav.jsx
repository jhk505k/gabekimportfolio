import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { LINKS } from "../data/portfolio";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={LINKS.resume}
            download
            data-testid="nav-resume-button"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-[#FF5E1A] text-[#090A0F] font-semibold px-4 py-2 rounded-full hover:bg-[#00F0FF] transition-colors"
          >
            <Download size={14} /> Resume
          </a>
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
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="font-mono text-sm uppercase tracking-widest text-slate-300 hover:text-[#FF5E1A] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={LINKS.resume}
                download
                data-testid="nav-mobile-resume-button"
                className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[#FF5E1A]"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
