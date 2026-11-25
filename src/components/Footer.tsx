import Link from "next/link";

export function Footer() {
 return (
  <footer className="bg-slate-950 text-white mt-auto">
   <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
    <div>
     <p className="font-display text-2xl font-bold" aria-label="TenshiGeo">
      Tenshi<span className="text-sea-bright">Geo</span>
     </p>
     <p className="text-[#cbd5e1] mt-3 max-w-xs text-sm leading-relaxed">
      Studio of Wisdom Akpabio — geospatial analysis, publication maps, and
      web maps with a written fee before work starts.
     </p>
    </div>
    <div className="text-sm">
     <p className="mb-3 font-semibold text-sea-bright">Navigate</p>
     <ul className="text-[#cbd5e1] space-y-2">
      <li>
       <Link href="/work">Selected work</Link>
      </li>
      <li>
       <Link href="/analysis">Services</Link>
      </li>
      <li>
       <Link href="/request">Request a quote</Link>
      </li>
      <li>
       <Link href="/studio">Print studio</Link>
      </li>
     </ul>
    </div>
    <div className="text-sm">
     <p className="mb-3 font-semibold text-sea-bright">Contact</p>
     <ul className="text-[#cbd5e1] space-y-2">
      <li>
       <a
        href="mailto:wisdomakpabio27@gmail.com"
        className="break-all"
       >
        wisdomakpabio27@gmail.com
       </a>
      </li>
      <li>
       <a
        href="https://linkedin.com/in/wisdom-akpabio-geospatial"
        target="_blank"
        rel="noreferrer"
       >
        LinkedIn
       </a>
      </li>
      <li>
       <a href="https://github.com/whizialfa" target="_blank" rel="noreferrer">
        GitHub
       </a>
      </li>
      <li>
       <Link href="/faq">FAQ</Link>
      </li>
     </ul>
    </div>
   </div>
   <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-[#94a3b8]">
    © {new Date().getFullYear()} TenshiGeo · Wisdom Akpabio · Abuja, Nigeria
   </div>
  </footer>
 );
}
