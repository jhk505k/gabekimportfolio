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

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("portfolio-lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  const t = (key) => UI[lang]?.[key] ?? UI.en[key] ?? key;

  // project field translation with English fallback from portfolio.js
  const tp = (projectId, field, fallback) => {
    if (lang === "en") return fallback;
    const dict = lang === "ko" ? PROJECTS_KO : PROJECTS_ZH;
    return dict[projectId]?.[field] ?? fallback;
  };

  // experience translation by index, falls back to English data
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
