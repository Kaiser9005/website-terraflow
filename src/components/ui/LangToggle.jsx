import { createContext, useContext, useState, useCallback } from "react";

const LangContext = createContext({ lang: "fr", toggle: () => {} });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const toggle = useCallback(() => setLang((l) => (l === "fr" ? "en" : "fr")), []);
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button className="lang-toggle" onClick={toggle} aria-label={`Switch to ${lang === "fr" ? "English" : "Français"}`}>
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
}
