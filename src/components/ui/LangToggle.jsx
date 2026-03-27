import { createContext, useContext, useState, useCallback, useMemo } from "react";
import translations from "../../i18n/translations";

const LangContext = createContext({ lang: "fr", toggle: () => {}, t: () => "" });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const toggle = useCallback(() => setLang((l) => (l === "fr" ? "en" : "fr")), []);

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let val = translations[lang];
      for (const k of keys) {
        if (val == null) return key;
        val = val[k];
      }
      return val ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, toggle, t }), [lang, toggle, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button className="lang-toggle" onClick={toggle} aria-label={`Switch to ${lang === "fr" ? "English" : "Français"}`}>
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
}
