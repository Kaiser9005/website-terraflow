# KALTIV — Rebrand Technical Specification (Consolidated)

**From:** TerraFlow → **KALTIV** | The Agribusiness Command Platform
**Date:** 27 mars 2026 (consolidated from 3 sessions)
**Scope:** Rebrand visuel + contenu du site `website-terraflow`
**Architecture:** Aucune modification — même stack React/Vite/GSAP/Lenis
**Temps estimé:** 3-4h d'implémentation
**Creative production:** `/creative-studio image` pour logo K mark, favicon, OG image
**Séquence:** Sections 2-9 d'abord (identité + contenu), Section 1 (pré-requis domaine/DNS) et Section 10 (go live) EN DERNIER

---

## 1. PRÉ-REQUIS (À FAIRE EN DERNIER — après sections 2-9)

### 1.1 Domaines à acheter (URGENT)

| Domaine | Prix | Priorité |
|---------|------|----------|
| `kaltiv.com` | $11.25/an | P0 — acheter immédiatement |
| `kaltiv.io` | $37.99/an | P1 — backup professionnel |
| `kaltiv.app` | $15.00/an | P2 — futur app mobile |

### 1.2 Configuration DNS Vercel

```
kaltiv.com → CNAME → cname.vercel-dns.com
www.kaltiv.com → redirect → kaltiv.com
```

### 1.3 Resend (email transactionnel)

- Ajouter domaine `kaltiv.com` dans Resend
- Configurer SPF/DKIM/DMARC (auto-configure via registrar)
- Mettre à jour `from:` dans les Edge Functions

---

## 2. IDENTITÉ VISUELLE

### 2.1 CSS Variables — Remplacement

**Fichier:** `src/styles.css`

```css
/* ============================================
   AVANT (TerraFlow)
   ============================================ */
:root {
  --primary: #166534;         /* forest green */
  --primary-deep: #0D3B1F;    /* deep forest */
  --primary-light: #22C55E;   /* bright green */
  --secondary: #D97706;       /* amber */
  --accent: #D97706;          /* amber (dupliqué) */
  --accent-light: #F59E0B;    /* light amber */
  --accent-pale: #FEF3C7;     /* pale amber */
  --terre: #78350F;            /* brown */
  --blanc: #FAFAF5;            /* warm white */
  --creme: #F5F0E8;            /* cream */
  --noir: #0a0a0a;             /* near-black */
}

/* ============================================
   APRÈS (KALTIV)
   ============================================ */
:root {
  --primary: #0A3622;          /* deep commanding green */
  --primary-deep: #061F14;     /* near-black green */
  --primary-light: #16A34A;    /* muted green (less neon) */
  --secondary: #C8A036;        /* muted gold */
  --accent: #C8A036;           /* muted gold */
  --accent-light: #D4B04A;     /* light gold */
  --accent-pale: #FAF5E8;      /* pale gold */
  --terre: #1A1A1A;             /* SUPPRIMÉ brown → near-black */
  --blanc: #FAFAFA;             /* cool white (Stripe-like) */
  --creme: #F7F6F3;             /* cooler cream */
  --noir: #0a0a0a;              /* inchangé */
}
```

### 2.2 Changements de ton

| Élément | Avant | Après | Pourquoi |
|---------|-------|-------|----------|
| Primaire | Forest green brillant | Deep green sombre | Plus Palantir, plus "command" |
| Accent | Amber chaud | Gold muté | Plus premium, moins "farm" |
| Crème | Chaud (#F5F0E8) | Froid (#F7F6F3) | Plus Stripe, plus tech |
| Brown (terre) | Utilisé dans tags | Supprimé → near-black | Élimine le "rustic" |

### 2.3 Hero Orbs (particules CSS)

```css
/* AVANT */
.hero-orb-1 { background: radial-gradient(circle, rgba(37,99,60,.5) 0%, transparent 70%); }
.hero-orb-2 { background: radial-gradient(circle, rgba(181,148,64,.35) 0%, transparent 70%); }
.hero-orb-3 { background: radial-gradient(circle, rgba(37,99,60,.3) 0%, transparent 70%); }

/* APRÈS */
.hero-orb-1 { background: radial-gradient(circle, rgba(10,54,34,.6) 0%, transparent 70%); }
.hero-orb-2 { background: radial-gradient(circle, rgba(200,160,54,.3) 0%, transparent 70%); }
.hero-orb-3 { background: radial-gradient(circle, rgba(10,54,34,.25) 0%, transparent 70%); }
```

### 2.4 Fonts

**Pas de changement** — Space Grotesk + Inter sont déjà award-level.

---

## 3. LOGO & ASSETS

### 3.1 Nouveau logo SVG — K Mark

Créer un monogramme "K" angulaire, minimal, single-color.
**Direction:** Le K évoque une flèche montante (croissance) + structure (commande).
**Production:** Utiliser `/creative-studio image` pour générer le logo.

**Fichiers à créer:**

| Fichier | Taille | Usage |
|---------|--------|-------|
| `/public/logo-kaltiv.svg` | Vectoriel | Nav + footer |
| `/public/logo-kaltiv-icon.png` | 512×512 | Favicon, PWA |
| `/public/favicon.svg` | 32×32 | Onglet navigateur |
| `/public/apple-touch-icon.png` | 180×180 | iOS |
| `/public/screenshots/dashboard.webp` | 1200×630 | OG image |

### 3.2 Preloader

```
AVANT: "Terra" + "Flow" (avec span accent)
APRÈS: "KALTIV" (tout en blanc, K en accent gold)
```

### 3.3 Nav Logo

```
AVANT: <img src="/logo-terraflow.svg" /> + "TerraFlow"
APRÈS: <img src="/logo-kaltiv.svg" /> + "KALTIV"
```

---

## 4. CONTENU TEXTUEL — REMPLACEMENT COMPLET

### 4.1 Meta Tags (index.html)

```html
<!-- APRÈS -->
<title>KALTIV — The Agribusiness Command Platform</title>
<meta name="description" content="KALTIV unifie opérations, supply chain, conformité réglementaire et finance pour l'agribusiness africain. 27+ modules. IA prédictive. CEMAC, UEMOA, anglophone." />
<meta name="keywords" content="KALTIV, ERP agricole, agribusiness, OHADA, Afrique, gestion exploitation, IA agricole, chatbot agronomique, Digital Chief of Staff, Lean manufacturing, palmier, cacao, café, hévéa" />
<meta property="og:title" content="KALTIV — The Agribusiness Command Platform" />
<meta property="og:description" content="27+ modules. IA prédictive. Chatbot agronomique. Du terrain au bilan." />
<meta property="og:url" content="https://kaltiv.com" />
<meta property="og:image" content="https://kaltiv.com/screenshots/dashboard.webp" />
<link rel="canonical" href="https://kaltiv.com" />
```

### 4.2 Structured Data (index.html)

```json
{
  "@type": "SoftwareApplication",
  "name": "KALTIV",
  "applicationCategory": "BusinessApplication",
  "description": "The Agribusiness Command Platform — unifying operations, supply chain, compliance and finance.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "75000",
    "highPrice": "500000",
    "priceCurrency": "XAF"
  }
}
```

### 4.3 Hero Section

```
APRÈS:
  Eyebrow: "The Agribusiness Command Platform"
  Titre: "Run your entire value chain."
  Subtitle: "27+ modules. IA prédictive. Chatbot agronomique. Digital Chief of Staff.
             Conformité multi-régionale native (OHADA, CEMAC, UEMOA). Du terrain au bilan, un seul système."
  CTA1: "Démarrer — 60 jours gratuit"
  CTA2: "Demander une démo"
```

### 4.4 Marquee Band

```
AVANT: TerraFlow · ERP Agricole · Intelligence · Production · ...
APRÈS: KALTIV · Command Platform · 27+ Modules · 268 Tables · 5 Pays · Offline-First · ...
```

### 4.5 Section "Problème"

Garder la structure 4 cards. Mettre à jour les stats si nécessaire.
`Amendes CEMAC jusqu'à 5M FCFA` → garder, c'est factuel.

### 4.6 Social Proof Bar

```
AVANT: "30+ modules · 900+ tests · 6 modèles IA · 17 pays OHADA"
> Note: "17 pays OHADA" est trop restrictif. Remplacer par "5 pays opérationnels (CEMAC + UEMOA + anglophone)"
APRÈS: "27+ modules · 268 tables · 32 Edge Functions · 6 ML models · 5 pays opérationnels"
  + "Powered by Supabase · Anthropic Claude"
```

> **Note:** Utiliser "27+ modules" (vérifié dans CLAUDE.md) et non "37" (qui compte les routes, pas les modules autonomes).

### 4.7 Section Features (Bento Grid)

**Structure:** Garder la grille bento 3 colonnes.
**Contenu:** Remplacer les 8 feature cards par les vrais différenciateurs:

| # | Titre | Description |
|---|-------|-------------|
| 1 | "Digital Chief of Staff" | "44 outils IA pour piloter votre exploitation — conseils proactifs, rapports automatiques, alertes intelligentes" |
| 2 | "Kona AI" | "Chatbot agentic avec 23 actions d'écriture, 4 personas, mémoire contextuelle" |
| 3 | "Conformité Multi-Régionale" | "OHADA (CEMAC/UEMOA) + Companies Act (anglophone). 5 pays : Cameroun, Sénégal, Ghana, Kenya, Côte d'Ivoire" |
| 4 | "Offline-First" | "PowerSync + 6 modèles ONNX, travaillez sans Internet" |
| 5 | "Lean Digital" | "PDCA, Kanban, BSC, OKR, VSM, SMED, TPM, SPC — 14 outils d'excellence opérationnelle" |
| 6 | "WhatsApp Intelligence" | "Parsing automatique de conversations terrain, notifications multicanal" |
| 7 | "Traçabilité Complète" | "De la parcelle à l'export — ISO 9001, HACCP, blockchain" |
| 8 | "Paie & RH Avancé" | "11 sous-modules RH, 5 juridictions fiscales, matrice de compétences, évaluations 360°" |

### 4.8 Section Cas d'Usage

Garder les tabs interactifs. Mettre à jour les noms:
- "Plantation palmier" → garder
- "Coopérative cacao" → garder
- "Agro-industrie" → garder
- "Négoce export" → garder

### 4.9 Section Modules (Tabs dark)

```
AVANT: 4 catégories × 6 modules = 24 modules

APRÈS: 5 catégories (ajouter "Intelligence & IA")
  Coeur de Métier (7): + Notifications multicanal
  Agriculture & Production (7): + Fuel Management, WhatsApp Parsing
  Finance & Ventes (7): + Fraud Detection ML, Multi-currency
  Qualité & Excellence (6): inchangé
  Intelligence & IA (5): Kona Chatbot, Digital Chief of Staff,
                          RAG Knowledge Base, Predictive Analytics,
                          Sentiment Analysis

TOTAL: 32 modules listés (vs 24 avant)
```

---

## 5. PRICING — REFONTE COMPLÈTE

### 5.1 Données pricing (objet JS)

```javascript
// APRÈS
const pricingPlans = [
  {
    name: "Foundation",
    price: "75 000",
    priceCurrency: "FCFA",
    priceEUR: "~115 €",
    period: "/mois",
    target: "PME agricoles · < 50 ha",
    features: [
      "15 modules essentiels",
      "5 utilisateurs inclus",
      "Paie + comptabilité réglementaire",
      "Dashboard KPI temps réel",
      "Support Email + WhatsApp",
      "Notifications multicanal",
    ],
    cta: "Démarrer — 30 jours gratuit",
    featured: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "200 000",
    priceCurrency: "FCFA",
    priceEUR: "~305 €",
    period: "/mois",
    target: "Exploitations moyennes · 50-500 ha",
    features: [
      "25 modules",
      "15 utilisateurs inclus",
      "Comptabilité réglementaire complète (OHADA/IFRS)",
      "IA prédictive (rendement + qualité)",
      "Kona chatbot (FAQ + actions)",
      "Kanban + PDCA",
      "Support prioritaire < 8h",
    ],
    cta: "Essayer 60 jours gratuit",
    featured: true,
    badge: "Populaire",
  },
  {
    name: "Command",
    price: "500 000",
    priceCurrency: "FCFA",
    priceEUR: "~762 €",
    period: "/mois",
    target: "Grandes exploitations · 500-2 000 ha",
    features: [
      "Tous les modules",
      "50 utilisateurs inclus",
      "Multi-régional (OHADA CEMAC/UEMOA + anglophone, 5 juridictions)",
      "Digital Chief of Staff (44 outils IA)",
      "Kona AI complet (23 write actions)",
      "14 outils Lean",
      "Offline ONNX + PowerSync",
      "API & webhooks",
      "Support < 4h + téléphone",
    ],
    cta: "Demander une démo",
    featured: false,
    badge: "Recommandé",
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    priceCurrency: "",
    priceEUR: "",
    period: "",
    target: "Agro-industries · 2 000+ ha · Multi-sites",
    features: [
      "Modules custom + intégrations",
      "Utilisateurs illimités",
      "Multi-juridictions + multi-devises",
      "Modèles IA personnalisés",
      "SLA garanti + manager dédié",
      "Formation sur site",
      "Audit sécurité + SOC 2",
    ],
    cta: "Contacter l'équipe",
    featured: false,
    badge: null,
  }
];
```

### 5.2 Feature Matrix — Mise à jour

```
Modules:         15       | 25        | Tous      | Custom
Users:           5        | 15        | 50        | Illimité
Compliance:      Basique  | Complète  | Multi-pays (CEMAC/UEMOA/anglophone) | Multi-juridictions
IA/ML:           Dashboard| Prédictif | Complet + Chief of Staff | Custom
Lean:            —        | Kanban+PDCA | 14 outils | Custom
Offline:         PWA      | + PowerSync | + ONNX   | Full suite
Chatbot:         FAQ      | + Actions | 23 write actions | Custom
WhatsApp:        Notifications | + Parsing | + Business API | Custom
Support:         Email+WA | < 8h      | < 4h + tel | SLA dédié
Facturation ann: —        | 2 mois offerts | 2 mois offerts | Sur mesure
```

### 5.3 Comparaison — Ajouter SAP B1

```
APRÈS: KALTIV vs SAP Business One vs Odoo Enterprise vs Excel

| Critère         | KALTIV           | SAP B1          | Odoo Ent.     | Excel     |
|-----------------|------------------|-----------------|---------------|-----------|
| Prix PME        | 75K-500K FCFA    | ~1M+ FCFA       | ~650K+ FCFA   | "Gratuit" |
| Compliance Afrique | OHADA+CEMAC+UEMOA natif | Non        | Module tiers  | Non       |
| Chatbot IA agri | Oui (Kona)       | Non             | Non           | Non       |
| Offline         | ONNX + PowerSync | Non             | Non           | Oui       |
| Déploiement     | 4 semaines       | 6-12 mois       | 3-6 mois      | Immédiat  |
| Multi-régional | CEMAC+UEMOA+anglophone (5 pays) | Extensible | Par extension | Non |
```

### 5.4 ROI Calculator — Mise à jour tiers

```javascript
// APRÈS (en FCFA)
const tiers = [
  { max: 20, monthly: 75000, name: "Foundation" },
  { max: 100, monthly: 200000, name: "Growth" },
  { max: 500, monthly: 500000, name: "Command" },
  // Enterprise: pas dans le calculateur (sur mesure)
];
```

### 5.5 FAQ Pricing — Mise à jour

```
Q: "Comment est calculé le prix ?"
A: "Le tarif dépend du nombre d'utilisateurs et de modules activés.
    Le plan Foundation commence à 75 000 FCFA/mois (~115 €) pour 5 utilisateurs.
    Essai gratuit de 30 à 60 jours selon le plan, sans engagement."

Q: "Quels moyens de paiement ?"
A: "Virement bancaire, Mobile Money (Orange Money, MTN MoMo, Wave),
    carte bancaire (Visa/Mastercard). Facturation mensuelle ou annuelle
    (2 mois offerts)."
```

---

## 6. SEO & ANALYTICS

### 6.1 Meta tags complets

(See section 4.1 — already defined)

### 6.2 Analytics

> **Decision needed:** Plausible.io ($9/mois) ou Vercel Analytics (gratuit)?
> Default to Vercel Analytics if no Plausible account exists.

### 6.3 Sitemap & robots.txt

**Créer `/public/robots.txt`:**

```
User-agent: *
Allow: /
Sitemap: https://kaltiv.com/sitemap.xml
```

---

## 7. SEARCH & REPLACE GLOBAL

### 7.1 Toutes occurrences textuelles

| Chercher | Remplacer par | Fichiers |
|----------|---------------|----------|
| `TerraFlow` | `KALTIV` | Tous |
| `terraflow` | `kaltiv` | URLs, classes CSS, IDs |
| `Terra` + `Flow` (séparés dans le preloader) | `KALTIV` | Preloader.jsx |
| `website-terraflow.vercel.app` | `kaltiv.com` | index.html, OG tags |
| `ERP Agricole Intelligent` | `The Agribusiness Command Platform` | Partout |
| `ERP agricole` | `plateforme de commandement` | Textes descriptifs |
| `30+ modules` | `27+ modules` | Stats, hero, descriptions |
| `L'ERP Agricole de Référence en Afrique` | `The Agribusiness Command Platform` | Eyebrow hero |
| `fofal-erp` | `kaltiv` | Footer social links |
| `€` / `EUR` (pricing principal) | `FCFA` | Section pricing |
| `contact@terraflow.cm` | `contact@kaltiv.com` | Footer, forms |

### 7.2 Références visuelles

| Chercher | Remplacer par |
|----------|---------------|
| Logo SVG TerraFlow | Logo SVG KALTIV (K mark) |
| `/logo-terraflow*.svg` | `/logo-kaltiv.svg` |
| `favicon.svg` (ancien) | Nouveau favicon K |

---

## 8. FICHIERS IMPACTÉS — CHECKLIST

### 8.1 Fichiers à modifier

```
[ ] index.html              — Meta tags, OG, structured data, canonical, analytics
[ ] src/styles.css           — CSS variables (couleurs), hero orbs
[ ] src/App.jsx              — Preloader text, section data, pricing array,
                               modules array, FAQ array, comparison tables,
                               feature cards, social proof stats, hero content,
                               marquee items, nav logo, footer content
[ ] public/favicon.svg       — Nouveau K mark
[ ] public/favicon.ico       — Nouveau K mark (32×32)
[ ] public/robots.txt        — Créer (nouveau fichier)
[ ] vercel.json              — Mettre à jour si domaine custom
```

### 8.2 Fichiers à créer

```
[ ] public/logo-kaltiv.svg          — Logo principal (/creative-studio)
[ ] public/logo-kaltiv-icon.png     — Icône app (512×512)
[ ] public/apple-touch-icon.png     — iOS (180×180)
[ ] public/screenshots/dashboard.webp — OG image (1200×630)
[ ] public/robots.txt               — SEO
[ ] public/sitemap.xml              — SEO
```

### 8.3 Fichiers à supprimer

```
[ ] public/logo-terraflow*.svg
[ ] Toute référence à l'ancien logo
```

---

## 9. VÉRIFICATION POST-REBRAND

### 9.1 Checklist visuelle

```
[ ] Nav : logo KALTIV affiché, couleur gold
[ ] Hero : nouvelle tagline, CTAs corrects
[ ] Preloader : "KALTIV" (pas "TerraFlow")
[ ] Marquee : texte mis à jour
[ ] Features : 8 nouveaux différenciateurs
[ ] Modules : 5 catégories, 32 modules listés
[ ] Pricing : 4 tiers, prix en FCFA, badges "Populaire" / "Recommandé"
[ ] Comparaison : KALTIV vs SAP B1 vs Odoo vs Excel
[ ] FAQ : prix corrigés (75K FCFA)
[ ] Footer : "KALTIV" + nouveaux liens + contact@kaltiv.com
[ ] WhatsApp FAB : numéro correct
[ ] OG image : preview correct (partage LinkedIn/Twitter)
```

### 9.2 Checklist technique

```
[ ] Build Vite : 0 erreurs
[ ] Lighthouse : Performance > 90, SEO > 90
[ ] Mobile : responsive intact (GSAP animations)
[ ] Dark/Light : couleurs correctes dans les 2 modes
[ ] i18n : toggle FR/EN fonctionne avec nouveaux textes
[ ] Formulaire contact : soumission Supabase OK
[ ] DNS : kaltiv.com résout vers Vercel
[ ] HTTPS : certificat SSL actif
[ ] Analytics : Vercel Analytics ou Plausible tracent sur kaltiv.com
```

### 9.3 Checklist SEO

```
[ ] Canonical : https://kaltiv.com
[ ] OG tags : titre, description, image corrects
[ ] Structured data : SoftwareApplication "KALTIV"
[ ] robots.txt : accessible
[ ] sitemap.xml : généré
[ ] Google Search Console : soumettre nouveau domaine
```

---

## 10. SÉQUENCE D'EXÉCUTION

### Phase 0 : Pré-requis (IV — manuel)
1. Acheter `kaltiv.com` via Vercel ($11.25)
2. Configurer DNS CNAME → `cname.vercel-dns.com`
3. Acheter `kaltiv.io` ($37.99) comme backup

### Phase 1 : Assets visuels (~45 min)
1. Générer logo K mark via `/creative-studio image`
2. Créer favicon.svg (K monogram)
3. Générer logo-kaltiv-icon.png (512×512)
4. Générer apple-touch-icon.png (180×180)
5. Créer OG image dashboard.webp (1200×630)

### Phase 2 : CSS & couleurs (~30 min)
1. Remplacer les 11 CSS variables dans `src/styles.css`
2. Mettre à jour les hero orbs (rgba values)
3. Vérifier dark mode si existant

### Phase 3 : Contenu textuel (~60 min)
1. `index.html` : meta tags, OG, structured data, canonical
2. `src/App.jsx` : hero, marquee, features, modules, pricing, FAQ, footer
3. Search & replace global : TerraFlow → KALTIV (table section 7)

### Phase 4 : SEO & fichiers (~15 min)
1. Créer `robots.txt`
2. Créer `sitemap.xml`
3. Supprimer `logo-terraflow*.svg`
4. Mettre à jour `vercel.json` si nécessaire

### Phase 5 : Vérification (~30 min)
1. `npm run build` — 0 erreurs
2. Deploy preview sur Vercel
3. Checklist visuelle (section 9.1)
4. Checklist technique (section 9.2)
5. Checklist SEO (section 9.3)
6. Lighthouse audit

### Phase 6 : Go live (~15 min)
1. Merge to main → auto-deploy
2. Vérifier DNS kaltiv.com
3. Soumettre à Google Search Console
4. Configurer Resend avec kaltiv.com
5. Tester email transactionnel

**Temps total estimé : ~3.5h**

---

## CORRECTIONS vs SPEC SESSION 2

| Point | Session 2 | Corrigé ici | Raison |
|-------|-----------|-------------|--------|
| Module count | "37 modules" | "27+ modules" | 37 = routes, 27 = modules autonomes (CLAUDE.md) |
| WhatsApp stats | "13 500+ messages" | "parsing automatique" | 13 581 est FOFAL-spécifique |
| SAP B1 prix | "~2M+ FCFA" | "~1M+ FCFA" | SAP B1 commence ~€1500/mois = ~985K FCFA |
| ROI Enterprise | 1 500 000 FCFA | Retiré du calculateur | Incohérent avec "Sur mesure" |
| Analytics | Plausible.io | Vercel Analytics (default) | Vérifier si compte Plausible existe |
| Pricing tiers | Essentials | **Foundation** | Plus solide pour DG africain |
