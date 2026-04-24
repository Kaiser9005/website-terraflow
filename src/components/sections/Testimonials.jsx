import { useRef, useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

const authors = [
  {
    author: "Responsable Admin. & Financier",
    authorEn: "Admin & Finance Manager",
    role: "Comptabilite & Paie",
    roleEn: "Accounting & Payroll",
    company: "FOFAL",
    context: "45+ employes",
    contextEn: "45+ employees",
    initials: "AF",
    badge: "Finance",
  },
  {
    author: "Chef de Dept. Plantation",
    authorEn: "Plantation Dept. Head",
    role: "Operations Terrain & IA",
    roleEn: "Field Ops & AI",
    company: "FOFAL",
    context: "28 parcelles",
    contextEn: "28 plots",
    initials: "DP",
    badge: "Agriculture",
  },
  {
    author: "Jean Paul FODJO",
    authorEn: "Jean Paul FODJO",
    role: "Fondateur & Directeur General",
    roleEn: "Founder & CEO",
    company: "FOFAL",
    context: "80 ha, Cameroun",
    contextEn: "80 ha, Cameroon",
    initials: "JP",
    badge: "Direction",
    badgeEn: "Leadership",
  },
];

const INTERVAL = 6000;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const slideRef = useRef(null);
  const { t, lang } = useLang();

  const items = useMemo(() => {
    const raw = t("testimonials.items");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  useEffect(() => {
    const count = items.length || 3;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    if (!slideRef.current) return;
    gsap.fromTo(slideRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [active]);

  const currentText = items[active] || "";
  const currentAuthor = authors[active] || authors[0];
  const isEn = lang === "en";

  const titleRaw = t("testimonials.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="testimonials" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">{t("testimonials.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
      </div>

      <div className="testimonial-carousel">
        <div ref={slideRef} className="testimonial-slide">
          <div className="testimonial-quote">&ldquo;</div>
          <p className="testimonial-text">{currentText}</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{currentAuthor.initials}</div>
            <div>
              <div className="testimonial-name">
                {isEn ? (currentAuthor.authorEn || currentAuthor.author) : currentAuthor.author}
              </div>
              <div className="testimonial-role">
                {isEn ? (currentAuthor.roleEn || currentAuthor.role) : currentAuthor.role}
                {" — "}
                <span className="testimonial-company">{currentAuthor.company}</span>
                {", "}
                {isEn ? (currentAuthor.contextEn || currentAuthor.context) : currentAuthor.context}
              </div>
            </div>
            <span className="testimonial-badge">
              {isEn ? (currentAuthor.badgeEn || currentAuthor.badge) : currentAuthor.badge}
            </span>
          </div>
        </div>

        <div className="testimonial-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`${t("testimonials.eyebrow")} ${i + 1}`}
            >
              <span className="dot-inner" />
              {active === i && (
                <svg className="dot-progress" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" />
                  <circle cx="18" cy="18" r="16" className="dot-progress-fill" style={{ animationDuration: `${INTERVAL}ms` }} />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
