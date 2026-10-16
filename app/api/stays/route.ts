import {getPool} from '../../../db/postgres.mjs';
import {isAllowedOrigin} from '../../../lib/request-origin.mjs';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(){try{const db=getPool();const [stays,votes]=await Promise.all([db.query('SELECT * FROM stays ORDER BY id'),db.query('SELECT id,stay_id AS "stayId",person,rating FROM votes')]);return Response.json({stays:stays.rows,votes:votes.rows},{headers:{'Cache-Control':'no-store'}})}catch(e){console.error('Database read failed',e instanceof Error?e.message:'unknown');return Response.json({error:'Não foi possível carregar os lugares.'},{status:503})}}
export async function POST(req:Request){
 if(!isAllowedOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
 try{const b=await req.json() as {action?:string;person:number;rating:number;stayId:string;url:string;title:string;image:string;location:string;note:string};const db=getPool();
 if(b.action==='vote'){
 if(![0,1].includes(b.person)||!Number.isInteger(b.rating)||b.rating<1||b.rating>5||typeof b.stayId!=='string')return Response.json({error:'Voto inválido.'},{status:400});
 const found=await db.query('SELECT id FROM stays WHERE id=$1',[b.stayId]);if(!found.rowCount)return Response.json({error:'Lugar não encontrado.'},{status:404});
 await db.query('INSERT INTO votes(id,stay_id,person,rating) VALUES($1,$2,$3,$4) ON CONFLICT(id) DO UPDATE SET rating=EXCLUDED.rating',[b.stayId+':'+b.person,b.stayId,b.person,b.rating]);
 }else{
 const u=new URL(b.url);if(u.protocol!=='https:'||!/(^|\.)airbnb\.(com|com\.br)$/.test(u.hostname)||!/^\/rooms\/\d+/.test(u.pathname))throw Error();
 if(typeof b.title!=='string'||!b.title.trim()||b.title.length>160)throw Error();if(b.image&&!/^https:\/\//.test(b.image))throw Error();
 await db.query('INSERT INTO stays(id,title,url,location,image,price,dates,note) VALUES($1,$2,$3,$4,$5,NULL,$6,$7)',[crypto.randomUUID(),b.title.trim(),u.href,String(b.location||'').slice(0,200),String(b.image||'').slice(0,2000),'18',String(b.note||'').slice(0,1000)]);
 }return Response.json({ok:true});
 }catch{return Response.json({error:'Não foi possível salvar. Confira os campos e a conexão com o banco.'},{status:400})}
}

