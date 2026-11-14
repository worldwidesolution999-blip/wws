import {meta} from '@/lib/seo';
import Link from 'next/link';import {notFound} from 'next/navigation';import {getContent} from '@/lib/db';import Crumb from '@/components/Crumb';import LeadForm from '@/components/LeadForm';
export const revalidate=3600;
export const generateStaticParams=()=>[{ed:'ng'},{ed:'mf'}];
export async function generateMetadata({params}){const e=params.ed;if(!['ng','mf'].includes(e))return{};return meta(await getContent(),e,'/papercut/'+e)}
export default async function P({params}){const e=params.ed;if(!['ng','mf'].includes(e))notFound();const t=await getContent();const N='PaperCut '+e.toUpperCase();const o=e==='ng'?'mf':'ng';
const ld={'@context':'https://schema.org','@type':'SoftwareApplication',name:N,description:t['pc_'+e+'_long'],applicationCategory:'BusinessApplication'};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<Crumb items={[['PaperCut','/papercut'],[N,'/papercut/'+e]]}/>
<div className="grid md:grid-cols-2 gap-14"><div><div className="bg-white inline-block p-6"><img src={`/papercut-${e}.png`} alt={N} width={e==='ng'?560:420} height={e==='ng'?151:110} className="h-14 md:h-20 w-auto"/></div>
<h1 className="font-serif text-4xl md:text-6xl mt-8">{N} in Pakistan</h1><p className="mt-3 text-xl text-white/70">{t[e+'_sub']}</p>{e==='mf'&&<p className="mt-3 text-white/60">{t.mf_includes}</p>}<p className="mt-6 text-white/70 text-lg leading-relaxed">{t['pc_'+e+'_long']}</p>
<ul className="mt-8 grid gap-4">{[1,2,3,4,5,6].map(i=><li key={i} className="flex gap-4 items-center border-t border-white/15 pt-4"><span className="w-7 h-7 rounded-full bg-white text-black grid place-items-center text-sm">✓</span><span className="font-serif text-xl md:text-2xl">{t[e+'_f'+i]}</span></li>)}</ul></div>
<div><div className="w p-8 md:p-10"><h2 className="font-serif text-3xl mb-6">Get {N}</h2><LeadForm source={N}/></div>
<Link href={'/papercut/'+o} className="block mt-6 border border-white/20 p-6 hover:bg-white hover:text-black transition">Also see <span className="font-serif text-xl">PaperCut {o.toUpperCase()} →</span></Link></div></div></main>}
