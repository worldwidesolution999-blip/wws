'use client';import {useState} from 'react';import {motion,AnimatePresence} from 'framer-motion';
const L=[['Home','#home'],['Services','#services'],['Products','#products'],['FAQ','#faq'],['Contact','#contact']];
export default function Nav({brand}){const [o,s]=useState(false);
return <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
<div className="flex items-center justify-between px-6 md:px-12 py-6">
<a href="#home" className="font-serif text-lg md:text-xl tracking-wide">{brand}</a>
<nav className="hidden md:flex gap-10 text-xs uppercase tracking-[.25em]">{L.map(([n,h])=><a key={h} href={h} className="hover:opacity-60 transition">{n}</a>)}</nav>
<button aria-label="Menu" onClick={()=>s(!o)} className="md:hidden relative z-50 w-8 h-6 flex flex-col justify-between">
<span className={`h-px bg-white transition ${o?'translate-y-[11px] rotate-45':''}`}/><span className={`h-px bg-white transition ${o?'opacity-0':''}`}/><span className={`h-px bg-white transition ${o?'-translate-y-[11px] -rotate-45':''}`}/></button></div>
<AnimatePresence>{o&&<motion.div initial={{clipPath:'circle(0% at 95% 5%)'}} animate={{clipPath:'circle(150% at 95% 5%)'}} exit={{clipPath:'circle(0% at 95% 5%)'}} transition={{duration:.7}} className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center gap-8 md:hidden">
{L.map(([n,h],i)=><motion.a key={h} href={h} onClick={()=>s(false)} initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.25+i*.08}} className="font-serif text-4xl">{n}</motion.a>)}</motion.div>}</AnimatePresence></header>}
