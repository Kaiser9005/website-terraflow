import LangToggle from "./ui/LangToggle";

export default function Navigation({ scrollY, navItems, activeSection, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <>
      <nav className={`nav ${scrollY > 50 ? "scrolled" : ""}`} aria-label="Navigation principale">
        <a className="nav-logo" onClick={() => scrollTo("hero")}>
          <img
            src="/logo-terraflow.svg"
            alt="TerraFlow — Accueil"
            className="nav-logo-img"
            width="48"
            height="48"
          />
          Terra<span>Flow</span>
        </a>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={activeSection === item.id ? "active" : ""}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <a
            className="nav-signin"
            href="https://modules-rh-authentification-expert.vercel.app/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Se connecter
          </a>
          <a
            className="btn btn-outline btn-nav"
            href="https://modules-rh-authentification-expert.vercel.app/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Essai Gratuit
          </a>
          <a className="btn btn-primary btn-nav" onClick={() => scrollTo("demo")}>
            Démo Guidée
          </a>
          <LangToggle />
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}} />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.id} onClick={() => scrollTo(item.id)}>
            {item.label}
          </a>
        ))}
        <a className="btn btn-primary" onClick={() => scrollTo("demo")}>
          Démo Gratuite
        </a>
      </div>
    </>
  );
}
