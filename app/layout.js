import './globals.css';import {Playfair_Display,Inter} from 'next/font/google';
const serif=Playfair_Display({subsets:['latin'],variable:'--f-serif'});const sans=Inter({subsets:['latin'],variable:'--f-sans'});
const url=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export const metadata={metadataBase:new URL(url),title:{default:"World Wide Solution's Pvt Ltd | Printer Rental, Toners & Bulk Printing",template:"%s | World Wide Solution's"},
description:"Printer rental, print servers, pages, toners and cartridges, and bulk printing for universities and banks.",
keywords:['printer rental','print server','toner cartridge','bulk printing','university printing','bank printing','Pakistan'],
alternates:{canonical:'/'},openGraph:{title:"World Wide Solution's Pvt Ltd",description:'Enterprise printing on rent for universities and banks.',type:'website',url},robots:{index:true,follow:true}};
export default function R({children}){return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>}
