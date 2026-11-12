import {revalidatePath} from 'next/cache';import {init,getContent} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {D} from '@/lib/defaults';import {ok,fail,guard} from '@/lib/api';
export const dynamic='force-dynamic';
export const GET=guard(async()=>{if(!isAuthed())return fail('Unauthorized',401);return ok(await getContent())});
export const PUT=guard(async req=>{if(!isAuthed())return fail('Unauthorized',401);const b=await req.json();const q=await init();
for(const[k,v]of Object.entries(b))if(k in D)await q`INSERT INTO content(k,v) VALUES(${k},${String(v)}) ON CONFLICT(k) DO UPDATE SET v=EXCLUDED.v`;
revalidatePath('/','layout');return ok()});
