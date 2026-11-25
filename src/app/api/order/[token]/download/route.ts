import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { fulfillOrder } from "@/lib/fulfill";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  const itemId = req.nextUrl.searchParams.get("item");
  const format = req.nextUrl.searchParams.get("format") || "png";

  if (!itemId || (format !== "png" && format !== "pdf")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  let order = await getOrder(token);
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (order.status === "pending") {
    return NextResponse.json({ error: "Order not paid" }, { status: 402 });
  }

  if (!order.files?.length) {
    order = await fulfillOrder(order);
  }

  const file = order.files?.find((f) => f.itemId === itemId);
  if (!file) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const path = format === "pdf" ? file.pdfPath : file.pngPath;
  const data = await fs.readFile(path);
  const contentType = format === "pdf" ? "application/pdf" : "image/png";

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="tenshigeo-${itemId}.${format}"`,
    },
  });
}
