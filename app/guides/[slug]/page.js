import Link from 'next/link';import {notFound} from 'next/navigation';import {G} from '@/lib/guides';import {ld,SITE} from '@/lib/seo';import Crumb from '@/components/Crumb';
export const revalidate=3600;
export const generateStaticParams=()=>G.map(g=>({slug:g.slug}));
export async function generateMetadata({params}){const g=G.find(x=>x.slug===params.slug);if(!g)return{};const p='/guides/'+g.slug;
return{title:{absolute:g.mt},description:g.d,alternates:{canonical:p},openGraph:{title:g.mt,description:g.d,url:p,type:'article',locale:'en_PK'},twitter:{card:'summary_large_image',title:g.mt,description:g.d}}}
export default function A({params}){const g=G.find(x=>x.slug===params.slug);if(!g)notFound();const u=SITE();
const a={'@context':'https://schema.org','@type':'Article',headline:g.title,description:g.d,datePublished:g.date,dateModified:g.date,mainEntityOfPage:u+'/guides/'+g.slug,author:{'@id':u+'/#org'},publisher:{'@id':u+'/#org'},inLanguage:'en-PK'};
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-3xl mx-auto"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:ld(a)}}/>
<Crumb items={[['Guides','/guides'],[g.title,'/guides/'+g.slug]]}/><article><h1 className="font-serif text-4xl md:text-6xl leading-tight">{g.title}</h1><p className="mt-4 text-xs uppercase tracking-widest text-white/40">Updated <time dateTime={g.date}>{g.date}</time></p>
<p className="mt-8 text-white/75 text-lg leading-relaxed">{g.d}</p>
{g.s.map(([h,p])=><section key={h} className="mt-10"><h2 className="font-serif text-3xl">{h}</h2><p className="mt-3 text-white/70 text-lg leading-relaxed">{p}</p></section>)}</article>
<div className="mt-14 border-t border-white/20 pt-8"><h2 className="font-serif text-2xl mb-4">Related</h2><div className="flex flex-wrap gap-3">{g.rel.map(([l,h])=><Link key={h} href={h} className="pill">{l}</Link>)}</div></div></main>}
