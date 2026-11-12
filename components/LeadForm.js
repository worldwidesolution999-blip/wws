'use client';import {useState} from 'react';
export default function LeadForm({source='Website',full=false}){const [s,setS]=useState('');
async function go(e){e.preventDefault();const f=e.target;setS('load');const d=Object.fromEntries(new FormData(f));
try{const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...d,source})});setS(r.ok?'ok':r.status===400?'err':'srv');if(r.ok)f.reset()}catch{setS('srv')}}
return <form onSubmit={go} className="grid gap-5 text-left">
<input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
<input name="name" required className="fi" placeholder="Your name *" autoComplete="name"/>
<input name="phone" required type="tel" className="fi" placeholder="Phone / WhatsApp *" autoComplete="tel"/>
{full&&<><input name="email" type="email" className="fi" placeholder="Email" autoComplete="email"/><input name="org" className="fi" placeholder="Organization"/>
<select name="kind" className="fi"><option>University</option><option>Bank</option><option>Corporate</option><option>Other</option></select></>}
<textarea name="message" rows={full?5:3} className="fi" placeholder="Your requirement"/>
<button disabled={s==='load'} className="btn">{s==='load'?'Sending...':'Send Enquiry'}</button>
{s==='ok'&&<p role="status">Thank you! Our team will contact you shortly.</p>}{s==='err'&&<p role="alert">Please enter a valid name and phone number.</p>}{s==='srv'&&<p role="alert">Sorry, we could not save your enquiry right now. Please call or WhatsApp us.</p>}</form>}
