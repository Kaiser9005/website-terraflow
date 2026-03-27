import { useState, useMemo, useCallback } from "react";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { WHATSAPP_BASE } from "../../constants";
import { useLang } from "../ui/LangToggle";

const FORMSPREE_URL = "https://formspree.io/f/xeojkvbg";
const WHATSAPP_URL = `${WHATSAPP_BASE}?text=Bonjour%2C%20je%20souhaite%20une%20d%C3%A9mo%20de%20KALTIV.`;

export default function Demo() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", hectares: "", phone: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const { t } = useLang();

  const handleSubmit = useCallback(async (e) => {
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
  }, [formData]);

  const onChange = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const buttonText = useMemo(() => ({
    idle: t("demo.cta"),
    sending: t("demo.sending"),
    sent: t("demo.sent"),
    error: t("demo.error"),
  }), [t]);

  const benefits = useMemo(() => {
    const raw = t("demo.benefits");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const titleRaw = t("demo.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="demo" className="section section-vert">
      <div className="demo-grid">
        <div className="demo-info">
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--accent)" }}>{t("demo.eyebrow")}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
              {titleParts[0]}<em style={{ color: "var(--accent)" }}>{titleParts[1]}</em>{titleParts[2]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)" }}>
              {t("demo.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="demo-benefits">
              {benefits.map((b, i) => (
                <div key={i} className="demo-benefit">
                  <span className="demo-check">&#10003;</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <form className="demo-form" onSubmit={handleSubmit} noValidate>
            <fieldset disabled={status === "sending"}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="demo-name">{t("demo.nameLabel")}</label>
                  <input id="demo-name" type="text" placeholder="Jean Paul Dupont" value={formData.name} onChange={onChange("name")} required aria-required="true" />
                </div>
                <div className="form-field">
                  <label htmlFor="demo-email">{t("demo.emailLabel")}</label>
                  <input id="demo-email" type="email" placeholder="jean@entreprise.com" value={formData.email} onChange={onChange("email")} required aria-required="true" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="demo-company">{t("demo.companyLabel")}</label>
                  <input id="demo-company" type="text" placeholder="Nom de votre exploitation" value={formData.company} onChange={onChange("company")} required aria-required="true" />
                </div>
                <div className="form-field">
                  <label htmlFor="demo-hectares">{t("demo.hectaresLabel")}</label>
                  <input id="demo-hectares" type="text" placeholder="ex: 200" value={formData.hectares} onChange={onChange("hectares")} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="demo-phone">{t("demo.phoneLabel")}</label>
                <input id="demo-phone" type="tel" placeholder="+237 6XX XXX XXX" value={formData.phone} onChange={onChange("phone")} />
              </div>
              <div className="form-field">
                <label htmlFor="demo-message">{t("demo.messageLabel")}</label>
                <textarea id="demo-message" placeholder="Dites-nous en plus sur vos besoins..." value={formData.message} onChange={onChange("message")} />
              </div>
            </fieldset>
            <MagneticButton className={`btn btn-primary btn-full ${status === "sent" ? "btn-success" : ""}`} as="button" type="submit" disabled={status === "sending"}>
              {buttonText[status]}
            </MagneticButton>
            <p className="demo-whatsapp-alt">
              {t("demo.whatsapp")} <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t("demo.whatsappLink")}</a>
            </p>
            <div className="demo-self-service">
              <p className="demo-self-service-title">{t("demo.selfService")}</p>
              <p className="demo-self-service-desc">
                {t("demo.selfServiceDesc")}
              </p>
              <a
                href="https://modules-rh-authentification-expert.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full"
                style={{ marginTop: "0.75rem" }}
              >
                {t("demo.selfServiceCta")}
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
