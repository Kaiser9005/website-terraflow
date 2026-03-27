import { useMemo } from "react";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

const stepIcons = ["🔍", "📦", "🎓", "🚀"];
const channelIcons = ["💬", "📞", "📧", "🎥"];

export default function Onboarding() {
  const { t } = useLang();

  const steps = useMemo(() => {
    const raw = t("onboarding.steps");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const channels = useMemo(() => {
    const raw = t("onboarding.channels");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const titleRaw = t("onboarding.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="onboarding" className="section section-dark">
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>{t("onboarding.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)" }}>
            {t("onboarding.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="onboarding-timeline">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="onboarding-step">
              <div className="onboarding-step-icon">{stepIcons[i]}</div>
              <div className="onboarding-step-week">{s.week}</div>
              <h3 className="onboarding-step-title">{s.title}</h3>
              <p className="onboarding-step-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="onboarding-channels">
          <h3 style={{ textAlign: "center", color: "white", fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            {t("onboarding.channelsTitle")}
          </h3>
          <div className="onboarding-channels-row">
            {channels.map((label, i) => (
              <div key={i} className="onboarding-channel">
                <span className="onboarding-channel-icon">{channelIcons[i]}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
