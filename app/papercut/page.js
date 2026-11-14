import {meta} from '@/lib/seo';
import Link from 'next/link';import {getContent} from '@/lib/db';import Crumb from '@/components/Crumb';import PCCard from '@/components/PCCard';
export const revalidate=3600;
export async function generateMetadata(){return meta(await getContent(),'papercut','/papercut')}
export default async function P(){const t=await getContent();
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><Crumb items={[['PaperCut','/papercut']]}/><h1 className="font-serif text-5xl md:text-7xl max-w-4xl">{t.pc_title}</h1><p className="mt-8 text-white/70 text-lg max-w-3xl leading-relaxed">{t.pc_intro}</p>
<div className="grid md:grid-cols-2 gap-6 mt-14"><PCCard t={t} e="ng"/><PCCard t={t} e="mf"/></div>
<div className="mt-14 flex gap-4 flex-wrap"><Link href="/contact" className="btn">Request a demo</Link><Link href="/services/print-servers" className="btn">Print server services</Link></div></main>}
