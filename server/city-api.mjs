const ORIGIN='https://juegos-dglopez.dglopez.chatgpt.site';
const COOKIE='cv_session', TTL=30*86400, MAX_BODY=360000;
const CAPS={road:8,residential:8,commercial:6,park:8,water:5,coal:5,school:5,clinic:4,library:4,police:5,recycling:5,wastewater:5,fire:5,solar:5,office:6,transit:4,university:4,hospital:4,nuclear:3,research:4,residential_block:8};
const encoder=new TextEncoder();
const hex=a=>Array.from(new Uint8Array(a),x=>x.toString(16).padStart(2,'0')).join('');
const random=()=>hex(crypto.getRandomValues(new Uint8Array(32)));
const digest=async s=>hex(await crypto.subtle.digest('SHA-256',encoder.encode(s)));
export async function passwordHash(password,salt){const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-512'},key,256));}
function equal(a,b){let diff=a.length^b.length;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i%b.length);return diff===0;}
class Fault extends Error{constructor(status,message){super(message);this.status=status;}}
const fail=(s,m)=>{throw new Fault(s,m)};
function json(data,status=200,headers={}){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});}
function cookie(token,age=TTL,secure=true){return `${COOKIE}=${token}; Path=/api/ciudad-viva; HttpOnly; ${secure?"Secure; ":""}SameSite=Strict; Max-Age=${age}`;}
async function body(request){if(!request.headers.get('content-type')?.startsWith('application/json'))fail(415,'Envía datos JSON.');if(Number(request.headers.get('content-length'))>MAX_BODY)fail(413,'La ciudad supera el tamaño permitido.');const reader=request.body?.getReader();if(!reader)fail(400,'Faltan datos.');let total=0,chunks=[];while(true){const {value,done}=await reader.read();if(done)break;total+=value.length;if(total>MAX_BODY){await reader.cancel();fail(413,'La ciudad supera el tamaño permitido.');}chunks.push(value);}let bytes=new Uint8Array(total),offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}try{return JSON.parse(new TextDecoder().decode(bytes));}catch{fail(400,'Datos no válidos.');}}
function credentials(data){const username=typeof data.username==='string'?data.username.trim().normalize('NFKC'):'';if(!/^[\p{L}\p{N}_-]{3,24}$/u.test(username))fail(400,'Usa un nombre de 3–24 letras, números, guiones o guiones bajos.');if(typeof data.password!=='string'||data.password.length<8||data.password.length>128)fail(400,'La contraseña debe tener entre 8 y 128 caracteres.');return {username,key:username.toLocaleLowerCase('es'),password:data.password};}
export function validateCity(s){
 if(!s||![1,2,3,4].includes(s.format)||s.width!==(s.format>=3?36:30)||s.height!==(s.format===4?36:24))fail(400,'Formato de ciudad incompatible.');
 const width=s.width,height=s.height,total=width*height;
 const number=(v,min,max,integer=false)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max&&(!integer||Number.isInteger(v));
 for(const [k,min,max,int] of [['mapSeed',0,1e10,true],['money',-1e12,1e12],['day',0,1e9],['tax',0,30],['cityLevel',1,8,true],['diseaseDays',0,1000],['crimeDays',0,1000],['alerts',0,1e9,true]])if(!number(s[k],min,max,int))fail(400,'La partida contiene valores no válidos.');
 for(const k of ['landUnlocked','river'])if(!Array.isArray(s[k])||s[k].length!==total||s[k].some(v=>typeof v!=='boolean'))fail(400,'Terreno no válido.');
 if(typeof s.debug!=='boolean'||!Array.isArray(s.buildings)||s.buildings.length>total)fail(400,'Edificios no válidos.');
 const occupied=new Set();const buildings=s.buildings.map(b=>{if(!b||!Object.hasOwn(CAPS,b.type)||!number(b.level,1,CAPS[b.type],true)||!number(b.anchor,0,total-1,true)||!number(b.rot,0,3,true)||!number(b.palette,0,100,true)||!number(b.occ,0,b.type==='residential_block'?20000:800)||!number(b.fire,0,100))fail(400,'Edificio no válido.');const normal=b.type==='park'?(b.level>=5?[3,3]:[2,2]):['recycling','residential_block','university'].includes(b.type)?[2,2]:['coal','hospital','nuclear'].includes(b.type)?(b.rot%2?[1,2]:[2,1]):['solar','transit','wastewater'].includes(b.type)?(b.rot%2?[2,1]:[1,2]):[1,1];const legacy=(b.type==='wastewater'&&(b.w??1)===1&&(b.h??1)===1)||s.format===1||b.legacyFootprint===true||(s.format===2&&['university','transit','wastewater'].includes(b.type));const w=b.w??((b.type==='wastewater'||(s.format===1&&['coal','hospital','nuclear','recycling'].includes(b.type))||(s.format<3&&['university','transit'].includes(b.type)))?1:normal[0]),h=b.h??((b.type==='wastewater'||(s.format===1&&['coal','hospital','nuclear','recycling'].includes(b.type))||(s.format<3&&['university','transit'].includes(b.type)))?1:normal[1]);if(!number(w,1,3,true)||!number(h,1,3,true)||(!(w===normal[0]&&h===normal[1])&&!(legacy&&((['coal','hospital','nuclear','recycling','university','transit','wastewater'].includes(b.type)&&w===1&&h===1)||(b.type==='park'&&w===2&&h===2)))))fail(400,'Dimensiones no válidas.');if(b.type==='residential_block'&&(!number(b.baseLevel,1,8,true)||b.level<4))fail(400,'Conjunto residencial no válido.');if(b.type==='wastewater'&&!legacy){const x=b.anchor%width;const adjacent=[b.anchor-width,b.anchor+width,...(x>0?[b.anchor-1]:[]),...(x<width-1?[b.anchor+1]:[])];for(let dz=0;dz<h;dz++)for(let dx=0;dx<w;dx++){const i=b.anchor+dz*width+dx,xx=i%width;adjacent.push(i-width,i+width,...(xx>0?[i-1]:[]),...(xx<width-1?[i+1]:[]));}if(!adjacent.some(i=>s.river[i]))fail(400,'La depuradora necesita un río adyacente.');}const x=b.anchor%width,z=Math.floor(b.anchor/width);if(x+w>width||z+h>height)fail(400,'Edificio fuera del mapa.');for(let dz=0;dz<h;dz++)for(let dx=0;dx<w;dx++){const i=b.anchor+dz*width+dx;if(occupied.has(i)||!s.landUnlocked[i]||(s.river[i]&&b.type!=='road'))fail(400,'Edificios solapados o terreno no edificable.');occupied.add(i);}return {type:b.type,level:b.level,w,h,baseLevel:b.baseLevel||4,legacyFootprint:legacy,anchor:b.anchor,rot:b.rot,palette:b.palette,occ:b.occ,fire:b.fire};});
 const researchPoints=s.researchPoints??0;if(!number(researchPoints,0,1e9))fail(400,'Investigación no válida.');
 const techTypes=['solar','wastewater','university','hospital','nuclear'];
 const technologies=s.technologies??[...new Set(buildings.filter(b=>techTypes.includes(b.type)).map(b=>b.type))];
 if(!Array.isArray(technologies)||technologies.length>5||technologies.some(t=>!techTypes.includes(t))||new Set(technologies).size!==technologies.length)fail(400,'Tecnologías no válidas.');
 let loan=null;if(s.loan!=null){const l=s.loan;if(!number(l.principal,1,700000,true)||!(l.termsVersion===2?[1.5,3,6]:[3,6,12]).includes(l.months))fail(400,'Préstamo no válido.');const interest=l.months*(l.termsVersion===2?.04:.02),total=l.principal*(1+interest),hourly=total/(l.months*30*24);if(!number(l.remaining,0,total))fail(400,'Deuda no válida.');loan={...(l.termsVersion===2?{termsVersion:2}:{}),principal:l.principal,months:l.months,interest,total,remaining:l.remaining,hourly};}
 const unlockAt={};for(const t of Object.keys(CAPS))if(s.unlockAt&&number(s.unlockAt[t],0,1e9))unlockAt[t]=s.unlockAt[t];
 if(s.gameOver!==undefined&&typeof s.gameOver!=='boolean')fail(400,'Estado de partida no válido.');
 const cityName=s.cityName??'Mi ciudad';if(typeof cityName!=='string'||!cityName.trim()||cityName.length>32)fail(400,'Nombre de ciudad no válido.');
 return {cityName:cityName.trim(),dayNight:s.dayNight!==false,tutorialDone:s.tutorialDone??buildings.length>0,format:s.format>=3?s.format:2,width,height,gameOver:!!s.gameOver,mapSeed:s.mapSeed,money:s.money,day:s.day,tax:s.tax,cityLevel:s.cityLevel,diseaseDays:s.diseaseDays,crimeDays:s.crimeDays,alerts:s.alerts,debug:s.debug,landUnlocked:s.landUnlocked,river:s.river,buildings,unlockAt,researchPoints,technologies,loan};
}
async function limit(db,key,max,seconds,now){const bucket=Math.floor(now/seconds),id=await digest(key+':'+bucket);const r=await db.prepare('INSERT INTO city_rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(id,now+seconds).first();if(r.count>max)fail(429,'Demasiados intentos. Espera unos minutos y vuelve a intentarlo.');}
async function authenticate(db,request,now){const token=(request.headers.get('cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return db.prepare('SELECT a.id,a.username,s.token_hash FROM city_sessions s JOIN city_accounts a ON a.id=s.account_id WHERE s.token_hash=? AND s.expires_at>?').bind(await digest(token),now).first();}
export async function handleCityAPI(request,db,options={}){
 try{
  if(!db)fail(503,'El guardado no está disponible. Inténtalo de nuevo.');
  const route=new URL(request.url).pathname.slice('/api/ciudad-viva/'.length),now=Math.floor(Date.now()/1000);
  if(!['GET','POST','PUT'].includes(request.method))fail(405,'Método no permitido.');
  if(request.method!=='GET'&&request.headers.get('origin')!==(options.origin||ORIGIN))fail(403,'Solicitud de otro origen rechazada.');
  if(request.method==='POST'&&['register','login'].includes(route)){
   const ip=request.headers.get('cf-connecting-ip')||'unknown';await limit(db,'auth-ip:'+ip,40,900,now);
   const data=credentials(await body(request));await limit(db,'auth-user:'+data.key,12,900,now);
   let account=await db.prepare('SELECT id,username,password_hash,salt FROM city_accounts WHERE username_key=?').bind(data.key).first();
   if(route==='register'){
    await limit(db,'register:'+ip,6,3600,now);if(account)fail(409,'Ese nombre ya está ocupado. Elige otro o inicia sesión.');
    const salt=random(),hash=await passwordHash(data.password,salt),id=crypto.randomUUID();
    const result=await db.prepare('INSERT INTO city_accounts (id,username_key,username,password_hash,salt,created_at) VALUES (?,?,?,?,?,?) ON CONFLICT(username_key) DO NOTHING RETURNING id').bind(id,data.key,data.username,hash,salt,now).first();if(!result)fail(409,'Ese nombre ya está ocupado.');account={id,username:data.username};
   }else{const hash=await passwordHash(data.password,account?.salt||'missing-account-fixed-salt');if(!account||!equal(hash,account.password_hash))fail(401,'Nombre o contraseña incorrectos.');}
   const token=random();await db.prepare('INSERT INTO city_sessions (token_hash,account_id,expires_at) VALUES (?,?,?)').bind(await digest(token),account.id,now+TTL).run();
   await db.batch([db.prepare('DELETE FROM city_sessions WHERE expires_at<?').bind(now),db.prepare('DELETE FROM city_rate_limits WHERE expires_at<?').bind(now)]);
   return json({user:{username:account.username}},200,{'Set-Cookie':cookie(token,TTL,options.secureCookies!==false)});
  }
  const user=await authenticate(db,request,now);
  if(route==='session'&&request.method==='GET')return json({user:user?{username:user.username}:null});
  if(!user)fail(401,'Tu sesión ha caducado. Inicia sesión para recuperar tu ciudad.');
  if(route==='logout'&&request.method==='POST'){await db.prepare('DELETE FROM city_sessions WHERE token_hash=?').bind(user.token_hash).run();return json({ok:true},200,{'Set-Cookie':cookie('',0,options.secureCookies!==false)});}
  if(route==='city'&&request.method==='GET'){const save=await db.prepare('SELECT state,version,updated_at FROM city_saves WHERE account_id=?').bind(user.id).first();return json(save?{state:JSON.parse(save.state),version:save.version,updatedAt:save.updated_at}:{state:null,version:0});}
  if(route==='city'&&request.method==='PUT'){
   const payload=await body(request);if(!Number.isSafeInteger(payload.version)||payload.version<0)fail(400,'Versión no válida.');const state=JSON.stringify(validateCity(payload.state));
   const result=payload.version===0?await db.prepare('INSERT INTO city_saves (account_id,state,version,updated_at) VALUES (?,?,1,?) ON CONFLICT(account_id) DO NOTHING RETURNING version').bind(user.id,state,now).first():await db.prepare('UPDATE city_saves SET state=?,version=version+1,updated_at=? WHERE account_id=? AND version=? RETURNING version').bind(state,now,user.id,payload.version).first();
   if(!result)fail(409,'Hay una versión más reciente de tu ciudad en otra pestaña o dispositivo. Recárgala para continuar.');return json({version:result.version,updatedAt:now});
  }
  fail(404,'Ruta no encontrada.');
 }catch(error){if(error instanceof Fault)return json({error:error.message},error.status);console.error('Ciudad Viva storage/auth failure',error?.name);return json({error:'No se ha podido acceder a tu ciudad. Inténtalo de nuevo; tus datos guardados se conservan.'},503);}
}
