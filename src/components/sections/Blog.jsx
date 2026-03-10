import Reveal from "../ui/Reveal";

const articles = [
  {
    title: "Pourquoi 72% des exploitations africaines n'ont pas d'ERP",
    category: "Industrie",
    readTime: "5 min",
    excerpt: "Les ERP occidentaux ignorent les réalités du terrain : pas d'OHADA, pas de hors-ligne, pas de paie locale. Analyse des freins et solutions.",
    tag: "Analyse",
  },
  {
    title: "Conformité OHADA : automatiser la clôture en 1 jour",
    category: "Comptabilité",
    readTime: "4 min",
    excerpt: "Le plan comptable SYSCOHADA automatisé permet de passer de 3 semaines à 1 jour de clôture. Voici comment.",
    tag: "Guide",
  },
  {
    title: "IA et agriculture : prédire les rendements avec CatBoost",
    category: "Technologie",
    readTime: "6 min",
    excerpt: "Comment nos modèles CatBoost atteignent R²=0.79 sur la prédiction de rendements palmier avec les données Open-Meteo.",
    tag: "Tech",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section section-creme">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Ressources</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Dernières <em>publications</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            Analyses, guides pratiques et retours d'expérience pour l'agriculture africaine.
          </p>
        </Reveal>
      </div>

      <div className="blog-grid">
        {articles.map((a, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <article className="blog-card">
              <div className="blog-card-top">
                <span className="blog-tag">{a.tag}</span>
                <span className="blog-read-time">{a.readTime}</span>
              </div>
              <h3 className="blog-card-title">{a.title}</h3>
              <p className="blog-card-excerpt">{a.excerpt}</p>
              <span className="blog-card-category">{a.category}</span>
            </article>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
