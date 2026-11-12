import {digits} from '@/lib/defaults';
const I=({d})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={d}/></svg>;
export default function Fab({t}){const c="w-12 h-12 rounded-full grid place-items-center bg-white text-black shadow-xl hover:scale-110 transition";
return <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
<a aria-label="WhatsApp" className={c} href={'https://wa.me/'+digits(t.whatsapp)} target="_blank" rel="noopener noreferrer"><I d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z"/></a>
<a aria-label="Call" className={c} href={'tel:'+t.phone.replace(/\s/g,'')}><I d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></a></div>}
