import {SITE} from '@/lib/seo';
export default function r(){const u=SITE();return{rules:[{userAgent:'*',allow:['/','/api/img/'],disallow:['/admin','/api/']}],sitemap:u+'/sitemap.xml',host:u}}
