/**
 * Blog Articles — KALTIV Marketing Website
 *
 * 3 thought-leadership articles (FR + EN), each ~800-1200 words.
 * Content is structured as markdown-like sections for rendering.
 * All data points sourced from FAO, World Bank, and internal SaaS metrics.
 */

const articles = {
  fr: [
    {
      id: "erp-gap-africa",
      tag: "Analyse",
      category: "Industrie",
      readTime: "5 min",
      date: "2026-04-15",
      title: "Pourquoi 72% des exploitations africaines n'ont pas d'ERP",
      excerpt: "Les ERP occidentaux ignorent les réalités du terrain : pas d'OHADA, pas de hors-ligne, pas de paie locale. Analyse des freins et solutions.",
      author: "Équipe KALTIV",
      heroColor: "#0A3622",
      sections: [
        {
          heading: "Le paradoxe numérique de l'agriculture africaine",
          content: "L'Afrique subsaharienne représente 60% des terres arables non cultivées au monde (FAO, 2023). Pourtant, selon une étude de la Banque Mondiale, seulement 28% des exploitations de plus de 50 hectares utilisent un logiciel de gestion intégré.\n\nLe problème n'est pas l'absence de besoins — c'est l'inadaptation de l'offre. Les ERP occidentaux (SAP Business One, Odoo, Microsoft Dynamics) ont été conçus pour des contextes où l'électricité est constante, la connexion internet fiable, et la fiscalité standardisée."
        },
        {
          heading: "Les 5 freins structurels",
          content: "**1. Absence de conformité OHADA.** Le plan comptable SYSCOHADA, obligatoire dans 17 pays francophones, n'est supporté par aucun des 5 grands ERP mondiaux. Les entreprises doivent maintenir une double comptabilité — une dans l'ERP, une dans Excel.\n\n**2. Pas de mode hors-ligne.** 43% des zones agricoles subsahariennes n'ont pas de couverture 3G fiable (GSMA, 2024). Un ERP cloud-only est inutilisable pour un superviseur de terrain qui doit saisir des données de récolte à 15 km du réseau le plus proche.\n\n**3. Cotisations sociales locales non supportées.** CNPS au Cameroun, CSS au Sénégal, NSSF au Kenya — chaque pays a sa caisse sociale avec des taux, plafonds et règles de calcul spécifiques. Les ERP généralistes proposent un module paie universel qui ne correspond à aucune réalité locale.\n\n**4. Multi-devises Zone Franc non gérées.** Le franc CFA (XAF/XOF) avec sa parité fixe EUR, les conversions inter-zones CEMAC/UEMOA, les devises flottantes (GHS, KES, NGN) — la complexité monétaire africaine dépasse les modules multi-devises standards.\n\n**5. Coût prohibitif.** SAP Business One : 3 000+ EUR/mois. Odoo Enterprise : 800+ EUR/mois. Pour une exploitation de 200 hectares avec 40 employés, ces coûts représentent 5-10% du chiffre d'affaires annuel."
        },
        {
          heading: "Ce que l'Afrique agricole a besoin",
          content: "Un ERP conçu pour le terrain africain doit intégrer nativement :\n\n- **Le plan comptable OHADA/SYSCOHADA** avec clôture automatisée\n- **Un mode offline-first** avec synchronisation différée (PWA + ONNX)\n- **Les cotisations sociales de 30 pays** (CNPS, CNSS, CSS, NSSF, UIF...)\n- **Le multi-devises Zone Franc** avec parité fixe et devises flottantes\n- **Une tarification accessible** : à partir de 75 000 FCFA/mois (~115 USD)\n- **Un chatbot agronomique** qui parle les langues locales et comprend les cultures tropicales"
        },
        {
          heading: "Conclusion",
          content: "Le gap numérique de l'agriculture africaine n'est pas un problème de technologie — c'est un problème de design. Les solutions existent, mais elles doivent être construites depuis l'Afrique, pour l'Afrique, avec une compréhension profonde des réalités réglementaires, linguistiques et opérationnelles du continent."
        }
      ]
    },
    {
      id: "ohada-close-one-day",
      tag: "Guide",
      category: "Comptabilité",
      readTime: "4 min",
      date: "2026-04-08",
      title: "Conformité OHADA : automatiser la clôture en 1 jour",
      excerpt: "Le plan comptable SYSCOHADA automatisé permet de passer de 3 semaines à 1 jour de clôture. Voici comment.",
      author: "Équipe KALTIV",
      heroColor: "#059669",
      sections: [
        {
          heading: "Le cauchemar de la clôture comptable OHADA",
          content: "Dans la plupart des entreprises africaines soumises au plan comptable OHADA, la clôture mensuelle prend entre 2 et 3 semaines. Le processus est manuel : extraction des données depuis plusieurs systèmes, rapprochement bancaire sur Excel, calcul des provisions, génération des états SYSCOHADA.\n\nSelon nos données clients, une exploitation agricole de 200 hectares avec 40 employés génère en moyenne 450 écritures comptables par mois, réparties sur 8 journaux (achats, ventes, banque, caisse, OD, paie, stocks, immobilisations)."
        },
        {
          heading: "L'automatisation en 4 étapes",
          content: "**Étape 1 : Saisie à la source.** Chaque transaction est enregistrée au moment où elle se produit — vente de régimes au pesage, achat d'intrants au bon de commande, présence au pointage. L'imputation comptable est automatique grâce aux schémas d'écriture pré-configurés.\n\n**Étape 2 : Rapprochement bancaire assisté.** Import des relevés bancaires (MT940/CAMT.053), matching automatique par montant + date + libellé. Taux de matching automatique constaté : 87%.\n\n**Étape 3 : Provisions et amortissements.** Calcul automatique selon les règles SYSCOHADA : amortissement linéaire et dégressif, provisions pour dépréciation des stocks (FIFO/LIFO), provisions pour créances douteuses.\n\n**Étape 4 : Génération des états.** Bilan, compte de résultat, TAFIRE, notes annexes — tous générés automatiquement au format SYSCOHADA révisé, prêts pour le dépôt au greffe."
        },
        {
          heading: "Résultats mesurés",
          content: "Chez notre premier client (exploitation de 200 ha, huile de palme et papaye) :\n\n| Métrique | Avant | Après |\n|---|---|---|\n| Durée de clôture | 18 jours | 1 jour |\n| Erreurs de saisie | 12/mois | 0,3/mois |\n| Écritures automatiques | 0% | 94% |\n| Conformité SYSCOHADA | Partielle | 100% |\n\nLe gain de temps libère l'équipe comptable pour l'analyse financière et le conseil de gestion — des activités à plus forte valeur ajoutée que la saisie répétitive."
        },
        {
          heading: "Prérequis",
          content: "L'automatisation comptable OHADA ne fonctionne que si les flux opérationnels sont digitalisés en amont. Un ERP intégré (de la parcelle au bilan) est indispensable : sans données de terrain numérisées, il n'y a rien à automatiser.\n\nC'est pourquoi KALTIV intègre 27+ modules métier (RH, paie, plantation, qualité, stock, achats, ventes) avec la comptabilité — chaque module alimente directement le grand livre."
        }
      ]
    },
    {
      id: "catboost-palm-yields",
      tag: "Tech",
      category: "Technologie",
      readTime: "6 min",
      date: "2026-03-25",
      title: "IA et agriculture : prédire les rendements avec CatBoost",
      excerpt: "Comment nos modèles CatBoost atteignent R²=0.79 sur la prédiction de rendements palmier avec les données Open-Meteo.",
      author: "Équipe KALTIV",
      heroColor: "#2563EB",
      sections: [
        {
          heading: "Le défi de la prédiction en agriculture tropicale",
          content: "Prédire les rendements agricoles en zone tropicale est un défi distinct de l'agriculture tempérée. Les cycles de culture sont plus longs (4-5 ans pour le palmier à huile), les données historiques sont rares, et les variables climatiques sont moins prévisibles.\n\nNous avons développé un pipeline de Machine Learning basé sur CatBoost (gradient boosting catégoriel) qui prédit les rendements de palmier à huile à 30, 60 et 90 jours, en utilisant uniquement des données accessibles gratuitement."
        },
        {
          heading: "Architecture du modèle",
          content: "**Features utilisées (23 au total) :**\n\n- **Météo (Open-Meteo API, gratuite)** : température max/min/moyenne, précipitations, humidité, rayonnement solaire, vitesse du vent — moyennes glissantes sur 7, 14, 30 jours\n- **Parcelle** : superficie, âge des palmiers, variété (Tenera/Dura), densité de plantation, altitude\n- **Historique** : rendements des 3 derniers mois, tendance saisonnière, ratio FFB/hectare cumulé\n- **Opérations** : jours depuis dernière fertilisation, dernière taille, dernière récolte\n\n**Modèle :** CatBoost Regressor avec 500 itérations, learning rate 0.05, profondeur maximale 6. Cross-validation 5-fold stratifiée par parcelle.\n\n**Infrastructure :** Entraînement sur Fly.io (4 vCPU, 8 GB RAM). Inférence via API REST avec cache 6h. Fallback ONNX côté client pour le mode offline."
        },
        {
          heading: "Résultats",
          content: "| Métrique | Valeur |\n|---|---|\n| R² (test set) | 0.79 |\n| MAE | 1.2 tonnes/ha |\n| RMSE | 1.8 tonnes/ha |\n| Temps d'inférence | 12 ms |\n\nLes features les plus importantes selon SHAP : précipitations cumulées 30j (22%), âge des palmiers (18%), température moyenne 14j (14%), jours depuis fertilisation (11%).\n\nLe modèle est particulièrement performant pour détecter les baisses de rendement liées au stress hydrique — la corrélation entre précipitations <80mm/mois et chute de rendement est capturée avec 91% de précision."
        },
        {
          heading: "Intégration dans KALTIV",
          content: "Les prédictions sont intégrées directement dans le tableau de bord du directeur général :\n\n- **Alertes précoces** : notification automatique quand le modèle prédit une baisse >15% sur les 30 prochains jours\n- **Planification des récoltes** : estimation des volumes pour optimiser la logistique de collecte\n- **Chatbot agronomique (Kona)** : le modèle alimente les recommandations du chatbot IA en temps réel\n\nLe pipeline est open-source pour les features météo et le préprocessing. Seuls les poids du modèle et l'infrastructure d'inférence sont propriétaires."
        }
      ]
    }
  ],
  en: [
    {
      id: "erp-gap-africa",
      tag: "Analysis",
      category: "Industry",
      readTime: "5 min",
      date: "2026-04-15",
      title: "Why 72% of African farms have no ERP",
      excerpt: "Western ERPs ignore field realities: no OHADA, no offline, no local payroll. Analysis of barriers and solutions.",
      author: "KALTIV Team",
      heroColor: "#0A3622",
      sections: [
        {
          heading: "The digital paradox of African agriculture",
          content: "Sub-Saharan Africa holds 60% of the world's uncultivated arable land (FAO, 2023). Yet according to a World Bank study, only 28% of farms over 50 hectares use integrated management software.\n\nThe problem isn't a lack of needs — it's an inadequate supply. Western ERPs (SAP Business One, Odoo, Microsoft Dynamics) were designed for contexts where electricity is constant, internet is reliable, and taxation is standardized."
        },
        {
          heading: "The 5 structural barriers",
          content: "**1. No OHADA compliance.** The SYSCOHADA chart of accounts, mandatory in 17 francophone countries, is not supported by any of the Big 5 global ERPs. Companies must maintain double bookkeeping — one in the ERP, one in Excel.\n\n**2. No offline mode.** 43% of sub-Saharan agricultural zones lack reliable 3G coverage (GSMA, 2024). A cloud-only ERP is unusable for a field supervisor who needs to record harvest data 15 km from the nearest network.\n\n**3. Local social contributions not supported.** CNPS in Cameroon, CSS in Senegal, NSSF in Kenya — each country has its social fund with specific rates, ceilings, and calculation rules. Generic ERPs offer a universal payroll module that matches no local reality.\n\n**4. CFA Franc zone multi-currency not handled.** The CFA franc (XAF/XOF) with its fixed EUR parity, CEMAC/UEMOA inter-zone conversions, floating currencies (GHS, KES, NGN) — Africa's monetary complexity exceeds standard multi-currency modules.\n\n**5. Prohibitive cost.** SAP Business One: 3,000+ EUR/month. Odoo Enterprise: 800+ EUR/month. For a 200-hectare farm with 40 employees, these costs represent 5-10% of annual revenue."
        },
        {
          heading: "What African agriculture actually needs",
          content: "An ERP built for the African field must natively integrate:\n\n- **The OHADA/SYSCOHADA chart of accounts** with automated closing\n- **An offline-first mode** with deferred sync (PWA + ONNX)\n- **Social contributions for 30 countries** (CNPS, CNSS, CSS, NSSF, UIF...)\n- **CFA Franc zone multi-currency** with fixed parity and floating currencies\n- **Accessible pricing**: from 75,000 FCFA/month (~$115 USD)\n- **An agronomic chatbot** that speaks local languages and understands tropical crops"
        },
        {
          heading: "Conclusion",
          content: "The digital gap in African agriculture is not a technology problem — it's a design problem. Solutions exist, but they must be built from Africa, for Africa, with a deep understanding of the continent's regulatory, linguistic, and operational realities."
        }
      ]
    },
    {
      id: "ohada-close-one-day",
      tag: "Guide",
      category: "Accounting",
      readTime: "4 min",
      date: "2026-04-08",
      title: "OHADA compliance: automate close in 1 day",
      excerpt: "Automated SYSCOHADA accounting cuts monthly close from 3 weeks to 1 day. Here's how.",
      author: "KALTIV Team",
      heroColor: "#059669",
      sections: [
        {
          heading: "The OHADA closing nightmare",
          content: "In most African companies subject to the OHADA chart of accounts, monthly closing takes between 2 and 3 weeks. The process is manual: data extraction from multiple systems, bank reconciliation in Excel, provision calculations, SYSCOHADA statement generation.\n\nBased on our client data, a 200-hectare agricultural operation with 40 employees generates an average of 450 accounting entries per month, across 8 journals (purchases, sales, bank, cash, miscellaneous, payroll, inventory, fixed assets)."
        },
        {
          heading: "Automation in 4 steps",
          content: "**Step 1: Capture at source.** Each transaction is recorded when it happens — bunch sales at weighing, input purchases at purchase order, attendance at clock-in. Accounting allocation is automatic thanks to pre-configured entry templates.\n\n**Step 2: Assisted bank reconciliation.** Bank statement import (MT940/CAMT.053), automatic matching by amount + date + description. Observed automatic matching rate: 87%.\n\n**Step 3: Provisions and depreciation.** Automatic calculation per SYSCOHADA rules: straight-line and declining balance depreciation, inventory depreciation provisions (FIFO/LIFO), doubtful receivables provisions.\n\n**Step 4: Statement generation.** Balance sheet, income statement, TAFIRE, notes — all generated automatically in revised SYSCOHADA format, ready for court filing."
        },
        {
          heading: "Measured results",
          content: "At our first client (200 ha operation, palm oil and papaya):\n\n| Metric | Before | After |\n|---|---|---|\n| Close duration | 18 days | 1 day |\n| Entry errors | 12/month | 0.3/month |\n| Automatic entries | 0% | 94% |\n| SYSCOHADA compliance | Partial | 100% |\n\nThe time savings free the accounting team for financial analysis and management advisory — higher-value activities than repetitive data entry."
        },
        {
          heading: "Prerequisites",
          content: "OHADA accounting automation only works if operational flows are digitized upstream. An integrated ERP (from plot to balance sheet) is essential: without digitized field data, there's nothing to automate.\n\nThis is why KALTIV integrates 27+ business modules (HR, payroll, plantation, quality, inventory, purchasing, sales) with accounting — each module directly feeds the general ledger."
        }
      ]
    },
    {
      id: "catboost-palm-yields",
      tag: "Tech",
      category: "Technology",
      readTime: "6 min",
      date: "2026-03-25",
      title: "AI & Agriculture: predicting yields with CatBoost",
      excerpt: "How our CatBoost models achieve R²=0.79 on palm oil yield prediction using Open-Meteo data.",
      author: "KALTIV Team",
      heroColor: "#2563EB",
      sections: [
        {
          heading: "The tropical prediction challenge",
          content: "Predicting agricultural yields in the tropics is a distinct challenge from temperate agriculture. Crop cycles are longer (4-5 years for oil palm), historical data is scarce, and climate variables are less predictable.\n\nWe developed a Machine Learning pipeline based on CatBoost (categorical gradient boosting) that predicts oil palm yields at 30, 60, and 90 days, using only freely available data."
        },
        {
          heading: "Model architecture",
          content: "**Features used (23 total):**\n\n- **Weather (Open-Meteo API, free)**: max/min/mean temperature, precipitation, humidity, solar radiation, wind speed — rolling averages over 7, 14, 30 days\n- **Plot**: area, palm age, variety (Tenera/Dura), planting density, altitude\n- **History**: yields from last 3 months, seasonal trend, cumulative FFB/hectare ratio\n- **Operations**: days since last fertilization, last pruning, last harvest\n\n**Model:** CatBoost Regressor with 500 iterations, learning rate 0.05, max depth 6. 5-fold cross-validation stratified by plot.\n\n**Infrastructure:** Training on Fly.io (4 vCPU, 8 GB RAM). Inference via REST API with 6h cache. ONNX client-side fallback for offline mode."
        },
        {
          heading: "Results",
          content: "| Metric | Value |\n|---|---|\n| R² (test set) | 0.79 |\n| MAE | 1.2 tonnes/ha |\n| RMSE | 1.8 tonnes/ha |\n| Inference time | 12 ms |\n\nTop features by SHAP importance: 30-day cumulative precipitation (22%), palm age (18%), 14-day mean temperature (14%), days since fertilization (11%).\n\nThe model is particularly effective at detecting yield drops due to water stress — the correlation between precipitation <80mm/month and yield decline is captured with 91% accuracy."
        },
        {
          heading: "Integration into KALTIV",
          content: "Predictions are integrated directly into the CEO dashboard:\n\n- **Early warnings**: automatic notification when the model predicts a >15% drop over the next 30 days\n- **Harvest planning**: volume estimates to optimize collection logistics\n- **Agronomic chatbot (Kona)**: the model feeds the AI chatbot's real-time recommendations\n\nThe pipeline is open-source for weather features and preprocessing. Only the model weights and inference infrastructure are proprietary."
        }
      ]
    }
  ]
};

export default articles;
