import { useRef, useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

const authors = [
  { author: "Jean Paul FODJO", role: "Fondateur & DG, FOFAL — 80 ha, Cameroun", initials: "JP" },
  { author: "Jean Paul FODJO", role: "Fondateur & DG, FOFAL — 80 ha, Cameroun", initials: "JP" },
  { author: "Jean Paul FODJO", role: "Fondateur & DG, FOFAL — 80 ha, Cameroun", initials: "JP" },
];

const INTERVAL = 6000;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const slideRef = useRef(null);
  const { t } = useLang();

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
              <div className="testimonial-name">{currentAuthor.author}</div>
              <div className="testimonial-role">{currentAuthor.role}</div>
            </div>
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
