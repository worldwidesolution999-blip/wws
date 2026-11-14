export default function QuickFacts({t}){return <section aria-labelledby="qf" className="bg-deep border-y border-white/10 px-6 md:px-12 py-20"><div className="max-w-6xl mx-auto">
<h2 id="qf" className="font-serif text-3xl md:text-5xl">{t.qf_title}</h2>
<dl className="mt-10 grid md:grid-cols-2 gap-x-12">{[1,2,3,4,5,6].map(i=><div key={i} className="py-5 border-t border-white/15 grid sm:grid-cols-[9rem_1fr] gap-2"><dt className="text-xs uppercase tracking-widest text-white/50">{t['qf'+i+'_k']}</dt><dd className="text-white/85">{t['qf'+i+'_v']}</dd></div>)}</dl></div></section>}
