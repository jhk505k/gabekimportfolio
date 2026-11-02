import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/portfolio";
import { LogoMark } from "../components/Nav";
import { ArrowLeft, ArrowRight, Building2, Tag, Target, Wrench, Trophy } from "lucide-react";

const SECTIONS = [
  { key: "challenge", label: "The Challenge", icon: Target, color: "text-[#FF5E1A]", bg: "bg-[#FF5E1A]/10" },
  { key: "approach", label: "The Approach", icon: Wrench, color: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10" },
  { key: "outcome", label: "The Outcome", icon: Trophy, color: "text-[#FF5E1A]", bg: "bg-[#FF5E1A]/10" },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const index = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center gap-6" data-testid="project-not-found">
        <p className="font-mono text-slate-400">Project not found.</p>
        <Link to="/" data-testid="back-home-link" className="text-[#FF5E1A] font-mono text-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </div>
    );
  }

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-[#090A0F]" data-testid="project-detail-page">
      <div className="grain-overlay" />
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#090A0F]/85 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between">
          <Link to="/" data-testid="detail-logo-link" className="flex items-center gap-3">
            <LogoMark size={32} />
            <span className="font-display font-bold tracking-tight text-slate-100">GABE KIM</span>
          </Link>
          <Link
            to="/#projects"
            data-testid="back-to-projects-link"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </nav>
      </header>

      <main className="pt-16">
        <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            data-testid="detail-hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00F0FF]" data-testid="detail-category">
                  {project.category} · Case Study {String(index + 1).padStart(2, "0")} / {PROJECTS.length}
                </p>
                <h1 className="mt-3 font-display font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-100" data-testid="detail-title">
                  {project.title}
                </h1>
                <p className="mt-3 flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Building2 size={14} className="text-[#FF5E1A]" /> {project.company}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-[#FF5E1A] pl-6"
            data-testid="detail-summary"
          >
            {project.description}
          </motion.p>

          <div className="mt-14 flex flex-col gap-8">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`detail-section-${s.key}`}
                className="border border-white/10 rounded-xl bg-[#161924] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`p-2 rounded-lg ${s.bg} ${s.color}`}>
                    <s.icon size={18} />
                  </span>
                  <h2 className="font-display font-bold text-xl text-slate-100">{s.label}</h2>
                </div>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{project[s.key]}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">
              <Tag size={12} /> Tech Stack
            </p>
            <div className="flex flex-wrap gap-2" data-testid="detail-tech-stack">
              {project.tech.map((t) => (
                <span
                  key={t}
                  data-testid={`detail-tech-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#FF5E1A]/10 border border-[#FF5E1A]/30 text-[#FF5E1A]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between gap-4">
            <Link
              to={`/projects/${prev.id}`}
              data-testid="prev-project-link"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Prev</span>
            </Link>
            <Link
              to={`/projects/${next.id}`}
              data-testid="next-project-link"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#FF5E1A] transition-colors text-right"
            >
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
