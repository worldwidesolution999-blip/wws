import Link from 'next/link';import {notFound} from 'next/navigation';import {getProduct,getProducts} from '@/lib/db';
import Crumb from '@/components/Crumb';import LeadForm from '@/components/LeadForm';import PCard from '@/components/PCard';
export const revalidate=60;
export async function generateMetadata({params}){const p=await getProduct(params.id);if(!p)return{};return{title:p.name,description:p.descr||p.name,alternates:{canonical:'/products/'+p.id},openGraph:{images:p.image?[p.image]:[]}}}
export default async function P({params}){const p=await getProduct(params.id);if(!p)notFound();
const rel=(await getProducts()).filter(x=>x.id!==p.id&&x.category===p.category).slice(0,3);
const ld={'@context':'https://schema.org','@type':'Product',name:p.name,description:p.descr,image:p.image||undefined,category:p.category};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
<Crumb items={[['Products','/products'],[p.name,'/products/'+p.id]]}/>
<div className="grid md:grid-cols-2 gap-14"><div className="aspect-[4/3] bg-white/5 grid place-items-center overflow-hidden">{p.image?<img src={p.image} alt={p.name} className="w-full h-full object-cover"/>:<span className="font-serif text-8xl text-white/20">{p.name[0]}</span>}</div>
<div><p className="text-xs uppercase tracking-widest text-white/50">{p.category}</p><h1 className="font-serif text-4xl md:text-6xl mt-2">{p.name}</h1><p className="mt-6 text-white/70 text-lg">{p.descr}</p>
<div className="w p-8 mt-10"><h2 className="font-serif text-2xl mb-5">Enquire about this product</h2><LeadForm source={'Product: '+p.name}/></div></div></div>
{rel.length>0&&<div className="mt-24"><h2 className="font-serif text-3xl mb-8">Related products</h2><div className="grid sm:grid-cols-3 gap-6">{rel.map(r=><PCard key={r.id} p={r}/>)}</div></div>}
<Link href="/services" className="pill inline-block mt-16">View our services</Link></main>}
