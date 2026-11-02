import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { EDUCATION, CERTIFICATIONS } from "../data/portfolio";
import { GraduationCap, Award, X, ExternalLink } from "lucide-react";

const STATUS_STYLES = {
  Active: "bg-[#00F0FF]/10 border-[#00F0FF]/40 text-[#00F0FF]",
  Inactive: "bg-[#FF5E1A]/10 border-[#FF5E1A]/40 text-[#FF5E1A]",
  Expired: "bg-white/5 border-white/20 text-slate-500",
};

const ProofModal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#090A0F]/90 backdrop-blur-md"
    onClick={onClose}
    data-testid="cert-proof-overlay"
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      data-testid="cert-proof-modal"
      className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-[#11131A] shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00F0FF]">{cert.issuer}</p>
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 truncate" data-testid="cert-proof-title">
            {cert.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={cert.proof.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cert-proof-open-full"
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors px-2 py-1"
          >
            <ExternalLink size={13} /> Open Full
          </a>
          <button
            onClick={onClose}
            data-testid="cert-proof-close"
            className="p-2 rounded-full bg-[#090A0F]/70 border border-white/15 text-slate-200 hover:text-[#FF5E1A] hover:border-[#FF5E1A] transition-colors"
            aria-label="Close certificate"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-[#090A0F]">
        {cert.proof.type === "pdf" ? (
          <iframe
            src={cert.proof.url}
            title={cert.name}
            data-testid="cert-proof-pdf"
            className="w-full h-[70vh]"
          />
        ) : (
          <img
            src={cert.proof.url}
            alt={`${cert.name} verification`}
            data-testid="cert-proof-image"
            className="w-full h-auto"
          />
        )}
      </div>
    </motion.div>
  </motion.div>
);

export const Education = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="education" data-testid="education-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
      <SectionHeading
        index="05"
        title="Education & Credentials"
        sub="Click any certification to view its official certificate or transcript."
      />
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
        <div className="flex flex-col gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.name} delay={0.1 + i * 0.05}>
              <button
                onClick={() => c.proof && setActive(c)}
                data-testid={`certification-item-${i}`}
                className={`group w-full text-left flex gap-4 items-start border border-white/10 rounded-xl bg-[#161924] p-5 sm:p-6 transition-colors ${
                  c.proof ? "hover:border-[#FF5E1A]/50 cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="p-2.5 h-fit rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A] shrink-0">
                  <Award size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-bold text-base text-slate-100 leading-snug">{c.name}</h3>
                    <span
                      data-testid={`certification-status-${i}`}
                      className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_STYLES[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-slate-400">
                    {c.issuer}
                    {c.id && <span className="text-slate-500"> · ID {c.id}</span>}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">
                    Earned {c.earned}
                    {c.expires && <span> · Expired {c.expires}</span>}
                  </p>
                  {c.proof && (
                    <p className="mt-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-[#00F0FF] transition-colors">
                      <ExternalLink size={11} /> {c.proof.label}
                    </p>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && <ProofModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};
