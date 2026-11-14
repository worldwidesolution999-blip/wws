import {getContent} from '@/lib/db';import {SV} from '@/lib/defaults';import {G} from '@/lib/guides';import {SITE} from '@/lib/seo';
export const revalidate=3600;
export async function GET(){const t=await getContent();const u=SITE();
const txt=`# ${t.brand}\n\n> ${t.about_long}\n\n## Quick facts\n${[1,2,3,4,5,6].map(i=>`- ${t['qf'+i+'_k']}: ${t['qf'+i+'_v']}`).join('\n')}\n- Phone: ${t.phone}\n- WhatsApp: ${t.whatsapp}\n- Email: ${t.email}\n\n## Services\n${SV.map((s,i)=>`- [${t['s'+(i+1)+'_title']}](${u}/services/${s}): ${t['s'+(i+1)+'_text']}`).join('\n')}\n\n## PaperCut software\n- [PaperCut NG](${u}/papercut/ng): ${t.ng_sub}\n- [PaperCut MF](${u}/papercut/mf): ${t.mf_sub}\n\n## Resources\n- [FAQs](${u}/faq)\n${G.map(g=>`- [${g.title}](${u}/guides/${g.slug})`).join('\n')}\n- [Products](${u}/products)\n- [Contact](${u}/contact)\n`;
return new Response(txt,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
