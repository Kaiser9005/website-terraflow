import { useState } from "react";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

export default function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = t("faq.items");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">{t("faq.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {(() => {
              const raw = t("faq.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
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
