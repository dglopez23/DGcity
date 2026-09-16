import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {handleCityAPI,validateCity} from '../server/city-api.mjs';
const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');sqlite.exec(readFileSync(new URL('../drizzle/0008_illegal_crusher_hogan.sql',import.meta.url),'utf8'));
const db={prepare(sql){return {bind(...args){const q=sqlite.prepare(sql);return {async first(){return q.get(...args)||null},async run(){return q.run(...args)}}}}},async batch(q){return Promise.all(q.map(x=>x.run()))}};
const origin='https://juegos-dglopez.dglopez.chatgpt.site';
async function call(route,method='GET',data,session='',extra={}){const r=await handleCityAPI(new Request(origin+'/api/ciudad-viva/'+route,{method,headers:{Origin:origin,'Content-Type':'application/json',Cookie:session,'cf-connecting-ip':'192.0.2.10',...extra},body:data===undefined?undefined:JSON.stringify(data)}),db);return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie'),headers:r.headers};}
let a,b;
const state={format:1,width:30,height:24,mapSeed:12,money:8500,day:8,tax:10,cityLevel:1,diseaseDays:0,crimeDays:0,alerts:0,debug:false,landUnlocked:Array(720).fill(true),river:Array(720).fill(false),unlockAt:{road:0},buildings:[]};


test('Square town halls save at every city level while compact legacy halls remain valid',()=>{
 for(let level=1;level<=8;level++)for(const [w,h] of [[2,2],[2,1],[1,2]]){
  const city={...state,format:4,width:36,height:36,cityLevel:level,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[{type:'townhall',level,w,h,anchor:100,rot:0,palette:0,occ:0,fire:0}]};
  const saved=validateCity(city);assert.equal(saved.buildings[0].w,w);assert.equal(saved.buildings[0].h,h);
  if(w===2&&h===2)assert.throws(()=>validateCity({...city,buildings:[...city.buildings,{type:'residential',level:1,w:1,h:1,anchor:137,rot:0,palette:0,occ:0,fire:0}]}));
 }
});

test('Inventory and weather validate independently of city occupancy and survive JSON round trips',()=>{
 const city={...state,format:4,width:36,height:36,day:121,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[],inventory:[],weather:{checkedDay:5,rainUntil:144,floodStart:120,floodUntil:192}};
 for(const [type,level,w,h] of [['residential',8,1,1],['solar',6,1,2],['solar_complex',6,2,2],['nuclear',3,2,2],['light_industrial_complex',5,2,1],['port',5,1,3],['wastewater',5,1,2]]){
  city.inventory.push({type,level,w,h,anchor:200,rot:0,occ:0,fire:0,palette:54,...(type==='residential'?{yardTree:true}:{})});
 }
 city.inventory.push({type:'park',level:8,w:6,h:3,parkLevels:[7,8],anchor:200,rot:0,occ:0,fire:0,palette:4});
 const saved=validateCity(city);assert.equal(saved.inventory.length,8);assert.equal(saved.inventory[0].yardTree,true);assert.deepEqual(saved.weather,city.weather);assert.equal(saved.buildings.length,0);
 assert.deepEqual(validateCity(JSON.parse(JSON.stringify(saved))),saved);
 for(const patch of [{type:'road'},{type:'townhall'},{occ:1},{fire:1},{level:100},{w:8},{palette:Infinity}]){
  assert.throws(()=>validateCity({...city,inventory:[{...city.inventory[0],...patch}]}));
 }
 assert.throws(()=>validateCity({...city,inventory:Array(257).fill(city.inventory[0])}));
 for(const patch of [{checkedDay:6},{checkedDay:.5},{rainUntil:146},{floodStart:122},{floodUntil:300},{floodUntil:130},{floodUntil:0},{floodStart:NaN}]){
  assert.throws(()=>validateCity({...city,weather:{...city.weather,...patch}}));
 }
 assert.deepEqual(validateCity(state).inventory,[]);assert.equal(validateCity(state).weather.checkedDay,0);
});

test('Residential trees persist, default safely for old saves and reject invalid attributes',()=>{
 const home={type:'residential',level:1,w:1,h:1,rot:0,anchor:200,palette:0,occ:0,fire:0};
 for(const yardTree of [true,false])assert.equal(validateCity({...state,buildings:[{...home,yardTree}]}).buildings[0].yardTree,yardTree);
 assert.equal(validateCity({...state,buildings:[home]}).buildings[0].yardTree,false);
 for(const yardTree of [1,'true',null])assert.throws(()=>validateCity({...state,buildings:[{...home,yardTree}]}));
 assert.throws(()=>validateCity({...state,buildings:[{...home,type:'commercial',yardTree:true}]}));
});
test('Register independent accounts and issue protected cookies; hashes are salted',async()=>{a=await call('register','POST',{username:'Prueba_A',password:'contraseña-A-123'});b=await call('register','POST',{username:'Prueba_B',password:'contraseña-A-123'});assert.equal(a.status,200);assert.match(a.cookie,/HttpOnly; Secure; SameSite=Strict/);a.cookie=a.cookie.split(';')[0];b.cookie=b.cookie.split(';')[0];const accounts=sqlite.prepare('SELECT * FROM city_accounts').all();assert.notEqual(accounts[0].password_hash,accounts[1].password_hash);assert(!JSON.stringify(accounts).includes('contraseña'));assert.equal((await call('register','POST',{username:'prueba_a',password:'another-secret'})).status,409);});

test('Ports accept two water cells and new facilities retain maximum levels and wind research',()=>{
 const city={...state,format:4,width:36,height:36,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),technologies:['solar','wastewater','university','hospital','nuclear','wind']};
 for(let rot=0;rot<4;rot++){
  const x=12,z=12,river=city.river.slice(),shore=Array.from({length:3},(_,k)=>rot===0?[x+1,z+k]:rot===1?[x+k,z-1]:rot===2?[x-1,z+k]:[x+k,z+1]);shore.forEach(([xx,zz])=>river[zz*36+xx]=true);
  const port={type:'port',level:5,anchor:z*36+x,rot,w:rot%2?3:1,h:rot%2?1:3,occ:0,fire:0,palette:0};
  const saved=validateCity({...city,river,buildings:[port]});assert.equal(saved.buildings[0].level,5);assert(saved.technologies.includes('wind'));
  river[shore[1][1]*36+shore[1][0]]=false;assert.equal(validateCity({...city,river,buildings:[port]}).buildings.length,1);river[shore[0][1]*36+shore[0][0]]=false;assert.throws(()=>validateCity({...city,river,buildings:[port]}));assert.throws(()=>validateCity({...city,river,buildings:[{...port,legacyFootprint:true}]}));
 }
 for(const [type,level,w,h] of [['recycling',7,2,2],['wind',5,1,1],['theater',5,1,1],['opera',4,2,2]]){const b={type,level,w,h,anchor:300,rot:0,occ:0,fire:0,palette:0};assert.equal(validateCity({...city,buildings:[b]}).buildings[0].type,type);assert.throws(()=>validateCity({...city,buildings:[{...b,level:level+1}]}));}
});

test('Solar N6 saves and reloads through the authenticated API; N7 is rejected',async()=>{
 const city={...state,format:4,width:36,height:36,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[{type:'solar',level:6,w:1,h:2,anchor:200,rot:0,palette:0,occ:0,fire:0}]};
 const put=await call('city','PUT',{version:0,state:city},b.cookie);assert.equal(put.status,200);assert.equal((await call('city','GET',undefined,b.cookie)).body.state.buildings[0].level,6);
 city.buildings[0].level=7;assert.equal((await call('city','PUT',{version:1,state:city},b.cookie)).status,400);assert.equal((await call('city','GET',undefined,b.cookie)).body.state.buildings[0].level,6);
 sqlite.prepare('DELETE FROM city_saves WHERE account_id=(SELECT id FROM city_accounts WHERE username_key=?)').run('prueba_b');
});
test('Integrated solar and 2x2 nuclear saves are valid; old nuclear footprints remain compatible',()=>{
 const city={...state,format:4,width:36,height:36,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),technologies:['solar','nuclear']};
 const solar={type:'solar_complex',level:6,w:2,h:2,anchor:200,rot:0,palette:47,occ:0,fire:0},nuclear={type:'nuclear',level:3,w:2,h:2,anchor:300,rot:0,palette:0,occ:0,fire:0};
 let saved=validateCity({...city,buildings:[solar,nuclear]});assert.equal(saved.buildings[0].palette,47);assert.equal(saved.buildings[1].w,2);assert.throws(()=>validateCity({...city,buildings:[{...solar,w:1}]}));
 saved=validateCity({...city,buildings:[{...nuclear,w:2,h:1}]});assert(saved.buildings[0].legacyFootprint);saved=validateCity({...city,buildings:[{...nuclear,w:1,h:2,rot:1}]});assert(saved.buildings[0].legacyFootprint);
});
test('Wrong passwords, missing sessions and cross-origin writes rejected',async()=>{assert.equal((await call('login','POST',{username:'Prueba_A',password:'wrong-password'})).status,401);assert.equal((await call('city')).status,401);assert.equal((await call('city','PUT',{version:0,state},a.cookie,{Origin:'https://attacker.invalid'})).status,403);assert.equal((await call('login','POST',{username:'PRUEBA_A',password:'contraseña-A-123'})).status,200);});
test('Cities isolated by authenticated session; caller-supplied owner ignored',async()=>{assert.equal((await call('city','PUT',{version:0,state,accountId:'other'},a.cookie)).status,200);assert.equal((await call('city','GET',undefined,b.cookie)).body.state,null);const saved=await call('city','GET',undefined,a.cookie);assert.equal(saved.body.state.money,8500);assert.equal(saved.body.version,1);});
test('Atomic versions prevent concurrent overwrites and preserve last save',async()=>{assert.equal((await call('city','PUT',{version:1,state:{...state,money:9000}},a.cookie)).status,200);assert.equal((await call('city','PUT',{version:1,state:{...state,money:5}},a.cookie)).status,409);assert.equal((await call('city','GET',undefined,a.cookie)).body.state.money,9000);});
test('Reject malformed saves, overlaps, over-level buildings and construction on water',()=>{assert.throws(()=>validateCity({...state,money:NaN}));const building={type:'road',anchor:0,rot:0,level:1,occ:0,fire:0,palette:0};assert.throws(()=>validateCity({...state,buildings:[building,building]}));assert.throws(()=>validateCity({...state,buildings:[{...building,level:9}]}));assert.throws(()=>validateCity({...state,river:Array(720).fill(true),buildings:[{...building,type:'residential'}]}));assert.equal(validateCity({...state,river:Array(720).fill(true),buildings:[building]}).buildings.length,1);});
test('Logout invalidates server session, expiration rejected, login throttled',async()=>{assert.equal((await call('logout','POST',{},a.cookie)).status,200);assert.equal((await call('city','GET',undefined,a.cookie)).status,401);sqlite.prepare('UPDATE city_sessions SET expires_at=0').run();assert.equal((await call('city','GET',undefined,b.cookie)).status,401);let r;for(let i=0;i<13;i++)r=await call('login','POST',{username:'Missing',password:'not-a-password'});assert.equal(r.status,429);});
test('Research, including wastewater, and amortized loans persist with compatible defaults',()=>{const old=validateCity(state);assert.equal(old.researchPoints,0);assert.deepEqual(old.technologies,[]);assert.equal(old.loan,null);const latest=validateCity({...state,researchPoints:220,technologies:['solar','wastewater'],loan:{principal:5000,months:6,remaining:5000}});assert.equal(latest.researchPoints,220);assert.deepEqual(latest.technologies,['solar','wastewater']);assert(Math.abs(latest.loan.total-5600)<1e-8);assert(Math.abs(latest.loan.hourly-5600/(6*720))<1e-8);assert.throws(()=>validateCity({...state,loan:{principal:5000,months:6,remaining:1e9}}));});
test('Expanded and fused buildings validate, retain city settings, and reject overlapping or undersized footprints',()=>{const base={type:'residential_block',level:4,baseLevel:8,anchor:200,rot:0,w:2,h:2,occ:3200,fire:0,palette:1,legacyFootprint:false};const save=validateCity({...state,format:2,cityName:'Nueva Toledo',dayNight:false,tutorialDone:true,buildings:[base]});assert.equal(save.buildings[0].occ,3200);assert.equal(save.buildings[0].baseLevel,8);assert.equal(save.cityName,'Nueva Toledo');assert.equal(save.dayNight,false);assert.throws(()=>validateCity({...state,format:2,buildings:[{...base,type:'coal',level:1,w:1,h:1,occ:0}]}));assert.throws(()=>validateCity({...state,format:2,buildings:[base,{...base,type:'commercial',anchor:201,w:1,h:1,occ:0}]}));const legacy=validateCity({...state,format:1,buildings:[{type:'coal',level:1,anchor:200,rot:0,occ:0,fire:0,palette:0}]});assert.equal(legacy.buildings[0].w,1);assert(legacy.buildings[0].legacyFootprint);});
test('Format 3 saves expanded map, campus and rotated interchange; wastewater requires river adjacency',()=>{
 const base={...state,format:3,width:36,landUnlocked:Array(864).fill(true),river:Array(864).fill(false),buildings:[],gameOver:true};
 const building={type:'university',level:1,anchor:200,w:2,h:2,rot:0,occ:0,fire:0,palette:0};
 assert.equal(validateCity({...base,buildings:[building]}).width,36);
 assert.equal(validateCity(base).gameOver,true);
 assert.throws(()=>validateCity({...base,buildings:[{...building,w:1,h:1}]}));
 assert.equal(validateCity({...base,buildings:[{...building,type:'transit',rot:1,w:2,h:1}]}).buildings[0].w,2);
 const plant={...building,type:'wastewater',w:1,h:2};
 assert.equal(validateCity({...base,buildings:[{...plant,h:1}]}).buildings[0].legacyFootprint,true);
 assert.throws(()=>validateCity({...base,buildings:[plant]}));
 base.river[237]=true;assert.equal(validateCity({...base,buildings:[plant]}).buildings.length,1);
 assert.equal(validateCity({...state,format:2,buildings:[{...building,w:1,h:1}]}).buildings[0].legacyFootprint,true);
});
test('Square format 4 cities support N8 parks and preserve legacy rectangular formats',()=>{const s={...state,format:4,width:36,height:36,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[{type:'park',level:8,w:3,h:3,anchor:1000,rot:0,occ:0,fire:0,palette:0}]};const saved=validateCity(s);assert.equal(saved.height,36);assert.equal(saved.buildings[0].level,8);assert.throws(()=>validateCity({...s,height:24}));});

test('Debug and revised loan terms persist while legacy loan interest stays unchanged',()=>{const saved=validateCity({...state,debug:true,loan:{principal:1000,months:1.5,remaining:1060,termsVersion:2}});assert(saved.debug);assert.equal(saved.loan.hourly,1060/(1.5*720));assert.equal(saved.loan.termsVersion,2);const old=validateCity({...state,loan:{principal:1000,months:3,remaining:1060}});assert.equal(old.loan.total,1060);assert.equal(old.loan.hourly,1060/(3*720));});


test('Merged park saves preserve mixed levels and reject invalid dimensions, levels and overlaps',()=>{
 const park={type:'park',level:6,parkLevels:[5,7],w:6,h:3,anchor:200,rot:0,palette:0,occ:0,fire:0};
 const save={...state,format:4,width:36,height:36,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[park]};
 for(const [w,h] of [[6,3],[3,6]]){save.buildings=[{...park,w,h}];const validated=validateCity(save);assert.deepEqual(validated.buildings[0].parkLevels,[5,7]);assert.equal(validated.buildings[0].w,w);}
 for(const change of [{parkLevels:[4,7]},{parkLevels:[5]},{level:4},{w:6,h:6},{w:6,h:2},{rot:1}]){save.buildings=[{...park,...change}];assert.throws(()=>validateCity(save));}
 save.buildings=[park,{type:'road',level:1,w:1,h:1,anchor:201,rot:0,palette:0,occ:0,fire:0}];assert.throws(()=>validateCity(save));
});


test('Industrial saves support rotated heavy factories, light factories and compact complexes',()=>{
 const city={...state,format:4,width:36,height:36,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false)};
 const building={level:3,anchor:200,rot:0,palette:2,occ:0,fire:0};
 for(const [type,w,h,rot] of [['heavy_industry',1,2,0],['heavy_industry',2,1,1],['light_industry',1,1,0],['industrial_complex',2,2,0]]){city.buildings=[{...building,type,w,h,rot}];const saved=validateCity(city);assert.equal(saved.buildings[0].type,type);assert.equal(saved.buildings[0].w,w);assert.equal(saved.buildings[0].palette,2);}
 for(const b of [{type:'heavy_industry',w:1,h:1},{type:'light_industry',w:2,h:2},{type:'industrial_complex',w:1,h:2},{type:'heavy_industry',w:1,h:2,level:6}]){city.buildings=[{...building,...b}];assert.throws(()=>validateCity(city));}
});


test('Monuments and tutorial/news history survive validation; malformed history and footprints are rejected',()=>{
 const city={...state,format:4,width:36,height:36,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),tutorialStep:2,adviceSeen:['heavy_industry'],newsSeen:['Noticia única'],buildings:[{type:'monument',level:1,w:1,h:1,anchor:200,rot:0,palette:2,occ:0,fire:0}]};
 const saved=validateCity(city);assert.equal(saved.buildings[0].type,'monument');assert.equal(saved.tutorialStep,2);assert.deepEqual(saved.newsSeen,city.newsSeen);assert.deepEqual(saved.adviceSeen,city.adviceSeen);
 for(const changes of [{tutorialStep:7},{newsSeen:['x'.repeat(301)]},{adviceSeen:['invalid']},{buildings:[{...city.buildings[0],w:2}]}])assert.throws(()=>validateCity({...city,...changes}));
});

test('Municipality persists policy, activation history, linked roads and all eight hall levels',()=>{
 for(let level=1;level<=8;level++){
 const hall={type:'townhall',level,anchor:100,rot:0,w:1,h:2,occ:0,fire:0,palette:0},road={type:'road',level:1,anchor:172,rot:0,w:1,h:1,occ:0,fire:0,palette:0};
 const city={...state,format:4,width:36,height:36,cityLevel:level,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),buildings:[hall,road],municipalVersion:1,civicRoad:172,ordinance:level>=2?'housing':null,ordinanceEverActivated:level>=2,adviceSeen:level>=2?['townhall']:[]};
 const saved=validateCity(city);assert.equal(saved.ordinance,city.ordinance);assert.equal(saved.ordinanceEverActivated,city.ordinanceEverActivated);assert.equal(saved.civicRoad,172);
 assert.throws(()=>validateCity({...city,buildings:[{...hall,level:level===8?7:8},road]}));
 assert.throws(()=>validateCity({...city,buildings:[hall,road,{...road,anchor:400}]}));
 assert.throws(()=>validateCity({...city,buildings:[hall],civicRoad:172}));
 assert.throws(()=>validateCity({...city,ordinance:'invented'}));
 assert.throws(()=>validateCity({...city,ordinance:'housing',ordinanceEverActivated:false}));
 if(level<8)assert.throws(()=>validateCity({...city,ordinance:'global',ordinanceEverActivated:true}));
 const disabled=validateCity({...city,ordinance:null,ordinanceEverActivated:true});assert(disabled.ordinanceEverActivated);
 }
});
test('Legacy saves remain valid without municipal fields and intensive occupancy survives',()=>{
 const legacy=validateCity({...state});assert.equal(legacy.ordinance,null);assert.equal(legacy.municipalVersion,0);
 const city={...state,format:4,width:36,height:36,cityLevel:8,landUnlocked:Array(1296).fill(true),river:Array(1296).fill(false),ordinance:'intensive',ordinanceEverActivated:true,buildings:[{type:'residential',level:8,anchor:100,rot:0,w:1,h:1,palette:0,occ:896,fire:0}]};
 assert.equal(validateCity(city).buildings[0].occ,896);assert.throws(()=>validateCity({...city,buildings:[{...city.buildings[0],occ:897}]}));
});
