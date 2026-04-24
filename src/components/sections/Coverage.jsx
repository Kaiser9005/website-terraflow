import { useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";
import AfricaMap from "./AfricaMap";
import MapTooltip from "../ui/MapTooltip";
import countries, { ZONE_COLORS, ZONE_LABELS } from "../../data/africaCountries";

gsap.registerPlugin(ScrollTrigger);

const cropEmojis = ["🌴", "🫘", "☕", "🌳", "🧶", "🍌", "🥔", "🍍"];

export default function Coverage() {
  const sectionRef = useRef(null);
  const { t, lang } = useLang();
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const crops = useMemo(() => {
    const raw = t("coverage.crops");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const zoneEntries = useMemo(() => Object.entries(ZONE_COLORS), []);

  const zoneCounts = useMemo(() => {
    const counts = {};
    countries.forEach(c => {
      counts[c.zone] = (counts[c.zone] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCountryHover = useCallback((country, position) => {
    setHoveredCountry(country);
    setTooltipPos(position);
  }, []);

  const handleCountryLeave = useCallback(() => {
    setHoveredCountry(null);
    setTooltipPos(null);
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Legend animation
    gsap.fromTo(section.querySelectorAll(".coverage-legend-item"),
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".coverage-legend"), start: "top 85%", toggleActions: "play none none none" },
      }
    );

    // Country grid animation (kept for mobile fallback)
    gsap.fromTo(section.querySelectorAll(".coverage-country"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".coverage-grid"), start: "top 65%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".coverage-filiere"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".coverage-filieres"), start: "top 80%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  const titleRaw = t("coverage.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="coverage" className="section section-creme" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">{t("coverage.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("coverage.subtitle")}
          </p>
        </Reveal>
      </div>

      {/* Map + Legend layout */}
      <div className="coverage-map-layout">
        {/* Interactive SVG Map */}
        <div className="coverage-map-wrapper">
          <AfricaMap
            onCountryHover={handleCountryHover}
            onCountryLeave={handleCountryLeave}
            activeCountry={hoveredCountry}
          />
          <MapTooltip country={hoveredCountry} position={tooltipPos} />
        </div>

        {/* Legend + Stats sidebar */}
        <div className="coverage-sidebar">
          <div className="coverage-legend">
            <h3 className="coverage-legend-title">{t("coverage.legendTitle")}</h3>
            {zoneEntries.map(([zone, color]) => (
              <div key={zone} className="coverage-legend-item" style={{ opacity: 0 }}>
                <span className="coverage-legend-dot" style={{ background: color }} />
                <span className="coverage-legend-label">{ZONE_LABELS[lang]?.[zone] || zone}</span>
                <span className="coverage-legend-count">{zoneCounts[zone] || 0}</span>
              </div>
            ))}
            <div className="coverage-legend-total">
              <strong>{countries.length}</strong> {t("coverage.countriesTotal")}
            </div>
          </div>

          {/* Country list — scrollable for reference */}
          <div className="coverage-country-list">
            {countries.map((c) => {
              const name = lang === "en" ? c.nameEn : c.name;
              const isActive = hoveredCountry?.id === c.id;
              return (
                <div
                  key={c.id}
                  className={`coverage-country-chip ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoveredCountry(c)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{ borderColor: isActive ? ZONE_COLORS[c.zone] : undefined }}
                >
                  <span>{c.emoji}</span>
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country grid — mobile view */}
      <div className="coverage-grid coverage-grid-mobile">
        {countries.map((c, i) => {
          const name = lang === "en" ? c.nameEn : c.name;
          return (
            <div key={i} className="coverage-country" style={{ opacity: 0 }}>
              <span className="coverage-flag-emoji" role="img" aria-label={`${t("coverage.flagAlt")} ${name}`}>{c.emoji}</span>
              <div className="coverage-country-info">
                <span className="coverage-country-name">{name}</span>
                <span className="coverage-country-meta">{c.zone} · {c.social}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="coverage-filieres">
        <Reveal>
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
            {t("coverage.cropTitle")}
          </h3>
        </Reveal>
        <div className="coverage-filieres-row">
          {crops.map((name, i) => (
            <div key={i} className="coverage-filiere" style={{ opacity: 0 }}>
              <span className="coverage-filiere-emoji">{cropEmojis[i]}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
