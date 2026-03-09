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
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          {navItems.map((item) => (
            <a key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</a>
          ))}
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
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} TerraFlow. Tous droits reserves.</span>
        <div className="footer-certs">
          <span className="footer-cert">OHADA</span>
          <span className="footer-cert">CNPS</span>
          <span className="footer-cert footer-cert-pending">ISO 9001</span>
          <span className="footer-cert footer-cert-pending">HACCP</span>
        </div>
      </div>
    </footer>
  );
}
