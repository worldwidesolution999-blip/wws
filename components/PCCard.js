import Link from 'next/link';
export default function PCCard({t,e}){const ed=e==='ng'?'ng':'mf';
return <Link href={'/papercut/'+ed} className="group block border border-black/15 hover:border-black transition bg-white text-black p-8">
<img src={`/papercut-${ed}.png`} alt={'PaperCut '+ed.toUpperCase()} width="300" height="80" className="h-14 w-auto"/>
<p className="font-serif text-2xl mt-6">{t[ed+'_sub']}</p>
<ul className="mt-4 grid gap-2 text-sm text-black/65">{[1,2,3].map(i=><li key={i}>✓ {t[ed+'_f'+i]}</li>)}</ul>
<span className="inline-block mt-6 text-xs uppercase tracking-widest group-hover:translate-x-2 transition">Learn more →</span></Link>}
