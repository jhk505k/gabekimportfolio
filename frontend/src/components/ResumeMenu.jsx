import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, FileType2, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const useResumeFiles = () => {
  const { lang } = useLanguage();
  const L = lang.toUpperCase();
  return {
    pdf: `/Gabe_Kim_Resume_${L}.pdf`,
    docx: `/Gabe_Kim_Resume_${L}.docx`,
  };
};

export const ResumeMenu = ({ variant = "nav" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useLanguage();
  const files = useResumeFiles();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isNav = variant === "nav";
  const btnClass = isNav
    ? "flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-[#FF5E1A] text-[#090A0F] font-semibold px-4 py-2 rounded-full hover:bg-[#00F0FF] transition-colors"
    : "flex items-center gap-2 border border-white/20 text-slate-200 font-display font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#FF5E1A] hover:text-[#FF5E1A] transition-colors";

  const testid = isNav ? "nav-resume" : "hero-resume";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid={`${testid}-menu-button`}
        className={btnClass}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Download size={isNav ? 14 : 16} /> {t("nav_resume")}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            data-testid={`${testid}-menu`}
            className={`absolute z-50 ${isNav ? "right-0 mt-2" : "left-0 mt-2"} w-44 rounded-xl border border-white/15 bg-[#11131A] shadow-2xl overflow-hidden`}
          >
            <a
              href={files.pdf}
              download
              onClick={() => setOpen(false)}
              data-testid={`${testid}-download-pdf`}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-200 hover:bg-[#FF5E1A]/10 hover:text-[#FF5E1A] transition-colors"
            >
              <FileText size={16} className="text-[#FF5E1A]" />
              <span className="font-mono text-xs uppercase tracking-widest">PDF</span>
            </a>
            <a
              href={files.docx}
              download
              onClick={() => setOpen(false)}
              data-testid={`${testid}-download-docx`}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-200 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] transition-colors border-t border-white/10"
            >
              <FileType2 size={16} className="text-[#00F0FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">Word</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
