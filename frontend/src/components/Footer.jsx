import { LogoMark } from "./Nav";
import { LINKS } from "../data/portfolio";
import { Linkedin, Github, Mail } from "lucide-react";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-white/10 bg-[#090A0F]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <LogoMark size={28} />
        <div>
          <p className="font-display font-bold text-sm text-slate-100">GABE KIM</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            Full Stack Java Developer
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-linkedin-link"
          aria-label="LinkedIn"
          className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-[#FF5E1A] hover:border-[#FF5E1A] transition-colors"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-github-link"
          aria-label="GitHub"
          className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-[#FF5E1A] hover:border-[#FF5E1A] transition-colors"
        >
          <Github size={16} />
        </a>
        <a
          href={`mailto:${LINKS.email}`}
          data-testid="footer-email-link"
          aria-label="Email"
          className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-[#FF5E1A] hover:border-[#FF5E1A] transition-colors"
        >
          <Mail size={16} />
        </a>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600" data-testid="footer-copyright">
        © {new Date().getFullYear()} Gabe Kim · Columbus, GA
      </p>
    </div>
  </footer>
);
