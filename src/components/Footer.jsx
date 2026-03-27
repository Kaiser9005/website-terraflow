import { useState } from "react";
import { WHATSAPP_BASE } from "../constants";

export default function Footer({ navItems, scrollTo }) {
  const [legalOpen, setLegalOpen] = useState(null); // null | "mentions" | "privacy"

  const toggleLegal = (section) => (e) => {
    e.preventDefault();
    setLegalOpen(legalOpen === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="nav-logo" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
            <img
              src="/logo-kaltiv.svg"
              alt="KALTIV"
              className="nav-logo-img footer-logo-tf"
              width="48"
              height="48"
            />
            <span>K</span>ALTIV
          </a>
          <p>
            The Agribusiness Command Platform. 27+ modules, predictive AI,
            agronomic chatbot, multi-regional compliance. From field to balance sheet.
          </p>
          <div className="footer-payments">
            <span className="footer-payment">Visa</span>
            <span className="footer-payment">Mastercard</span>
            <span className="footer-payment">Mobile Money</span>
            <span className="footer-payment">Virement</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Plateforme</h4>
          {navItems.map((item) => (
            <a key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</a>
          ))}
          <a onClick={() => scrollTo("faq")}>FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Modules</h4>
          <a onClick={() => scrollTo("modules")}>RH & Paie</a>
          <a onClick={() => scrollTo("modules")}>Agriculture</a>
          <a onClick={() => scrollTo("modules")}>Comptabilité</a>
          <a onClick={() => scrollTo("modules")}>IA & Analytics</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:contact@kaltiv.com">contact@kaltiv.com</a>
          <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://modules-rh-authentification-expert.vercel.app/login" target="_blank" rel="noopener noreferrer" style={{ marginTop: "0.5rem", color: "var(--accent)" }}>
            Se connecter
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>&copy; {new Date().getFullYear()} KALTIV. All rights reserved.</span>
          <div className="footer-legal">
            <a href="/mentions-legales" onClick={toggleLegal("mentions")} aria-expanded={legalOpen === "mentions"}>Mentions légales</a>
            <a href="/confidentialite" onClick={toggleLegal("privacy")} aria-expanded={legalOpen === "privacy"}>Politique de confidentialité</a>
          </div>
        </div>
        <div className="footer-certs">
          <span className="footer-cert">OHADA</span>
          <span className="footer-cert">Multi-Pays</span>
          <span className="footer-cert">CEMAC</span>
          <span className="footer-cert footer-cert-pending" title="Certification en cours">ISO 9001 *</span>
          <span className="footer-cert footer-cert-pending" title="Certification en cours">HACCP *</span>
        </div>
      </div>

      {legalOpen === "mentions" && (
        <div className="footer-legal-content">
          <div className="footer-legal-inner">
            <button className="footer-legal-close" onClick={() => setLegalOpen(null)} aria-label="Fermer">&times;</button>
            <h4>Mentions légales</h4>
            <p><strong>Editeur :</strong> KALTIV — The Agribusiness Command Platform.</p>
            <p><strong>Contact :</strong> contact@kaltiv.com | +237 99 311 413</p>
            <p><strong>Hébergement :</strong> Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
            <p><strong>Propriete intellectuelle :</strong> L'ensemble du contenu de ce site (textes, images, logos, logiciels) est la propriete exclusive de KALTIV ou de ses partenaires. Toute reproduction, meme partielle, est interdite sans autorisation prealable.</p>
            <p><strong>Responsabilite :</strong> KALTIV s'efforce de fournir des informations exactes et a jour. Toutefois, KALTIV ne saurait etre tenu responsable des erreurs, omissions ou resultats obtenus suite a l'utilisation de ces informations.</p>
          </div>
        </div>
      )}

      {legalOpen === "privacy" && (
        <div className="footer-legal-content">
          <div className="footer-legal-inner">
            <button className="footer-legal-close" onClick={() => setLegalOpen(null)} aria-label="Fermer">&times;</button>
            <h4>Politique de confidentialité</h4>
            <p><strong>Données collectées :</strong> Lors de l'utilisation du formulaire de contact ou de demande de démo, nous collectons votre nom, adresse e-mail, nom d'entreprise, et les informations que vous fournissez volontairement.</p>
            <p><strong>Utilisation des données :</strong> Vos données sont utilisées exclusivement pour répondre à vos demandes, vous fournir nos services et améliorer votre expérience utilisateur.</p>
            <p><strong>Analyse d'audience :</strong> Ce site utilise Plausible Analytics, une solution respectueuse de la vie privée qui ne dépose aucun cookie et ne collecte aucune donnée personnelle.</p>
            <p><strong>Stockage :</strong> Les données sont stockées de manière sécurisée sur Supabase (chiffrement AES-256 au repos, connexions TLS).</p>
            <p><strong>Vos droits :</strong> Conformement aux reglementations en vigueur, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees personnelles. Pour exercer ces droits, contactez-nous a contact@kaltiv.com.</p>
            <p><strong>Durée de conservation :</strong> Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, et au maximum 3 ans après votre dernier contact.</p>
          </div>
        </div>
      )}
    </footer>
  );
}
