import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import sharp from "sharp";
import { EDITIONS } from "./editions";
import { exportPixels, SIZES } from "./sizes";
import type { StudioDesign } from "./types";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export async function composePrintPng(opts: {
  mapDataUrl: string;
  design: StudioDesign;
  watermark?: boolean;
}): Promise<Buffer> {
  const { design, watermark } = opts;
  const edition = EDITIONS[design.editionId];
  const { width, height } = exportPixels(design.sizeId, 150);

  const margin = Math.round(width * 0.06);
  const footerBand = Math.round(height * 0.14);
  const mapH = height - footerBand - margin;
  const mapW = width - margin * 2;

  const base64 = opts.mapDataUrl.replace(/^data:image\/\w+;base64,/, "");
  const mapBuf = Buffer.from(base64, "base64");
  const mapResized = await sharp(mapBuf)
    .resize(mapW, mapH, { fit: "cover" })
    .png()
    .toBuffer();

  const paper = hexToRgb(edition.paper);
  const ink = hexToRgb(edition.label);
  const accent = hexToRgb(edition.accent);

  const svgFooter = `
    <svg width="${width}" height="${footerBand}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${edition.paper}"/>
      <line x1="${margin}" y1="8" x2="${width - margin}" y2="8" stroke="${edition.accent}" stroke-width="2"/>
      <text x="${margin}" y="${Math.round(footerBand * 0.42)}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.045)}" font-weight="700" fill="${edition.label}">${escapeXml(design.words.title)}</text>
      <text x="${margin}" y="${Math.round(footerBand * 0.68)}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.022)}" fill="${edition.label}" opacity="0.85">${escapeXml(design.words.subtitle)}</text>
      <text x="${margin}" y="${Math.round(footerBand * 0.9)}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.016)}" fill="${edition.accent}">${escapeXml(design.words.footer)} · © OpenStreetMap contributors</text>
    </svg>
  `;

  let img = sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: paper.r, g: paper.g, b: paper.b },
    },
  }).composite([
    { input: mapResized, top: margin, left: margin },
    {
      input: Buffer.from(svgFooter),
      top: height - footerBand,
      left: 0,
    },
  ]);

  if (watermark) {
    const wm = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="48%" text-anchor="middle" font-family="Helvetica" font-size="${Math.round(width * 0.08)}" fill="rgba(120,120,120,0.35)" transform="rotate(-28 ${width / 2} ${height / 2})">TENSHIGEO PREVIEW</text>
      </svg>
    `;
    img = sharp(await img.png().toBuffer()).composite([
      { input: Buffer.from(wm), top: 0, left: 0 },
    ]);
  }

  // thin accent border
  const bordered = await img.png().toBuffer();
  const borderSvg = `
    <svg width="${width}" height="${height}">
      <rect x="4" y="4" width="${width - 8}" height="${height - 8}" fill="none" stroke="rgb(${accent.r},${accent.g},${accent.b})" stroke-width="3"/>
    </svg>
  `;
  void ink;
  return sharp(bordered)
    .composite([{ input: Buffer.from(borderSvg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}

export async function pngToPdf(png: Buffer, design: StudioDesign): Promise<Buffer> {
  const size = SIZES[design.sizeId];
  // pdf-lib uses points (1/72 inch)
  const w = size.widthIn * 72;
  const h = size.heightIn * 72;
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([w, h]);
  const image = await pdf.embedPng(png);
  page.drawImage(image, { x: 0, y: 0, width: w, height: h });

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText("Map data © OpenStreetMap contributors · TenshiGeo", {
    x: 18,
    y: 10,
    size: 6,
    font,
    color: rgb(0.35, 0.35, 0.35),
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
