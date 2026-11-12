'use client';import {useEffect,useRef} from 'react';
export default function Reveal({children,d=0,className=''}){const r=useRef();
useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('on');o.disconnect()}},{threshold:.08});o.observe(r.current);return()=>o.disconnect()},[]);
return <div ref={r} style={{transitionDelay:d+'s'}} className={'rv '+className}>{children}</div>}
