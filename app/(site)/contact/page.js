import {getContent} from '@/lib/db';import {digits} from '@/lib/defaults';import Crumb from '@/components/Crumb';import LeadForm from '@/components/LeadForm';
export const revalidate=60;
export const metadata={title:'Contact Us',description:'Call, WhatsApp or send an enquiry for printer rental, toners and bulk printing.',alternates:{canonical:'/contact'}};
export default async function C(){const t=await getContent();
const R=({h,l,v,x})=><a href={h} {...(x?{target:'_blank',rel:'noopener noreferrer'}:{})} className="flex justify-between gap-4 py-5 border-t border-white/20 hover:pl-3 transition-all"><span className="text-xs uppercase tracking-widest text-white/50">{l}</span><span className="font-serif text-xl md:text-2xl">{v}</span></a>;
return <main className="px-6 md:px-12 pt-32 pb-24 max-w-6xl mx-auto"><Crumb items={[['Contact','/contact']]}/><h1 className="font-serif text-5xl md:text-7xl mb-14">{t.contact_title}</h1>
<div className="grid md:grid-cols-2 gap-14"><div><R h={'tel:'+t.phone.replace(/\s/g,'')} l="Call" v={t.phone}/><R h={'https://wa.me/'+digits(t.whatsapp)} l="WhatsApp" v={t.whatsapp} x/><R h={'mailto:'+t.email} l="Email" v={t.email}/>
<div className="flex justify-between gap-4 py-5 border-t border-b border-white/20"><span className="text-xs uppercase tracking-widest text-white/50">Address</span><span className="font-serif text-xl md:text-2xl text-right">{t.address}</span></div></div>
<div className="w p-8 md:p-10"><h2 className="font-serif text-3xl mb-6">Send us an enquiry</h2><LeadForm full source="Contact page"/></div></div></main>}
