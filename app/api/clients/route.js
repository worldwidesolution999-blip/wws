import {NextResponse as R} from 'next/server';import {revalidatePath} from 'next/cache';
import {init,getClients} from '@/lib/db';import {isAuthed} from '@/lib/auth';
const no=()=>R.json({},{status:401});const done=()=>{revalidatePath('/','layout');return R.json({ok:1})};
export async function GET(){if(!isAuthed())return no();return R.json(await getClients())}
export async function POST(req){if(!isAuthed())return no();const b=await req.json();const q=await init();await q`INSERT INTO clients(name,logo) VALUES(${b.name||'New Client'},${b.logo||''})`;return done()}
export async function PUT(req){if(!isAuthed())return no();const b=await req.json();const q=await init();await q`UPDATE clients SET name=${b.name},logo=${b.logo} WHERE id=${b.id}`;return done()}
export async function DELETE(req){if(!isAuthed())return no();const{id}=await req.json();const q=await init();await q`DELETE FROM clients WHERE id=${id}`;return done()}
