import {NextResponse as R} from 'next/server';import {revalidatePath} from 'next/cache';
import {init,getContent} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {D} from '@/lib/defaults';
export async function GET(){if(!isAuthed())return R.json({},{status:401});return R.json(await getContent())}
export async function PUT(req){if(!isAuthed())return R.json({},{status:401});const b=await req.json();const q=await init();
for(const[k,v]of Object.entries(b))if(k in D)await q`INSERT INTO content(k,v) VALUES(${k},${String(v)}) ON CONFLICT(k) DO UPDATE SET v=EXCLUDED.v`;
revalidatePath('/');return R.json({ok:1})}
