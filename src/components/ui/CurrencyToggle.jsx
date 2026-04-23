import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CURRENCIES = {
  XAF: { symbol: "FCFA", locale: "fr-FR" },
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "fr-FR" },
};

// Pre-computed prices per tier — avoids floating point issues
const PRICING = {
  Foundation: { XAF: 75000, USD: 115, EUR: 115 },
  Growth:     { XAF: 200000, USD: 305, EUR: 305 },
  Command:    { XAF: 500000, USD: 762, EUR: 762 },
  Enterprise: null, // "Custom" / "Sur mesure"
};

const CurrencyContext = createContext({
  currency: "XAF",
  setCurrency: () => {},
  format: () => "",
  tierPrice: () => null,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try { return localStorage.getItem("kaltiv-currency") || "XAF"; }
    catch { return "XAF"; }
  });

  const handleSetCurrency = useCallback((c) => {
    setCurrency(c);
    try { localStorage.setItem("kaltiv-currency", c); } catch {}
  }, []);

  const format = useCallback((amount) => {
    if (amount == null) return "";
    const { symbol } = CURRENCIES[currency];
    if (currency === "XAF") {
      return `${amount.toLocaleString("fr-FR")} ${symbol}`;
    }
    return `${symbol}${amount.toLocaleString("en-US")}`;
  }, [currency]);

  const tierPrice = useCallback((tierName) => {
    const tier = PRICING[tierName];
    if (!tier) return null; // Enterprise = custom
    return tier[currency];
  }, [currency]);

  const value = useMemo(
    () => ({ currency, setCurrency: handleSetCurrency, format, tierPrice, CURRENCIES }),
    [currency, handleSetCurrency, format, tierPrice]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="currency-toggle" role="radiogroup" aria-label="Currency">
      {Object.keys(CURRENCIES).map((code) => (
        <button
          key={code}
          className={`currency-toggle-btn ${currency === code ? "active" : ""}`}
          onClick={() => setCurrency(code)}
          role="radio"
          aria-checked={currency === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
