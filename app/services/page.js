import {meta} from '@/lib/seo';
import Link from 'next/link';import {getContent} from '@/lib/db';import {SV} from '@/lib/defaults';import Crumb from '@/components/Crumb';
export const revalidate=3600;
export async function generateMetadata(){return meta(await getContent(),'services','/services')}
export default async function S(){const t=await getContent();
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><Crumb items={[['Services','/services']]}/><h1 className="font-serif text-5xl md:text-7xl mb-14">{t.services_title}</h1>
{SV.map((s,i)=><Link key={s} href={'/services/'+s} className="group block py-9 border-t border-white/20 hover:bg-white hover:text-black transition-all duration-500 md:px-6">
<h2 className="font-serif text-3xl">{t['s'+(i+1)+'_title']}</h2><p className="mt-3 text-white/60 group-hover:text-black/70 max-w-2xl">{t['s'+(i+1)+'_text']}</p><span className="inline-block mt-4 text-xs uppercase tracking-widest">Learn more →</span></Link>)}</main>}
