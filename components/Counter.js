'use client';import {useEffect,useRef} from 'react';
export default function Counter({value}){const r=useRef();const m=String(value).match(/^(\D*)(\d+)(.*)$/);
useEffect(()=>{if(!m)return;const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();
import('animejs/lib/anime.es.js').then(({default:anime})=>{const s={v:0};anime({targets:s,v:+m[2],round:1,duration:2200,easing:'easeOutExpo',update:()=>{r.current.textContent=m[1]+s.v+m[3]}})})},{threshold:.5});
o.observe(r.current);return()=>o.disconnect()},[value]);
return <span ref={r}>{value}</span>}
