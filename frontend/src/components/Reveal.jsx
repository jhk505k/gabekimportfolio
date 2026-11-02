import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ index, title, sub }) => (
  <Reveal className="mb-12 lg:mb-16">
    <div className="flex items-baseline gap-4 mb-3">
      <span className="font-mono text-sm text-[#FF5E1A]">{index}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
    <h2 className="font-display font-extrabold tracking-tight uppercase text-2xl sm:text-3xl lg:text-4xl text-slate-100">
      {title}
    </h2>
    {sub && <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">{sub}</p>}
  </Reveal>
);
