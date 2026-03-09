import { useRef, useState } from "react";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

export default function Demo() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", hectares: "", phone: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, company } = formData;
    if (!name || !email || !company) return;

    const subject = encodeURIComponent(`[TerraFlow] Demande de demo — ${company}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company}\nSuperficie: ${formData.hectares || "Non renseignee"}\nTel: ${formData.phone || "Non renseigne"}\n\n${formData.message || "Je souhaite une demonstration de TerraFlow."}`
    );
    window.open(`mailto:contact@terraflow.cm?subject=${subject}&body=${body}`, "_self");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const onChange = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="demo" className="section section-vert">
      <div className="demo-grid">
        <div className="demo-info">
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Démo Gratuite</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
              Transformez votre exploitation en <em style={{ color: "var(--accent)" }}>30 minutes</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)" }}>
              Un expert vous présente la plateforme avec vos données. 60 jours d'essai gratuit, aucun engagement, aucune carte bancaire.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="demo-benefits">
              <div className="demo-benefit">
                <span className="demo-check">&#10003;</span>
                <span>Démo personnalisée en 30 min</span>
              </div>
              <div className="demo-benefit">
                <span className="demo-check">&#10003;</span>
                <span>60 jours d'essai gratuit</span>
              </div>
              <div className="demo-benefit">
                <span className="demo-check">&#10003;</span>
                <span>Migration de données assistée</span>
              </div>
              <div className="demo-benefit">
                <span className="demo-check">&#10003;</span>
                <span>Formation équipe incluse</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <form className="demo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="Votre nom *" value={formData.name} onChange={onChange("name")} required />
              <input type="email" placeholder="Email professionnel *" value={formData.email} onChange={onChange("email")} required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Entreprise / Exploitation *" value={formData.company} onChange={onChange("company")} required />
              <input type="text" placeholder="Superficie (hectares)" value={formData.hectares} onChange={onChange("hectares")} />
            </div>
            <input type="tel" placeholder="Téléphone" value={formData.phone} onChange={onChange("phone")} />
            <textarea placeholder="Dites-nous en plus sur vos besoins..." value={formData.message} onChange={onChange("message")} />
            <MagneticButton className="btn btn-primary btn-full" as="button" type="submit">
              {sent ? "Demande envoyée !" : "Demander ma Démo Gratuite"}
            </MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
