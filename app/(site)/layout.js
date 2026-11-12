import Nav from '@/components/Nav';import Footer from '@/components/Footer';import Fab from '@/components/Fab';import {getContent} from '@/lib/db';
export default async function L({children}){const t=await getContent();return <><Nav brand={t.brand}/>{children}<Footer t={t}/><Fab t={t}/></>}
