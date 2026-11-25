import { NextRequest, NextResponse } from "next/server";
import { buildEditionStyle } from "@/lib/mapStyle";
import type { EditionId } from "@/lib/types";
import { EDITIONS } from "@/lib/editions";

export async function GET(req: NextRequest) {
  const edition = (req.nextUrl.searchParams.get("edition") ||
    "ink-ivory") as EditionId;
  if (!(edition in EDITIONS)) {
    return NextResponse.json({ error: "Unknown edition" }, { status: 400 });
  }
  try {
    const style = await buildEditionStyle(edition);
    return NextResponse.json(style, {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Style failed" },
      { status: 502 },
    );
  }
}
