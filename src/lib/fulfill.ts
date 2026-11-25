import { promises as fs } from "fs";
import sharp from "sharp";
import { EDITIONS } from "./editions";
import { composePrintPng, pngToPdf } from "./render";
import { orderFilePath, updateOrder } from "./orders";
import type { BagItem, OrderRecord } from "./types";
import { exportPixels } from "./sizes";

async function placeholderMap(item: BagItem): Promise<string> {
  const edition = EDITIONS[item.design.editionId];
  const { width, height } = exportPixels(item.design.sizeId, 120);
  const mapH = Math.round(height * 0.75);
  const svg = `
    <svg width="${width}" height="${mapH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${edition.land}"/>
      <path d="M0 ${mapH * 0.7} Q${width * 0.3} ${mapH * 0.55} ${width * 0.55} ${mapH * 0.68} T${width} ${mapH * 0.6} V${mapH} H0 Z" fill="${edition.water}"/>
      ${Array.from({ length: 12 })
        .map((_, i) => {
          const x = (width / 13) * (i + 1);
          return `<path d="M${x} 0 L${x + (i % 2) * 8} ${mapH}" stroke="${edition.road}" stroke-width="${1 + (i % 3)}" opacity="0.7"/>`;
        })
        .join("")}
      ${Array.from({ length: 8 })
        .map((_, i) => {
          const y = (mapH / 9) * (i + 1);
          return `<path d="M0 ${y} L${width} ${y + (i % 2) * 6}" stroke="${edition.road}" stroke-width="0.9" opacity="0.55"/>`;
        })
        .join("")}
    </svg>
  `;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export async function fulfillOrder(order: OrderRecord): Promise<OrderRecord> {
  const files: OrderRecord["files"] = [];

  for (const item of order.items) {
    const mapDataUrl = item.mapDataUrl || (await placeholderMap(item));
    const png = await composePrintPng({
      mapDataUrl,
      design: item.design,
      watermark: false,
    });
    const pdf = await pngToPdf(png, item.design);
    const pngPath = orderFilePath(order.token, item.id, "png");
    const pdfPath = orderFilePath(order.token, item.id, "pdf");
    await fs.writeFile(pngPath, png);
    await fs.writeFile(pdfPath, pdf);
    files.push({ itemId: item.id, pngPath, pdfPath });
  }

  const updated = await updateOrder(order.token, {
    status: "fulfilled",
    files,
  });
  return updated!;
}
