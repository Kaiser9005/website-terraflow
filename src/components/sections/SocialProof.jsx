import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "80", unit: "ha", label: "en production active" },
  { value: "28", unit: "", label: "parcelles cartographiées" },
  { value: "3x", unit: "", label: "ROI dès la 1ère année" },
  { value: "<48", unit: "ms", label: "temps de réponse P95" },
];

const logos = [
  { name: "FOFAL", sub: "Cameroun" },
  { name: "CNPS", sub: "Compatible" },
  { name: "OHADA", sub: "Certifié" },
  { name: "CEMAC", sub: "Conforme" },
  { name: "CIRAD", sub: "Données" },
];

export default function SocialProof() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".sp-metric"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".sp-logo"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="sp-section" ref={sectionRef}>
      <div className="sp-metrics">
        {metrics.map((m, i) => (
          <div key={i} className="sp-metric" style={{ opacity: 0 }}>
            <span className="sp-value">{m.value}<span className="sp-unit">{m.unit}</span></span>
            <span className="sp-label">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="sp-divider" />
      <div className="sp-logos">
        <span className="sp-trust-label">Certifié & Compatible</span>
        <div className="sp-logo-row">
          {logos.map((l, i) => (
            <div key={i} className="sp-logo" style={{ opacity: 0 }}>
              <span className="sp-logo-name">{l.name}</span>
              <span className="sp-logo-sub">{l.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
