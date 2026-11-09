import {redirect} from 'next/navigation';import {isAuthed} from '@/lib/auth';import Dash from '@/components/Dash';
export const dynamic='force-dynamic';export const metadata={robots:{index:false}};
export default function A(){if(!isAuthed())redirect('/admin/login');return <Dash/>}
