import {init} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(_,{params}){try{const q=await init();const r=await q`SELECT mime,data FROM images WHERE id=${Number(params.id)||0}`;if(!r[0])return new Response('Not found',{status:404});
return new Response(new Uint8Array(Buffer.from(r[0].data,'base64')),{headers:{'Content-Type':r[0].mime,'Cache-Control':'public, max-age=31536000, immutable'}})}catch{return new Response('Error',{status:500})}}
