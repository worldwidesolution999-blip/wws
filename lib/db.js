import {neon} from '@neondatabase/serverless';
import {D} from './defaults';
let ready;
export async function init(){const q=neon(process.env.DATABASE_URL);
if(!ready)ready=(async()=>{await q`CREATE TABLE IF NOT EXISTS content(k TEXT PRIMARY KEY,v TEXT NOT NULL)`;
await q`CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,name TEXT NOT NULL,descr TEXT,category TEXT,image TEXT)`})();
await ready;return q}
export async function getContent(){try{const q=await init();const r=await q`SELECT k,v FROM content`;return {...D,...Object.fromEntries(r.map(x=>[x.k,x.v]))}}catch{return D}}
export async function getProducts(){try{const q=await init();return await q`SELECT * FROM products ORDER BY id DESC`}catch{return []}}
