import { useState } from "react";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { WHATSAPP_BASE } from "../../constants";

const FORMSPREE_URL = "https://formspree.io/f/xeojkvbg";
const WHATSAPP_URL = `${WHATSAPP_BASE}?text=Bonjour%2C%20je%20souhaite%20une%20d%C3%A9mo%20de%20KALTIV.`;

export default function Demo() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", hectares: "", phone: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, company } = formData;
    if (!name || !email || !company) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          _replyto: formData.email,
          email: formData.email,
          company: formData.company,
          hectares: formData.hectares || "Non renseigné",
          phone: formData.phone || "Non renseigné",
          message: formData.message || "Je souhaite une demonstration de KALTIV.",
          _subject: `[KALTIV] Demande de demo — ${formData.company}`,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", company: "", hectares: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const onChange = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const buttonText = {
    idle: "Demander ma Démo Gratuite",
    sending: "Envoi en cours...",
    sent: "Demande envoyée !",
    error: "Erreur — Réessayer",
  };

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
          <form className="demo-form" onSubmit={handleSubmit} noValidate>
            <fieldset disabled={status === "sending"}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="demo-name">Votre nom *</label>
                  <input id="demo-name" type="text" placeholder="Jean Paul Dupont" value={formData.name} onChange={onChange("name")} required aria-required="true" />
                </div>
                <div className="form-field">
                  <label htmlFor="demo-email">Email professionnel *</label>
                  <input id="demo-email" type="email" placeholder="jean@entreprise.com" value={formData.email} onChange={onChange("email")} required aria-required="true" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="demo-company">Entreprise / Exploitation *</label>
                  <input id="demo-company" type="text" placeholder="Nom de votre exploitation" value={formData.company} onChange={onChange("company")} required aria-required="true" />
                </div>
                <div className="form-field">
                  <label htmlFor="demo-hectares">Superficie (hectares)</label>
                  <input id="demo-hectares" type="text" placeholder="ex: 200" value={formData.hectares} onChange={onChange("hectares")} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="demo-phone">Téléphone</label>
                <input id="demo-phone" type="tel" placeholder="+237 6XX XXX XXX" value={formData.phone} onChange={onChange("phone")} />
              </div>
              <div className="form-field">
                <label htmlFor="demo-message">Message</label>
                <textarea id="demo-message" placeholder="Dites-nous en plus sur vos besoins..." value={formData.message} onChange={onChange("message")} />
              </div>
            </fieldset>
            <MagneticButton className={`btn btn-primary btn-full ${status === "sent" ? "btn-success" : ""}`} as="button" type="submit" disabled={status === "sending"}>
              {buttonText[status]}
            </MagneticButton>
            <p className="demo-whatsapp-alt">
              Préférez WhatsApp ? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Écrivez-nous directement</a>
            </p>
            <div className="demo-self-service">
              <p className="demo-self-service-title">Explorer la plateforme maintenant</p>
              <p className="demo-self-service-desc">
                Accédez à l'environnement de démonstration avec des données réelles d'exploitation agricole.
              </p>
              <a
                href="https://modules-rh-authentification-expert.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full"
                style={{ marginTop: "0.75rem" }}
              >
                Accéder à la démo en ligne
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
