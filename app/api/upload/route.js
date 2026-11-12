import {init} from '@/lib/db';import {isAuthed} from '@/lib/auth';import {ok,fail,guard} from '@/lib/api';
export const dynamic='force-dynamic';
export const POST=guard(async req=>{if(!isAuthed())return fail('Unauthorized',401);const{data}=await req.json();const s=String(data||'');const i=s.indexOf(',');
const m=/^data:(image\/(png|jpeg|webp));base64$/.exec(s.slice(0,i));if(!m)return fail('Invalid image',400);const b=s.slice(i+1);if(b.length>3500000)return fail('Image too large',400);
const q=await init();const r=await q`INSERT INTO images(mime,data) VALUES(${m[1]},${b}) RETURNING id`;return ok({url:'/api/img/'+r[0].id})});
