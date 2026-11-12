import Link from 'next/link';import {getContent,getProducts,getClients} from '@/lib/db';import {SV} from '@/lib/defaults';
import Reveal from '@/components/Reveal';import PCard from '@/components/PCard';import SplitText from '@/components/SplitText';import Counter from '@/components/Counter';import HeroFx from '@/components/HeroFx';import Who from '@/components/Who';import PCCard from '@/components/PCCard';import Clients from '@/components/Clients';
export const revalidate=60;
export const metadata={alternates:{canonical:'/'}};
export default async function Home(){const [t,P,C]=await Promise.all([getContent(),getProducts(),getClients()]);const u=process.env.NEXT_PUBLIC_SITE_URL||'';
const ld={'@context':'https://schema.org','@type':'LocalBusiness',name:t.brand,url:u,telephone:t.phone,email:t.email,address:t.address,description:t.about_text};
const H=true;
return <main id="top">
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<section className="relative md:min-h-[85vh] flex items-center px-6 md:px-12 pt-24 md:pt-32 pb-16 grain overflow-hidden">
<HeroFx/>
<div className={'relative z-10 max-w-6xl mx-auto w-full grid gap-10 md:gap-12 '+(H?'md:grid-cols-[1fr_1.15fr] items-start':'justify-items-center text-center')}>
<div><Reveal><p className="text-xs tracking-[.4em] uppercase text-white/50 mb-8">Trusted Printing Partner</p></Reveal>
<SplitText text={t.hero_title} className="font-serif text-5xl md:text-7xl leading-[1.1]"/>
<Reveal d={.2}><p className={`mt-8 text-white/60 max-w-xl text-base md:text-lg ${H?'':'mx-auto'}`}>{t.hero_sub}</p></Reveal>
<Reveal d={.3}><div className={`mt-10 flex flex-wrap gap-4 ${H?'':'justify-center'}`}><Link href="/contact" className="btn">{t.hero_cta}</Link><Link href="/papercut" className="btn">PaperCut Software</Link></div></Reveal></div>
{H&&<Reveal d={.2} className="order-first md:order-last"><div className="relative aspect-[16/10] border border-white/20 overflow-hidden">{t.hero_image?<img src={t.hero_image} alt={t.hero_title} width="1280" height="800" decoding="async" className="w-full h-full object-cover"/>:<div className="fl w-full h-full grid place-items-center font-serif text-7xl text-white/15">WWS</div>}</div></Reveal>}</div></section>
<div className="overflow-hidden border-y border-white/15 py-5"><div className="mq flex w-max gap-12 font-serif text-2xl text-white/40 whitespace-nowrap">
{[0,1].flatMap(k=>['Printer Rental','Print Servers','PaperCut','Toners','Cartridges','Bulk Printing','Universities','Banks'].map(w=><span key={k+w}>{w} ✦</span>))}</div></div>
<Who t={t} more/>
<section className="w px-6 md:px-12 py-24"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
<div><p className="text-xs tracking-[.4em] uppercase text-black/50 mb-4">About Us</p><Reveal><h2 className="font-serif text-4xl md:text-6xl leading-tight">{t.about_title}</h2></Reveal></div>
<Reveal d={.15}><p className="text-lg text-black/70">{t.about_text}</p>
<div className="grid grid-cols-3 gap-4 mt-10">{[1,2,3].map(i=><div key={i}><div className="font-serif text-4xl"><Counter value={t['stat'+i]}/></div><div className="text-xs uppercase tracking-widest text-black/50 mt-2">{t['stat'+i+'_l']}</div></div>)}</div>
<Link href="/about" className="btn mt-10">Read more about us</Link></Reveal></div></section>
<section className="px-6 md:px-12 py-24 max-w-6xl mx-auto"><Reveal><h2 className="font-serif text-4xl md:text-6xl mb-14">{t.services_title}</h2></Reveal>
{SV.map((s,i)=><Reveal key={s}><Link href={'/services/'+s} className="group grid md:grid-cols-[80px_1fr_1.4fr] gap-3 md:gap-10 py-9 border-t border-white/20 hover:bg-white hover:text-black transition-all duration-500 md:px-6">
<span className="font-serif text-white/40 group-hover:text-black/40">0{i+1}</span><h3 className="font-serif text-2xl md:text-3xl">{t['s'+(i+1)+'_title']}</h3><p className="text-white/60 group-hover:text-black/70">{t['s'+(i+1)+'_text']}</p></Link></Reveal>)}</section>
<section className="w px-6 md:px-12 py-24"><div className="max-w-6xl mx-auto"><Reveal><p className="text-xs tracking-[.4em] uppercase text-black/50 mb-4">Software</p><h2 className="font-serif text-4xl md:text-6xl">{t.pc_title}</h2><p className="mt-4 text-black/60 max-w-2xl mb-12">{t.pc_intro}</p></Reveal>
<div className="grid md:grid-cols-2 gap-6"><Reveal><PCCard t={t} e="ng"/></Reveal><Reveal d={.1}><PCCard t={t} e="mf"/></Reveal></div></div></section>
{C.length>0&&<section className="px-6 md:px-12 py-24"><div className="max-w-6xl mx-auto"><Reveal><h2 className="font-serif text-4xl md:text-6xl text-center mb-14">{t.clients_title}</h2><Clients items={C}/></Reveal></div></section>}
<section className="w px-6 md:px-12 py-24"><div className="max-w-6xl mx-auto"><Reveal><h2 className="font-serif text-4xl md:text-6xl">{t.products_title}</h2><p className="mt-4 text-black/60 mb-12">{t.products_sub}</p></Reveal>
{!P.length&&<p className="text-black/40">Products coming soon.</p>}
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{P.slice(0,3).map((p,i)=><Reveal key={p.id} d={i*.08}><PCard p={p}/></Reveal>)}</div>
<Reveal><Link href="/products" className="btn mt-12">View all products</Link></Reveal></div></section>
</main>}
