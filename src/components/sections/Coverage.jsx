import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  { name: "Cameroun", emoji: "\uD83C\uDDE8\uD83C\uDDF2", zone: "CEMAC", social: "CNPS" },
  { name: "Sénégal", emoji: "\uD83C\uDDF8\uD83C\uDDF3", zone: "UEMOA", social: "CSS" },
  { name: "Côte d'Ivoire", emoji: "\uD83C\uDDE8\uD83C\uDDEE", zone: "UEMOA", social: "CNPS" },
  { name: "Gabon", emoji: "\uD83C\uDDEC\uD83C\uDDE6", zone: "CEMAC", social: "CNSS" },
  { name: "Congo", emoji: "\uD83C\uDDE8\uD83C\uDDEC", zone: "CEMAC", social: "CNSS" },
  { name: "Mali", emoji: "\uD83C\uDDF2\uD83C\uDDF1", zone: "UEMOA", social: "INPS" },
  { name: "Burkina Faso", emoji: "\uD83C\uDDE7\uD83C\uDDEB", zone: "UEMOA", social: "CNSS" },
  { name: "Bénin", emoji: "\uD83C\uDDE7\uD83C\uDDEF", zone: "UEMOA", social: "CNSS" },
  { name: "Togo", emoji: "\uD83C\uDDF9\uD83C\uDDEC", zone: "UEMOA", social: "CNSS" },
  { name: "Niger", emoji: "\uD83C\uDDF3\uD83C\uDDEA", zone: "UEMOA", social: "CNSS" },
  { name: "Tchad", emoji: "\uD83C\uDDF9\uD83C\uDDE9", zone: "CEMAC", social: "CNPS" },
  { name: "Guinée", emoji: "\uD83C\uDDEC\uD83C\uDDF3", zone: "—", social: "CNSS" },
  { name: "RCA", emoji: "\uD83C\uDDE8\uD83C\uDDEB", zone: "CEMAC", social: "OCSS" },
  { name: "Guinée Équ.", emoji: "\uD83C\uDDEC\uD83C\uDDF6", zone: "CEMAC", social: "INSESO" },
  { name: "Comores", emoji: "\uD83C\uDDF0\uD83C\uDDF2", zone: "—", social: "CNSS" },
  { name: "Guinée-Bissau", emoji: "\uD83C\uDDEC\uD83C\uDDFC", zone: "UEMOA", social: "INSS" },
  { name: "RD Congo", emoji: "\uD83C\uDDE8\uD83C\uDDE9", zone: "—", social: "CNSS" },
];

const cropEmojis = ["🌴", "🫘", "☕", "🌳", "🧶", "🍌", "🥔", "🍍"];

export default function Coverage() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  const crops = useMemo(() => {
    const raw = t("coverage.crops");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".coverage-country"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
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

      <div className="coverage-grid">
        {countries.map((c, i) => (
          <div key={i} className="coverage-country" style={{ opacity: 0 }}>
            <span className="coverage-flag-emoji" role="img" aria-label={`${t("coverage.flagAlt")} ${c.name}`}>{c.emoji}</span>
            <div className="coverage-country-info">
              <span className="coverage-country-name">{c.name}</span>
              <span className="coverage-country-meta">{c.zone} · {c.social}</span>
            </div>
          </div>
        ))}
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
