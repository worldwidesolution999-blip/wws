export const SITE=()=>(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
export const ld=o=>JSON.stringify(o).replace(/</g,'\\u003c');
export function meta(t,key,path){const title=t['m_'+key+'_t'],description=t['m_'+key+'_d'];
return{title:{absolute:title},description,alternates:{canonical:path},
openGraph:{title,description,url:path,type:'website',locale:'en_PK',siteName:t.brand},twitter:{card:'summary_large_image',title,description}}}
