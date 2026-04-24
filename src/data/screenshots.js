/**
 * Screenshot Data — KALTIV Marketing Website
 *
 * 8 curated production screenshots, all 1920px WebP (<90KB each).
 * Quality-audited: no raw i18n keys, no internal text, no error states.
 *
 * Category mapping for Modules section tabs:
 * 0 = Core Business (HR, Finance)
 * 1 = Agriculture & Production
 * 2 = Supply Chain
 * 3 = Compliance & Quality
 * 4 = Intelligence & AI
 */

const screenshots = [
  {
    id: "dashboard",
    src: "/screenshots/dashboard.webp",
    altFr: "Tableau de bord KALTIV — KPIs employés, opérations, dépenses",
    altEn: "KALTIV Dashboard — Employee, operations, and expense KPIs",
    module: "Dashboard",
    category: 0,
  },
  {
    id: "hr",
    src: "/screenshots/hr.webp",
    altFr: "Module RH — Vue d'ensemble des effectifs avec KPIs et statistiques",
    altEn: "HR Module — Workforce overview with KPIs and statistics",
    module: "RH & Paie",
    category: 0,
  },
  {
    id: "employees",
    src: "/screenshots/employees.webp",
    altFr: "Gestion des employés — Liste avec filtres, catégories et actions",
    altEn: "Employee management — List with filters, categories and actions",
    module: "Employés",
    category: 0,
  },
  {
    id: "parcels",
    src: "/screenshots/parcels.webp",
    altFr: "Gestion des parcelles — 28 parcelles avec types de culture et statuts",
    altEn: "Parcel management — 28 plots with crop types and statuses",
    module: "Agriculture",
    category: 1,
  },
  {
    id: "inventory",
    src: "/screenshots/inventory.webp",
    altFr: "Tableau de bord d'inventaire — 64 produits, répartition par catégorie et entrepôt",
    altEn: "Inventory dashboard — 64 products, category and warehouse distribution",
    module: "Inventaire",
    category: 2,
  },
  {
    id: "purchasing",
    src: "/screenshots/purchasing.webp",
    altFr: "Tableau de bord achats — 126 commandes, 22 fournisseurs, 3.8M CFA",
    altEn: "Purchasing dashboard — 126 orders, 22 suppliers, 3.8M CFA",
    module: "Achats",
    category: 2,
  },
  {
    id: "suppliers",
    src: "/screenshots/suppliers.webp",
    altFr: "Liste fournisseurs — Volume achats, nombre de commandes, statuts",
    altEn: "Supplier list — Purchase volume, order count, statuses",
    module: "Fournisseurs",
    category: 2,
  },
  {
    id: "analytics",
    src: "/screenshots/analytics.webp",
    altFr: "Analytiques — Performance cross-modules, score qualité 80%",
    altEn: "Analytics — Cross-module performance, 80% quality score",
    module: "Analytics",
    category: 4,
  },
];

export default screenshots;
