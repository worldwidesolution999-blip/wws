'use client';import {useEffect,useRef} from 'react';
export default function SplitText({text,className='',delay=200}){const r=useRef();
useEffect(()=>{let a;import('animejs/lib/anime.es.js').then(({default:anime})=>{a=anime({targets:r.current.querySelectorAll('.ch'),translateY:[70,0],opacity:[0,1],rotateZ:[6,0],easing:'easeOutExpo',duration:1300,delay:anime.stagger(28,{start:delay})})});return()=>a&&a.pause()},[text,delay]);
return <h1 ref={r} className={className} aria-label={text}>{text.split(' ').map((w,i)=><span key={i} aria-hidden="true"><span className="inline-block overflow-hidden align-bottom pb-1">{[...w].map((c,j)=><span key={j} className="ch inline-block" style={{opacity:0}}>{c}</span>)}</span>{' '}</span>)}</h1>}
