import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync,statSync,createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,sep,extname} from 'node:path';
import {handleCityAPI} from './city-api.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),port=Number(process.env.PORT||3000);
const origin=process.env.PUBLIC_ORIGIN||`http://localhost:${port}`,url=new URL(origin);
if(url.origin!==origin||(!['localhost','127.0.0.1','[::1]'].includes(url.hostname)&&url.protocol!=='https:'))throw Error('PUBLIC_ORIGIN debe ser un origen HTTPS, sin ruta; HTTP solo para localhost.');
mkdirSync(resolve(root,'data'),{recursive:true});
const sqlite=new DatabaseSync(resolve(root,'data/city.sqlite'));sqlite.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');
if(!sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='city_accounts'").get())sqlite.exec(readFileSync(resolve(root,'drizzle/0008_illegal_crusher_hogan.sql'),'utf8'));
const db={prepare(sql){return {bind(...args){const q=sqlite.prepare(sql);return {async first(){return q.get(...args)||null},async run(){return q.run(...args)}}}}},async batch(q){sqlite.exec('BEGIN');try{const r=await Promise.all(q.map(x=>x.run()));sqlite.exec('COMMIT');return r}catch(e){sqlite.exec('ROLLBACK');throw e}}};
const publicRoot=resolve(root,'public'),types={'.html':'text/html; charset=utf-8','.ogg':'audio/ogg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 try{
  const path=new URL(req.url,origin).pathname;
  if(path.startsWith('/api/ciudad-viva/')){
   const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v!==undefined)headers.set(k,Array.isArray(v)?v.join(','):v);
   headers.set('cf-connecting-ip',req.socket.remoteAddress||'unknown');
   const request=new Request(new URL(path,origin),{method:req.method,headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Readable.toWeb(req),duplex:'half'})});
   const response=await handleCityAPI(request,db,{origin,secureCookies:url.protocol==='https:'});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  if(path==='/'){res.writeHead(302,{Location:'/ciudad-viva/'});res.end();return;}
  const file=resolve(publicRoot,'.'+decodeURIComponent(path)+(path.endsWith('/')?'index.html':''));
  if(!file.startsWith(publicRoot+sep)||!statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':file.endsWith('.html')?'no-cache':'public, max-age=3600'});
  if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
 }catch(e){res.writeHead(e.code==='ENOENT'?404:500);res.end('No disponible');}
});
server.listen(port,()=>console.log(`DGcity: ${origin}/ciudad-viva/`));
