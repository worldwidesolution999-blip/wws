import Link from 'next/link';import {SV,digits} from '@/lib/defaults';
const H=({c})=><p className="text-white text-[11px] tracking-[.3em] uppercase mb-5">{c}</p>;
export default function Footer({t}){const tel=t.phone.replace(/\s/g,'');
return <footer>
<div className="bg-gradient-to-r from-[#0D2A66] to-[#08183A] border-t border-white/10 px-6 md:px-12 py-16"><div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
<div><h2 className="font-serif text-3xl md:text-5xl">{t.cta_title}</h2><p className="mt-3 text-white/60">{t.cta_sub}</p></div>
<div className="flex flex-wrap gap-4"><Link href="/contact" className="btn !bg-white !text-black hover:!bg-transparent hover:!text-white">Contact Us</Link><a href={'tel:'+tel} className="btn">Call Now</a></div></div></div>
<div className="bg-deep px-6 md:px-12 pt-16 pb-8"><div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 text-sm text-white/60">
<div><p className="font-serif text-3xl text-white leading-tight">{t.brand}</p><p className="mt-4 max-w-xs leading-relaxed">{t.footer_text}</p></div>
<div><H c="Company"/><div className="grid gap-3"><Link href="/" className="hover:text-white">Home</Link><Link href="/about" className="hover:text-white">About Us</Link><Link href="/products" className="hover:text-white">Products</Link><Link href="/faq" className="hover:text-white">FAQs</Link><Link href="/guides" className="hover:text-white">Guides</Link><Link href="/contact" className="hover:text-white">Contact</Link></div></div>
<div><H c="Solutions"/><div className="grid gap-3">{SV.map((s,i)=><Link key={s} href={'/services/'+s} className="hover:text-white">{t['s'+(i+1)+'_title']}</Link>)}<Link href="/papercut/ng" className="hover:text-white">PaperCut NG in Pakistan</Link><Link href="/papercut/mf" className="hover:text-white">PaperCut MF in Pakistan</Link></div></div>
<div><H c="Get in touch"/><div className="grid gap-3"><a href={'tel:'+tel} className="hover:text-white">Call: {t.phone}</a><a href={'https://wa.me/'+digits(t.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp: {t.whatsapp}</a><a href={'mailto:'+t.email} className="hover:text-white">{t.email}</a><p>{t.address}</p></div></div></div>
<div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40 tracking-wider"><p>{t.footer}</p><a href="#top" className="hover:text-white">Back to top ↑</a></div></div></footer>}
