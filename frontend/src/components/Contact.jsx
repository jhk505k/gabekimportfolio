import { useState } from "react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "./Reveal";
import { LINKS } from "../data/portfolio";
import { Linkedin, Github, Mail, Phone, MapPin, Copy, ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(null);

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    toast.success(t("copied"));
    setTimeout(() => setCopied(null), 2000);
  };

  const ITEMS = [
    {
      icon: Mail,
      label: LINKS.email,
      action: { type: "mailto", value: `mailto:${LINKS.email}` },
      hint: t("email_hint"),
      testid: "contact-email-link",
    },
    {
      icon: Phone,
      label: LINKS.phone,
      action: { type: "copy", value: LINKS.phone, key: "phone" },
      hint: t("copy_hint"),
      testid: "contact-phone-copy",
    },
    {
      icon: MapPin,
      label: LINKS.location,
      action: null,
      hint: null,
      testid: "contact-location",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      action: { type: "link", value: LINKS.linkedin },
      hint: t("visit_profile"),
      testid: "contact-linkedin-link",
    },
    {
      icon: Github,
      label: "GitHub",
      action: { type: "link", value: LINKS.github },
      hint: t("visit_profile"),
      testid: "contact-github-link",
    },
  ];

  const cardClass = "group flex items-center gap-4 border border-white/10 rounded-xl bg-[#161924] px-5 py-4 hover:border-[#FF5E1A]/50 transition-colors text-left w-full";

  return (
    <section id="contact" data-testid="contact-section" className="bg-[#11131A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
        <SectionHeading index="06" title={t("contact_title")} sub={t("contact_sub")} />
        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ITEMS.map(({ icon: Icon, label, action, hint, testid }) => {
              const inner = (
                <>
                  <span className="p-2 rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A] group-hover:bg-[#00F0FF]/10 group-hover:text-[#00F0FF] transition-colors shrink-0">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-sm text-slate-300 group-hover:text-slate-100 transition-colors break-all">
                      {label}
                    </span>
                    {hint && (
                      <span className="block mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-[#00F0FF] transition-colors">
                        {copied === action?.key ? `✓ ${t("copied")}` : hint}
                      </span>
                    )}
                  </span>
                  {action?.type === "copy" && (
                    <span className={`shrink-0 transition-colors ${copied === action.key ? "text-[#00F0FF]" : "text-slate-600 group-hover:text-[#FF5E1A]"}`}>
                      <Copy size={15} />
                    </span>
                  )}
                  {(action?.type === "mailto" || action?.type === "link") && (
                    <span className="shrink-0 text-slate-600 group-hover:text-[#FF5E1A] transition-colors">
                      <ExternalLink size={15} />
                    </span>
                  )}
                </>
              );

              if (action?.type === "mailto") {
                return (
                  <a key={testid} href={action.value} data-testid={testid} className={cardClass}>
                    {inner}
                  </a>
                );
              }
              if (action?.type === "link") {
                return (
                  <a
                    key={testid}
                    href={action.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={testid}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                );
              }
              if (action?.type === "copy") {
                return (
                  <button
                    key={testid}
                    onClick={() => copyToClipboard(action.value, action.key)}
                    data-testid={testid}
                    className={cardClass}
                  >
                    {inner}
                  </button>
                );
              }
              return (
                <div key={testid} data-testid={testid} className={cardClass + " cursor-default hover:border-white/10"}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
