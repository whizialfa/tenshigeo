import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const FILE = path.join(process.cwd(), "data", "requests.json");

async function ensure() {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  try {
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, string>;
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    await ensure();
    const raw = await fs.readFile(FILE, "utf8");
    const all = JSON.parse(raw) as Record<string, unknown>[];
    const id = `req_${randomBytes(6).toString("hex")}`;
    all.push({
      id,
      createdAt: new Date().toISOString(),
      ...body,
    });
    await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed" },
      { status: 500 },
    );
  }
}
