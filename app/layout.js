import './globals.css';import {Cormorant_Garamond,Manrope} from 'next/font/google';
import Nav from '@/components/Nav';import Footer from '@/components/Footer';import Fab from '@/components/Fab';import Chrome from '@/components/Chrome';
import {getContent} from '@/lib/db';import {SITE,ld} from '@/lib/seo';import {SV} from '@/lib/defaults';
const serif=Cormorant_Garamond({subsets:['latin'],weight:['500','600'],variable:'--f-serif',display:'swap'});
const sans=Manrope({subsets:['latin'],variable:'--f-sans',display:'swap'});
export const metadata={metadataBase:new URL(SITE()),applicationName:'Wide Solution World',
title:{default:'Wide Solution World | Printer Rental & Managed Print Pakistan'},
description:'Rental printer services, managed printer services, print servers, toners and PaperCut software in Pakistan.',
openGraph:{type:'website',siteName:'Wide Solution World',locale:'en_PK'},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1}},other:{'geo.region':'PK'}};
export const viewport={themeColor:'#08183A'};
export default async function R({children}){const t=await getContent();const u=SITE();
const graph={'@context':'https://schema.org','@graph':[
{'@type':'Organization','@id':u+'/#org',name:t.brand,alternateName:['Wide Solution World','WSW'],url:u,logo:u+'/icon',email:t.email,telephone:t.phone,areaServed:{'@type':'Country',name:'Pakistan'},description:t.about_long,
contactPoint:[{'@type':'ContactPoint',contactType:'sales',telephone:t.phone,email:t.email,areaServed:'PK',availableLanguage:['English','Urdu']}],
knowsAbout:['Managed printer services','Printer rental','Print servers','Toners and cartridges','Bulk printing','PaperCut NG','PaperCut MF'],
makesOffer:SV.map((s,i)=>({'@type':'Offer',itemOffered:{'@type':'Service',name:t['s'+(i+1)+'_title'],url:u+'/services/'+s}}))},
{'@type':'WebSite','@id':u+'/#website',url:u,name:t.brand,publisher:{'@id':u+'/#org'},inLanguage:'en-PK'}]};
return <html lang="en-PK" className={`${serif.variable} ${sans.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:ld(graph)}}/>
<Chrome top={<Nav brand={t.brand}/>} bottom={<><Footer t={t}/><Fab t={t}/></>}>{children}</Chrome></body></html>}
