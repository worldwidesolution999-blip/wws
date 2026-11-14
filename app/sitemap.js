import {getProducts} from '@/lib/db';import {SV} from '@/lib/defaults';import {G} from '@/lib/guides';import {SITE} from '@/lib/seo';
export default async function s(){const u=SITE();const P=await getProducts();const d=new Date();
return [['',1],['/services',.9],['/papercut',.9],['/products',.9],['/about',.7],['/contact',.8],['/faq',.7],['/guides',.7],['/papercut/ng',.8],['/papercut/mf',.8],...SV.map(x=>['/services/'+x,.9]),...G.map(g=>['/guides/'+g.slug,.7]),...P.map(p=>['/products/'+p.id,.6])].map(([p,priority])=>({url:u+p,lastModified:d,priority}))}
