import {getProducts} from '@/lib/db';import {SV} from '@/lib/defaults';
export default async function s(){const u=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';const P=await getProducts();const d=new Date();
return [['',1],['/services',.9],['/products',.9],['/contact',.8],['/about',.8],['/papercut',.9],['/papercut/ng',.8],['/papercut/mf',.8],...SV.map(x=>['/services/'+x,.8]),...P.map(p=>['/products/'+p.id,.6])].map(([p,priority])=>({url:u+p,lastModified:d,priority}))}
