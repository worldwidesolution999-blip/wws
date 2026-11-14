import {meta} from '@/lib/seo';
import {getContent,getProducts} from '@/lib/db';import PCard from '@/components/PCard';import Crumb from '@/components/Crumb';
export const revalidate=3600;
export async function generateMetadata(){return meta(await getContent(),'products','/products')}
export default async function P(){const [t,P]=await Promise.all([getContent(),getProducts()]);
return <main className="w min-h-screen px-6 md:px-12 pt-32 pb-24"><div className="max-w-6xl mx-auto"><Crumb items={[['Products','/products']]}/><h1 className="font-serif text-5xl md:text-7xl">{t.products_title}</h1><p className="mt-4 text-black/60 mb-12">{t.products_sub}</p>
{!P.length&&<p className="text-black/40">Products coming soon.</p>}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{P.map(p=><PCard key={p.id} p={p}/>)}</div></div></main>}
