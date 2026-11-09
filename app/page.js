import {getContent,getProducts} from '@/lib/db';import Nav from '@/components/Nav';import Reveal from '@/components/Reveal';
export const revalidate=60;
export default async function Home(){const t=await getContent();const P=await getProducts();
const url=process.env.NEXT_PUBLIC_SITE_URL||'';
const ld=[{'@context':'https://schema.org','@type':'LocalBusiness',name:t.brand,url,telephone:t.phone,email:t.email,address:t.address,description:t.about_text,
makesOffer:[1,2,3,4].map(i=>({'@type':'Offer',itemOffered:{'@type':'Service',name:t['s'+i+'_title'],description:t['s'+i+'_text']}}))},
{'@context':'https://schema.org','@type':'FAQPage',mainEntity:[1,2,3].map(i=>({'@type':'Question',name:t['q'+i],acceptedAnswer:{'@type':'Answer',text:t['a'+i]}}))}];
const wa='https://wa.me/'+t.phone.replace(/\D/g,'');
return <main>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<Nav brand={t.brand}/>
<section id="home" className="relative min-h-screen grid place-items-center px-6 grain overflow-hidden">
<div className="fl absolute right-[8%] top-[22%] w-40 h-40 md:w-72 md:h-72 border border-white/20 rounded-full"/>
<div className="max-w-5xl text-center"><Reveal><p className="text-xs tracking-[.4em] uppercase text-white/50 mb-8">Est. Printing Excellence</p></Reveal>
<Reveal d={.15}><h1 className="font-serif text-5xl md:text-8xl leading-[1.05]">{t.hero_title}</h1></Reveal>
<Reveal d={.3}><p className="mt-8 text-white/60 max-w-2xl mx-auto text-base md:text-lg">{t.hero_sub}</p></Reveal>
<Reveal d={.45}><a href="#contact" className="btn mt-12">{t.hero_cta}</a></Reveal></div></section>
<div className="overflow-hidden border-y border-white/15 py-5"><div className="mq flex w-max gap-12 font-serif text-2xl text-white/40 whitespace-nowrap">
{[...Array(2)].flatMap((_,k)=>['Printer Rental','Print Servers','Toners','Cartridges','Bulk Printing','Universities','Banks'].map(w=><span key={k+w}>{w} ✦</span>))}</div></div>
<section className="bg-white text-black px-6 md:px-12 py-28"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
<Reveal><h2 className="font-serif text-4xl md:text-6xl leading-tight">{t.about_title}</h2></Reveal>
<Reveal d={.2}><p className="text-lg text-black/70">{t.about_text}</p>
<div className="grid grid-cols-3 gap-4 mt-12">{[1,2,3].map(i=><div key={i}><div className="font-serif text-4xl">{t['stat'+i]}</div><div className="text-xs uppercase tracking-widest text-black/50 mt-2">{t['stat'+i+'_l']}</div></div>)}</div></Reveal></div></section>
<section id="services" className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
<Reveal><h2 className="font-serif text-4xl md:text-6xl mb-16">{t.services_title}</h2></Reveal>
{[1,2,3,4].map(i=><Reveal key={i}><div className="group grid md:grid-cols-[80px_1fr_1.4fr] gap-4 md:gap-10 py-10 border-t border-white/20 hover:bg-white hover:text-black transition-all duration-500 md:px-6">
<span className="font-serif text-white/40 group-hover:text-black/40">0{i}</span><h3 className="font-serif text-2xl md:text-3xl">{t['s'+i+'_title']}</h3><p className="text-white/60 group-hover:text-black/70">{t['s'+i+'_text']}</p></div></Reveal>)}</section>
<section id="products" className="bg-white text-black px-6 md:px-12 py-28"><div className="max-w-6xl mx-auto">
<Reveal><h2 className="font-serif text-4xl md:text-6xl">{t.products_title}</h2><p className="mt-4 text-black/60 mb-14">{t.products_sub}</p></Reveal>
{P.length===0&&<p className="text-black/40">Products coming soon.</p>}
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{P.map((p,i)=><Reveal key={p.id} d={(i%3)*.1}><article className="group border border-black/15 hover:border-black transition">
<div className="aspect-[4/3] bg-black/5 overflow-hidden grid place-items-center">{p.image?<img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>:<span className="font-serif text-6xl text-black/20">{p.name[0]}</span>}</div>
<div className="p-6"><p className="text-xs uppercase tracking-widest text-black/50">{p.category}</p><h3 className="font-serif text-2xl mt-1">{p.name}</h3><p className="text-black/60 mt-2 text-sm">{p.descr}</p></div></article></Reveal>)}</div></div></section>
<section id="faq" className="px-6 md:px-12 py-28 max-w-4xl mx-auto"><Reveal><h2 className="font-serif text-4xl md:text-6xl mb-12">{t.faq_title}</h2></Reveal>
{[1,2,3].map(i=><Reveal key={i}><details className="group border-t border-white/20 py-6"><summary className="cursor-pointer font-serif text-xl md:text-2xl flex justify-between list-none">{t['q'+i]}<span className="group-open:rotate-45 transition">+</span></summary><p className="mt-4 text-white/60">{t['a'+i]}</p></details></Reveal>)}</section>
<section id="contact" className="bg-white text-black px-6 py-28 text-center"><Reveal><h2 className="font-serif text-5xl md:text-8xl">{t.contact_title}</h2>
<div className="mt-12 space-y-2 text-lg"><p><a href={'tel:'+t.phone}>{t.phone}</a></p><p><a href={'mailto:'+t.email}>{t.email}</a></p><p className="text-black/60">{t.address}</p></div>
<a href={wa} className="inline-block mt-10 border border-black px-8 py-4 text-xs tracking-[.2em] uppercase hover:bg-black hover:text-white transition">WhatsApp Us</a></Reveal></section>
<footer className="px-6 py-10 text-center text-xs text-white/40 tracking-widest">{t.footer}</footer></main>}
