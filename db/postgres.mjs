import pg from 'pg';
let pool;
export function getPool(){if(!process.env.DATABASE_URL)throw new Error('Configure DATABASE_URL com a URL do Postgres.');return pool??=new pg.Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:15000});}
export async function initialize(pool){
 const client=await pool.connect();
 try{await client.query('BEGIN');await client.query('SELECT pg_advisory_xact_lock(746281)');
 await client.query(`CREATE TABLE IF NOT EXISTS stays (id text PRIMARY KEY,title text NOT NULL,url text NOT NULL UNIQUE,location text NOT NULL,image text NOT NULL,price double precision,dates text NOT NULL,note text NOT NULL)`);
 await client.query(`CREATE TABLE IF NOT EXISTS votes (id text PRIMARY KEY,stay_id text NOT NULL REFERENCES stays(id) ON DELETE CASCADE,person integer NOT NULL CHECK(person IN (0,1)),rating integer NOT NULL CHECK(rating BETWEEN 1 AND 5))`);
 const {readFile}=await import('node:fs/promises');const {resolve}=await import('node:path');
 const stays=JSON.parse(await readFile(resolve('data/stays.json'),'utf8'));
 for(const s of stays)await client.query('INSERT INTO stays(id,title,url,location,image,price,dates,note) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',[s.id,s.title,s.url,s.location,s.image,s.price,'18',s.note]);
 await client.query('COMMIT');
 }catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}
}

