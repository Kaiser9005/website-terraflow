export default function Footer({ navItems, scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="nav-logo" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
            Terra<span>Flow</span>
          </a>
          <p>
            L'ERP agricole intelligent conçu pour l'Afrique. 27 modules intégrés,
            IA prédictive, conformité OHADA. De la parcelle à l'export.
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
          <a href="mailto:contact@terraflow.cm">contact@terraflow.cm</a>
          <a href="https://wa.me/23799311413" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://modules-rh-authentification-expert.vercel.app/login" target="_blank" rel="noopener noreferrer" style={{ marginTop: "0.5rem", color: "var(--accent)" }}>
            Se connecter
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>&copy; {new Date().getFullYear()} TerraFlow. Tous droits réservés.</span>
          <div className="footer-legal">
            <a href="/mentions-legales" onClick={(e) => { e.preventDefault(); alert("Page en cours de rédaction."); }}>Mentions légales</a>
            <a href="/confidentialite" onClick={(e) => { e.preventDefault(); alert("Page en cours de rédaction."); }}>Politique de confidentialité</a>
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
    </footer>
  );
}
