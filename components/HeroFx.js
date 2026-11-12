'use client';import {useEffect,useRef} from 'react';
export default function HeroFx(){const r=useRef();
useEffect(()=>{let t=[];import('animejs/lib/anime.es.js').then(({default:anime})=>{const q=s=>r.current.querySelectorAll(s);
t.push(anime({targets:q('.ln'),strokeDashoffset:[anime.setDashoffset,0],easing:'easeInOutSine',duration:2800,delay:anime.stagger(250),direction:'alternate',loop:true}));
t.push(anime({targets:q('.dt'),translateX:()=>anime.random(-50,50),translateY:()=>anime.random(-50,50),scale:()=>anime.random(.6,1.8),opacity:[.15,.8],duration:()=>anime.random(3000,6000),easing:'easeInOutQuad',direction:'alternate',loop:true,delay:anime.stagger(150)}))});
return()=>t.forEach(a=>a.pause())},[]);
return <svg ref={r} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
{[0,1,2,3].map(i=><circle key={i} className="ln" cx="900" cy="400" r={120+i*90} fill="none" stroke="rgba(120,160,255,.28)" strokeWidth="1"/>)}
{[0,1,2].map(i=><path key={'p'+i} className="ln" d={`M0 ${200+i*150} C300 ${100+i*150} 600 ${400+i*100} 1200 ${250+i*120}`} fill="none" stroke="rgba(255,255,255,.14)"/>)}
{Array.from({length:18}).map((_,i)=><circle key={'d'+i} className="dt" cx={(i*137)%1200} cy={(i*89)%800} r={2+i%3} fill="#8FB0FF"/>)}</svg>}
