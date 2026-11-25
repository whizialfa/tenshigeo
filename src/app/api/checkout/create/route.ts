import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { fulfillOrder } from "@/lib/fulfill";
import {
  createPayPalOrder,
  paypalConfigured,
} from "@/lib/paypal";
import type { BagItem } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: BagItem[];
      email?: string;
      mode?: "demo" | "paypal";
    };

    if (!body.items?.length) {
      return NextResponse.json({ error: "Bag is empty" }, { status: 400 });
    }

    const totalUsd = body.items.reduce((s, i) => s + i.priceUsd, 0);
    const origin = req.nextUrl.origin;

    if (body.mode === "paypal" && paypalConfigured()) {
      const order = await createOrder({
        items: body.items,
        totalUsd,
        email: body.email,
      });
      const paypal = await createPayPalOrder({
        totalUsd,
        returnUrl: `${origin}/api/checkout/capture?orderToken=${order.token}`,
        cancelUrl: `${origin}/checkout`,
      });
      await import("@/lib/orders").then(({ updateOrder }) =>
        updateOrder(order.token, { paypalOrderId: paypal.id }),
      );
      const approve = paypal.links.find((l) => l.rel === "approve")?.href;
      return NextResponse.json({
        ok: true,
        token: order.token,
        approveUrl: approve,
      });
    }

    if (body.mode === "paypal" && !paypalConfigured()) {
      return NextResponse.json(
        {
          error:
            "PayPal is not configured. Use demo checkout or set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.",
        },
        { status: 400 },
      );
    }

    // Demo fulfillment
    const order = await createOrder({
      items: body.items,
      totalUsd,
      email: body.email,
    });
    await fulfillOrder({ ...order, status: "paid" });
    return NextResponse.json({ ok: true, token: order.token });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 },
    );
  }
}
