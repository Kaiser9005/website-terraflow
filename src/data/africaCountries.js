/**
 * Africa Countries Data — KALTIV Coverage Map
 *
 * 30 countries across 6 compliance zones.
 * SVG centroid coordinates (cx/cy) for viewBox 0 0 800 900
 * mapped from approximate lat/lng using:
 *   x = (lng + 18) * 11.43
 *   y = (37 - lat) * 12.5
 */

export const ZONE_COLORS = {
  CEMAC: "#0A3622",
  UEMOA: "#059669",
  OHADA: "#0D9488",
  Anglophone: "#2563EB",
  Lusophone: "#D97706",
  Swahili: "#7C3AED",
};

export const ZONE_LABELS = {
  fr: {
    CEMAC: "CEMAC (6 pays)",
    UEMOA: "UEMOA (8 pays)",
    OHADA: "OHADA Autre (3 pays)",
    Anglophone: "Anglophone (8 pays)",
    Lusophone: "Lusophone (4 pays)",
    Swahili: "Swahili (1 pays)",
  },
  en: {
    CEMAC: "CEMAC (6 countries)",
    UEMOA: "UEMOA (8 countries)",
    OHADA: "OHADA Other (3 countries)",
    Anglophone: "Anglophone (8 countries)",
    Lusophone: "Lusophone (4 countries)",
    Swahili: "Swahili (1 country)",
  },
};

const countries = [
  // ── CEMAC (6) ──
  { id: "CM", name: "Cameroun", nameEn: "Cameroon", emoji: "\uD83C\uDDE8\uD83C\uDDF2", zone: "CEMAC", currency: "XAF", social: "CNPS", languages: "FR, EN", cx: 347, cy: 388, r: 14 },
  { id: "GA", name: "Gabon", nameEn: "Gabon", emoji: "\uD83C\uDDEC\uD83C\uDDE6", zone: "CEMAC", currency: "XAF", social: "CNSS", languages: "FR", cx: 341, cy: 473, r: 11 },
  { id: "CG", name: "Congo", nameEn: "Congo", emoji: "\uD83C\uDDE8\uD83C\uDDEC", zone: "CEMAC", currency: "XAF", social: "CNSS", languages: "FR", cx: 387, cy: 516, r: 11 },
  { id: "TD", name: "Tchad", nameEn: "Chad", emoji: "\uD83C\uDDF9\uD83C\uDDE9", zone: "CEMAC", currency: "XAF", social: "CNPS", languages: "FR, AR", cx: 420, cy: 269, r: 14 },
  { id: "CF", name: "RCA", nameEn: "Central African Rep.", emoji: "\uD83C\uDDE8\uD83C\uDDEB", zone: "CEMAC", currency: "XAF", social: "OCSS", languages: "FR", cx: 446, cy: 380, r: 12 },
  { id: "GQ", name: "Guinee Eq.", nameEn: "Equatorial Guinea", emoji: "\uD83C\uDDEC\uD83C\uDDF6", zone: "CEMAC", currency: "XAF", social: "INSESO", languages: "ES, FR", cx: 323, cy: 442, r: 7 },

  // ── UEMOA (8) ──
  { id: "SN", name: "Senegal", nameEn: "Senegal", emoji: "\uD83C\uDDF8\uD83C\uDDF3", zone: "UEMOA", currency: "XOF", social: "CSS", languages: "FR", cx: 41, cy: 281, r: 11 },
  { id: "CI", name: "Cote d'Ivoire", nameEn: "Ivory Coast", emoji: "\uD83C\uDDE8\uD83C\uDDEE", zone: "UEMOA", currency: "XOF", social: "CNPS", languages: "FR", cx: 142, cy: 368, r: 13 },
  { id: "ML", name: "Mali", nameEn: "Mali", emoji: "\uD83C\uDDF2\uD83C\uDDF1", zone: "UEMOA", currency: "XOF", social: "INPS", languages: "FR", cx: 183, cy: 243, r: 14 },
  { id: "BF", name: "Burkina Faso", nameEn: "Burkina Faso", emoji: "\uD83C\uDDE7\uD83C\uDDEB", zone: "UEMOA", currency: "XOF", social: "CNSS", languages: "FR", cx: 188, cy: 308, r: 11 },
  { id: "BJ", name: "Benin", nameEn: "Benin", emoji: "\uD83C\uDDE7\uD83C\uDDEF", zone: "UEMOA", currency: "XOF", social: "CNSS", languages: "FR", cx: 232, cy: 346, r: 8 },
  { id: "TG", name: "Togo", nameEn: "Togo", emoji: "\uD83C\uDDF9\uD83C\uDDEC", zone: "UEMOA", currency: "XOF", social: "CNSS", languages: "FR", cx: 219, cy: 355, r: 7 },
  { id: "NE", name: "Niger", nameEn: "Niger", emoji: "\uD83C\uDDF3\uD83C\uDDEA", zone: "UEMOA", currency: "XOF", social: "CNSS", languages: "FR", cx: 298, cy: 242, r: 14 },
  { id: "GW", name: "Guinee-Bissau", nameEn: "Guinea-Bissau", emoji: "\uD83C\uDDEC\uD83C\uDDFC", zone: "UEMOA", currency: "XOF", social: "INSS", languages: "PT", cx: 32, cy: 313, r: 6 },

  // ── OHADA Other (3) ──
  { id: "GN", name: "Guinee", nameEn: "Guinea", emoji: "\uD83C\uDDEC\uD83C\uDDF3", zone: "OHADA", currency: "GNF", social: "CNSS", languages: "FR", cx: 81, cy: 338, r: 10 },
  { id: "KM", name: "Comores", nameEn: "Comoros", emoji: "\uD83C\uDDF0\uD83C\uDDF2", zone: "OHADA", currency: "KMF", social: "CNSS", languages: "FR, AR", cx: 708, cy: 611, r: 6 },
  { id: "CD", name: "RD Congo", nameEn: "DR Congo", emoji: "\uD83C\uDDE8\uD83C\uDDE9", zone: "OHADA", currency: "CDF", social: "CNSS", languages: "FR", cx: 477, cy: 513, r: 16 },

  // ── Anglophone (8) ──
  { id: "NG", name: "Nigeria", nameEn: "Nigeria", emoji: "\uD83C\uDDF3\uD83C\uDDEC", zone: "Anglophone", currency: "NGN", social: "NSITF", languages: "EN", cx: 305, cy: 349, r: 14 },
  { id: "GH", name: "Ghana", nameEn: "Ghana", emoji: "\uD83C\uDDEC\uD83C\uDDED", zone: "Anglophone", currency: "GHS", social: "SSNIT", languages: "EN", cx: 194, cy: 363, r: 10 },
  { id: "KE", name: "Kenya", nameEn: "Kenya", emoji: "\uD83C\uDDF0\uD83C\uDDEA", zone: "Anglophone", currency: "KES", social: "NSSF", languages: "EN, SW", cx: 640, cy: 463, r: 12 },
  { id: "UG", name: "Ouganda", nameEn: "Uganda", emoji: "\uD83C\uDDFA\uD83C\uDDEC", zone: "Anglophone", currency: "UGX", social: "NSSF", languages: "EN, SW", cx: 576, cy: 446, r: 10 },
  { id: "RW", name: "Rwanda", nameEn: "Rwanda", emoji: "\uD83C\uDDF7\uD83C\uDDFC", zone: "Anglophone", currency: "RWF", social: "RSSB", languages: "EN, FR, RW", cx: 548, cy: 487, r: 7 },
  { id: "ZA", name: "Afrique du Sud", nameEn: "South Africa", emoji: "\uD83C\uDDFF\uD83C\uDDE6", zone: "Anglophone", currency: "ZAR", social: "UIF", languages: "EN +10", cx: 501, cy: 844, r: 15 },
  { id: "LR", name: "Liberia", nameEn: "Liberia", emoji: "\uD83C\uDDF1\uD83C\uDDF7", zone: "Anglophone", currency: "LRD", social: "NASSCORP", languages: "EN", cx: 98, cy: 382, r: 8 },
  { id: "SL", name: "Sierra Leone", nameEn: "Sierra Leone", emoji: "\uD83C\uDDF8\uD83C\uDDF1", zone: "Anglophone", currency: "SLE", social: "NASSIT", languages: "EN", cx: 71, cy: 357, r: 8 },

  // ── Lusophone (4) ──
  { id: "AO", name: "Angola", nameEn: "Angola", emoji: "\uD83C\uDDE6\uD83C\uDDF4", zone: "Lusophone", currency: "AOA", social: "INSS", languages: "PT", cx: 410, cy: 603, r: 14 },
  { id: "MZ", name: "Mozambique", nameEn: "Mozambique", emoji: "\uD83C\uDDF2\uD83C\uDDFF", zone: "Lusophone", currency: "MZN", social: "INSS", languages: "PT", cx: 613, cy: 696, r: 12 },
  { id: "CV", name: "Cap-Vert", nameEn: "Cape Verde", emoji: "\uD83C\uDDE8\uD83C\uDDFB", zone: "Lusophone", currency: "CVE", social: "INPS", languages: "PT", cx: -30, cy: 250, r: 6, isIsland: true },
  { id: "ST", name: "Sao Tome", nameEn: "Sao Tome", emoji: "\uD83C\uDDF8\uD83C\uDDF9", zone: "Lusophone", currency: "STN", social: "INSS", languages: "PT", cx: 282, cy: 460, r: 5 },

  // ── Swahili (1) ──
  { id: "TZ", name: "Tanzanie", nameEn: "Tanzania", emoji: "\uD83C\uDDF9\uD83C\uDDFF", zone: "Swahili", currency: "TZS", social: "NSSF", languages: "SW, EN", cx: 605, cy: 542, r: 13 },
];

/**
 * Simplified Africa continent outline — SVG path.
 * ~55 anchor points, clockwise from northwest.
 * ViewBox: 0 0 800 900
 */
export const AFRICA_OUTLINE = [
  "M 57 25",
  "C 80 15, 150 5, 230 5",
  "C 310 5, 400 15, 490 60",
  "L 540 50",
  "C 580 45, 605 55, 615 80",
  "L 625 150",
  "C 630 170, 635 200, 630 225",
  "L 660 250",
  "C 680 265, 695 290, 700 310",
  "L 790 310",
  "C 800 315, 795 325, 780 330",
  "L 700 340",
  "C 690 350, 685 370, 680 390",
  "L 675 440",
  "C 672 460, 668 480, 665 500",
  "L 665 540",
  "C 660 560, 650 585, 640 605",
  "L 625 645",
  "C 615 665, 610 685, 615 715",
  "L 620 755",
  "C 615 775, 600 800, 575 825",
  "L 545 855",
  "C 520 865, 500 875, 475 880",
  "L 440 895",
  "C 420 900, 405 900, 390 895",
  "L 370 880",
  "C 355 870, 345 855, 340 840",
  "L 345 800",
  "C 348 780, 352 760, 355 740",
  "L 350 700",
  "C 348 680, 345 660, 340 640",
  "L 340 590",
  "C 338 570, 335 555, 330 540",
  "L 325 510",
  "C 322 495, 318 480, 315 465",
  "L 310 445",
  "C 312 430, 316 418, 320 412",
  "L 305 408",
  "C 285 413, 260 416, 240 410",
  "L 200 402",
  "C 170 406, 140 412, 120 414",
  "L 92 408",
  "C 75 403, 60 393, 55 380",
  "L 45 355",
  "C 40 345, 35 335, 30 322",
  "L 25 308",
  "C 20 298, 15 290, 8 284",
  "L 5 278",
  "C 8 262, 10 248, 10 238",
  "L 12 200",
  "C 12 180, 10 160, 8 140",
  "L 10 100",
  "C 15 75, 25 50, 40 35",
  "Z",
].join(" ");

export default countries;
