import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    name: "OHADA / SYSCOHADA",
    desc: "Plan comptable conforme aux 17 pays de l'espace OHADA. Clôture automatisée.",
    status: "active",
  },
  {
    name: "Caisses Sociales Multi-Pays",
    desc: "Cotisations sociales adaptées par pays : CNPS, CNSS, INSS, CSS. Taux vérifiés, calcul automatique.",
    status: "active",
  },
  {
    name: "CEMAC / Zone Franc",
    desc: "Multi-devises FCFA/EUR/USD. Conformité réglementaire CEMAC intégrée.",
    status: "active",
  },
  {
    name: "ISO 9001",
    desc: "Traçabilité complète lot-par-lot pour certification qualité internationale.",
    status: "in-progress",
  },
  {
    name: "HACCP",
    desc: "Chaîne de traçabilité parcelle-à-export compatible avec les exigences HACCP.",
    status: "in-progress",
  },
];

const security = [
  { icon: "\uD83D\uDD12", label: "Chiffrement AES-256 au repos" },
  { icon: "\uD83D\uDEE1\uFE0F", label: "Row Level Security (RLS) multi-tenant" },
  { icon: "\uD83C\uDF10", label: "Infrastructure Supabase (SOC 2 Type II)" },
  { icon: "\uD83D\uDD11", label: "Authentification 2FA + sessions sécurisées" },
  { icon: "\uD83D\uDCCA", label: "Monitoring Sentry 24/7, SLA 99.95%" },
  { icon: "\uD83C\uDF0D", label: "Résidence données flexible (EU / Afrique)" },
];

export default function Trust() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".trust-cert"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".trust-security-item"),
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".trust-security"), start: "top 75%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="trust" className="section section-dark" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>Confiance & Conformité</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            Sécurité de niveau <em>entreprise</em>
          </h2>
        </Reveal>
      </div>

      <div className="trust-grid">
        <div className="trust-certs">
          <h3 className="trust-subtitle">Certifications & Conformité</h3>
          {certifications.map((c, i) => (
            <div key={i} className={`trust-cert ${c.status}`} style={{ opacity: 0 }}>
              <div className="trust-cert-status">
                {c.status === "active" ? "\u2705" : "\u23F3"}
              </div>
              <div className="trust-cert-info">
                <h4>{c.name}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="trust-security">
          <h3 className="trust-subtitle">Sécurité & Infrastructure</h3>
          <div className="trust-security-list">
            {security.map((s, i) => (
              <div key={i} className="trust-security-item" style={{ opacity: 0 }}>
                <span className="trust-security-icon">{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="trust-uptime">
            <div className="trust-uptime-bar">
              <div className="trust-uptime-fill" />
            </div>
            <div className="trust-uptime-info">
              <span className="trust-uptime-value">99.95%</span>
              <span className="trust-uptime-label">Uptime garanti SLA</span>
            </div>
          </div>
        </div>
      </div>

      <Reveal delay={0.3}>
        <div className="trust-badges">
          <div className="trust-badge">
            <span className="trust-badge-icon">&#9733;</span>
            <span className="trust-badge-name">Capterra</span>
            <span className="trust-badge-sub">Profil vérifié</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">&#9733;</span>
            <span className="trust-badge-name">G2</span>
            <span className="trust-badge-sub">Agri-ERP Africa</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">&#9733;</span>
            <span className="trust-badge-name">GetApp</span>
            <span className="trust-badge-sub">Recommandé</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
