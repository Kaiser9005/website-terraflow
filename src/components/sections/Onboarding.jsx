import Reveal from "../ui/Reveal";

const steps = [
  {
    week: "Semaine 1",
    title: "Audit & Configuration",
    desc: "Analyse de vos processus existants, configuration des modules adaptés à votre exploitation.",
    icon: "🔍",
  },
  {
    week: "Semaine 2",
    title: "Migration des Données",
    desc: "Import assisté de vos données depuis Excel, cahiers de terrain, ou autre système.",
    icon: "📦",
  },
  {
    week: "Semaine 3",
    title: "Formation Équipe",
    desc: "Sessions de formation sur site ou à distance pour chaque profil utilisateur.",
    icon: "🎓",
  },
  {
    week: "Semaine 4",
    title: "Go-Live & Support",
    desc: "Lancement en production avec accompagnement quotidien pendant 30 jours.",
    icon: "🚀",
  },
];

const channels = [
  { icon: "💬", label: "WhatsApp & Chat" },
  { icon: "📞", label: "Téléphone" },
  { icon: "📧", label: "Email" },
  { icon: "🎥", label: "Visioconférence" },
];

export default function Onboarding() {
  return (
    <section id="onboarding" className="section section-dark">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>Accompagnement</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            Opérationnel en <em>4 semaines</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)" }}>
            Chaque client bénéficie d'un parcours d'intégration structuré. Pas de surprise, pas de latence.
          </p>
        </Reveal>
      </div>

      <div className="onboarding-timeline">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="onboarding-step">
              <div className="onboarding-step-icon">{s.icon}</div>
              <div className="onboarding-step-week">{s.week}</div>
              <h3 className="onboarding-step-title">{s.title}</h3>
              <p className="onboarding-step-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="onboarding-channels">
          <h3 style={{ textAlign: "center", color: "white", fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            Canaux de support
          </h3>
          <div className="onboarding-channels-row">
            {channels.map((c, i) => (
              <div key={i} className="onboarding-channel">
                <span className="onboarding-channel-icon">{c.icon}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
