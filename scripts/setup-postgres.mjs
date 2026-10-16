import {getPool,initialize} from '../db/postgres.mjs';
const pool=getPool();try{await initialize(pool);console.log('Postgres pronto; anúncios iniciais conferidos.')}finally{await pool.end()}
