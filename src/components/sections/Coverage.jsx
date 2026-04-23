import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  // OHADA Francophone — CEMAC (6)
  { name: "Cameroun", emoji: "\uD83C\uDDE8\uD83C\uDDF2", zone: "CEMAC", social: "CNPS" },
  { name: "Gabon", emoji: "\uD83C\uDDEC\uD83C\uDDE6", zone: "CEMAC", social: "CNSS" },
  { name: "Congo", emoji: "\uD83C\uDDE8\uD83C\uDDEC", zone: "CEMAC", social: "CNSS" },
  { name: "Tchad", emoji: "\uD83C\uDDF9\uD83C\uDDE9", zone: "CEMAC", social: "CNPS" },
  { name: "RCA", emoji: "\uD83C\uDDE8\uD83C\uDDEB", zone: "CEMAC", social: "OCSS" },
  { name: "Guinée Équ.", emoji: "\uD83C\uDDEC\uD83C\uDDF6", zone: "CEMAC", social: "INSESO" },
  // OHADA Francophone — UEMOA (8)
  { name: "Sénégal", emoji: "\uD83C\uDDF8\uD83C\uDDF3", zone: "UEMOA", social: "CSS" },
  { name: "Côte d'Ivoire", emoji: "\uD83C\uDDE8\uD83C\uDDEE", zone: "UEMOA", social: "CNPS" },
  { name: "Mali", emoji: "\uD83C\uDDF2\uD83C\uDDF1", zone: "UEMOA", social: "INPS" },
  { name: "Burkina Faso", emoji: "\uD83C\uDDE7\uD83C\uDDEB", zone: "UEMOA", social: "CNSS" },
  { name: "Bénin", emoji: "\uD83C\uDDE7\uD83C\uDDEF", zone: "UEMOA", social: "CNSS" },
  { name: "Togo", emoji: "\uD83C\uDDF9\uD83C\uDDEC", zone: "UEMOA", social: "CNSS" },
  { name: "Niger", emoji: "\uD83C\uDDF3\uD83C\uDDEA", zone: "UEMOA", social: "CNSS" },
  { name: "Guinée-Bissau", emoji: "\uD83C\uDDEC\uD83C\uDDFC", zone: "UEMOA", social: "INSS" },
  // OHADA Other (3)
  { name: "Guinée", emoji: "\uD83C\uDDEC\uD83C\uDDF3", zone: "OHADA", social: "CNSS" },
  { name: "Comores", emoji: "\uD83C\uDDF0\uD83C\uDDF2", zone: "OHADA", social: "CNSS" },
  { name: "RD Congo", emoji: "\uD83C\uDDE8\uD83C\uDDE9", zone: "OHADA", social: "CNSS" },
  // Anglophone Africa (8)
  { name: "Nigeria", emoji: "\uD83C\uDDF3\uD83C\uDDEC", zone: "Anglophone", social: "NSITF" },
  { name: "Ghana", emoji: "\uD83C\uDDEC\uD83C\uDDED", zone: "Anglophone", social: "SSNIT" },
  { name: "Kenya", emoji: "\uD83C\uDDF0\uD83C\uDDEA", zone: "Anglophone", social: "NSSF" },
  { name: "Uganda", emoji: "\uD83C\uDDFA\uD83C\uDDEC", zone: "Anglophone", social: "NSSF" },
  { name: "Rwanda", emoji: "\uD83C\uDDF7\uD83C\uDDFC", zone: "Anglophone", social: "RSSB" },
  { name: "South Africa", emoji: "\uD83C\uDDFF\uD83C\uDDE6", zone: "Anglophone", social: "UIF" },
  { name: "Liberia", emoji: "\uD83C\uDDF1\uD83C\uDDF7", zone: "Anglophone", social: "NASSCORP" },
  { name: "Sierra Leone", emoji: "\uD83C\uDDF8\uD83C\uDDF1", zone: "Anglophone", social: "NASSIT" },
  // Lusophone Africa (5)
  { name: "Angola", emoji: "\uD83C\uDDE6\uD83C\uDDF4", zone: "Lusophone", social: "INSS" },
  { name: "Mozambique", emoji: "\uD83C\uDDF2\uD83C\uDDFF", zone: "Lusophone", social: "INSS" },
  { name: "Cap-Vert", emoji: "\uD83C\uDDE8\uD83C\uDDFB", zone: "Lusophone", social: "INPS" },
  { name: "São Tomé", emoji: "\uD83C\uDDF8\uD83C\uDDF9", zone: "Lusophone", social: "INSS" },
  // Swahili Belt (1)
  { name: "Tanzania", emoji: "\uD83C\uDDF9\uD83C\uDDFF", zone: "Swahili", social: "NSSF" },
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
