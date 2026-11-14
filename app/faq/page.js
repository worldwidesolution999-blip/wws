import Link from 'next/link';import {getContent} from '@/lib/db';import {meta,ld} from '@/lib/seo';import Crumb from '@/components/Crumb';
export const revalidate=3600;
export async function generateMetadata(){return meta(await getContent(),'faq','/faq')}
export default async function F(){const t=await getContent();const Q=[1,2,3,4,5,6,7,8];
const g={'@context':'https://schema.org','@type':'FAQPage',mainEntity:Q.map(i=>({'@type':'Question',name:t['q'+i],acceptedAnswer:{'@type':'Answer',text:t['a'+i]}}))};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-4xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:ld(g)}}/>
<Crumb items={[['FAQs','/faq']]}/><h1 className="font-serif text-5xl md:text-6xl">Printer Rental, Managed Print &amp; PaperCut FAQs</h1><p className="mt-6 text-white/65 text-lg">Short, direct answers about printer rental in Pakistan, managed printer services and PaperCut software.</p>
<div className="mt-12">{Q.map(i=><details key={i} className="group border-t border-white/20 py-6"><summary className="cursor-pointer font-serif text-xl md:text-2xl flex justify-between gap-4 list-none">{t['q'+i]}<span className="group-open:rotate-45 transition">+</span></summary><p className="mt-4 text-white/65 leading-relaxed">{t['a'+i]}</p></details>)}</div>
<div className="mt-12 flex flex-wrap gap-3"><Link href="/services" className="pill">Our services</Link><Link href="/papercut" className="pill">PaperCut software</Link><Link href="/guides" className="pill">Guides</Link><Link href="/contact" className="pill">Get a quote</Link></div></main>}
