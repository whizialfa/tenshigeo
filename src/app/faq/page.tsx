export default function FaqPage() {
 const faqs = [
  {
   q: "Is TenshiGeo a poster shop?",
   a: "No. It is Wisdom Akpabio’s geospatial studio: analysis packages, publication maps, and custom work with a written fee. A city print studio exists as a side product.",
  },
  {
   q: "How does pricing work?",
   a: "Packages list starting prices (Brief / Standard / Deep dive). You send a request; you receive a written scope, fee, and timeline before any paid work starts.",
  },
  {
   q: "What do I receive?",
   a: "Typically PNG/PDF plates with cartographic furniture, GeoPackage or GeoTIFF layers, a short methods note, and optionally a MapLibre web map.",
  },
  {
   q: "Where are you based?",
   a: "Abuja, Nigeria. Remote-friendly worldwide. Tools: QGIS (incl. headless), Python geospatial stack, ArcGIS, Earth Engine–backed layers, MapLibre.",
  },
 ];

 return (
  <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
   <h1 className="font-display text-4xl font-bold text-ink">FAQ</h1>
   <div className="mt-10 space-y-4">
    {faqs.map((f) => (
     <div key={f.q} className="rounded-2xl border border-[var(--line)] bg-card shadow-sm rounded-2xl p-5">
      <h2 className="font-bold text-ink">{f.q}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
     </div>
    ))}
   </div>
  </div>
 );
}
