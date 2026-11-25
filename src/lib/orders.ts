import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { BagItem, OrderRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const FILES_DIR = path.join(DATA_DIR, "files");

async function ensure() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(FILES_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<OrderRecord[]> {
  await ensure();
  const raw = await fs.readFile(ORDERS_FILE, "utf8");
  return JSON.parse(raw) as OrderRecord[];
}

async function writeAll(orders: OrderRecord[]) {
  await ensure();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export function newOrderToken() {
  return randomBytes(18).toString("hex");
}

export async function createOrder(input: {
  items: BagItem[];
  totalUsd: number;
  email?: string;
  paypalOrderId?: string;
}): Promise<OrderRecord> {
  const order: OrderRecord = {
    token: newOrderToken(),
    createdAt: new Date().toISOString(),
    email: input.email,
    status: "pending",
    paypalOrderId: input.paypalOrderId,
    items: input.items,
    totalUsd: input.totalUsd,
  };
  const all = await readAll();
  all.push(order);
  await writeAll(all);
  return order;
}

export async function getOrder(token: string) {
  const all = await readAll();
  return all.find((o) => o.token === token) ?? null;
}

export async function updateOrder(
  token: string,
  patch: Partial<OrderRecord>,
): Promise<OrderRecord | null> {
  const all = await readAll();
  const idx = all.findIndex((o) => o.token === token);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch };
  await writeAll(all);
  return all[idx];
}

export function filesDir() {
  return FILES_DIR;
}

export function orderFilePath(token: string, itemId: string, ext: "png" | "pdf") {
  return path.join(FILES_DIR, `${token}_${itemId}.${ext}`);
}
