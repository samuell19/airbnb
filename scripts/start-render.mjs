import {spawn} from 'node:child_process';
import {getPool,initialize} from '../db/postgres.mjs';
const pool=getPool();try{await initialize(pool)}finally{await pool.end()}
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','0.0.0.0','--port',process.env.PORT||'3000'],{stdio:'inherit',env:process.env});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
