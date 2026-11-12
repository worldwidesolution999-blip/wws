import Link from 'next/link';
export default function Crumb({items}){const u=process.env.NEXT_PUBLIC_SITE_URL||'';const all=[['Home','/'],...items];
const ld={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:all.map(([n,h],i)=>({'@type':'ListItem',position:i+1,name:n,item:u+h}))};
return <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest opacity-60 mb-8"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
{all.map(([n,h],i)=><span key={h}>{i>0&&' / '}{i<all.length-1?<Link href={h} className="hover:opacity-100">{n}</Link>:n}</span>)}</nav>}
