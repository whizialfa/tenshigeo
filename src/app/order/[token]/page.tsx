import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";

/** Placeholder param so static export can emit one order route. */
export function generateStaticParams() {
  return [{ token: "local" }];
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (process.env.GITHUB_PAGES === "true" || token === "local") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-sea">Orders</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink">
          Downloads need the studio server
        </h1>
        <p className="mt-4 text-ink-soft">
          This GitHub Pages build is the public portfolio. Print checkout and
          private download links run when TenshiGeo is hosted with Node (local{" "}
          <code className="text-sm">npm run dev</code> or a full host).
        </p>
        <Link
          href="/request"
          className="mt-8 inline-flex items-center justify-center tg-link-on-dark rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white"
        >
          Request a quote instead
        </Link>
      </div>
    );
  }

  const order = await getOrder(token);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-sea">Order ready</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Your downloads</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Bookmark this private link. No account required. Status:{" "}
        <strong>{order!.status}</strong>
      </p>

      <div className="mt-8 space-y-4">
        {order!.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[var(--line)] bg-card p-5"
          >
            <p className="font-semibold">{item.label}</p>
            <p className="text-xs text-ink-soft">
              {item.design.placeName} · {item.design.editionId} ·{" "}
              {item.design.sizeId}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`/api/order/${token}/download?item=${item.id}&format=png`}
                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white"
              >
                Download PNG
              </a>
              <a
                href={`/api/order/${token}/download?item=${item.id}&format=pdf`}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold text-ink"
              >
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      <Link href="/" className="mt-10 inline-block text-sm font-bold text-sea">
        ← Back home
      </Link>
    </div>
  );
}
