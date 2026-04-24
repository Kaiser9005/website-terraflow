import { useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../ui/LangToggle";
import countries, { ZONE_COLORS, AFRICA_OUTLINE } from "../../data/africaCountries";

gsap.registerPlugin(ScrollTrigger);

export default function AfricaMap({ onCountryHover, onCountryLeave, activeCountry }) {
  const mapRef = useRef(null);
  const { lang } = useLang();

  useGSAP(() => {
    const map = mapRef.current;
    if (!map) return;

    const dots = map.querySelectorAll(".africa-map-dot");
    gsap.fromTo(dots,
      { opacity: 0, scale: 0, transformOrigin: "center center" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: map,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Pulse animation on the dots after entrance
    gsap.to(dots, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
      stagger: 0.08,
      scrollTrigger: {
        trigger: map,
        start: "top 70%",
        toggleActions: "play pause resume pause",
      },
    });
  }, { scope: mapRef });

  const handleMouseEnter = useCallback((country, e) => {
    const el = e.currentTarget;
    const svg = el.closest("svg");
    const svgRect = svg.getBoundingClientRect();
    const ctm = svg.getScreenCTM();

    // Convert SVG coordinates to screen coordinates
    const point = svg.createSVGPoint();
    point.x = parseFloat(el.getAttribute("cx"));
    point.y = parseFloat(el.getAttribute("cy"));
    const screenPoint = point.matrixTransform(ctm);

    onCountryHover?.(country, {
      x: screenPoint.x,
      y: screenPoint.y - parseFloat(el.getAttribute("r")) * (ctm.a || 1) - 8,
    });

    gsap.to(el, {
      attr: { r: country.r * 1.6 },
      duration: 0.25,
      ease: "power2.out",
    });
  }, [onCountryHover]);

  const handleMouseLeave = useCallback((country, e) => {
    onCountryLeave?.();
    gsap.to(e.currentTarget, {
      attr: { r: country.r },
      duration: 0.25,
      ease: "power2.out",
    });
  }, [onCountryLeave]);

  const countryElements = useMemo(() =>
    countries.map((country) => {
      const isActive = activeCountry?.id === country.id;
      const color = ZONE_COLORS[country.zone];

      return (
        <circle
          key={country.id}
          cx={country.cx}
          cy={country.cy}
          r={country.r}
          className="africa-map-dot"
          data-country-id={country.id}
          fill={color}
          fillOpacity={isActive ? 1 : 0.8}
          stroke={isActive ? "#fff" : "rgba(255,255,255,0.4)"}
          strokeWidth={isActive ? 2.5 : 1}
          style={{ cursor: "pointer", opacity: 0 }}
          onMouseEnter={(e) => handleMouseEnter(country, e)}
          onMouseLeave={(e) => handleMouseLeave(country, e)}
          onClick={(e) => handleMouseEnter(country, e)}
          role="button"
          tabIndex={0}
          aria-label={lang === "en" ? country.nameEn : country.name}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleMouseEnter(country, e);
            }
          }}
        />
      );
    }),
    [activeCountry, lang, handleMouseEnter, handleMouseLeave]
  );

  return (
    <div className="africa-map-container" ref={mapRef}>
      <svg
        viewBox="-50 -20 860 940"
        className="africa-map-svg"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={lang === "en"
          ? "Interactive map of Africa showing KALTIV coverage in 30 countries"
          : "Carte interactive de l'Afrique montrant la couverture KALTIV dans 30 pays"
        }
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="continentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(10,54,34,0.06)" />
            <stop offset="100%" stopColor="rgba(10,54,34,0.02)" />
          </linearGradient>
        </defs>

        {/* Continent silhouette */}
        <path
          d={AFRICA_OUTLINE}
          fill="url(#continentFill)"
          stroke="rgba(10,54,34,0.12)"
          strokeWidth="1.5"
          className="africa-map-silhouette"
        />

        {/* Country dots */}
        {countryElements}
      </svg>
    </div>
  );
}
