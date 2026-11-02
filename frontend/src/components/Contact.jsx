import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "./Reveal";
import { LINKS } from "../data/portfolio";
import { Linkedin, Github, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — Gabe will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send the message. Please try email instead.");
    } finally {
      setSending(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <section id="contact" data-testid="contact-section" className="bg-[#11131A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
        <SectionHeading
          index="06"
          title="Let's Build Something"
          sub="Hiring for a senior backend or full-stack role? Send a message — every enquiry lands straight in Gabe's inbox list."
        />
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: LINKS.email, href: `mailto:${LINKS.email}`, testid: "contact-email-link" },
                { icon: Phone, label: LINKS.phone, href: `tel:${LINKS.phone.replace(/[^0-9]/g, "")}`, testid: "contact-phone-link" },
                { icon: MapPin, label: LINKS.location, href: null, testid: "contact-location" },
                { icon: Linkedin, label: "linkedin.com/in/ji-kim-5179495", href: LINKS.linkedin, testid: "contact-linkedin-link" },
                { icon: Github, label: "github.com/jhk505k", href: LINKS.github, testid: "contact-github-link" },
              ].map(({ icon: Icon, label, href, testid }) =>
                href ? (
                  <a
                    key={testid}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-testid={testid}
                    className="group flex items-center gap-4 border border-white/10 rounded-xl bg-[#161924] px-5 py-4 hover:border-[#FF5E1A]/50 transition-colors"
                  >
                    <span className="p-2 rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A] group-hover:bg-[#00F0FF]/10 group-hover:text-[#00F0FF] transition-colors">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-sm text-slate-300 group-hover:text-slate-100 transition-colors break-all">
                      {label}
                    </span>
                  </a>
                ) : (
                  <div
                    key={testid}
                    data-testid={testid}
                    className="flex items-center gap-4 border border-white/10 rounded-xl bg-[#161924] px-5 py-4"
                  >
                    <span className="p-2 rounded-lg bg-[#FF5E1A]/10 text-[#FF5E1A]">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-sm text-slate-300">{label}</span>
                  </div>
                )
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.2}>
            <form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="border border-white/10 rounded-xl bg-[#161924] p-6 sm:p-8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    data-testid="contact-name-input"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jane Recruiter"
                    className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#FF5E1A] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    data-testid="contact-email-input"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@company.com"
                    className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#FF5E1A] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell me about the role or project…"
                  className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#FF5E1A] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit-button"
                className="group self-start flex items-center gap-2 bg-[#FF5E1A] text-[#090A0F] font-display font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#00F0FF] disabled:opacity-60 transition-colors"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
