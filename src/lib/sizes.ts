import type { PrintSize, SizeId } from "./types";

export const SIZES: Record<SizeId, PrintSize> = {
  a4: {
    id: "a4",
    label: "A4",
    widthMm: 210,
    heightMm: 297,
    widthIn: 8.27,
    heightIn: 11.69,
  },
  a3: {
    id: "a3",
    label: "A3",
    widthMm: 297,
    heightMm: 420,
    widthIn: 11.69,
    heightIn: 16.54,
  },
  "30x40": {
    id: "30x40",
    label: "30 × 40 cm",
    widthMm: 300,
    heightMm: 400,
    widthIn: 11.81,
    heightIn: 15.75,
  },
  "50x70": {
    id: "50x70",
    label: "50 × 70 cm",
    widthMm: 500,
    heightMm: 700,
    widthIn: 19.69,
    heightIn: 27.56,
  },
  "12x16": {
    id: "12x16",
    label: '12 × 16 in',
    widthMm: 305,
    heightMm: 406,
    widthIn: 12,
    heightIn: 16,
  },
  "18x24": {
    id: "18x24",
    label: '18 × 24 in',
    widthMm: 457,
    heightMm: 610,
    widthIn: 18,
    heightIn: 24,
  },
};

export const SIZE_LIST = Object.values(SIZES);

/** Export pixel size at ~150 DPI for digital download */
export function exportPixels(sizeId: SizeId, dpi = 150) {
  const s = SIZES[sizeId];
  return {
    width: Math.round(s.widthIn * dpi),
    height: Math.round(s.heightIn * dpi),
  };
}
