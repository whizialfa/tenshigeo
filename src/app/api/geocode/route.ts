import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "6");

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "TenshiGeo/1.0 (digital map prints; hello@tenshigeo.com)",
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { results: [], error: "Geocode failed" },
      { status: 502 },
    );
  }

  const data = (await res.json()) as {
    display_name: string;
    lat: string;
    lon: string;
  }[];

  return NextResponse.json({
    results: data.map((d) => ({
      display_name: d.display_name,
      lat: d.lat,
      lon: d.lon,
    })),
  });
}
