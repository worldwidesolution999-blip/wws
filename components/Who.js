import Link from 'next/link';import Reveal from './Reveal';
export default function Who({t,more}){return <section className="px-6 md:px-12 py-24 bg-deep"><div className="max-w-4xl mx-auto">
<Reveal><p className="text-xs tracking-[.4em] uppercase text-white/50 mb-4">Who We Are</p><h2 className="font-serif text-4xl md:text-5xl leading-tight">{t.who_title}</h2><p className="mt-6 text-white/65 text-lg leading-relaxed">{t.who_text}</p></Reveal>
<Reveal d={.1}><ul className="mt-10 grid md:grid-cols-3 gap-4">{[1,2,3].map(i=><li key={i} className="border border-white/15 p-6 hover:bg-white hover:text-black transition duration-500 group"><span className="font-serif text-3xl text-white/25 group-hover:text-black/25">0{i}</span><p className="mt-3 text-white/80 group-hover:text-black/80">{t['who_p'+i]}</p></li>)}</ul>
{more&&<Link href="/about" className="btn mt-10">More about us</Link>}</Reveal></div></section>}
