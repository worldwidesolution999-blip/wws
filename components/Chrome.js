'use client';import {usePathname} from 'next/navigation';
export default function Chrome({top,bottom,children}){const p=usePathname()||'';
if(p.startsWith('/admin'))return children;return <>{top}{children}{bottom}</>}
