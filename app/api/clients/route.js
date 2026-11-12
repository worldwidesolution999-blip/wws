import {revalidatePath} from 'next/cache';import {init,getClients} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {ok,fail,guard} from '@/lib/api';
export const dynamic='force-dynamic';
const A=h=>guard(async(req,c)=>{if(!isAuthed())return fail('Unauthorized',401);return h(req,c)});const done=()=>{revalidatePath('/','layout');return ok()};
export const GET=A(async()=>ok(await getClients()));
export const POST=A(async req=>{const b=await req.json();const q=await init();await q`INSERT INTO clients(name,logo) VALUES(${b.name||'New Client'},${b.logo||''})`;return done()});
export const PUT=A(async req=>{const b=await req.json();const q=await init();await q`UPDATE clients SET name=${b.name},logo=${b.logo} WHERE id=${b.id}`;return done()});
export const DELETE=A(async req=>{const{id}=await req.json();const q=await init();await q`DELETE FROM clients WHERE id=${id}`;return done()});
