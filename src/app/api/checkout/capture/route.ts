import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";
import { fulfillOrder } from "@/lib/fulfill";
import { capturePayPalOrder } from "@/lib/paypal";

export async function GET(req: NextRequest) {
  const orderToken = req.nextUrl.searchParams.get("orderToken");
  if (!orderToken) {
    return NextResponse.redirect(new URL("/checkout", req.url));
  }

  const order = await getOrder(orderToken);
  if (!order) {
    return NextResponse.redirect(new URL("/checkout", req.url));
  }

  try {
    if (order.paypalOrderId) {
      await capturePayPalOrder(order.paypalOrderId);
    }
    await updateOrder(order.token, { status: "paid" });
    const fresh = await getOrder(order.token);
    if (fresh) await fulfillOrder(fresh);
  } catch {
    // still send user to order page
  }

  return NextResponse.redirect(new URL(`/order/${order.token}`, req.url));
}
