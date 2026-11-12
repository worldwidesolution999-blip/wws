'use client';import {useEffect,useState} from 'react';
const j=(m,b)=>({method:m,body:JSON.stringify(b)});
const wa=s=>{let d=(s||'').replace(/\D/g,'');if(d.startsWith('0'))d='92'+d.slice(1);return 'https://wa.me/'+d};
const grp=k=>/^(pc_|ng_|mf_)/.test(k)?'PaperCut':/^(vision|mission|promise|pr\d|about_long|who)/.test(k)?'About Page':/^(clients|cta|footer_text)/.test(k)?'Clients & Footer':k.startsWith('hero')?'Hero':/^(about|stat)/.test(k)?'About':/^(services|s\d)/.test(k)?'Services':k.startsWith('products')?'Products':/^lead/.test(k)?'Lead Form':/^(faq|[qa]\d)/.test(k)?'FAQ':'Contact & Footer';
const card="rounded-xl border border-white/10 bg-white/[.03]";
function Row({p,reload}){const [v,setV]=useState(p);const c=k=>e=>setV({...v,[k]:e.target.value});
return <div className={card+" p-5 grid gap-3"}><div className="grid sm:grid-cols-2 gap-3"><input className="inp" value={v.name||''} onChange={c('name')} placeholder="Name"/><input className="inp" value={v.category||''} onChange={c('category')} placeholder="Category"/></div>
<input className="inp" value={v.image||''} onChange={c('image')} placeholder="Image URL"/><textarea className="inp" rows={2} value={v.descr||''} onChange={c('descr')} placeholder="Description"/>
<div className="flex gap-2"><button className="pill" onClick={async()=>{await fetch('/api/products',j('PUT',v));reload()}}>Save</button><button className="pill" onClick={async()=>{if(confirm('Delete product?')){await fetch('/api/products',j('DELETE',{id:p.id}));reload()}}}>Delete</button></div></div>}
function CRow({p,reload}){const [v,setV]=useState(p);const c=k=>e=>setV({...v,[k]:e.target.value});
return <div className={card+" p-5 grid gap-3"}><div className="grid sm:grid-cols-[1fr_1fr_80px] gap-3 items-center"><input className="inp" value={v.name||''} onChange={c('name')} placeholder="Client name"/><input className="inp" value={v.logo||''} onChange={c('logo')} placeholder="Logo image URL"/>{v.logo?<img src={v.logo} alt="" className="h-12 w-20 object-contain bg-white p-1"/>:<span/>}</div>
<div className="flex gap-2"><button className="pill" onClick={async()=>{await fetch('/api/clients',j('PUT',v));reload()}}>Save</button><button className="pill" onClick={async()=>{if(confirm('Delete client?')){await fetch('/api/clients',j('DELETE',{id:p.id}));reload()}}}>Delete</button></div></div>}
export default function Dash(){const [tab,setTab]=useState('l');const [K,setK]=useState([]);const [C,setC]=useState({});const [P,setP]=useState([]);const [L,setL]=useState([]);const [q,setQ]=useState('');const [msg,setMsg]=useState('');
const load=async()=>{const [c,p,l,cl]=await Promise.all(['content','products','leads','clients'].map(x=>fetch('/api/'+x).then(r=>r.json())));setC(c);setK(Array.isArray(cl)?cl:[]);setP(Array.isArray(p)?p:[]);setL(Array.isArray(l)?l:[])};useEffect(()=>{load()},[]);
async function save(){const r=await fetch('/api/content',j('PUT',C));setMsg(r.ok?'Saved ✓':'Error');setTimeout(()=>setMsg(''),2500)}
const out=async()=>{await fetch('/api/login',{method:'DELETE'});location.href='/admin/login'};
const groups={};Object.keys(C).filter(k=>!q||k.includes(q.toLowerCase())||(C[k]||'').toLowerCase().includes(q.toLowerCase())).forEach(k=>(groups[grp(k)]??=[]).push(k));
const nw=L.filter(l=>l.status==='new').length;
const tabs=[['l','Leads'+(nw?` (${nw})`:'')],['p','Products'],['c','Clients'],['t','Website Texts']];
return <main className="min-h-screen"><div className="sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-white/10"><div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"><p className="font-serif text-2xl">Admin <span className="text-white/40">Console</span></p><div className="flex gap-3"><a href="/" target="_blank" className="pill">View site</a><button onClick={out} className="pill">Logout</button></div></div></div>
<div className="max-w-5xl mx-auto px-6 py-10">
<div className="grid grid-cols-3 gap-4 mb-10">{[['New leads',nw],['Total leads',L.length],['Products',P.length]].map(([n,v])=><div key={n} className={card+" p-5"}><p className="font-serif text-4xl">{v}</p><p className="text-xs uppercase tracking-widest text-white/40 mt-1">{n}</p></div>)}</div>
<div className="flex gap-2 mb-8 flex-wrap">{tabs.map(([k,n])=><button key={k} onClick={()=>setTab(k)} className={'pill '+(tab===k?'bg-white text-black':'')}>{n}</button>)}</div>
{tab==='l'&&<div className="grid gap-4">{!L.length&&<p className="text-white/40">No leads yet.</p>}{L.map(l=><div key={l.id} className={card+" p-5 "+(l.status==='new'?'border-white/40':'')}>
<div className="flex flex-wrap justify-between gap-2"><div><h3 className="font-serif text-2xl">{l.name}</h3><p className="text-xs text-white/40 mt-1">{new Date(l.created).toLocaleString()} · {l.source}</p></div><span className="text-xs uppercase tracking-widest text-white/50">{l.status}</span></div>
{(l.org||l.kind)&&<p className="text-sm text-white/60 mt-3">{[l.kind,l.org].filter(Boolean).join(' · ')}</p>}{l.message&&<p className="mt-3 text-white/80">{l.message}</p>}
<div className="flex flex-wrap gap-2 mt-5"><a className="pill" href={'tel:'+l.phone}>Call {l.phone}</a><a className="pill" href={wa(l.phone)} target="_blank" rel="noopener noreferrer">WhatsApp</a>{l.email&&<a className="pill" href={'mailto:'+l.email}>Email</a>}
<button className="pill" onClick={async()=>{await fetch('/api/leads',j('PATCH',{id:l.id,status:l.status==='new'?'contacted':'new'}));load()}}>{l.status==='new'?'Mark contacted':'Mark new'}</button>
<button className="pill" onClick={async()=>{if(confirm('Delete lead?')){await fetch('/api/leads',j('DELETE',{id:l.id}));load()}}}>Delete</button></div></div>)}</div>}
{tab==='p'&&<div className="grid gap-4"><button className="btn w-fit" onClick={async()=>{await fetch('/api/products',j('POST',{name:'New Product'}));load()}}>+ Add Product</button>{P.map(p=><Row key={p.id+JSON.stringify(p)} p={p} reload={load}/>)}</div>}
{tab==='c'&&<div className="grid gap-4"><button className="btn w-fit" onClick={async()=>{await fetch('/api/clients',j('POST',{name:'New Client'}));load()}}>+ Add Client</button>{K.map(p=><CRow key={p.id+JSON.stringify(p)} p={p} reload={load}/>)}</div>}
{tab==='t'&&<div className="grid gap-4"><input className="inp" placeholder="Search any text..." value={q} onChange={e=>setQ(e.target.value)}/>
{Object.entries(groups).map(([g,ks])=><details key={g} open={!!q} className={card+" p-5"}><summary className="cursor-pointer font-serif text-2xl list-none flex justify-between">{g}<span className="text-white/40 text-base">{ks.length}</span></summary>
<div className="grid gap-4 mt-5">{ks.map(k=><label key={k} className="block"><span className="text-[10px] text-white/40 uppercase tracking-widest">{k.replace(/_/g,' ')}{/_image$/.test(k)?' — paste image URL':''}</span><textarea className="inp mt-1" rows={(C[k]||'').length>70?3:1} value={C[k]} onChange={e=>setC({...C,[k]:e.target.value})}/></label>)}</div></details>)}
<div className="sticky bottom-4 flex items-center gap-4"><button className="btn bg-black" onClick={save}>Save Changes</button><span>{msg}</span></div></div>}
</div></main>}
