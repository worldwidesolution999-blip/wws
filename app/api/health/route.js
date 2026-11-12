import {NextResponse as R} from 'next/server';import {init,dbInfo} from '@/lib/db';import {isAuthed,makeToken} from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(){if(!isAuthed())return R.json({error:'Unauthorized'},{status:401});const i=dbInfo();let host='';try{host=new URL(i.url).hostname}catch{}const has=!!i.url;let b={db:true,has,src:i.src,host};
try{const q=await init();await q`SELECT 1`}catch(e){b={db:false,has,src:i.src,host,error:String(e&&e.message||e)}}
const r=R.json(b);r.cookies.set('ws_admin',makeToken(),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:2592000});return r}
