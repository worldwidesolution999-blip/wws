import Link from 'next/link';import {notFound} from 'next/navigation';import {getContent} from '@/lib/db';import {SV} from '@/lib/defaults';import {G,SVC_GUIDE} from '@/lib/guides';
import {meta,ld,SITE} from '@/lib/seo';import Crumb from '@/components/Crumb';import LeadForm from '@/components/LeadForm';
export const revalidate=3600;
export const generateStaticParams=()=>SV.map(slug=>({slug}));
export async function generateMetadata({params}){const i=SV.indexOf(params.slug);if(i<0)return{};return meta(await getContent(),'svc'+(i+1),'/services/'+params.slug)}
export default async function P({params}){const i=SV.indexOf(params.slug);if(i<0)notFound();const t=await getContent();const n=i+1,u=SITE(),T=t['s'+n+'_title'];
const g=G.find(x=>x.slug===SVC_GUIDE[i]);
const graph={'@context':'https://schema.org','@graph':[
{'@type':'Service',name:T,serviceType:T,description:t['s'+n+'_long'],url:u+'/services/'+params.slug,provider:{'@id':u+'/#org'},areaServed:{'@type':'Country',name:'Pakistan'}},
{'@type':'FAQPage',mainEntity:[1,2].map(k=>({'@type':'Question',name:t['s'+n+'_q'+k],acceptedAnswer:{'@type':'Answer',text:t['s'+n+'_a'+k]}}))}]};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:ld(graph)}}/>
<Crumb items={[['Services','/services'],[T,'/services/'+params.slug]]}/>
<div className="grid md:grid-cols-2 gap-14"><div><h1 className="font-serif text-5xl md:text-6xl leading-tight">{T} in Pakistan</h1><p className="mt-8 text-white/70 text-lg leading-relaxed">{t['s'+n+'_long']}</p>
<ul className="mt-8 grid gap-3">{[1,2,3].map(k=><li key={k} className="flex gap-3 items-start"><span className="mt-1 w-5 h-5 rounded-full bg-white text-black grid place-items-center text-[11px] shrink-0">✓</span><span className="text-white/80">{t['s'+n+'_b'+k]}</span></li>)}</ul>
<div className="mt-10 flex flex-wrap gap-4"><Link href="/contact" className="btn">Get a free quote</Link><Link href="/papercut" className="btn">PaperCut software</Link></div></div>
<div className="w p-8 md:p-10 h-fit"><h2 className="font-serif text-3xl mb-6">Get a quote</h2><LeadForm source={'Service: '+T}/></div></div>
<section className="mt-24 max-w-3xl"><h2 className="font-serif text-3xl md:text-4xl mb-8">{T}: common questions</h2>
{[1,2].map(k=><details key={k} className="group border-t border-white/20 py-6"><summary className="cursor-pointer font-serif text-xl flex justify-between gap-4 list-none">{t['s'+n+'_q'+k]}<span className="group-open:rotate-45 transition">+</span></summary><p className="mt-4 text-white/65">{t['s'+n+'_a'+k]}</p></details>)}
<Link href="/faq" className="pill inline-block mt-6">All FAQs</Link></section>
<div className="mt-20"><h2 className="font-serif text-3xl mb-6">Related services and guides</h2><div className="flex flex-wrap gap-3">{SV.map((s,k)=>k!==i&&<Link key={s} href={'/services/'+s} className="pill">{t['s'+(k+1)+'_title']}</Link>)}{g&&<Link href={'/guides/'+g.slug} className="pill">Guide: {g.title}</Link>}</div></div></main>}
