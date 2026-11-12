'use client';import {useState} from 'react';
export default function Login(){const [u,setU]=useState('');const [p,setP]=useState('');const [show,setShow]=useState(false);const [err,setErr]=useState('');
async function go(e){e.preventDefault();const r=await fetch('/api/login',{method:'POST',body:JSON.stringify({u,p})});if(r.ok)location.href='/admin';else setErr('Invalid username or password')}
return <main className="min-h-screen grid place-items-center px-6 grain"><form onSubmit={go} className="w-full max-w-sm border border-white/15 rounded-2xl p-10 space-y-6 bg-black">
<p className="text-xs tracking-[.4em] uppercase text-white/40 text-center">Restricted</p><h1 className="font-serif text-4xl text-center">Admin</h1>
<input className="inp" placeholder="Username" value={u} onChange={e=>setU(e.target.value)} autoComplete="username"/>
<div className="relative"><input className="inp pr-12" type={show?'text':'password'} placeholder="Password" value={p} onChange={e=>setP(e.target.value)} autoComplete="current-password"/>
<button type="button" aria-label="Show password" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>{!show&&<path d="M3 3l18 18"/>}</svg></button></div>
{err&&<p className="text-sm text-white/60">{err}</p>}<button className="btn w-full">Login</button></form></main>}
