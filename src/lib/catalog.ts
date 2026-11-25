import { DESTINATIONS } from "./destinations";
import { EDITIONS, EDITION_LIST } from "./editions";
import type { CatalogProduct, EditionId, StudioDesign } from "./types";

const CITY_EDITIONS: EditionId[] = [
  "midnight-gold",
  "ink-ivory",
  "coastal-blue",
  "botanical-sage",
  "blue-hour",
  "warm-ember",
  "slate-line",
];

function cityProducts(): CatalogProduct[] {
  const out: CatalogProduct[] = [];
  for (const city of DESTINATIONS) {
    for (const editionId of CITY_EDITIONS) {
      const edition = EDITIONS[editionId];
      out.push({
        slug: `${city.id}-${editionId}`,
        title: `${city.name} — ${edition.name}`,
        subtitle: `${edition.tagline}. Real OpenStreetMap streets.`,
        destinationId: city.id,
        editionId,
        occasion: "city",
        priceUsd: 6,
        defaultSize: "a3",
        words: {
          title: city.name.toUpperCase(),
          subtitle: city.country,
          footer: "TenshiGeo · OpenStreetMap",
        },
      });
    }
  }
  return out;
}

const NARRATIVE: CatalogProduct[] = [
  {
    slug: "where-we-met-london-paris",
    title: "Where We Met",
    subtitle: "Two cities, one story — London & Paris",
    destinationId: "london",
    editionId: "warm-ember",
    occasion: "love",
    priceUsd: 12,
    defaultSize: "a3",
    words: {
      title: "WHERE WE MET",
      subtitle: "London · Paris",
      footer: "A map of beginnings",
    },
    narrative: {
      kind: "met",
      places: [
        { name: "London", lat: 51.5074, lon: -0.1278 },
        { name: "Paris", lat: 48.8566, lon: 2.3522 },
      ],
    },
  },
  {
    slug: "our-love-story-new-york",
    title: "Our Love Story",
    subtitle: "A New York keepsake map",
    destinationId: "new-york",
    editionId: "midnight-gold",
    occasion: "love",
    priceUsd: 10,
    defaultSize: "30x40",
    words: {
      title: "OUR LOVE STORY",
      subtitle: "New York City",
      footer: "The streets that held us",
    },
    narrative: { kind: "love" },
  },
  {
    slug: "distance-map-lagos-london",
    title: "Distance Map",
    subtitle: "Lagos ↔ London — the miles between",
    destinationId: "lagos",
    editionId: "coastal-blue",
    occasion: "distance",
    priceUsd: 12,
    defaultSize: "a3",
    words: {
      title: "ACROSS THE DISTANCE",
      subtitle: "Lagos · London",
      footer: "Still close",
    },
    narrative: {
      kind: "distance",
      places: [
        { name: "Lagos", lat: 6.5244, lon: 3.3792 },
        { name: "London", lat: 51.5074, lon: -0.1278 },
      ],
    },
  },
  {
    slug: "proposal-rome",
    title: "The Proposal",
    subtitle: "Mark the place it happened — Rome",
    destinationId: "rome",
    editionId: "ink-ivory",
    occasion: "proposal",
    priceUsd: 10,
    defaultSize: "a3",
    words: {
      title: "SHE SAID YES",
      subtitle: "Rome",
      footer: "The day everything changed",
    },
    narrative: { kind: "proposal" },
  },
  {
    slug: "european-capitals-book",
    title: "European Capitals Map Book",
    subtitle: "12-page digital edition + 10 city PNGs",
    destinationId: "paris",
    editionId: "ink-ivory",
    occasion: "book",
    priceUsd: 30,
    defaultSize: "a4",
    words: {
      title: "EUROPEAN CAPITALS",
      subtitle: "A TenshiGeo collection",
      footer: "Digital map book",
    },
    isBook: true,
    bookCities: [
      "london",
      "paris",
      "rome",
      "berlin",
      "madrid",
      "amsterdam",
      "lisbon",
      "vienna",
      "tokyo",
      "singapore",
    ],
  },
];

export const CATALOG: CatalogProduct[] = [...cityProducts(), ...NARRATIVE];

export function getProduct(slug: string) {
  return CATALOG.find((p) => p.slug === slug);
}

export function productsByOccasion(occasion: string) {
  return CATALOG.filter((p) => p.occasion === occasion);
}

export function productsByDestination(destinationId: string) {
  return CATALOG.filter((p) => p.destinationId === destinationId);
}

export function productsByEdition(editionId: EditionId) {
  return CATALOG.filter((p) => p.editionId === editionId);
}

export function featuredProducts(limit = 8) {
  const picks = [
    "london-midnight-gold",
    "paris-ink-ivory",
    "lagos-coastal-blue",
    "tokyo-blue-hour",
    "new-york-warm-ember",
    "rome-botanical-sage",
    "where-we-met-london-paris",
    "european-capitals-book",
  ];
  return picks
    .map((s) => getProduct(s))
    .filter((p): p is CatalogProduct => Boolean(p))
    .slice(0, limit);
}

export function productToDesign(product: CatalogProduct): StudioDesign {
  const dest = DESTINATIONS.find((d) => d.id === product.destinationId)!;
  return {
    placeName: dest.name,
    lat: dest.lat,
    lon: dest.lon,
    zoom: dest.zoom,
    bearing: dest.bearing ?? 0,
    editionId: product.editionId,
    sizeId: product.defaultSize,
    words: { ...product.words },
    productSlug: product.slug,
  };
}

export function editionSwatches() {
  return EDITION_LIST.map((e) => ({
    id: e.id,
    name: e.name,
    land: e.land,
    road: e.road,
    water: e.water,
  }));
}

export const BASE_PRICE_USD = 6;
