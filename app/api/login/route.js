import {NextResponse as R} from 'next/server';import {makeToken} from '@/lib/auth';
export async function POST(req){const{u,p}=await req.json();
if(u&&p&&u===process.env.ADMIN_USER&&p===process.env.ADMIN_PASS){const r=R.json({ok:1});
r.cookies.set('ws_admin',makeToken(),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:604800});return r}
return R.json({},{status:401})}
export async function DELETE(){const r=R.json({ok:1});r.cookies.delete('ws_admin');return r}
