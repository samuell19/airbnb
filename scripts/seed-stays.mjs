import {readFile} from 'node:fs/promises';
const origin=process.env.SEED_ORIGIN||'http://127.0.0.1:5173';
const records=JSON.parse(await readFile(new URL('../data/stays.json',import.meta.url),'utf8'));
const response=await fetch(origin+'/api/stays');if(!response.ok)throw Error('Falha ao carregar anúncios');
const {stays}=await response.json();const room=url=>new URL(url).pathname;
for(const stay of records){if(stays.some(s=>room(s.url)===room(stay.url)))continue;const result=await fetch(origin+'/api/stays',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({...stay,price:stay.price??''})});if(!result.ok)throw Error(await result.text());console.log('Adicionado:',stay.title);}
console.log('Dados iniciais conferidos.');
