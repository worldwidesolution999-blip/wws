import Link from 'next/link';import {notFound} from 'next/navigation';import {getContent} from '@/lib/db';import {SV} from '@/lib/defaults';
import Crumb from '@/components/Crumb';import LeadForm from '@/components/LeadForm';
export const revalidate=60;
export const generateStaticParams=()=>SV.map(slug=>({slug}));
export async function generateMetadata({params}){const i=SV.indexOf(params.slug);if(i<0)return{};const t=await getContent();return{title:t['s'+(i+1)+'_title'],description:t['s'+(i+1)+'_text'],alternates:{canonical:'/services/'+params.slug}}}
export default async function P({params}){const i=SV.indexOf(params.slug);if(i<0)notFound();const t=await getContent();const n=i+1;
const ld={'@context':'https://schema.org','@type':'Service',name:t['s'+n+'_title'],description:t['s'+n+'_long'],provider:{'@type':'Organization',name:t.brand}};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<Crumb items={[['Services','/services'],[t['s'+n+'_title'],'/services/'+params.slug]]}/>
<div className="grid md:grid-cols-2 gap-14"><div><h1 className="font-serif text-5xl md:text-7xl">{t['s'+n+'_title']}</h1><p className="mt-8 text-white/70 text-lg leading-relaxed">{t['s'+n+'_long']}</p>
<Link href="/products" className="btn mt-10">Browse Products</Link></div>
<div className="w p-8 md:p-10"><h2 className="font-serif text-3xl mb-6">Get a quote</h2><LeadForm source={'Service: '+t['s'+n+'_title']}/></div></div>
<div className="mt-24"><h2 className="font-serif text-3xl mb-6">Other services</h2><div className="flex flex-wrap gap-3">{SV.map((s,k)=>k!==i&&<Link key={s} href={'/services/'+s} className="pill">{t['s'+(k+1)+'_title']}</Link>)}</div></div></main>}
