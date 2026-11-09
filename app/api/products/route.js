import {NextResponse as R} from 'next/server';import {revalidatePath} from 'next/cache';
import {init,getProducts} from '@/lib/db';import {isAuthed} from '@/lib/auth';
const no=()=>R.json({},{status:401});
export async function GET(){if(!isAuthed())return no();return R.json(await getProducts())}
export async function POST(req){if(!isAuthed())return no();const b=await req.json();const q=await init();
await q`INSERT INTO products(name,descr,category,image) VALUES(${b.name||'New'},${b.descr||''},${b.category||''},${b.image||''})`;revalidatePath('/');return R.json({ok:1})}
export async function PUT(req){if(!isAuthed())return no();const b=await req.json();const q=await init();
await q`UPDATE products SET name=${b.name},descr=${b.descr},category=${b.category},image=${b.image} WHERE id=${b.id}`;revalidatePath('/');return R.json({ok:1})}
export async function DELETE(req){if(!isAuthed())return no();const{id}=await req.json();const q=await init();
await q`DELETE FROM products WHERE id=${id}`;revalidatePath('/');return R.json({ok:1})}
