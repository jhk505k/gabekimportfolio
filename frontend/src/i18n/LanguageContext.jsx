import { createContext, useContext, useState, useEffect } from "react";
import { UI } from "./ui";
import { EXPERIENCE_KO } from "./experience.ko";
import { EXPERIENCE_ZH } from "./experience.zh";
import { PROJECTS_KO } from "./projects.ko";
import { PROJECTS_ZH } from "./projects.zh";

export const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "ko", short: "한", label: "한국어" },
  { code: "zh", short: "中", label: "中文" },
];

// Map country code -> default language
const countryToLang = (cc) => {
  if (!cc) return "en";
  const c = cc.toUpperCase();
  if (c === "KR") return "ko";                    // South Korea
  if (c === "CN" || c === "SG") return "zh";      // China, Singapore
  return "en";                                     // US & everywhere else
};

const LANG_KEY = "portfolio-lang";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(LANG_KEY) || "en";
    } catch {
      return "en";
    }
  });

  // On first visit (no saved preference), detect region by IP geolocation.
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch {}
    if (saved) return; // visitor already has a preference — don't override

    let cancelled = false;
    const detect = async () => {
      // Try a couple of free IP-geolocation endpoints (no key needed).
      const endpoints = [
        async () => {
          const r = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
          const j = await r.json();
          return j.country_code || j.country;
        },
        async () => {
          const r = await fetch("https://ip-api.com/json/?fields=countryCode", { signal: AbortSignal.timeout(4000) });
          const j = await r.json();
          return j.countryCode;
        },
      ];
      for (const ep of endpoints) {
        try {
          const cc = await ep();
          if (!cancelled && cc) {
            setLangState(countryToLang(cc));
            return;
          }
        } catch {
          // try next endpoint
        }
      }
    };
    detect();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  // Manual selection always wins and is remembered.
  const setLang = (code) => {
    setLangState(code);
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {}
  };

  const t = (key) => UI[lang]?.[key] ?? UI.en[key] ?? key;

  const tp = (projectId, field, fallback) => {
    if (lang === "en") return fallback;
    const dict = lang === "ko" ? PROJECTS_KO : PROJECTS_ZH;
    return dict[projectId]?.[field] ?? fallback;
  };

  const te = (index, field, fallback) => {
    if (lang === "en") return fallback;
    const dict = lang === "ko" ? EXPERIENCE_KO : EXPERIENCE_ZH;
    return dict[index]?.[field] ?? fallback;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tp, te }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
