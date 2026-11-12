'use client';import {useState} from 'react';import Link from 'next/link';
const L=[['Home','/'],['About Us','/about'],['Services','/services'],['PaperCut','/papercut'],['Products','/products'],['Contact','/contact']];
export default function Nav({brand}){const [o,s]=useState(false);
return <header className="fixed top-0 inset-x-0 z-50 bg-black/85 backdrop-blur border-b border-white/10">
<div className="flex items-center justify-between px-5 lg:px-12 h-16">
<Link href="/" className="font-serif text-lg lg:text-2xl tracking-wide">{brand}</Link>
<nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[.22em]">{L.map(([n,h])=><Link key={h} href={h} className="hover:opacity-60 transition">{n}</Link>)}</nav>
<button aria-label="Menu" aria-expanded={o} onClick={()=>s(!o)} className="lg:hidden w-8 h-5 flex flex-col justify-between">
<span className={`h-px bg-white transition ${o?'translate-y-[9px] rotate-45':''}`}/><span className={`h-px bg-white transition ${o?'opacity-0':''}`}/><span className={`h-px bg-white transition ${o?'-translate-y-[9px] -rotate-45':''}`}/></button></div>
<div className={`lg:hidden absolute right-4 top-[68px] w-60 bg-white text-black p-6 flex flex-col gap-4 shadow-2xl transition duration-300 origin-top-right ${o?'opacity-100 scale-100':'opacity-0 scale-95 pointer-events-none'}`}>
{L.map(([n,h])=><Link key={h} href={h} onClick={()=>s(false)} className="font-serif text-2xl">{n}</Link>)}</div></header>}
