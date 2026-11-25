export type EditionId =
  | "midnight-gold"
  | "ink-ivory"
  | "coastal-blue"
  | "botanical-sage"
  | "blue-hour"
  | "warm-ember"
  | "slate-line";

export type SizeId =
  | "a4"
  | "a3"
  | "30x40"
  | "50x70"
  | "12x16"
  | "18x24";

export type OccasionId =
  | "city"
  | "love"
  | "gift"
  | "proposal"
  | "distance"
  | "book";

export interface Edition {
  id: EditionId;
  name: string;
  tagline: string;
  land: string;
  water: string;
  road: string;
  majorRoad: string;
  park: string;
  building: string;
  label: string;
  paper: string;
  accent: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  zoom: number;
  bearing?: number;
}

export interface PrintSize {
  id: SizeId;
  label: string;
  widthMm: number;
  heightMm: number;
  widthIn: number;
  heightIn: number;
}

export interface CatalogProduct {
  slug: string;
  title: string;
  subtitle: string;
  destinationId: string;
  editionId: EditionId;
  occasion: OccasionId;
  priceUsd: number;
  defaultSize: SizeId;
  words: {
    title: string;
    subtitle: string;
    footer: string;
  };
  narrative?: {
    kind: "met" | "love" | "distance" | "proposal";
    places?: { name: string; lat: number; lon: number }[];
  };
  isBook?: boolean;
  bookCities?: string[];
}

export interface StudioDesign {
  placeName: string;
  lat: number;
  lon: number;
  zoom: number;
  bearing: number;
  editionId: EditionId;
  sizeId: SizeId;
  words: {
    title: string;
    subtitle: string;
    footer: string;
  };
  productSlug?: string;
}

export interface BagItem {
  id: string;
  design: StudioDesign;
  priceUsd: number;
  label: string;
  /** Base64 PNG of the map canvas (no frame) for fulfillment */
  mapDataUrl?: string;
}

export interface OrderRecord {
  token: string;
  createdAt: string;
  email?: string;
  status: "pending" | "paid" | "fulfilled";
  paypalOrderId?: string;
  items: BagItem[];
  totalUsd: number;
  files?: { itemId: string; pngPath: string; pdfPath: string }[];
}
