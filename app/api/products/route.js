import {revalidatePath} from 'next/cache';import {init,getProducts} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {ok,fail,guard} from '@/lib/api';
export const dynamic='force-dynamic';
const A=h=>guard(async(req,c)=>{if(!isAuthed())return fail('Unauthorized',401);return h(req,c)});const done=()=>{revalidatePath('/','layout');return ok()};
export const GET=A(async()=>ok(await getProducts()));
export const POST=A(async req=>{const b=await req.json();const q=await init();await q`INSERT INTO products(name,descr,category,image) VALUES(${b.name||'New Product'},${b.descr||''},${b.category||''},${b.image||''})`;return done()});
export const PUT=A(async req=>{const b=await req.json();const q=await init();await q`UPDATE products SET name=${b.name},descr=${b.descr},category=${b.category},image=${b.image} WHERE id=${b.id}`;return done()});
export const DELETE=A(async req=>{const{id}=await req.json();const q=await init();await q`DELETE FROM products WHERE id=${id}`;return done()});
