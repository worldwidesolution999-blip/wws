import {neon} from '@neondatabase/serverless';import {cache} from 'react';import {D} from './defaults';
let ready;
export async function init(){const q=neon(process.env.DATABASE_URL);
if(!ready)ready=(async()=>{await q`CREATE TABLE IF NOT EXISTS content(k TEXT PRIMARY KEY,v TEXT NOT NULL)`;
await q`CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,name TEXT NOT NULL,descr TEXT,category TEXT,image TEXT)`;
await q`CREATE TABLE IF NOT EXISTS clients(id SERIAL PRIMARY KEY,name TEXT NOT NULL,logo TEXT)`;
await q`CREATE TABLE IF NOT EXISTS leads(id SERIAL PRIMARY KEY,name TEXT,phone TEXT,email TEXT,org TEXT,kind TEXT,message TEXT,source TEXT,status TEXT DEFAULT 'new',created TIMESTAMPTZ DEFAULT now())`})();
await ready;return q}
export const getContent=cache(async()=>{try{const q=await init();const r=await q`SELECT k,v FROM content`;return {...D,...Object.fromEntries(r.map(x=>[x.k,x.v]))}}catch{return D}});
export const getProducts=cache(async()=>{try{const q=await init();return await q`SELECT * FROM products ORDER BY id DESC`}catch{return []}});
export const getProduct=cache(async id=>{try{const q=await init();const r=await q`SELECT * FROM products WHERE id=${Number(id)||0}`;return r[0]||null}catch{return null}});
export const getClients=cache(async()=>{try{const q=await init();return await q`SELECT * FROM clients ORDER BY id`}catch{return []}});
