import {NextResponse as R} from 'next/server';import {init,dbUrl} from '@/lib/db';import {isAuthed,makeToken} from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(){if(!isAuthed())return R.json({error:'Unauthorized'},{status:401});const has=!!dbUrl();let b={db:true,has};
try{const q=await init();await q`SELECT 1`}catch(e){b={db:false,has,error:String(e&&e.message||e)}}
const r=R.json(b);r.cookies.set('ws_admin',makeToken(),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:2592000});return r}
