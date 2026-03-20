import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 30, suffix: "+", label: "Modules", desc: "dont qualité, budget, chatbot IA" },
  { value: 11, suffix: "", label: "Sous-Modules RH", desc: "paie, congés, compétences, évaluations 360°..." },
  { value: 99, suffix: ".9%", label: "Disponibilité", desc: "objectif uptime (Sentry monitoring)" },
  { value: 6, suffix: "", label: "Modèles IA", desc: "rendement, qualité, prix (×3 produits), demande" },
  { value: 17, suffix: "", label: "Pays OHADA", desc: "architecture multi-juridictions" },
  { value: 900, suffix: "+", label: "Tests Auto", desc: "couverture 100% hooks & services" },
  { value: 15, suffix: "K+", label: "Clés i18n", desc: "interface bilingue FR/EN complète" },
  { value: 100, suffix: "%", label: "OHADA", desc: "conformité comptable Cameroun" },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      }
    );

    const items = section.querySelectorAll(".stat-item");
    gsap.fromTo(items,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
      }
    );

    const valueEls = section.querySelectorAll(".stat-value-num");
    valueEls.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      if (target === 0) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        onUpdate: () => { el.textContent = Math.floor(obj.val); },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="stats" className="section section-creme" ref={sectionRef}>
      <div ref={headerRef} className="section-header" style={{ textAlign: "center", margin: "0 auto", marginBottom: "clamp(3rem, 5vh, 5rem)", opacity: 0 }}>
        <div className="eyebrow">TerraFlow en Chiffres</div>
        <h2 className="display-lg" style={{ marginTop: "1rem" }}>
          La mesure de notre <em>fiabilité</em>
        </h2>
      </div>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ opacity: 0 }}>
            <div className="stat-value">
              <span className="stat-value-num" data-target={s.value}>
                0
              </span>
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
