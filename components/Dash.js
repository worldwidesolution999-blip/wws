'use client';import {useEffect,useState} from 'react';
const j=(m,b)=>({method:m,headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});
const wa=s=>{let d=(s||'').replace(/\D/g,'');if(d.startsWith('0'))d='92'+d.slice(1);return 'https://wa.me/'+d};
const SET=['phone','whatsapp','email','address'];
const LB={phone:'Call button number',whatsapp:'WhatsApp button number (e.g. +923001234567)',email:'Email address',address:'Address'};
const grp=k=>/^(pc_|ng_|mf_)/.test(k)?'PaperCut':/^(vision|mission|promise|pr\d|about_long|who)/.test(k)?'About Page':/^(clients|cta|footer_text)/.test(k)?'Clients & Footer':k.startsWith('hero')?'Hero':/^(about|stat)/.test(k)?'About':/^(services|s\d)/.test(k)?'Services':k.startsWith('products')?'Products':/^lead/.test(k)?'Lead Form':/^(faq|[qa]\d)/.test(k)?'FAQ':'Brand & Footer';
const card='rounded-2xl border border-white/10 bg-white/[.03]';
async function shrink(file,max,png){const img=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(file)});
const k=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);const x=c.getContext('2d');
if(!png){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height)}x.drawImage(img,0,0,c.width,c.height);return c.toDataURL(png?'image/png':'image/jpeg',.85)}
function Up({value,onChange,max=1600,png=false,label='Upload image'}){const [b,setB]=useState(false);const [e,setE]=useState('');
async function pick(ev){const f=ev.target.files[0];if(!f)return;setB(true);setE('');
try{const data=await shrink(f,max,png);const r=await fetch('/api/upload',j('POST',{data}));const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(r.status===401?'Session expired, please login again':(d.error||'Upload failed'));onChange(d.url)}catch(x){setE(x.message)}
setB(false);ev.target.value=''}
return <div className="flex flex-wrap items-center gap-4">{value?<img src={value} alt="" className="h-16 w-24 object-contain bg-white/10 rounded"/>:<div className="h-16 w-24 border border-dashed border-white/20 rounded"/>}
<label className="pill">{b?'Uploading...':label}<input type="file" accept="image/*" hidden onChange={pick}/></label>{value&&<button type="button" className="pill" onClick={()=>onChange('')}>Remove</button>}{e&&<span className="text-xs text-red-300">{e}</span>}</div>}
function LeadCard({l,call,reload}){return <div className={card+' p-5 '+(l.status==='new'?'border-white/40':'')}>
<div className="flex flex-wrap justify-between gap-2"><div><h3 className="font-serif text-2xl">{l.name}</h3><p className="text-xs text-white/40 mt-1">{new Date(l.created).toLocaleString()} · {l.source}</p></div><span className={'text-[10px] h-fit uppercase tracking-widest px-3 py-1 rounded-full '+(l.status==='new'?'bg-white text-black':'border border-white/20 text-white/50')}>{l.status}</span></div>
{(l.org||l.kind)&&<p className="text-sm text-white/60 mt-3">{[l.kind,l.org].filter(Boolean).join(' · ')}</p>}{l.message&&<p className="mt-3 text-white/80">{l.message}</p>}
<div className="flex flex-wrap gap-2 mt-5"><a className="pill" href={'tel:'+l.phone}>Call {l.phone}</a><a className="pill" href={wa(l.phone)} target="_blank" rel="noopener noreferrer">WhatsApp</a>{l.email&&<a className="pill" href={'mailto:'+l.email}>Email</a>}
<button className="pill" onClick={async()=>{if(await call('/api/leads','PATCH',{id:l.id,status:l.status==='new'?'contacted':'new'}))reload()}}>{l.status==='new'?'Mark contacted':'Mark new'}</button>
<button className="pill" onClick={async()=>{if(confirm('Delete lead?')&&await call('/api/leads','DELETE',{id:l.id}))reload()}}>Delete</button></div></div>}
function PRow({p,call,reload}){const [v,setV]=useState(p);const c=k=>e=>setV({...v,[k]:e.target.value});
return <div className={card+' p-5 grid gap-4'}><Up value={v.image} onChange={x=>setV({...v,image:x})} label="Upload photo"/>
<div className="grid sm:grid-cols-2 gap-3"><input className="inp" value={v.name||''} onChange={c('name')} placeholder="Product name"/><input className="inp" value={v.category||''} onChange={c('category')} placeholder="Category"/></div>
<textarea className="inp" rows={3} value={v.descr||''} onChange={c('descr')} placeholder="Description"/>
<div className="flex gap-2"><button className="pill" onClick={async()=>{if(await call('/api/products','PUT',v))reload('Product saved')}}>Save</button><button className="pill" onClick={async()=>{if(confirm('Delete product?')&&await call('/api/products','DELETE',{id:p.id}))reload()}}>Delete</button></div></div>}
function CRow({p,call,reload}){const [v,setV]=useState(p);
return <div className={card+' p-5 grid gap-4'}><Up value={v.logo} onChange={x=>setV({...v,logo:x})} png max={800} label="Upload logo"/>
<input className="inp" value={v.name||''} onChange={e=>setV({...v,name:e.target.value})} placeholder="Client name"/>
<div className="flex gap-2"><button className="pill" onClick={async()=>{if(await call('/api/clients','PUT',v))reload('Client saved')}}>Save</button><button className="pill" onClick={async()=>{if(confirm('Delete client?')&&await call('/api/clients','DELETE',{id:p.id}))reload()}}>Delete</button></div></div>}
export default function Dash(){const [tab,setTab]=useState('o');const [C,setC]=useState({});const [P,setP]=useState([]);const [L,setL]=useState([]);const [K,setK]=useState([]);
const [H,setH]=useState(null);const [q,setQ]=useState('');const [msg,setMsg]=useState('');const [err,setErr]=useState('');const [exp,setExp]=useState(false);
const flash=m=>{setMsg(m);setTimeout(()=>setMsg(''),2500)};
const g=async u=>{try{const r=await fetch(u);if(r.status===401){setExp(true);return null}return r.ok?await r.json():null}catch{return null}};
const load=async m=>{const [c,p,l,k,h]=await Promise.all(['content','products','leads','clients','health'].map(x=>g('/api/'+x)));
if(c&&Object.keys(c).length)setC(c);setP(Array.isArray(p)?p:[]);setL(Array.isArray(l)?l:[]);setK(Array.isArray(k)?k:[]);setH(h);if(typeof m==='string')flash(m)};
useEffect(()=>{load();const t=setInterval(()=>g('/api/health'),240000);const v=()=>{if(!document.hidden)g('/api/health')};document.addEventListener('visibilitychange',v);return()=>{clearInterval(t);document.removeEventListener('visibilitychange',v)}},[]);
const call=async(u,m,b)=>{try{const r=await fetch(u,j(m,b));const d=await r.json().catch(()=>({}));if(r.status===401){setExp(true);return null}if(!r.ok){setErr(d.error||('Error '+r.status));return null}setErr('');return d||{}}catch(e){setErr(String(e.message||e));return null}};
async function save(keys){const b={};(keys||Object.keys(C)).forEach(k=>b[k]=C[k]);if(await call('/api/content','PUT',b))flash('Saved ✓')}
const out=async()=>{await fetch('/api/login',{method:'DELETE'});location.href='/admin/login'};
const groups={};Object.keys(C).filter(k=>!SET.includes(k)&&k!=='hero_image').filter(k=>!q||k.includes(q.toLowerCase())||(C[k]||'').toLowerCase().includes(q.toLowerCase())).forEach(k=>(groups[grp(k)]??=[]).push(k));
const nw=L.filter(l=>l.status==='new').length;const today=L.filter(l=>new Date(l.created).toDateString()===new Date().toDateString()).length;
const hr=new Date().getHours();const hello=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
const nav=[['o','Overview'],['l','Leads'+(nw?` (${nw})`:'')],['p','Products'],['c','Clients'],['s','Site Settings'],['t','Website Texts']];
const Nav=({cls})=>nav.map(([k,n])=><button key={k} onClick={()=>setTab(k)} className={cls+' '+(tab===k?'bg-white text-black':'text-white/60 hover:text-white')}>{n}</button>);
return <div className="min-h-screen lg:flex">
{exp&&<div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-6"><div className={card+' p-8 max-w-sm text-center bg-deep'}><p className="font-serif text-3xl">Session expired</p><p className="mt-3 text-white/60">Please login again to continue.</p><a href="/admin/login" className="btn mt-6">Login</a></div></div>}
<aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-deep p-6 sticky top-0 h-screen"><p className="font-serif text-3xl">WWS</p><p className="text-[10px] tracking-[.35em] uppercase text-white/40 mt-1">Admin Console</p>
<div className="mt-10 grid gap-1"><Nav cls="text-left rounded-lg px-4 py-3 text-sm transition"/></div>
<div className="mt-auto grid gap-3"><div className="flex items-center gap-2 text-xs text-white/50"><span className={'w-2 h-2 rounded-full '+(H&&H.db?'bg-emerald-400':'bg-red-400')}/>{H&&H.db?'Database connected':'Database issue'}</div><a href="/" target="_blank" className="pill text-center">View site</a><button onClick={out} className="pill">Logout</button></div></aside>
<div className="flex-1 min-w-0"><div className="lg:hidden sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-white/10"><div className="flex items-center justify-between px-5 h-14"><p className="font-serif text-2xl">Admin Console</p><div className="flex gap-2"><a href="/" target="_blank" className="pill">Site</a><button onClick={out} className="pill">Logout</button></div></div>
<div className="flex gap-2 overflow-x-auto px-5 pb-3"><Nav cls="pill whitespace-nowrap"/></div></div>
<main className="max-w-5xl mx-auto px-5 md:px-10 py-8 grid gap-6">
{H&&!H.db&&<div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-5"><p className="font-serif text-2xl">Database not connected</p><p className="text-sm text-white/70 mt-2">{H.has?`Connection string found in ${H.src} (host: ${H.host||'invalid'}) but connecting failed.`:'No postgres:// URL found in any Vercel Environment Variable. Add DATABASE_URL and Redeploy.'}</p>{H.error&&<p className="text-xs text-red-200 mt-2 break-all">{H.error}</p>}</div>}
{err&&<div className="rounded-xl border border-red-400/40 bg-red-500/10 px-5 py-3 text-sm flex justify-between gap-4"><span>{err}</span><button onClick={()=>setErr('')}>✕</button></div>}
{msg&&<div className="fixed bottom-5 right-5 z-40 bg-white text-black px-5 py-3 rounded-full text-sm shadow-xl">{msg}</div>}
{tab==='o'&&<>
<div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#1B44A0] via-[#12307a] to-[#08183A] border border-white/10"><p className="text-xs tracking-[.35em] uppercase text-white/60">{new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
<h1 className="font-serif text-4xl md:text-6xl mt-3">{hello}, Admin</h1><p className="mt-3 text-white/70 max-w-xl">You have {nw} new {nw===1?'lead':'leads'} waiting. Manage your leads, products, clients and every text of your website from here.</p></div>
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">{[['New leads',nw],['Today',today],['Total leads',L.length],['Products',P.length],['Clients',K.length]].map(([n,v])=><div key={n} className={card+' p-5'}><p className="font-serif text-4xl">{v}</p><p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{n}</p></div>)}</div>
<div className="flex flex-wrap gap-3"><button className="pill" onClick={()=>setTab('p')}>+ Add product</button><button className="pill" onClick={()=>setTab('c')}>+ Add client</button><button className="pill" onClick={()=>setTab('s')}>Hero image &amp; contact</button><button className="pill" onClick={()=>setTab('t')}>Edit website texts</button></div>
<div><h2 className="font-serif text-3xl mb-4">Recent leads</h2><div className="grid gap-4">{!L.length&&<p className="text-white/40">No leads yet. They will appear here as soon as someone submits a form.</p>}{L.slice(0,5).map(l=><LeadCard key={l.id+l.status} l={l} call={call} reload={load}/>)}</div></div></>}
{tab==='l'&&<div className="grid gap-4"><h2 className="font-serif text-3xl">Leads</h2>{!L.length&&<p className="text-white/40">No leads yet.</p>}{L.map(l=><LeadCard key={l.id+l.status} l={l} call={call} reload={load}/>)}</div>}
{tab==='p'&&<div className="grid gap-4"><h2 className="font-serif text-3xl">Products</h2><button className="btn w-fit" onClick={async()=>{if(await call('/api/products','POST',{name:'New Product'}))load('Product added')}}>+ Add Product</button>{!P.length&&<p className="text-white/40">No products yet.</p>}{P.map(p=><PRow key={p.id+JSON.stringify(p)} p={p} call={call} reload={load}/>)}</div>}
{tab==='c'&&<div className="grid gap-4"><h2 className="font-serif text-3xl">Clients</h2><p className="text-sm text-white/50">Logos show one at a time on the homepage. PNG with transparent background looks best.</p><button className="btn w-fit" onClick={async()=>{if(await call('/api/clients','POST',{name:'New Client'}))load('Client added')}}>+ Add Client</button>{!K.length&&<p className="text-white/40">No clients yet.</p>}{[...K].reverse().map(p=><CRow key={p.id+JSON.stringify(p)} p={p} call={call} reload={load}/>)}</div>}
{tab==='s'&&<div className="grid gap-6"><h2 className="font-serif text-3xl">Site Settings</h2>
<div className={card+' p-6 grid gap-3'}><p className="font-serif text-2xl">Hero image</p><p className="text-sm text-white/50">Landscape photo works best (about 1600×1000).</p><Up value={C.hero_image} onChange={v=>setC({...C,hero_image:v})} label="Upload hero image"/></div>
<div className={card+' p-6 grid gap-5'}><p className="font-serif text-2xl">Contact details</p><p className="text-sm text-white/50">These power the Call and WhatsApp buttons, footer and contact page.</p>
{SET.map(k=><label key={k} className="block"><span className="text-[10px] uppercase tracking-widest text-white/40">{LB[k]}</span><input className="inp mt-1" value={C[k]||''} onChange={e=>setC({...C,[k]:e.target.value})}/></label>)}</div>
<button className="btn w-fit" onClick={()=>save([...SET,'hero_image'])}>Save Settings</button></div>}
{tab==='t'&&<div className="grid gap-4"><h2 className="font-serif text-3xl">Website Texts</h2><input className="inp" placeholder="Search any text..." value={q} onChange={e=>setQ(e.target.value)}/>
{Object.entries(groups).map(([n,ks])=><details key={n} open={!!q} className={card+' p-5'}><summary className="cursor-pointer font-serif text-2xl list-none flex justify-between">{n}<span className="text-white/40 text-base">{ks.length}</span></summary>
<div className="grid gap-4 mt-5">{ks.map(k=><label key={k} className="block"><span className="text-[10px] text-white/40 uppercase tracking-widest">{k.replace(/_/g,' ')}{/_image$/.test(k)?' (image URL)':''}</span><textarea className="inp mt-1" rows={(C[k]||'').length>70?3:1} value={C[k]||''} onChange={e=>setC({...C,[k]:e.target.value})}/></label>)}</div></details>)}
<div className="sticky bottom-4"><button className="btn bg-black" onClick={()=>save(Object.keys(C).filter(k=>!SET.includes(k)&&k!=='hero_image'))}>Save Changes</button></div></div>}
</main></div></div>}
