import { MARQUEE_ITEMS } from "../data/portfolio";

export const Marquee = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      data-testid="tech-marquee"
      className="relative overflow-hidden border-y border-white/10 bg-[#11131A] py-5 select-none"
    >
      <div className="flex w-max animate-marquee gap-0">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-display font-bold uppercase tracking-widest text-lg sm:text-xl text-slate-300 px-6">
              {item}
            </span>
            <span className="text-[#FF5E1A] text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
