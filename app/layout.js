import './globals.css';import Nav from '@/components/Nav';import Footer from '@/components/Footer';import Fab from '@/components/Fab';import Chrome from '@/components/Chrome';import {getContent} from '@/lib/db';import {Cormorant_Garamond,Manrope} from 'next/font/google';
const serif=Cormorant_Garamond({subsets:['latin'],weight:['500','600','700'],variable:'--f-serif',display:'swap'});
const sans=Manrope({subsets:['latin'],variable:'--f-sans',display:'swap'});
const url=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export const metadata={metadataBase:new URL(url),title:{default:"World Wide Solution's Pvt Ltd | Printer Rental, Toners & Bulk Printing",template:"%s | World Wide Solution's"},
description:"Printer rental, print servers, pages, toners and cartridges, and bulk printing for universities and banks.",
openGraph:{type:'website',siteName:"World Wide Solution's Pvt Ltd"},robots:{index:true,follow:true}};
export default async function R({children}){const t=await getContent();return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body><Chrome top={<Nav brand={t.brand}/>} bottom={<><Footer t={t}/><Fab t={t}/></>}>{children}</Chrome></body></html>}
