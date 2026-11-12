import {NextResponse as R} from 'next/server';
export const ok=(d={ok:1})=>R.json(d);
export const fail=(e,s=500)=>R.json({error:String(e&&e.message||e)},{status:s});
export const guard=h=>async(req,ctx)=>{try{return await h(req,ctx)}catch(e){console.error(e);return fail(e)}};
