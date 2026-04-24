import { useMemo, useState, useCallback } from "react";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";
import BlogArticle from "./BlogArticle";
import articlesData from "../../data/articles";

export default function Blog() {
  const { t, lang } = useLang();
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = useMemo(() => {
    return articlesData[lang] || articlesData.fr;
  }, [lang]);

  const handleOpenArticle = useCallback((article) => {
    setActiveArticle(article);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setActiveArticle(null);
  }, []);

  const titleRaw = t("blog.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="blog" className="section section-creme">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">{t("blog.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("blog.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="blog-grid">
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.1}>
            <article
              className="blog-card blog-card-interactive"
              onClick={() => handleOpenArticle(a)}
              role="button"
              tabIndex={0}
              aria-label={`${t("blog.readMore")}: ${a.title}`}
              onKeyDown={(e) => { if (e.key === "Enter") handleOpenArticle(a); }}
            >
              <div className="blog-card-top">
                <span className="blog-tag">{a.tag}</span>
                <span className="blog-read-time">{a.readTime}</span>
              </div>
              <h3 className="blog-card-title">{a.title}</h3>
              <p className="blog-card-excerpt">{a.excerpt}</p>
              <div className="blog-card-bottom">
                <span className="blog-card-category">{a.category}</span>
                <span className="blog-card-cta">{t("blog.readMore")} &rarr;</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <BlogArticle article={activeArticle} onClose={handleCloseArticle} />
    </section>
  );
}
