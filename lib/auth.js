import crypto from 'crypto';import {cookies} from 'next/headers';
const sig=v=>crypto.createHmac('sha256',process.env.AUTH_SECRET||'x').update(v).digest('hex');
export function makeToken(){const e=String(Date.now()+6048e5);return e+'.'+sig(e)}
export function isAuthed(){const c=cookies().get('ws_admin')?.value;if(!c)return false;const [e,s]=c.split('.');
return !!s&&s===sig(e)&&Date.now()<+e}
