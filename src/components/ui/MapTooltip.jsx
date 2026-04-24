import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLang } from "./LangToggle";
import { ZONE_COLORS, ZONE_LABELS } from "../../data/africaCountries";

export default function MapTooltip({ country, position }) {
  const tooltipRef = useRef(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;

    if (country) {
      gsap.fromTo(el,
        { opacity: 0, y: 8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(el, { opacity: 0, y: 8, duration: 0.15, ease: "power2.in" });
    }
  }, [country]);

  if (!country) return null;

  const name = lang === "en" ? country.nameEn : country.name;
  const zoneLabel = ZONE_LABELS[lang]?.[country.zone] || country.zone;

  return (
    <div
      ref={tooltipRef}
      className="map-tooltip"
      style={{
        left: `${position?.x ?? 0}px`,
        top: `${position?.y ?? 0}px`,
      }}
      role="tooltip"
      aria-live="polite"
    >
      <div className="map-tooltip-header">
        <div className="map-tooltip-name">{name}</div>
        <div className="map-tooltip-zone" style={{ color: ZONE_COLORS[country.zone] }}>
          {zoneLabel}
        </div>
      </div>
      <div className="map-tooltip-details">
        <div className="map-tooltip-row">
          <span className="map-tooltip-label">{t("coverage.tooltipCurrency")}</span>
          <span className="map-tooltip-value">{country.currency}</span>
        </div>
        <div className="map-tooltip-row">
          <span className="map-tooltip-label">{t("coverage.tooltipSocial")}</span>
          <span className="map-tooltip-value">{country.social}</span>
        </div>
        <div className="map-tooltip-row">
          <span className="map-tooltip-label">{t("coverage.tooltipLanguages")}</span>
          <span className="map-tooltip-value">{country.languages}</span>
        </div>
      </div>
    </div>
  );
}
