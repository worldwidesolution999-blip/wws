import QuickFacts from '@/components/QuickFacts';
import {meta} from '@/lib/seo';
import Link from 'next/link';import {getContent} from '@/lib/db';import Counter from '@/components/Counter';import SplitText from '@/components/SplitText';import Who from '@/components/Who';import Reveal from '@/components/Reveal';import Crumb from '@/components/Crumb';
export const revalidate=3600;
export async function generateMetadata(){return meta(await getContent(),'about','/about')}
export default async function A(){const t=await getContent();
const ld={'@context':'https://schema.org','@type':'FAQPage',mainEntity:[1,2,3].map(i=>({'@type':'Question',name:t['q'+i],acceptedAnswer:{'@type':'Answer',text:t['a'+i]}}))};
return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<section className="px-6 md:px-12 pt-32 pb-20 max-w-6xl mx-auto grain"><Crumb items={[['About','/about']]}/><p className="text-xs tracking-[.4em] uppercase text-white/50 mb-4">About Us</p><SplitText text={t.about_title} className="font-serif text-5xl md:text-7xl max-w-4xl"/><p className="mt-8 text-white/70 text-lg max-w-3xl leading-relaxed">{t.about_long}</p>
<div className="grid grid-cols-3 gap-4 mt-12 max-w-xl">{[1,2,3].map(i=><div key={i}><div className="font-serif text-4xl"><Counter value={t['stat'+i]}/></div><div className="text-xs uppercase tracking-widest text-white/50 mt-2">{t['stat'+i+'_l']}</div></div>)}</div></section>
<Who t={t}/>
<section className="grid md:grid-cols-2"><div className="w px-8 md:px-16 py-20"><Reveal><p className="text-xs tracking-[.4em] uppercase text-black/40">01</p><h2 className="font-serif text-4xl md:text-5xl mt-3">{t.vision_title}</h2><p className="mt-6 text-black/70 text-lg leading-relaxed">{t.vision_text}</p></Reveal></div>
<div className="bg-deep px-8 md:px-16 py-20"><Reveal><p className="text-xs tracking-[.4em] uppercase text-white/40">02</p><h2 className="font-serif text-4xl md:text-5xl mt-3">{t.mission_title}</h2><p className="mt-6 text-white/70 text-lg leading-relaxed">{t.mission_text}</p></Reveal></div></section>
<section className="px-6 md:px-12 py-24 max-w-6xl mx-auto"><Reveal><h2 className="font-serif text-4xl md:text-6xl">{t.promise_title}</h2><p className="mt-4 text-white/60 mb-14">{t.promise_text}</p></Reveal>
<div className="grid md:grid-cols-3 gap-6">{[1,2,3].map(i=><Reveal key={i} d={i*.08}><div className="border border-white/20 p-8 h-full hover:bg-white hover:text-black transition duration-500 group"><span className="font-serif text-5xl text-white/20 group-hover:text-black/20">0{i}</span><h3 className="font-serif text-3xl mt-6">{t['pr'+i+'_title']}</h3><p className="mt-3 text-white/60 group-hover:text-black/70">{t['pr'+i+'_text']}</p></div></Reveal>)}</div></section>
<QuickFacts t={t}/>
<section className="w px-6 md:px-12 py-24"><div className="max-w-4xl mx-auto"><h2 className="font-serif text-4xl md:text-6xl mb-10">{t.faq_title}</h2>
{[1,2,3].map(i=><details key={i} className="group border-t border-black/20 py-6"><summary className="cursor-pointer font-serif text-xl md:text-2xl flex justify-between gap-4 list-none">{t['q'+i]}<span className="group-open:rotate-45 transition">+</span></summary><p className="mt-4 text-black/60">{t['a'+i]}</p></details>)}
<Link href="/contact" className="btn mt-10">Talk to our team</Link></div></section></main>}
