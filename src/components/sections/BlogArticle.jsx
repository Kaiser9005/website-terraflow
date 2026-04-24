import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useLang } from "../ui/LangToggle";

/**
 * BlogArticle — full-screen overlay for reading a blog article.
 * Slides up with GSAP, dark background, clean typography.
 * Supports markdown-like bold (**text**) and tables (|---|---|).
 */
export default function BlogArticle({ article, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    if (!article) return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    document.body.style.overflow = "hidden";

    gsap.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(content,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    gsap.to(content, { y: 40, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        onClose();
      },
    });
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!article) return null;

  const scrollToDemo = () => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById("demo");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div
      ref={overlayRef}
      className="blog-article-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <div ref={contentRef} className="blog-article-container">
        {/* Header */}
        <div className="blog-article-header" style={{ "--hero-color": article.heroColor }}>
          <button className="blog-article-close" onClick={handleClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="blog-article-meta">
            <span className="blog-article-tag">{article.tag}</span>
            <span className="blog-article-date">{article.date}</span>
            <span className="blog-article-read">{article.readTime}</span>
          </div>
          <h1 className="blog-article-title">{article.title}</h1>
          <div className="blog-article-author">
            <div className="blog-article-author-avatar">K</div>
            <div>
              <div className="blog-article-author-name">{article.author}</div>
              <div className="blog-article-author-role">{article.category}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="blog-article-body">
          {article.sections.map((section, i) => (
            <div key={i} className="blog-article-section">
              <h2>{section.heading}</h2>
              <ArticleContent text={section.content} />
            </div>
          ))}

          {/* CTA */}
          <div className="blog-article-cta">
            <p>{t("blog.articleCta")}</p>
            <button className="btn btn-primary" onClick={scrollToDemo}>
              {t("blog.articleCtaButton")} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders markdown-like content:
 * - **bold** text
 * - | table | rows |
 * - Line breaks as paragraphs
 * - Bullet lists (- item)
 */
function ArticleContent({ text }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableRows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().split("|").filter(Boolean).map(c => c.trim());
        tableRows.push(cells);
        i++;
      }
      // Filter separator rows (|---|---|)
      const filtered = tableRows.filter(row => !row.every(c => /^-+$/.test(c)));
      if (filtered.length > 0) {
        elements.push(
          <div key={`table-${i}`} className="blog-article-table-wrap">
            <table className="blog-article-table">
              <thead>
                <tr>{filtered[0].map((cell, j) => <th key={j}>{cell}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.slice(1).map((row, ri) => (
                  <tr key={ri}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="blog-article-list">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // Empty line = skip
    if (line === "") { i++; continue; }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: parseBold(line) }} />
    );
    i++;
  }

  return <>{elements}</>;
}

function parseBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
