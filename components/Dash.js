'use client';import {useEffect,useState} from 'react';
const j=(m,b)=>({method:m,body:JSON.stringify(b)});
function Row({p,reload}){const [v,setV]=useState(p);const c=k=>e=>setV({...v,[k]:e.target.value});
return <div className="border border-white/20 p-4 grid gap-2"><input className="inp" value={v.name||''} onChange={c('name')} placeholder="Name"/><input className="inp" value={v.category||''} onChange={c('category')} placeholder="Category"/>
<input className="inp" value={v.image||''} onChange={c('image')} placeholder="Image URL"/><textarea className="inp" rows={2} value={v.descr||''} onChange={c('descr')} placeholder="Description"/>
<div className="flex gap-2"><button className="btn !py-2" onClick={async()=>{await fetch('/api/products',j('PUT',v));reload()}}>Save</button>
<button className="btn !py-2" onClick={async()=>{if(confirm('Delete?')){await fetch('/api/products',j('DELETE',{id:p.id}));reload()}}}>Delete</button></div></div>}
export default function Dash(){const [tab,setTab]=useState('t');const [C,setC]=useState({});const [P,setP]=useState([]);const [msg,setMsg]=useState('');
const load=async()=>{setC(await (await fetch('/api/content')).json());setP(await (await fetch('/api/products')).json())};useEffect(()=>{load()},[]);
async function save(){const r=await fetch('/api/content',j('PUT',C));setMsg(r.ok?'Saved ✓':'Error');setTimeout(()=>setMsg(''),2000)}
async function out(){await fetch('/api/login',{method:'DELETE'});location.href='/admin/login'}
return <main className="max-w-3xl mx-auto px-6 py-12"><div className="flex justify-between items-center mb-8"><h1 className="font-serif text-3xl">Dashboard</h1><div className="flex gap-4 text-xs uppercase tracking-widest"><a href="/" target="_blank">View site</a><button onClick={out}>Logout</button></div></div>
<div className="flex gap-6 mb-8 text-sm uppercase tracking-widest">{[['t','Website Texts'],['p','Products']].map(([k,n])=><button key={k} onClick={()=>setTab(k)} className={tab===k?'border-b border-white':'text-white/40'}>{n}</button>)}</div>
{tab==='t'?<div className="space-y-5">{Object.keys(C).map(k=><label key={k} className="block"><span className="text-xs text-white/40 uppercase tracking-widest">{k}</span>
<textarea className="inp mt-1" rows={(C[k]||'').length>70?3:1} value={C[k]} onChange={e=>setC({...C,[k]:e.target.value})}/></label>)}
<div className="sticky bottom-4 flex items-center gap-4"><button className="btn bg-black" onClick={save}>Save Changes</button><span>{msg}</span></div></div>
:<div className="space-y-4"><button className="btn" onClick={async()=>{await fetch('/api/products',j('POST',{name:'New Product'}));load()}}>+ Add Product</button>{P.map(p=><Row key={p.id+JSON.stringify(p)} p={p} reload={load}/>)}</div>}</main>}
