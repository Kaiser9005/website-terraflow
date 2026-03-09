import { getLenis } from "./ui/SmoothScroll";

export default function Navigation({ scrollY, navItems, activeSection, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <>
      <nav className={`nav ${scrollY > 50 ? "scrolled" : ""}`} aria-label="Navigation principale">
        <a className="nav-logo" onClick={() => scrollTo("hero")}>
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
        <a className="btn btn-primary btn-nav" onClick={() => scrollTo("demo")}>
          Démo Gratuite
        </a>
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
