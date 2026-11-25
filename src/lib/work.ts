export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  place: string;
  outcome: string;
  problem: string;
  method: string;
  tags: string[];
  /** Local plate thumbnail under /public/work */
  thumb: string;
  href?: string;
  priceNote?: string;
}

/** Portfolio-first case studies — outcomes before services. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "15min-nigeria",
    title: "Fifteen minutes to a clinic — five Nigerian cities",
    client: "Independent research / public web map",
    place: "Lagos · Kano · Ibadan · Abuja · Port Harcourt",
    outcome:
      "City-comparable walking-access scores on real street networks, with hex plates and a live MapLibre map.",
    problem:
      "Buffer circles pretend the city is open ground. Decision-makers needed who can actually walk to care and school.",
    method:
      "OSM networks, clinic and school points, WorldPop/GHS population, F15 / PT / Gini-style metrics adapted from Bruno et al.",
    tags: ["Access", "Health", "Web map"],
    thumb: "/work/fifteen-min-cities.png",
    href: "https://whizialfa.github.io/15-min-cities-nigeria/",
    priceNote: "Adapt for your city from $750",
  },
  {
    slug: "kano-heat",
    title: "The City as Shade — Kano surface heat",
    client: "Publication study",
    place: "Kano metropolis",
    outcome:
      "Multi-year land-surface temperature and land-cover context with accuracy notes and A3 furniture.",
    problem:
      "Heat exposure is uneven. A city-wide average hides the wards that stay hot after sunset.",
    method:
      "Landsat LST time series, land-cover context, zonal stats, headless QGIS plates.",
    tags: ["Heat", "NDVI", "EO"],
    thumb: "/work/kano-heat.png",
    priceNote: "Sibling city packs from $400",
  },
  {
    slug: "healthcare-kano",
    title: "Healthcare pressure — Kano State",
    client: "Applied spatial analysis",
    place: "Kano State",
    outcome:
      "Ward-level pressure index where demand outruns facility supply, with a siting shortlist.",
    problem:
      "Facility dots alone do not show where capacity fails relative to age–sex demand.",
    method:
      "Population demand surface, facility supply kernel/catchments, pressure choropleth.",
    tags: ["Health", "Suitability"],
    thumb: "/work/healthcare-kano.png",
    priceNote: "State / metro packs from $450",
  },
  {
    slug: "centre-holds",
    title: "Where the Centre Holds — urban spread",
    client: "Paper replica / adaptation",
    place: "Lagos · Kano · Ibadan · Kaduna · Onitsha",
    outcome:
      "Distance rings from founding centres with population surfaces — does the centre still hold people?",
    problem:
      "Sprawl debates need numbers: how population sits relative to the historic centre.",
    method:
      "LGA outlines, 100 m rings, GHS-POP/WorldPop, publication plates and brief.",
    tags: ["Urban", "Population"],
    thumb: "/work/urban-spread.png",
    priceNote: "Multi-city panel from $900",
  },
  {
    slug: "jos-schools",
    title: "School accessibility — Jos",
    client: "Applied analysis",
    place: "Jos",
    outcome:
      "Terrain–road cost-distance to schools; children beyond a 30-minute threshold mapped.",
    problem:
      "Euclidean distance ignores hills and missing roads that keep children far from school.",
    method:
      "Cost-distance on terrain and road friction, threshold exposure map.",
    tags: ["Education", "Access"],
    thumb: "/work/jos-schools.png",
    priceNote: "Single-city access from $350",
  },
  {
    slug: "amac-dependency",
    title: "Dependent population — AMAC",
    client: "Applied analysis",
    place: "Abuja Municipal Area Council",
    outcome:
      "Child and elderly dependency intensity across wards — Nyanya, Wuse, Karu highest.",
    problem:
      "Service planning needs where dependents concentrate, not only total population.",
    method:
      "Age-structure rasters, ward choropleths, publication cartography.",
    tags: ["Demography", "Vulnerability"],
    thumb: "/work/amac-dependency.png",
    priceNote: "Ward packs from $350",
  },
];

export function getCase(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
