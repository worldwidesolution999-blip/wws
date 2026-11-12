'use client';import {useEffect,useState} from 'react';
export default function Clients({items}){const [i,setI]=useState(0);
useEffect(()=>{if(items.length<2)return;const t=setInterval(()=>setI(x=>(x+1)%items.length),3500);return()=>clearInterval(t)},[items.length]);
if(!items.length)return null;
return <div className="text-center"><div className="relative mx-auto max-w-xl h-56 md:h-72 bg-white">
{items.map((c,k)=><img key={c.id} src={c.logo} alt={c.name} loading={k?'lazy':'eager'} decoding="async" className={`absolute inset-0 m-auto max-h-[65%] max-w-[70%] object-contain transition-opacity duration-1000 ${k===i?'opacity-100':'opacity-0'}`}/>)}</div>
<p className="mt-6 font-serif text-2xl">{items[i].name}</p>
<div className="flex justify-center gap-2 mt-4">{items.map((c,k)=><button key={c.id} aria-label={c.name} onClick={()=>setI(k)} className={`h-1.5 rounded-full transition-all ${k===i?'w-8 bg-white':'w-3 bg-white/30'}`}/>)}</div></div>}
