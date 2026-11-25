export type PackageTier = "brief" | "standard" | "deep";

export interface AnalysisPackage {
  slug: string;
  name: string;
  tagline: string;
  category:
    | "access"
    | "earth-observation"
    | "suitability"
    | "cartography"
    | "web";
  /** Why clients ask for this */
  demand: string;
  includes: string[];
  deliverables: string[];
  tiers: {
    id: PackageTier;
    label: string;
    priceFromUsd: number;
    days: string;
    note: string;
  }[];
  /** Matches Wisdom's proven work where true */
  proven?: boolean;
}

export interface ReadyMadeMap {
  slug: string;
  title: string;
  place: string;
  blurb: string;
  priceUsd: number;
  tags: string[];
  href?: string;
}

/**
 * In-demand geospatial work (Upwork / freelance GIS surveys + Wisdom's portfolio).
 * Tiers are starting prices for a clear written scope — final quote after brief.
 */
export const ANALYSIS_PACKAGES: AnalysisPackage[] = [
  {
    slug: "walking-access",
    name: "Walking access & catchments",
    tagline: "Who can reach a clinic, school, or shop in 15 minutes on real streets?",
    category: "access",
    demand:
      "Urban planners, NGOs, and health projects ask for network service areas more than Euclidean buffers — especially in African cities.",
    includes: [
      "Walk or drive network from OSM (or your roads)",
      "Facility points cleaned and snapped",
      "F15 / time-band population shares when population rasters exist",
      "Gap map and short methods note",
    ],
    deliverables: [
      "A3 publication plate (QGIS)",
      "GeoPackage of catchments",
      "Summary table (CSV)",
      "Methods paragraph",
    ],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 350,
        days: "5–7 days",
        note: "One city · one amenity type · one map plate",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 750,
        days: "10–14 days",
        note: "One city · clinics + schools · plates + web map",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 1400,
        days: "3–4 weeks",
        note: "Multi-city panel · inequality metrics · paper-style brief",
      },
    ],
    proven: true,
  },
  {
    slug: "heat-vegetation",
    name: "Urban heat & vegetation (NDVI / LST)",
    tagline: "Where the city runs hot, and where canopy cools it.",
    category: "earth-observation",
    demand:
      "Climate, public health, and city shade projects buy land-surface temperature and NDVI time series from Sentinel/Landsat.",
    includes: [
      "Multi-date LST and/or NDVI",
      "Zonal stats by ward / LGA",
      "Accuracy note where classification is used",
      "Publication cartography",
    ],
    deliverables: ["Map plates", "GeoTIFF stack", "Stats table", "Methods note"],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 400,
        days: "5–8 days",
        note: "Single season snapshot · one city",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 900,
        days: "2–3 weeks",
        note: "Multi-year trend · land-cover context",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 1600,
        days: "3–5 weeks",
        note: "Full brief + accuracy assessment + flowchart",
      },
    ],
    proven: true,
  },
  {
    slug: "lulc-change",
    name: "Land-use / land-cover change",
    tagline: "What the landscape was, what it became, and by how many hectares.",
    category: "earth-observation",
    demand:
      "Environment, agriculture, and due-diligence clients still top freelance GIS boards for LULC and change detection.",
    includes: [
      "Classification or change product from open imagery",
      "Hectare tables by class",
      "Before/after plates",
      "Confusion matrix when samples exist",
    ],
    deliverables: ["GeoTIFF", "Class table", "2–3 map plates", "Methods note"],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 450,
        days: "7–10 days",
        note: "Two dates · one AOI",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 1100,
        days: "2–3 weeks",
        note: "Multi-date · accuracy sample · report section",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 2000,
        days: "4–6 weeks",
        note: "Corridor or state-scale · prediction optional",
      },
    ],
    proven: true,
  },
  {
    slug: "site-suitability",
    name: "Site suitability & screening",
    tagline: "Rank places against your criteria — terrain, flood, access, land use.",
    category: "suitability",
    demand:
      "Renewables, logistics, real estate, and NGOs pay for weighted multi-criteria shortlists before field visits.",
    includes: [
      "Criteria workshop (weights visible)",
      "Constraint mask + suitability surface",
      "Ranked shortlist table",
      "Field checklist",
    ],
    deliverables: [
      "Suitability GeoTIFF",
      "Shortlist CSV",
      "Overview + inset plates",
      "Assumptions sheet",
    ],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 500,
        days: "7–10 days",
        note: "≤5 criteria · one region",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 1200,
        days: "2–3 weeks",
        note: "Full MCDM · sensitivity check · shortlist of 10",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 2500,
        days: "4–6 weeks",
        note: "Multi-region · stakeholder weights · decision memo",
      },
    ],
  },
  {
    slug: "flood-terrain",
    name: "Flood, terrain & hydrology",
    tagline: "Slope, catchments, drainage context, and flood exposure screening.",
    category: "suitability",
    demand:
      "Infrastructure and risk clients ask for DEM derivatives, catchments, and flood screening from open radar/optical stacks.",
    includes: [
      "DEM derivatives (slope, aspect, TPI as needed)",
      "Catchment / flow context",
      "Optional Sentinel-1 water proxy",
      "Exposure of assets you provide",
    ],
    deliverables: ["Derivative rasters", "Map plates", "Asset table", "Methods note"],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 400,
        days: "5–8 days",
        note: "Terrain pack · one AOI",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 950,
        days: "2–3 weeks",
        note: "Hydrology + asset exposure",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 1800,
        days: "3–5 weeks",
        note: "Multi-scenario screening · report",
      },
    ],
    proven: true,
  },
  {
    slug: "healthcare-pressure",
    name: "Healthcare demand & pressure",
    tagline: "Where population demand outruns facility supply.",
    category: "access",
    demand:
      "Ministries and NGOs need ward-level pressure maps, not just facility dots.",
    includes: [
      "Demand surface from age–sex population",
      "Supply kernel or catchment of facilities",
      "Pressure index by ward",
      "Priority list for siting",
    ],
    deliverables: ["Index GeoPackage", "Choropleth plates", "Priority CSV", "Brief"],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 450,
        days: "7–10 days",
        note: "One LGA / metro · one index",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 1000,
        days: "2–3 weeks",
        note: "Full state or metro · siting shortlist",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 1900,
        days: "3–5 weeks",
        note: "Scenarios + web map + policy memo",
      },
    ],
    proven: true,
  },
  {
    slug: "publication-maps",
    name: "Publication map pack",
    tagline: "House-quality A3 plates: title, legend, scale, north, footnote, credit.",
    category: "cartography",
    demand:
      "Researchers, consultants, and Upwork clients still buy cartography that survives a PDF and a slide deck.",
    includes: [
      "Headless QGIS / PyQGIS print layout",
      "Clipped study geometry (not a loose box)",
      "Furniture-aware zoom",
      "PNG + PDF",
    ],
    deliverables: ["PNG + PDF plates", "QGIS project on request", "CRS noted"],
    tiers: [
      {
        id: "brief",
        label: "Single plate",
        priceFromUsd: 120,
        days: "2–4 days",
        note: "One A3 figure from your layers",
      },
      {
        id: "standard",
        label: "Map pack",
        priceFromUsd: 450,
        days: "5–7 days",
        note: "3–5 coordinated plates",
      },
      {
        id: "deep",
        label: "Atlas / brief",
        priceFromUsd: 900,
        days: "10–14 days",
        note: "Plates + methodology flowchart + captions",
      },
    ],
    proven: true,
  },
  {
    slug: "web-map",
    name: "Interactive web map",
    tagline: "A public MapLibre / GitHub Pages map your stakeholders can click.",
    category: "web",
    demand:
      "Clients want shareable links after the static plate — filters, popups, mobile-friendly.",
    includes: [
      "MapLibre or Leaflet front end",
      "Styled layers + legend",
      "Hosted Pages handoff",
      "Source in a repo you own",
    ],
    deliverables: ["Live URL", "Repo", "README", "Optional static plate twin"],
    tiers: [
      {
        id: "brief",
        label: "Brief",
        priceFromUsd: 500,
        days: "7–10 days",
        note: "1–3 layers · simple popups",
      },
      {
        id: "standard",
        label: "Standard",
        priceFromUsd: 1100,
        days: "2–3 weeks",
        note: "Filters · basemap switch · mobile polish",
      },
      {
        id: "deep",
        label: "Deep dive",
        priceFromUsd: 2200,
        days: "3–5 weeks",
        note: "Multi-city · narrative UI · analytics optional",
      },
    ],
    proven: true,
  },
];

export const READY_MADE: ReadyMadeMap[] = [
  {
    slug: "15min-nigeria",
    title: "15-minute access — five Nigerian cities",
    place: "Lagos · Kano · Ibadan · Abuja · Port Harcourt",
    blurb:
      "Walk-time metrics to clinics and schools on real street networks, with hex plates and a public web map.",
    priceUsd: 85,
    tags: ["access", "health", "education"],
    href: "https://whizialfa.github.io/15-min-cities-nigeria/",
  },
  {
    slug: "kano-heat",
    title: "The City as Shade — Kano surface heat",
    place: "Kano metropolis",
    blurb:
      "Multi-year land-surface temperature and land-cover context with publication furniture.",
    priceUsd: 65,
    tags: ["heat", "NDVI", "LST"],
  },
  {
    slug: "centre-holds",
    title: "Where the Centre Holds — urban spread",
    place: "Lagos · Kano · Ibadan · Kaduna · Onitsha",
    blurb:
      "Distance rings from founding centres with population surfaces — does the centre still hold?",
    priceUsd: 75,
    tags: ["urban", "population"],
  },
  {
    slug: "healthcare-kano",
    title: "Healthcare pressure — Kano State",
    place: "Kano State",
    blurb:
      "Demand vs supply pressure index for wards where capacity runs short.",
    priceUsd: 70,
    tags: ["health", "access"],
  },
  {
    slug: "amac-dependency",
    title: "Dependent population — AMAC",
    place: "Abuja Municipal",
    blurb:
      "Child and elderly dependency intensity across AMAC wards.",
    priceUsd: 55,
    tags: ["demography", "vulnerability"],
  },
  {
    slug: "jos-schools",
    title: "School accessibility — Jos",
    place: "Jos",
    blurb:
      "Terrain–road cost-distance to schools; children beyond a 30-minute threshold.",
    priceUsd: 60,
    tags: ["education", "access"],
  },
];

export const RETAINER = {
  name: "GIS desk retainer",
  priceFromUsd: 1600,
  hours: 10,
  blurb:
    "Ten hours a month for QGIS edits, Python scripts, Earth Engine snippets, plate refreshes, and web-map fixes. Weekly written update. Extra hours quoted.",
};

export function getPackage(slug: string) {
  return ANALYSIS_PACKAGES.find((p) => p.slug === slug);
}
