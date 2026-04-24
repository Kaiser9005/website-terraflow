/**
 * Screenshot Data — KALTIV Marketing Website
 * Maps module screenshots for Hero rotation + Modules preview.
 * All images in /public/screenshots/ as WebP (<80KB each).
 */

const screenshots = [
  {
    id: "dashboard",
    src: "/screenshots/dashboard.webp",
    altFr: "Tableau de bord KALTIV — KPIs et statistiques",
    altEn: "KALTIV Dashboard — KPIs and statistics",
    module: "Dashboard",
    category: 0, // Core Business
  },
  {
    id: "hr",
    src: "/screenshots/hr.webp",
    altFr: "Module RH — Vue d'ensemble des effectifs",
    altEn: "HR Module — Workforce overview",
    module: "RH & Paie",
    category: 0,
  },
  {
    id: "employees",
    src: "/screenshots/employees.webp",
    altFr: "Gestion des employes — Liste et filtres",
    altEn: "Employee management — List and filters",
    module: "Employes",
    category: 0,
  },
  {
    id: "agriculture",
    src: "/screenshots/agriculture.webp",
    altFr: "Gestion agricole — Parcelles et operations",
    altEn: "Agriculture management — Plots and operations",
    module: "Agriculture",
    category: 1, // Agriculture & Production
  },
  {
    id: "analytics",
    src: "/screenshots/analytics.webp",
    altFr: "Analytiques et tableaux de bord",
    altEn: "Analytics and dashboards",
    module: "Analytics",
    category: 4, // Intelligence & AI
  },
];

export default screenshots;
