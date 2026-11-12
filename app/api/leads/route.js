import {NextResponse as R} from 'next/server';import {init} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {ok,fail,guard} from '@/lib/api';
export const dynamic='force-dynamic';
const c=(v,n)=>String(v||'').slice(0,n);
export async function POST(req){try{const b=await req.json();if(b.website)return ok();
const name=c(b.name,100),phone=c(b.phone,30);if(!name||phone.replace(/\D/g,'').length<7)return R.json({error:'invalid'},{status:400});
const q=await init();await q`INSERT INTO leads(name,phone,email,org,kind,message,source) VALUES(${name},${phone},${c(b.email,120)},${c(b.org,120)},${c(b.kind,40)},${c(b.message,2000)},${c(b.source,120)})`;return ok()}
catch(e){console.error(e);return R.json({error:'server'},{status:500})}}
const A=h=>guard(async(req,x)=>{if(!isAuthed())return fail('Unauthorized',401);return h(req,x)});
export const GET=A(async()=>{const q=await init();return ok(await q`SELECT * FROM leads ORDER BY id DESC LIMIT 500`)});
export const PATCH=A(async req=>{const{id,status}=await req.json();const q=await init();await q`UPDATE leads SET status=${status} WHERE id=${id}`;return ok()});
export const DELETE=A(async req=>{const{id}=await req.json();const q=await init();await q`DELETE FROM leads WHERE id=${id}`;return ok()});
