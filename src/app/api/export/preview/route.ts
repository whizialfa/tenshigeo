import { NextRequest, NextResponse } from "next/server";
import { composePrintPng } from "@/lib/render";
import type { StudioDesign } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      mapDataUrl: string;
      design: StudioDesign;
    };
    if (!body.mapDataUrl || !body.design) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }
    const png = await composePrintPng({
      mapDataUrl: body.mapDataUrl,
      design: body.design,
      watermark: true,
    });
    return new NextResponse(new Uint8Array(png), {
      headers: { "Content-Type": "image/png" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Export failed" },
      { status: 500 },
    );
  }
}
