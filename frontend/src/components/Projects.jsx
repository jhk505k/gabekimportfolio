import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { PROJECTS } from "../data/portfolio";
import { X, Building2, Tag, ArrowRight } from "lucide-react";

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#090A0F]/85 backdrop-blur-md"
    onClick={onClose}
    data-testid="project-modal-overlay"
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      data-testid="project-modal"
      className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#11131A] shadow-2xl"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" data-testid="project-modal-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] to-transparent" />
        <button
          onClick={onClose}
          data-testid="project-modal-close"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#090A0F]/70 border border-white/15 text-slate-200 hover:text-[#FF5E1A] hover:border-[#FF5E1A] transition-colors"
          aria-label="Close project details"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00F0FF]">{project.category}</p>
        <h3 className="mt-2 font-display font-extrabold text-2xl text-slate-100" data-testid="project-modal-title">
          {project.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 font-mono text-xs text-slate-400">
          <Building2 size={14} className="text-[#FF5E1A]" /> {project.company}
        </p>
        <p className="mt-5 text-sm text-slate-400 leading-relaxed" data-testid="project-modal-description">
          {project.description}
        </p>
        <div className="mt-6">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-3">
            <Tag size={12} /> Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                data-testid={`project-modal-tech-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#FF5E1A]/10 border border-[#FF5E1A]/30 text-[#FF5E1A]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <Link
          to={`/projects/${project.id}`}
          onClick={onClose}
          data-testid="project-modal-case-study-link"
          className="group mt-8 flex items-center justify-center gap-2 w-full bg-[#FF5E1A] text-[#090A0F] font-display font-bold text-sm px-6 py-3.5 rounded-full hover:bg-[#00F0FF] transition-colors"
        >
          Read Full Case Study
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

export const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" data-testid="projects-section" className="bg-[#11131A] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
        <SectionHeading
          index="04"
          title="Selected Work"
          sub="Thirteen production systems across blockchain, banking, telecom, smart cities and applied AI. Click any project for the full breakdown."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(p)}
                data-testid={`project-card-${p.id}`}
                className="group relative w-full text-left rounded-xl overflow-hidden border border-white/10 bg-[#161924] hover:border-[#FF5E1A]/60 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category} project at ${p.company}`}
                    loading="lazy"
                    width="400"
                    height="176"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-testid={`project-image-${p.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161924] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#090A0F]/75 border border-white/15 text-[#00F0FF]">
                    {p.category}
                  </span>
                  <span className="absolute top-3 right-3 font-display font-black text-xl text-white/20 group-hover:text-[#FF5E1A] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 group-hover:text-[#FF5E1A] transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">{p.company}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-slate-400">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="font-mono text-[10px] px-2 py-1 rounded-full text-[#00F0FF]">
                        +{p.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-[#00F0FF] transition-colors">
                    Case Study <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};
