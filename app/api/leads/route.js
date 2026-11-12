import {NextResponse as R} from 'next/server';import {init} from '@/lib/db';import {isAuthed} from '@/lib/auth';
const no=()=>R.json({},{status:401});const c=(v,n)=>String(v||'').slice(0,n);
export async function POST(req){const b=await req.json();if(b.website)return R.json({ok:1});
const name=c(b.name,100),phone=c(b.phone,30);if(!name||phone.replace(/\D/g,'').length<7)return R.json({error:1},{status:400});
const q=await init();await q`INSERT INTO leads(name,phone,email,org,kind,message,source) VALUES(${name},${phone},${c(b.email,120)},${c(b.org,120)},${c(b.kind,40)},${c(b.message,2000)},${c(b.source,120)})`;return R.json({ok:1})}
export async function GET(){if(!isAuthed())return no();const q=await init();return R.json(await q`SELECT * FROM leads ORDER BY id DESC LIMIT 500`)}
export async function PATCH(req){if(!isAuthed())return no();const{id,status}=await req.json();const q=await init();await q`UPDATE leads SET status=${status} WHERE id=${id}`;return R.json({ok:1})}
export async function DELETE(req){if(!isAuthed())return no();const{id}=await req.json();const q=await init();await q`DELETE FROM leads WHERE id=${id}`;return R.json({ok:1})}
