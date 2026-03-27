import { useState } from "react";
import Reveal from "../ui/Reveal";

const faqs = [
  {
    q: "Où sont hébergées mes données ?",
    a: "Vos données sont stockées sur l'infrastructure Supabase (certifiée SOC 2 Type II), avec résidence au choix en Europe (Francfort) ou en Afrique. Chiffrement AES-256 au repos et TLS 1.3 en transit.",
  },
  {
    q: "KALTIV fonctionne-t-il sans Internet ?",
    a: "Oui. Le mode hors-ligne (PWA + ONNX) permet la saisie terrain, les predictions IA locales, et la synchronisation automatique au retour de la connexion. Ideal pour les zones rurales.",
  },
  {
    q: "Combien de temps pour migrer depuis Excel ?",
    a: "En moyenne 2 semaines. Notre équipe assiste l'import de vos fichiers Excel, cahiers de terrain et données existantes. Le processus est guidé et validé à chaque étape.",
  },
  {
    q: "Est-ce conforme OHADA pour mon pays ?",
    a: "KALTIV supporte les pays OHADA (CEMAC/UEMOA) et anglophones avec plan comptable SYSCOHADA, cotisations sociales adaptees par pays (CNPS, CNSS, INSS, CSS...) et multi-devises XAF/XOF/GHS/KES/EUR/USD.",
  },
  {
    q: "Que se passe-t-il si j'annule mon abonnement ?",
    a: "Vos données restent accessibles en lecture pendant 90 jours après annulation. Vous pouvez exporter l'intégralité en CSV/Excel à tout moment. Aucun frais d'annulation.",
  },
  {
    q: "Comment est calcule le prix ?",
    a: "Le tarif depend du nombre d'utilisateurs et de modules actives. Le plan Foundation commence a $115/mois (75 000 FCFA). Essai gratuit de 30 a 60 jours selon le plan, sans engagement.",
  },
  {
    q: "Puis-je garder mon logiciel comptable actuel ?",
    a: "KALTIV peut fonctionner en complement via API et export automatique. Cependant, le module OHADA integre remplace avantageusement la plupart des logiciels comptables du marche.",
  },
  {
    q: "Y a-t-il une application mobile ?",
    a: "KALTIV est une PWA (Progressive Web App) installable sur tout smartphone Android ou iOS. Pas besoin de telecharger depuis un store — accedez directement depuis votre navigateur.",
  },
  {
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Virement bancaire, carte bancaire (Visa/Mastercard), et Mobile Money (Orange Money, MTN MoMo, Wave). Facturation mensuelle ou annuelle (2 mois offerts).",
  },
  {
    q: "Comment fonctionne le support ?",
    a: "Support WhatsApp et email inclus pour tous les plans. Le plan Growth ajoute le support prioritaire (< 8h). Command : < 4h + telephone. Enterprise : SLA garanti avec manager dedie.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Questions Fréquentes</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Vos <em>questions</em>, nos réponses
          </h2>
        </Reveal>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className={`faq-item ${openIndex === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <span>{faq.q}</span>
                <span className="faq-chevron">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
