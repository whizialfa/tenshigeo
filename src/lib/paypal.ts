const API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export function paypalConfigured() {
  return Boolean(
    process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET,
  );
}

async function accessToken() {
  const id = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("PayPal auth failed");
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createPayPalOrder(opts: {
  totalUsd: number;
  returnUrl: string;
  cancelUrl: string;
}) {
  const token = await accessToken();
  const res = await fetch(`${API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: opts.totalUsd.toFixed(2),
          },
          description: "TenshiGeo digital map print",
        },
      ],
      application_context: {
        brand_name: "TenshiGeo",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: opts.returnUrl,
        cancel_url: opts.cancelUrl,
      },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal create failed: ${t}`);
  }
  return (await res.json()) as {
    id: string;
    links: { rel: string; href: string }[];
  };
}

export async function capturePayPalOrder(orderId: string) {
  const token = await accessToken();
  const res = await fetch(`${API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal capture failed: ${t}`);
  }
  return res.json();
}
