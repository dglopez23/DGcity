const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('public/ciudad-viva/index.html','utf8');
const nodes=new Map();
function node(){return{focus(){},scrollIntoView(){},click(){this.listeners?.click?.({target:this})},style:{setProperty(){}},closest(){return this},contains(){return false},dataset:{},children:[],textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(type,fn){(this.listeners??={})[type]=fn},prepend(x){this.children.unshift(x);if(this.children.length>14)this.children.pop()},appendChild(x){this.children.push(x)},remove(){},setAttribute(){},getBoundingClientRect(){return{left:0,top:0,width:1100,height:720}},offsetWidth:330,offsetHeight:320,clientWidth:1100,clientHeight:720,setPointerCapture(){}};}
const gl=new Proxy({getShaderParameter(){return true},getProgramParameter(){return true},getAttribLocation(){return 0},getUniformLocation(){return{}},getShaderInfoLog(){return''},getProgramInfoLog(){return''}}, {get:(o,k)=>o[k]||(()=>({}))});
const doc={body:node(),querySelector(sel){if(!nodes.has(sel))nodes.set(sel,node());return nodes.get(sel)},querySelectorAll(){return[]},createElement:node,addEventListener(){}};
doc.querySelector('#glCanvas').getContext=()=>gl;
const ctx={document:doc,window:{addEventListener(){}},performance:{now:()=>1000},requestAnimationFrame(){},setTimeout(){},setInterval(){},fetch:()=>new Promise(()=>{}),AbortSignal,clearTimeout(){},devicePixelRatio:1,console,Math,Float32Array,Uint16Array};
vm.createContext(ctx);
let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
js=js.replace(/\}\)\(\);\s*$/, `Object.assign(thisTest,{renderResearchAndLoan,transitRoadRelief,buildingEmissions,operational,cityNews,upgradeToMaximum,roadConstructionQuote,advanceGuide,guideRequirementMet,presentNextNews,addEvent,currentUnlockAdvice,computeGoods,goodsDemand,goodsRequirement,goodsCanPlace,goodsFactor,industrialFusionGroup,roadComponents,computeTraffic,clearBuilding,isIndustry,getGoodsRoutes:()=>goodsRoutes,getTrafficRoutes:()=>trafficRoutes,captureProduction:buildings=>{captureParts=[];drawIndustryProduction(buildings);const p=captureParts;captureParts=null;return p;},parkFusionGroup,parkSections,localResidentialSatisfaction,roadLaneDividers,ROAD_LANES,roadLamp,FS,repayLoan,researchDemand,surfaceFor,parkLampOffsets,shortestRoadPath,laneOffset,tickSimulation,markActivity,getSpeed:()=>runningSpeed,fireProbability,debugAdvanceLevel,buildingPalette,crossfadeMusic,toggleAnalysis,setLayer,setFrame:n=>lastFrame=n,upgradeSpace,renderEmergency,windowLight,hasCrosswalk,roadColor,roadDragQuote,metricAvailable,layerValue,localServices,cityParticles,getServiceCars:()=>serviceCars,fusionGroup,mergeSelected,renameCity,rotatePlacement,generateRiver,buildingDef,buildingUpgradeCost,canPlace,currentSun,drawRoadTile,renderCityGuide,takeLoan,loanLimit,loanHourly,loanTerms,unlockTechnology,buildingLocked,buildPrice,taxDiscomfort,spreadFires,fireProtection,trafficSpeedFactor,simulationRate,serviceEfficiency,citySnapshot,restoreCity,setDebug,canAfford,changeMoney,ensureLevel,maxAllowedLevel,commercialRevenue,apportion,buildingStats,renderUI,buildRoadDrag,demolishSelected,getState:()=>S,setState:s=>S=s,newState,DEF,LEVELS,UP_MULT,idx,coord,footprint,build,calc,advance,uniqueBuildings,placementRotation,buildingCells,openPopup,moveSelected,placeMoved,cancelAction,showLandPopup,buySelectedLand,upgradeSelected,upgradeCost,drawBuilding,thumbSVG,power,STAR_FIELD,render3D,updateCars,getCars:()=>cars,setSpeed:n=>{runningSpeed=n;if(n)markActivity(lastFrame)},resetCars:()=>cars=[],captureRoad:(i)=>{captureParts=[];const c=coord(i),w=worldFromCell(c.x,c.z);drawRoadTile(i,S.grid[i],w);const p=captureParts;captureParts=null;return p;},geometryFor,smogAmount,capture:b=>{captureParts=[];const fp=b.parkLevels?{w:b.w,h:b.h}:footprint(b.type,b.rot||0,b.level);drawBuilding({...b,w:fp.w,h:fp.h,anchor:0},-(fp.w-1)/2,-(fp.h-1)/2);const p=captureParts;captureParts=null;return p;}});})();`);
js=js.replace('Object.assign(thisTest,{','Object.assign(thisTest,{isJunction,junctionSignal,approachingJunction,roadPaving,receiverHeight,skyHorizon,groundShadowTriangles,migrateMunicipality,setTrafficClock:t=>industryClock=t,getTrafficClock:()=>industryClock,captureCivic:(buildings,t)=>{captureParts=[];drawCivicMotion(buildings,t);const p=captureParts;captureParts=null;return p;},captureSignals:buildings=>{captureParts=[];drawTrafficSignals(buildings);const p=captureParts;captureParts=null;return p;},fmt,isRaining,isFlooding,floodDepth,floodDuration,advanceWeather,renderWeather,storeBuilding,takeInventory,savedBuilding,CITY_GUIDE,getVisitDrag:()=>visitDrag,visitDragMove,finishVisitDrag,setCars:v=>cars=v,lunarPhase,sunDiscColor,vividColor,renderMunicipality,ORDINANCES,ORDINANCE_COST,activateOrdinance,ordinanceSwitchCost,municipalRoads,municipalTrafficFactor,baseBuildingDef,syncTownhall,openMunicipality,carPose,carsTooClose,solarFusionGroup,portWaterfront,cargoShipPose,riverShippingPath,nuisanceRadius,satisfactionDetails,beginVisit,endVisit,updateVisit,walkablePoint,updateCamera,WALK_SPEED,CAR_MAX_SPEED,getWalk:()=>walk,getEye:()=>camEye,visitPointerDown,visitPointerMove,visitPointerUp,captureInfluence:b=>{captureParts=[];drawInfluence(b);const parts=captureParts;captureParts=null;return parts;},serviceContribution,serviceDelta,attractiveness,influenceRadius,maximumUpgradeCost,utilityStatus,statLabel,lightIndustrialFusionGroup,ironicHeadlines,nameNewCity,vertexDataForParts,closePopup,updatePopupPosition,renderPalette,buildingSpecs,captureLayer:b=>{captureParts=[];captureScene=true;const fp=footprint(b.type,b.rot||0,b.level);drawBuilding({...b,w:fp.w,h:fp.h,anchor:0},-(fp.w-1)/2,-(fp.h-1)/2);const p=captureParts;captureParts=null;captureScene=false;return p;},captureLayerRoad:i=>{captureParts=[];captureScene=true;const c=coord(i);drawRoadTile(i,S.grid[i],worldFromCell(c.x,c.z));const p=captureParts;captureParts=null;captureScene=false;return p;},');
ctx.thisTest={};vm.runInContext(js,ctx);const g=ctx.thisTest;
function reset(){g.setState(g.newState(false));const s=g.getState();s.landUnlocked.fill(true);s.river.fill(false);s.money=1e8;s.cityLevel=8;s.day=100;s.weather.checkedDay=4;s.unlockAt=Object.fromEntries(Object.keys(g.DEF).map(t=>[t,0]));s.technologies=['solar','wastewater','university','hospital','nuclear'];return s;}
function add(x,z,t,l=1,occ=0){const s=g.getState(),i=g.idx(x,z);if(['solar','wastewater','university','hospital','nuclear'].includes(t))s.researchCap=(s.researchUse||0)+10;g.build(i,t);const b=s.grid[i];assert(b&&b.type===t,`build ${t} ${x},${z}`);b.level=l;b.occ=occ;return b;}
const results=[];function test(n,f){f();results.push(n);console.log('PASS',n)}




test('Signals alternate axes, clear the junction and let both approaches finish without collisions',()=>{
 const s=reset();for(let x=7;x<=13;x++)add(x,10,'road');for(let z=7;z<=13;z++)if(z!==10)add(10,z,'road');add(7,11,'residential',8,500);add(13,11,'commercial',5);g.calc();
 for(const b of g.uniqueBuildings())if(b.type==='road')b.traffic=0;
 const junction=g.idx(10,10),offset=(10+10)*2,clock=22-offset%22;g.setTrafficClock(clock);assert.equal(g.junctionSignal(junction,clock),'x');assert.equal(g.junctionSignal(junction,clock+9),null);assert.equal(g.junctionSignal(junction,clock+12),'z');
 const a={path:[8,9,10,11,12].map(x=>g.idx(x,10)),t:1.25,lane:0,color:'#ffffff'},b={path:[8,9,10,11,12].map(z=>g.idx(10,z)),t:1.25,lane:0,color:'#ffffff'};
 const follower={...b,path:b.path.slice(),t:.9};g.setCars([a,b,follower]);g.setSpeed(1);const rand=ctx.Math.random;ctx.Math.random=()=>0;
 try{for(let frame=0;frame<440;frame++){g.updateCars(.1);if(frame===70){assert(b.signalWait);assert(!b.retired);}const cars=g.getCars();for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++)assert(!g.carsTooClose(g.carPose(cars[i]),g.carPose(cars[j])));}}finally{ctx.Math.random=rand;g.setSpeed(0);}
 assert(a.t>=a.path.length-1&&b.t>=b.path.length-1&&follower.t>=follower.path.length-1,'both approaches and the queued follower complete the crossing');
 const colors=g.captureSignals([s.grid[junction]]).map(p=>p.col);assert(colors.includes('#e44843'));
});
test('Civic motion rotates only the cube and animates small fountain jets',()=>{
 const s=reset(),cube={type:'monument',level:1,palette:4,anchor:g.idx(12,12),w:1,h:1,rot:0},park={type:'park',level:3,anchor:g.idx(15,15),w:2,h:2,rot:0};
 const first=g.captureCivic([cube,park],0),next=g.captureCivic([cube,park],2);assert.equal(first.filter(p=>p.mesh==='cornerCube').length,1);assert.equal(first[0].x,next[0].x);assert.equal(first[0].y,next[0].y);assert.notEqual(first[0].ry,next[0].ry);assert.notDeepEqual(first.slice(1),next.slice(1));assert(first.slice(1).every(p=>p.sx<=.02));
 for(let level=3;level<=5;level++)assert(g.capture({type:'theater',level}).some(p=>p.mesh==='dome'&&p.col==='#d7ad62'));
});
test('Road paving leaves asphalt uncovered; zebras run along each road direction',()=>{
 for(const horizontal of [true,false]){
  const s=reset();for(let n=4;n<=25;n++)add(horizontal?n:10,horizontal?10:n,'road',8);
  const road=g.uniqueBuildings().find(b=>g.hasCrosswalk(b.anchor));assert(road);
  const parts=g.captureRoad(road.anchor),zebras=parts.filter(p=>p.col==='#eee8d3');assert.equal(zebras.length,5);assert(zebras.every(p=>horizontal?p.sx>p.sz:p.sz>p.sx));
  const paving=parts.filter(p=>p.col==='#b4b7a9'),asphalt=parts.filter(p=>p.col===g.roadColor(0));
  for(const p of paving)for(const a of asphalt)assert(!(Math.abs(p.x-a.x)<(p.sx+a.sx)/2-1e-7&&Math.abs(p.z-a.z)<(p.sz+a.sz)/2-1e-7),'pavement covers asphalt');
 }
});
test('Ground shadows follow road and terrain heights; daylight horizon is lighter and sunset warmer',()=>{
 const s=reset();add(18,18,'road');assert.equal(g.receiverHeight(.5,.5),.027);assert.equal(g.receiverHeight(2.5,2.5),.001);
 const data=[];g.groundShadowTriangles([[0,0],[3,0],[3,3],[0,3]],.2,data);const heights=data.filter((_,i)=>i%4===1);assert(heights.includes(.027)&&heights.includes(.001));assert(!heights.includes(.054));
 const noon=g.skyHorizon({daylight:1,warm:0},[.26,.56,.86]),sunset=g.skyHorizon({daylight:1,warm:1},[.26,.56,.86]);assert(noon[0]>.26&&noon[1]>.56&&noon[2]>.86);assert(sunset[0]>noon[0]&&sunset[2]<noon[2]);
});
test('Legacy halls expand only into free connected land and all new halls use four cells',()=>{
 const s=reset(),anchor=g.idx(12,12);add(12,14,'road');const hall={type:'townhall',anchor,w:1,h:2,cells:[anchor,anchor+36],level:8,rot:1,palette:0,occ:0,fire:0};hall.cells.forEach(c=>s.grid[c]=hall);g.migrateMunicipality();assert.equal(hall.cells.length,4);assert.equal(hall.w,2);assert.equal(hall.h,2);
 for(let level=1;level<=8;level++){const p=g.capture({type:'townhall',level,rot:0});assert(p.some(q=>q.sx>1.9&&q.sz>1.9));if(level>=2)assert(p.some(q=>q.col==='#a37856'));}
});

test('Stuck vehicles retire safely and service routes are rebuilt when roads expand',()=>{
 const s=reset();for(let x=8;x<=12;x++)add(x,7,'road');add(8,8,'residential',8,500);add(12,8,'commercial',5);g.calc();g.setSpeed(1);
 const path=[g.idx(8,7),g.idx(9,7),g.idx(10,7)],a={path,t:0,lane:0,color:'#eeeeee'},b={...a,path:path.slice()};g.setCars([a,b]);
 for(let frame=0;frame<110;frame++)g.updateCars(.25);
 assert(a.retired||b.retired);assert(a.retired||a.t>0);assert(b.retired||b.t>0);
 const station=add(10,8,'police');g.updateCars(.01);assert(g.getServiceCars().some(c=>c.owner===station));
 for(let x=13;x<=18;x++)add(x,7,'road');g.calc();g.updateCars(.01);assert(g.getServiceCars().some(c=>c.owner===station&&c.path.includes(g.idx(18,7))));
 g.resetCars();g.setSpeed(0);
});

test('Inventory stores level and appearance, empties homes and restores exactly once',()=>{
 const s=reset();add(8,7,'road');const home=add(8,8,'residential',4,65);home.palette=43;home.yardTree=true;
 const cash=s.money;assert(g.storeBuilding(home));assert.equal(s.grid[home.anchor],null);assert.equal(s.inventory.length,1);assert.equal(s.inventory[0].occ,0);assert.equal(s.money,cash);
 g.takeInventory(0);g.placeMoved(g.idx(8,7));assert.equal(s.inventory.length,1);g.cancelAction();assert.equal(s.inventory.length,1);
 const saved=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(saved)));const restored=g.getState();assert.equal(restored.inventory[0].yardTree,true);
 g.takeInventory(0);g.placeMoved(g.idx(9,8));const b=restored.grid[g.idx(9,8)];assert.equal(b.level,4);assert.equal(b.palette,43);assert.equal(b.occ,0);assert.equal(b.yardTree,true);assert.equal(restored.inventory.length,0);g.placeMoved(g.idx(10,8));assert.equal(restored.grid[g.idx(10,8)],null);
 assert(!g.storeBuilding(restored.grid[g.idx(8,7)]));assert(!g.storeBuilding({type:'townhall'}));b.fire=1;assert(!g.storeBuilding(b));
});
test('Weather rolls once per day with exact 10% rain and conditional 20% flood thresholds',()=>{
 let s=reset();s.day=120;g.advanceWeather(()=>.10);assert(!g.isRaining());let calls=0;g.advanceWeather(()=>{calls++;return 0;});assert.equal(calls,0);
 s=reset();s.day=120;let rolls=[.099,.20];g.advanceWeather(()=>rolls.shift());assert(g.isRaining());assert(!g.isFlooding());assert.equal(s.weather.rainUntil,144);
 s=reset();s.day=120;rolls=[.099,.199];g.advanceWeather(()=>rolls.shift());assert(g.isFlooding());assert.equal(s.weather.floodUntil,192);assert.equal(g.floodDepth(),0);
 s.day=120.5;assert(g.floodDepth()>0&&g.floodDepth()<.24);s.day=121;assert.equal(g.floodDepth(),.24);assert.equal(g.floodDuration(0),72);assert.equal(g.floodDuration(.5),48);assert.equal(g.floodDuration(1),24);
 const saved=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(saved)));assert.deepEqual(g.getState().weather,saved.weather);assert(!g.beginVisit());g.getState().day=192;g.advanceWeather(()=>.99);assert(!g.isFlooding());assert.equal(g.getState().weather.floodUntil,0);
});
test('Staffed firefighters shorten floods; empty stations do not fake protection',()=>{
 const s=reset();add(8,7,'road');const fire=add(8,8,'fire');s.pop=100;fire.serviceEfficiency=1;fire.workers=0;s.day=120;
 g.advanceWeather(()=>0);assert.equal(s.weather.floodUntil-s.weather.floodStart,72);
 s.weather={checkedDay:4,rainUntil:0,floodStart:0,floodUntil:0};fire.workers=g.buildingDef(fire).jobs[1];g.advanceWeather(()=>0);assert.equal(s.weather.floodUntil-s.weather.floodStart,24);
});
test('Flood rendering is bounded, penalties are explicit and parks offer entertainment',()=>{
 const s=reset();add(8,7,'road');const home=add(8,8,'residential',2,25);add(9,7,'road');const park=add(9,8,'park');g.calc();
 assert(g.localServices([home],[home,park],0,1,1).entertainment>0);assert(g.buildingStats(park).some(([k])=>k==='Capacidad de cobertura'));
 s.weather={checkedDay:4,rainUntil:124,floodStart:99,floodUntil:148};g.calc();assert.equal(s.citySatisfactionFactors.Inundación,-8);g.render3D();assert(nodes.get('#weatherBadge').textContent!==undefined);
 s.weather.floodUntil=0;g.calc();assert(!('Inundación' in s.citySatisfactionFactors));
 s.cityLevel=1;assert.equal(g.serviceDelta('entertainment',0),0);
});
test('Debug resumes simulation and supplies full occupancy and staffing without freezing the clock',()=>{
 const s=reset();g.setSpeed(0);g.setDebug(true);assert(g.getSpeed()>0);add(8,7,'road');const home=add(8,8,'residential',4),shop=add(9,7,'commercial',3);g.calc();
 assert.equal(home.occ,g.buildingDef(home).cap[4]);assert.equal(shop.workers,g.buildingDef(shop).jobs[3]);
 const day=s.day;g.advance(.1);assert(s.day>day);assert.equal(home.occ,g.buildingDef(home).cap[4]);assert.equal(shop.workers,g.buildingDef(shop).jobs[3]);
});
test('Display precision is capped and merged home upgrades follow four base residences',()=>{
 const s=reset();assert.equal(g.fmt(12.123456789),'12,12');assert.equal(g.fmt(.1+.2),'0,3');
 s.ordinance='local_trade';add(8,7,'road');const shop=add(8,8,'commercial',5);const stats=g.buildingStats(shop).map(v=>v.join(' ')).join(' ');assert(!/[.,]\\d{4,}/.test(stats));assert(!/[.,]\\d{4,}/.test(g.buildingSpecs('commercial')));
 for(let level=4;level<8;level++)for(const baseLevel of [4,6,8])assert.equal(g.buildingUpgradeCost({type:'residential_block',level,baseLevel}),4*g.upgradeCost('residential',level));
 assert(g.CITY_GUIDE[2][2].includes('Tesorería'));assert(g.CITY_GUIDE[2][2].includes('bancarrota'));
});

test('Residential yard trees survive saves and clear the facade at every level and rotation',()=>{
 const s=reset();add(8,7,'road');const b=add(8,8,'residential');b.yardTree=true;
 const saved=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(saved)));assert.equal(g.getState().grid[b.anchor].yardTree,true);
 for(let level=1;level<=8;level++)for(let rot=0;rot<4;rot++){
  const base=g.capture({type:'residential',level,rot,yardTree:false}),withTree=g.capture({type:'residential',level,rot,yardTree:true});
  assert.equal(withTree.length,base.length+2);
  const extra=withTree.filter(p=>p.col==='#6a4f36'||['#3e9149','#49a95b','#58b765','#3f9f61','#63b958','#4bad70'].includes(p.col));
  assert.equal(extra.length,2);
  const ext=p=>({x:(Math.abs(Math.cos(p.ry))*p.sx+Math.abs(Math.sin(p.ry))*p.sz)/2,z:(Math.abs(Math.sin(p.ry))*p.sx+Math.abs(Math.cos(p.ry))*p.sz)/2});
  for(const p of extra){const e=ext(p);assert(Math.abs(p.x)+e.x<.5);assert(Math.abs(p.z)+e.z<.5);for(const q of withTree){if(extra.includes(q)||q.sy<.02||q.y<.02)continue;const f=ext(q);assert(!(Math.abs(p.x-q.x)<e.x+f.x&&Math.abs(p.z-q.z)<e.z+f.z&&Math.abs(p.y-q.y)<(p.sy+q.sy)/2),'tree intersects residence');}}
 }
});
test('Moon follows a repeating lunar month and the sun warms toward the horizon',()=>{
 assert.equal(g.lunarPhase(0),0);assert(Math.abs(g.lunarPhase(29.53059/2)-.5)<1e-10);assert(Math.abs(g.lunarPhase(29.53059))<1e-10);
 const dawn=g.sunDiscColor({y:0}),noon=g.sunDiscColor({y:1});assert(dawn[1]<noon[1]);assert(dawn[2]<noon[2]);assert(noon[2]>.9);
});
test('All building palettes receive the same saturation increase',()=>{
 reset();assert(g.capture({type:'commercial',level:3}).every(p=>p.saturation===1.2));assert(g.capture({type:'residential',level:3}).every(p=>p.saturation===1.2));
 assert.notDeepEqual(g.vividColor('#a47962'),g.vividColor('#a47962',1));
});
test('Municipality hides future ordinances and legacy vertical halls keep their occupied cells',()=>{
 const s=reset();s.cityLevel=1;g.renderMunicipality();assert.equal(nodes.get('#ordinanceList').innerHTML,'');s.cityLevel=2;g.renderMunicipality();assert(nodes.get('#ordinanceList').innerHTML.includes('Vivienda accesible'));assert(!nodes.get('#ordinanceList').innerHTML.includes('Polo tecnológico'));
 const save=g.citySnapshot();save.buildings=[{type:'townhall',level:2,w:1,h:2,rot:0,anchor:300,palette:0,occ:0,fire:0}];g.restoreCity(save);const hall=g.getState().grid[300];assert.equal(hall.rot,1);assert.deepEqual(hall.cells,[300,336]);
});
test('Corner cube stands on a single vertex and nuclear plumes match unrotated cooling towers',()=>{
 const mesh=g.geometryFor('cornerCube'),lowest=Math.min(...mesh.pos.filter((_,i)=>i%3===1)),vertices=new Set();for(let i=0;i<mesh.pos.length;i+=3)if(Math.abs(mesh.pos[i+1]-lowest)<1e-8)vertices.add(mesh.pos.slice(i,i+3).map(n=>n.toFixed(8)).join(','));assert.equal(vertices.size,1);
 const s=reset();add(8,7,'road');const plant=add(8,8,'nuclear',2);plant.rot=0;const smoke=g.cityParticles(1,[plant]);assert.equal(smoke.length,16);plant.rot=1;assert.deepEqual(g.cityParticles(1,[plant]),smoke);
});


test('Late population goals and construction tiers scale base and upgrade prices consistently',()=>{
 reset();assert.equal(g.LEVELS[6].pop/g.LEVELS[5].pop,2.5);assert.equal(g.LEVELS[7].pop/g.LEVELS[6].pop,2);
 for(const [type,original,factor] of [['solar',9000,2],['monument',25000,3],['hospital',38000,6],['nuclear',75000,12]]){
  assert.equal(g.buildPrice(type),original*factor);if(g.DEF[type].max>1)assert.equal(g.upgradeCost(type,1),Math.round(original*factor*.8));
 }
 assert.equal(g.buildingUpgradeCost({type:'light_industrial_complex',level:1}),g.upgradeCost('light_industrial_complex',1));
});
test('Wind uses solar output in half the area, more research and mandatory increasing materials',()=>{
 const s=reset();for(let city=6;city<=8;city++){s.cityLevel=city;assert.equal(g.maxAllowedLevel('wind'),g.maxAllowedLevel('solar')-1);}
 for(let level=1;level<=5;level++){assert.equal(g.DEF.wind.powerCap[level],g.DEF.solar.powerCap[level]);assert(g.researchDemand('wind',level)>g.researchDemand('solar',level));assert(g.goodsRequirement('wind',level)>0);if(level>1)assert(g.goodsRequirement('wind',level,level-1)>0);}
 assert.equal(g.footprint('wind').w*g.footprint('wind').h,1);assert.equal(g.footprint('solar').w*g.footprint('solar').h,2);
 for(const type of ['research','monument']){assert(g.goodsRequirement(type)>0);assert(g.buildingLocked(type));}
 s.debug=true;add(8,8,'road');const lab=add(8,9,'research');s.debug=false;g.openPopup(lab.anchor);const level=lab.level,money=s.money;g.upgradeSelected();assert.equal(lab.level,level);assert.equal(s.money,money);
});
test('Ports require water along the two water cells on the correct long side in every orientation and when moved',()=>{
 for(let rot=0;rot<4;rot++){const s=reset(),anchor=g.idx(12,12),fp=g.footprint('port',rot);s.manualRotation=rot;s.debug=true;
  const shore=Array.from({length:3},(_,k)=>rot===0?[13,12+k]:rot===1?[12+k,11]:rot===2?[11,12+k]:[12+k,13]);
  shore.forEach(([x,z])=>s.river[g.idx(x,z)]=true);assert(g.canPlace(anchor,'port',rot));assert.equal(g.portWaterfront(anchor,rot).length,3);
  s.river[g.idx(...shore[1])]=false;assert(g.canPlace(anchor,'port',rot));s.river[g.idx(...shore[0])]=false;assert(!g.canPlace(anchor,'port',rot));s.river[g.idx(...shore[0])]=true;s.river[g.idx(...shore[1])]=true;
  g.build(anchor,'port');const port=s.grid[anchor];assert(port);assert.equal(port.cells.length,3);g.openPopup(anchor);g.moveSelected();g.placeMoved(g.idx(20,20));assert.equal(port.anchor,anchor);assert.equal(s.moving,port);g.cancelAction();
  for(let level=1;level<=5;level++)assert(g.DEF.port.goods[level]/3>g.DEF.light_industry.goods[level]);
  assert(g.DEF.port.power[1]>g.DEF.light_industry.power[1]*3);assert(g.DEF.port.water[1]>g.DEF.light_industry.water[1]*3);
 }
});
test('Cargo ships remain on the river, hide at bridges, and cap their count at three per port',()=>{
 const s=reset();for(let z=0;z<36;z++)s.river[g.idx(20,z)]=true;const port={type:'port',level:5,anchor:g.idx(19,10)};const path=g.riverShippingPath();assert.equal(path.length,36);
 const bridge=g.idx(20,18);s.grid[bridge]={type:'road',level:1,anchor:bridge,cells:[bridge]};let hidden=false,visibleBefore=false,visibleAfter=false;
 for(let clock=0;clock<360;clock++){const p=g.cargoShipPose(port,0,clock);assert(p);assert.equal(Math.round(p.x+17.5),20);if(p.hidden)hidden=true;else if(p.z<.5)visibleBefore=true;else visibleAfter=true;}
 assert(hidden&&visibleBefore&&visibleAfter);assert.equal(g.cargoShipPose(port,3),null);assert.equal(g.cargoShipPose({...port,level:1},1),null);
});
test('Theater and opera use real network coverage, grace and a 30 percent terrain advantage',()=>{
 const s=reset();s.debug=true;add(8,8,'road');const home=add(8,9,'residential',3,120);add(10,8,'road');const theater=add(10,9,'theater');s.debug=false;
 assert.equal(g.localServices([home],g.uniqueBuildings(),0,1,1).entertainment,0);add(9,8,'road');assert(g.localServices([home],g.uniqueBuildings(),0,1,1).entertainment>0);
 for(let level=1;level<=4;level++)assert(Math.abs(g.DEF.opera.coverage[level]/4/g.DEF.theater.coverage[level]-1.3)<.0001);
 assert.equal(g.influenceRadius({...theater,level:2}),g.influenceRadius(theater)+.5);
 s.unlockAt.theater=s.day;assert.equal(g.serviceDelta('entertainment',0),0);assert(g.serviceDelta('entertainment',100)>0);s.day+=25;assert(g.serviceDelta('entertainment',0)<0);
 g.setLayer('entertainment');assert.equal(s.layer,'entertainment');assert(!nodes.get('#layerLegend').innerHTML.includes('legendHint'));assert(!nodes.get('#layerLegend').innerHTML.includes('legendNumbers'));
});
test('Residential factors sum to satisfaction and commerce provides no proximity bonus',()=>{
 const s=reset();add(8,8,'road');const home=add(8,9,'residential',3,40);add(9,8,'road');const shop=add(9,9,'commercial');g.calc();
 const without=g.localResidentialSatisfaction(home,[home],64),withShop=g.localResidentialSatisfaction(home,[home,shop],64);assert.equal(withShop,without);
 const d=home.satisfactionBreakdown,sum=Object.values(d.factors).reduce((a,b)=>a+b,0)+Object.values(d.servicePoints).reduce((a,b)=>a+b,0);assert(Math.abs(sum-withShop)<1e-8);
 const details=g.satisfactionDetails(home);assert(details.includes('Impuestos')||s.tax<=10);assert(details.includes('Educación'));assert(!details.includes('local'));assert(!details.includes('Base, entorno y límites'));
 assert.equal(g.nuisanceRadius({type:'commercial',level:6}),0);assert(g.nuisanceRadius({type:'coal',level:1})>0);assert(g.captureInfluence({type:'coal',level:1,anchor:home.anchor,w:2,h:1}).length>40);
});
test('New facility geometry stays in bounds, upgrades visibly and uses neutral layer colors',()=>{
 reset();for(const type of ['wind','port','theater','opera']){let previous='';for(let level=1;level<=g.DEF[type].max;level++)for(let rot=0;rot<4;rot++){
  const fp=g.footprint(type,rot,level),parts=g.capture({type,level,rot,palette:0}),data=g.vertexDataForParts(parts);
  for(let i=0;i<data.length;i+=12){assert(Number.isFinite(data[i+1]));assert(Math.abs(data[i])<=fp.w/2+.021,type+' x');assert(Math.abs(data[i+2])<=fp.h/2+.021,type+' z');}
  if(rot===0){assert.notEqual(JSON.stringify(parts),previous,type+' upgrade');previous=JSON.stringify(parts);}
 }
 g.getState().layer='pollution';const parts=g.captureLayer({type,level:2,rot:0,palette:0});assert.equal(new Set(parts.map(p=>p.col)).size,1,type);g.getState().layer='none';}
});
test('Walking is road-only, cannot jump or cross gaps, uses x1 and restores the previous view speed',()=>{
 const s=reset();assert.equal(g.beginVisit(),false);for(let x=8;x<14;x++)add(x,10,'road');s.selected=g.idx(10,10);g.setSpeed(3);assert(g.beginVisit());assert.equal(g.getSpeed(),1);assert.equal(g.WALK_SPEED,g.CAR_MAX_SPEED*.8*.7);
 const w=g.getWalk(),start=w.x;w.yaw=Math.PI/2;w.keys.add('w');g.updateVisit(1);assert(Math.abs(w.x-start-g.WALK_SPEED)<1e-8);assert(g.walkablePoint(w.x,w.z));
 g.updateVisit(30);assert(g.walkablePoint(w.x,w.z));assert(w.x<14-18);const z=w.z;w.keys.clear();w.keys.add(' ');g.updateVisit(1);assert.equal(w.z,z);g.updateCamera();assert(Math.abs(g.getEye()[1]-.17)<.0041);
 g.endVisit();assert.equal(g.getWalk(),null);assert.equal(g.getSpeed(),3);assert(nodes.get('#leaveVisit').hidden);
});
test('Walking collision also applies to touch movement and exits on bankruptcy',()=>{
 const s=reset();add(8,8,'road');s.selected=g.idx(8,8);g.beginVisit();
 const event={pointerId:1,pointerType:'touch',button:0,clientX:100,clientY:100,preventDefault(){}};g.visitPointerDown(event);g.visitPointerMove({...event,clientY:40});assert.equal(g.getWalk().touchForward,1);g.updateVisit(10);assert(g.walkablePoint(g.getWalk().x,g.getWalk().z));g.visitPointerUp(event);assert.equal(g.getWalk().touchForward,0);
 s.money=-1;g.renderEmergency();assert.equal(g.getWalk(),null);assert.equal(g.getSpeed(),0);
});

test('Solar starts at N3 and gains one upgrade at each city level',()=>{
 const s=reset();for(let city=4;city<=8;city++){s.cityLevel=city;assert.equal(g.maxAllowedLevel('solar'),city<5?0:city-2);}assert.equal(g.DEF.solar.max,6);assert(g.DEF.solar.powerCap[6]>g.DEF.solar.powerCap[5]);
});
test('Two matching N3 solar parks merge into one persistent 2x2 installation',()=>{
 const s=reset();s.debug=true;s.manualRotation=0;const a=add(8,8,'solar',3),b=add(9,8,'solar',3);s.selected=a.anchor;assert(g.solarFusionGroup());g.openPopup(a.anchor);assert(g.mergeSelected());const merged=s.grid[g.idx(8,8)];assert.equal(merged.type,'solar_complex');assert.equal(merged.cells.length,4);assert.equal(g.DEF.solar_complex.powerCap[3],g.DEF.solar.powerCap[3]*2);assert.equal(g.footprint('solar_complex').w,2);g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));assert.equal(g.uniqueBuildings().filter(x=>x.type==='solar_complex').length,1);
});
test('Original palettes return, including migration of continuous color indices',()=>{
 reset();const a=g.buildingPalette({type:'residential',palette:17}),b=g.buildingPalette({type:'residential',palette:82});assert.notDeepEqual(a,b);assert.equal(a.walls.length,a.roof?4:0);assert.notEqual(a.window,b.window);assert.deepEqual(a,g.buildingPalette({type:'residential',palette:2}));assert.deepEqual(g.surfaceFor('#163449'),[.025,-.25]);
});

test('Mouse look needs no pressed button and walking bob settles when stopped',()=>{
 const state=reset();add(8,8,'road');state.selected=g.idx(8,8);g.beginVisit();const w=g.getWalk(),yaw=w.yaw;
 g.visitPointerMove({pointerType:'mouse',movementX:30,movementY:10});assert.equal(w.yaw,yaw);doc.pointerLockElement=nodes.get('#glCanvas');g.visitPointerMove({pointerType:'mouse',movementX:30,movementY:10});assert.notEqual(w.yaw,yaw);assert(w.pitch<0);w.keys.add('w');g.updateVisit(.1);assert(w.stride>0);assert(w.bob>0);w.keys.clear();g.updateVisit(1);assert(w.bob<.001);g.endVisit();
});
test('Cars maintain one-third-car clearance through congestion and both travel directions',()=>{
 const state=reset();for(let x=4;x<=14;x++)add(x,8,'road');add(4,9,'residential',8,500);add(13,9,'commercial',5);g.calc();g.resetCars();g.setSpeed(3);
 let maximum=0;for(let frame=0;frame<240;frame++){g.updateCars(.1);const cars=g.getCars();maximum=Math.max(maximum,cars.length);for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++)assert(!g.carsTooClose(g.carPose(cars[i]),g.carPose(cars[j])));}
 assert(maximum>3);g.setSpeed(0);const before=g.getCars().map(c=>c.t);g.updateCars(.1);assert.deepEqual(g.getCars().slice(0,before.length).map(c=>c.t),before);
});
test('New cities have 15000 and a clear 6 by 6 starting area; existing balances survive loading',()=>{
 for(let n=0;n<24;n++){const s=g.newState();assert.equal(s.money,15000);const cells=s.landUnlocked.flatMap((v,i)=>v?[i]:[]);assert.equal(cells.length,36);assert.equal(new Set(cells.map(i=>g.coord(i).x)).size,6);assert.equal(new Set(cells.map(i=>g.coord(i).z)).size,6);assert(cells.every(i=>!s.river[i]));}
 const s=reset();s.money=1234;g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));assert.equal(g.getState().money,1234);assert.equal(g.buildPrice('coal'),5000);
 for(let city=3;city<=6;city++){g.getState().cityLevel=city;assert.equal(g.maxAllowedLevel('recycling'),city-1);}
});
test('School, health, police and fire require the same road network; reconnecting restores coverage',()=>{
 for(const [type,kind] of [['school','education'],['clinic','health'],['police','security'],['fire','fire']]){
  reset();add(8,8,'road');const home=add(8,9,'residential',1,12),shop=add(7,8,'commercial');add(10,8,'road');const source=add(10,9,type);
  assert.equal(g.localServices([home],g.uniqueBuildings(),0,1,1)[kind],0,type);
  if(type==='fire')assert.equal(g.fireProtection(shop),0);
  add(9,8,'road');assert(g.localServices([home],g.uniqueBuildings(),0,1,1)[kind]>0,type);
  if(type==='fire')assert(g.fireProtection(shop)>0);
  assert.equal(g.influenceRadius({...source,level:3})-g.influenceRadius(source),1);
 }
});
test('Grace preserves real coverage and removes only negative service contributions',()=>{
 const s=reset();s.day=100;for(const type of ['school','clinic','police','fire','theater'])s.unlockAt[type]=100;
 add(8,8,'road');const home=add(8,9,'residential',1,12),values=g.localServices([home],g.uniqueBuildings(),0,1,1);
 for(const kind of ['education','health','security','fire'])assert.equal(values[kind],0);
 assert.equal(g.serviceContribution(values),0);assert(g.serviceContribution({...values,health:100})>0);
 const cityBase=64,happiness=g.localResidentialSatisfaction(home,[home],cityBase);assert.equal(home.satisfactionBreakdown.services,0);assert.equal(home.satisfactionBreakdown.baseEnvironmentAndLimits,happiness);
 assert.equal(g.serviceDelta('health',0),0);s.day=125;assert(g.serviceContribution(values)<0);assert.equal(g.serviceDelta('health',0),-50);
});
test('Prison supplies global security with staffing and resources, but harms nearby homes',()=>{
 const s=reset();s.debug=true;add(8,8,'road');const home=add(8,9,'residential',1,100);add(12,8,'road');const prison=add(11,9,'prison');s.debug=false;
 prison.workers=g.DEF.prison.jobs[1];prison.goodsCoverage=1;
 assert(g.localServices([home],g.uniqueBuildings(),0,1,1).security>0);prison.workers=0;assert.equal(g.localServices([home],g.uniqueBuildings(),0,1,1).security,0);prison.workers=g.DEF.prison.jobs[1];
 assert.equal(g.influenceRadius(prison,'nuisance'),4);assert.equal(g.influenceRadius(prison),0);assert(g.DEF.prison.coverage[1]/4>g.DEF.police.coverage[1]);assert(g.goodsDemand('prison',1)>0);
 assert(g.localResidentialSatisfaction(home,[home,prison],64)<g.localResidentialSatisfaction(home,[home],64));
 for(const type of ['park','monument','hospital','university','transit','library']){const b={type,level:1};assert.equal(g.influenceRadius({...b,level:2})-g.influenceRadius(b),.5,type);}
});
test('Light factory pairs merge at city N5, keep production and survive both orientations',()=>{
 for(const vertical of [false,true]){
  const s=reset();s.debug=true;const a=add(8,8,'light_industry',2),b=add(vertical?8:9,vertical?9:8,'light_industry',2);s.debug=false;s.cityLevel=4;
  assert.equal(g.lightIndustrialFusionGroup(a.anchor),null);s.cityLevel=5;b.level=3;assert.equal(g.lightIndustrialFusionGroup(a.anchor),null);b.level=2;b.fire=1;assert.equal(g.lightIndustrialFusionGroup(a.anchor),null);b.fire=0;
  g.openPopup(a.anchor);assert(g.mergeSelected());const merged=s.grid[a.anchor];assert.equal(merged.type,'light_industrial_complex');assert.equal(merged.w,vertical?1:2);assert.equal(merged.h,vertical?2:1);
  for(const field of ['jobs','goods','power','water','upkeep'])assert.equal(g.DEF[merged.type][field][2],2*g.DEF.light_industry[field][2],field);
  g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));assert.equal(g.uniqueBuildings().filter(b=>b.type==='light_industrial_complex').length,1);
 }
});
test('Prison and light campus geometry stays inside every rotated footprint at all levels',()=>{
 for(const type of ['prison','light_industrial_complex'])for(let level=1;level<=g.DEF[type].max;level++)for(let rot=0;rot<4;rot++){
  const fp=g.footprint(type,rot,level),parts=g.capture({type,level,rot,palette:0});assert(parts.length>20);
  for(const p of parts){const ex=Math.abs(Math.cos(p.ry))*p.sx/2+Math.abs(Math.sin(p.ry))*p.sz/2,ez=Math.abs(Math.sin(p.ry))*p.sx/2+Math.abs(Math.cos(p.ry))*p.sz/2;assert(Math.abs(p.x)+ex<=fp.w/2+.02,type+' x');assert(Math.abs(p.z)+ez<=fp.h/2+.02,type+' z');}
 }
});
test('Construction is ordered by city level, road toggles off, and max quote equals total payment',()=>{
 const s=reset();g.renderPalette();const palette=nodes.get('#palette'),last=palette.children.slice(palette.children.findLastIndex(n=>n.dataset.type==='road')),types=last.map(n=>n.dataset.type);
 for(let i=1;i<types.length;i++)assert(g.DEF[types[i]].unlock>=g.DEF[types[i-1]].unlock);
 const roads=palette.children.filter(n=>n.dataset.type==='road'),road=roads.at(-1);
 palette.listeners.click({target:{closest:()=>road}});assert.equal(s.tool,'road');palette.listeners.click({target:{closest:()=>road}});assert.equal(s.tool,'inspect');
 add(8,8,'road');const home=add(8,9,'residential');g.openPopup(home.anchor);const quoted=g.maximumUpgradeCost(home),before=s.money;assert(nodes.get('#upgradeMaxBtn').textContent.includes('Al máximo'));g.upgradeToMaximum();assert.equal(before-s.money,quoted);assert.equal(home.level,g.maxAllowedLevel(home.type));
});
test('Infrastructure statuses and building resource icons agree; goods has its own analysis layer',()=>{
 const s=reset();assert.match(g.utilityStatus(10,20),/Cobertura completa.*10/);assert.match(g.utilityStatus(20,10),/Déficit 10.*−10/);assert.match(g.utilityStatus(10,20,5),/Déficit 5/);
 for(const label of ['Consumo eléctrico','Agua','Mercancías','Investigación'])assert(g.statLabel(label).includes('<svg'),label);
 s.goodsCap=20;s.goodsUse=10;s.goodsDelivered=5;g.renderResearchAndLoan();assert.equal(nodes.get('#goodsBar').style.background,'var(--red)');
 assert(g.metricAvailable('goods'));g.setLayer('goods');assert.equal(s.layer,'goods');
 s.debug=true;add(8,8,'road');const factory=add(8,9,'light_industry');factory.goodsOutput=7;factory.industryEfficiency=.5;assert.equal(g.layerValue(factory,'goods'),50);assert(g.buildingStats(factory).some(([k,v])=>k==='Mercancías'&&String(v).includes('7')));
});
test('Tutorial auto-advances through water, data and inspection and can close at every step',()=>{
 const s=reset();s.cityLevel=1;nodes.get('#cityAccess').hidden=true;doc.querySelector('#startScreen').hidden=true;s.tutorialStep=3;g.renderCityGuide();assert(!g.guideRequirementMet());add(8,8,'road');const water=add(8,9,'water');assert.equal(s.tutorialStep,4);g.toggleAnalysis('data');g.renderCityGuide();assert.equal(s.tutorialStep,5);s.selected=null;assert(!g.guideRequirementMet());g.openPopup(water.anchor);assert(s.tutorialDone);
 for(let step=0;step<6;step++){const state=reset();state.cityLevel=1;state.tutorialStep=step;g.advanceGuide(true);assert(state.tutorialDone);assert(nodes.get('#cityGuide').hidden);}
});

test('Ticker stays active after exhausting history and uses news for existing buildings',()=>{
 const s=reset();s.newsSeen=Array.from({length:1024},(_,i)=>'Antigua '+i);const recent=[];
 for(let i=0;i<20;i++){g.presentNextNews();assert(s.newsActive);const log=nodes.get('#eventLog').children.at(-1);assert.equal(log.children.length,2);assert(log.children[0].textContent);recent.push(log.children[0].textContent);assert(s.newsSeen.length<=1024);}
 for(let i=1;i<recent.length;i++)assert.notEqual(recent[i],recent[i-1]);
 assert(!g.ironicHeadlines().some(t=>t.startsWith('Campus industrial')));s.debug=true;add(8,8,'light_industrial_complex');assert(g.ironicHeadlines().some(t=>t.startsWith('Campus industrial')));
});
(async()=>{
 const {validateCity}=await import('../server/city-api.mjs');
 test('Every client building maximum and rotated footprint is accepted by the server',()=>{
  reset();const base=JSON.parse(JSON.stringify(g.citySnapshot()));
  for(const [type,def] of Object.entries(g.DEF))for(let rot=0;rot<4;rot++){
   const fp=g.footprint(type,rot,def.max),building={type,level:def.max,anchor:g.idx(8,8),rot,w:fp.w,h:fp.h,occ:0,fire:0,palette:0,baseLevel:8};
   const save={...base,river:base.river.slice(),buildings:[building]};if(type==='wastewater')save.river[building.anchor-1]=true;if(type==='port'){const {x,z}=g.coord(building.anchor);for(let k=0;k<3;k++){const [xx,zz]=rot===0?[x+1,z+k]:rot===1?[x+k,z-1]:rot===2?[x-1,z+k]:[x+k,z+1];save.river[g.idx(xx,zz)]=true;}}
   const valid=validateCity(save);assert.equal(valid.buildings[0].level,def.max,type);assert.throws(()=>validateCity({...save,buildings:[{...building,level:def.max+1}]}),type);
   g.restoreCity(JSON.parse(JSON.stringify(valid)));assert(g.uniqueBuildings().some(b=>b.type===type));assert.equal(g.uniqueBuildings().find(b=>b.type===type).cells.length,fp.w*fp.h,type);
  }
 });
 const s=reset();nodes.get('#cityAccess').hidden=true;const naming=g.nameNewCity();assert.equal(nodes.get('#cityNameScreen').hidden,false);assert(nodes.get('.app').inert);
 nodes.get('#newCityName').value='  Ciudad Serena  ';nodes.get('#cityNameForm').listeners.submit({preventDefault(){}});await naming;
 assert.equal(s.cityName,'Ciudad Serena');assert.equal(nodes.get('#cityNameScreen').hidden,true);assert.equal(nodes.get('.app').inert,false);console.log('PASS City naming uses a separate form and awaits completion');
})().catch(error=>{console.error(error);process.exitCode=1});

test('Municipal foundation is free, connected, permanent and evolves through eight bounded models',()=>{
 const s=g.newState();g.setState(s);g.setSpeed(0);
 const hall=g.uniqueBuildings().find(b=>b.type==='townhall'),roads=g.uniqueBuildings().filter(b=>b.type==='road');
 assert.equal(roads.length,6);assert.equal(hall.cells.length,4);assert.equal(hall.w,2);assert.equal(hall.h,2);assert.equal(s.money,15000);assert(g.operational(hall.anchor));assert.equal(g.municipalRoads().size,6);
 const models=[];for(let level=1;level<=8;level++){s.cityLevel=level;g.calc();assert.equal(hall.level,level);const parts=g.capture({...hall,level,rot:0});models.push(JSON.stringify(parts));for(const part of parts){assert(Math.abs(part.x)+part.sx/2<=1.001);assert(Math.abs(part.z)+part.sz/2<=1.001);}}
 assert.equal(new Set(models).size,8);
 s.selected=hall.anchor;g.upgradeSelected();g.demolishSelected();g.moveSelected();assert.equal(s.grid[hall.anchor],hall);assert(!s.moving);
 g.openPopup(hall.anchor);assert.equal(nodes.get('#municipalModal').hidden,false);assert(nodes.get('#ordinanceList').innerHTML.includes('Vivienda accesible'));
});
test('Municipal roads reject isolated builds and severing, allow connected expansion and safe demolition',()=>{
 const s=g.newState();g.setState(s);s.landUnlocked.fill(true);
 const cash=s.money;g.build(g.idx(2,2),'road');assert.equal(s.grid[g.idx(2,2)],null);assert.equal(s.money,cash);
 const root=s.civicRoad,{x,z}=g.coord(root),end=g.idx(20,z),extension=g.idx(21,z);
 g.build(extension,'road');assert(s.grid[extension]);s.selected=end;g.demolishSelected();assert(s.grid[end]);
 s.selected=extension;g.demolishSelected();assert(!s.grid[extension]);
 s.selected=root;g.demolishSelected();assert(s.grid[root]);
 s.roadDragCells=[g.idx(2,2),g.idx(3,2)];g.buildRoadDrag();assert(!s.grid[g.idx(2,2)]);
 s.roadDragCells=[extension,g.idx(22,z)];g.buildRoadDrag();assert(s.grid[g.idx(22,z)]);assert.equal(g.municipalRoads().size,8);
});
test('All fourteen ordinances enforce gates, one active policy, exact escalating costs and persistent free-first status',()=>{
 const s=reset();g.setSpeed(0);s.cityLevel=1;assert.equal(g.ORDINANCES.length,14);assert(!g.activateOrdinance('housing'));assert.equal(s.ordinance,null);
 s.cityLevel=2;const initial=s.money;assert(g.activateOrdinance('housing'));assert.equal(s.money,initial);assert(!g.activateOrdinance('housing'));assert(!g.activateOrdinance('technology'));
 assert(g.activateOrdinance('industry'));assert.equal(s.money,initial-2000);assert(g.activateOrdinance(null));assert.equal(s.money,initial-4000);
 g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));const restored=g.getState();assert(restored.ordinanceEverActivated);assert.equal(restored.ordinance,null);
 for(let level=2;level<=8;level++){restored.cityLevel=level;const before=restored.money,id=restored.ordinance==='housing'?'industry':'housing';assert(g.activateOrdinance(id));assert.equal(before-restored.money,g.ORDINANCE_COST[level]);}
 restored.money=0;const active=restored.ordinance;assert(!g.activateOrdinance(null));assert.equal(restored.ordinance,active);
});
test('Ordinance modifiers match every authored benefit and drawback without modifying base definitions',()=>{
 const s=reset(),ratio=(id,type,key,expected,level=1)=>{s.ordinance=id;const b={type,level,baseLevel:4};assert(Math.abs(g.buildingDef(b)[key][level]/g.baseBuildingDef(b)[key][level]-expected)<1e-9,id+' '+type+' '+key);};
 ratio('industry','heavy_industry','goods',1.15);ratio('industry','heavy_industry','income',1.10);ratio('industry','heavy_industry','pollution',1.15);
 ratio('local_trade','commercial','income',1.15);s.ordinance='local_trade';assert(Math.abs(g.goodsDemand('commercial')/g.DEF.commercial.goods[1]-1.12)<1e-9);
 ratio('public_services','school','coverage',1.12);ratio('public_services','hospital','upkeep',1.18);
 ratio('austerity','clinic','upkeep',.85);ratio('austerity','fire','coverage',.9);ratio('austerity','commercial','upkeep',1);
 ratio('security','police','coverage',1.18);ratio('security','prison','upkeep',1.22);
 ratio('emergencies','fire','coverage',1.2);ratio('emergencies','fire','upkeep',1.2);assert.equal(g.DEF.fire.unlock,4);
 ratio('circular','recycling','pollutionReduce',1.3);ratio('circular','commercial','income',.92);ratio('circular','light_industry','pollution',.9);
 ratio('efficient','residential','power',.85);ratio('efficient','office','water',.85);s.ordinance='efficient';assert.equal(g.buildPrice('commercial'),Math.round(g.DEF.commercial.price*1.12));
 ratio('transit','office','income',.92);s.ordinance='transit';assert.equal(g.municipalTrafficFactor({type:'residential'}),.9);
 ratio('business','commercial','income',1.18);ratio('business','office','power',1.1);s.ordinance='business';assert.equal(g.municipalTrafficFactor({type:'office'}),1.18);
 ratio('technology','research','research',1.35);ratio('technology','research','power',1.25);ratio('technology','research','upkeep',1.25);ratio('technology','office','income',1.12);
 ratio('intensive','residential','cap',1,5);ratio('intensive','residential','cap',1.12,6);ratio('intensive','residential_block','cap',1.12,8);ratio('intensive','residential','water',1.15);
 ratio('global','office','income',1.18);s.ordinance='global';assert(Math.abs(g.goodsDemand('hospital')/g.DEF.hospital.goods[1]-1.12)<1e-9);
 s.ordinance=null;assert.strictEqual(g.buildingDef({type:'commercial'}),g.DEF.commercial);
});
test('Residential capacity does not cancel intensive per-resident utility penalties; tax and migration effects reach simulation',()=>{
 const s=reset();add(8,8,'road');const h=add(8,9,'residential',6,100);g.calc();const power=s.powerUse,water=s.waterUse,baseAttr=g.attractiveness(),baseBalance=s.balance;
 s.ordinance='housing';g.calc();assert(s.balance<baseBalance);
 s.ordinance='intensive';g.calc();assert(Math.abs(s.powerUse/power-1.15)<1e-9);assert(Math.abs(s.waterUse/water-1.15)<1e-9);assert.equal(g.buildingDef(h).cap[6],g.DEF.residential.cap[6]*1.12);
 s.ordinance='efficient';g.calc();assert(Math.abs(s.powerUse/power-.85)<1e-9);assert(Math.abs(s.waterUse/water-.85)<1e-9);
 Object.assign(s,{happiness:60,health:100,security:100,unemployment:0,pollution:0});s.ordinance=null;const u={powerRatio:1,waterRatio:1},attr=g.attractiveness(u);s.ordinance='housing';assert(Math.abs(g.attractiveness(u)-attr-10)<1e-8);
});

test('Research requirements do not lock selection but still prevent construction',()=>{
 const s=reset();s.researchCap=0;s.researchUse=0;g.renderPalette();const palette=nodes.get('#palette'),solar=palette.children.findLast(b=>b.dataset.type==='solar');assert(solar);assert(!solar.className.includes('locked'));assert(g.buildingSpecs('solar').includes('Energía solar'));
 palette.listeners.click({target:{closest:()=>solar}});assert.equal(s.tool,'solar');const money=s.money;g.build(g.idx(18,18),'solar');assert.equal(s.grid[g.idx(18,18)],null);assert.equal(s.money,money);
});
test('Urbanize toggles off with the same button',()=>{
 const s=reset(),button=nodes.get('#landBtn');button.listeners.click();assert.equal(s.tool,'land');button.listeners.click();assert.equal(s.tool,'inspect');
});
test('Transparent water uploads only top faces, without cell walls',()=>{
 reset();const part={x:0,y:0,z:0,sx:1,sy:.075,sz:1,col:'#3e8998',ry:0,em:0};const data=g.vertexDataForParts([part]);assert.equal(data.length,6*12);for(let i=0;i<data.length;i+=12){assert.equal(data[i+3],0);assert.equal(data[i+4],1);assert.equal(data[i+5],0);}assert(g.vertexDataForParts([{...part,col:'#758d91'}]).length>data.length);
});
test('Road lamps keep a stable random side, are smaller, and signals stay on intersections',()=>{
 const s=reset();for(let x=4;x<=26;x++)add(x,12,'road',5);const sides=new Set();for(let x=4;x<=26;x++){const i=g.idx(x,12),lamp=g.roadLamp(i,5),parts=g.captureRoad(i);assert(!parts.some(p=>p.col==='#263a43'));if(lamp){sides.add(lamp.side);assert.deepEqual(g.roadLamp(i,5),lamp);assert(parts.filter(p=>p.col==='#4e6b70').every(p=>p.sy<=.399));}}
 assert.equal(sides.size,2);add(14,11,'road',5);const parts=g.captureRoad(g.idx(14,12));assert.equal(parts.filter(p=>p.col==='#263a43').length,2);assert(parts.some(p=>p.col==='#e0d4b4'||p.col==='#eee8d3'));
});
test('Analysis layers neutralize receivers but preserve the service provider model',()=>{
 const s=reset();for(const layer of ['pollution','economy','satisfaction','education','health','security','fire','traffic']){s.layer=layer;for(const type of ['heavy_industry','light_industry','coal','water','school','clinic','police','fire','recycling','monument']){const parts=g.captureLayer({type,level:3,palette:0}),provider=g.DEF[type]?.serviceKind===layer;if(provider)assert(new Set(parts.map(p=>p.col)).size>1,`${layer} provider ${type}`);else{assert.equal(new Set(parts.map(p=>p.col)).size,1,`${layer} ${type}`);assert(parts.every(p=>p.em===0));}}}
 s.layer='none';const road=add(10,10,'road',5);add(9,10,'road',5);add(11,10,'road',5);add(10,9,'road',5);const factory=add(10,11,'heavy_industry');factory.industryEfficiency=1;s.layer='health';assert.equal(new Set(g.captureLayerRoad(road.anchor).map(p=>p.col)).size,1);assert(g.captureProduction([factory]).every(p=>p.col==='#596a70'&&p.em===0));s.layer='none';
});
test('Central Park upgrades add structures and service upgrades change geometry',()=>{
 reset();let previous=0;for(let level=5;level<=8;level++){const parts=g.capture({type:'park',level,parkLevels:[5,5],w:6,h:3});assert(parts.length>previous);previous=parts.length;}
 for(const type of ['school','clinic','coal','wastewater']){let previous='';for(let level=1;level<=g.DEF[type].max;level++){const parts=JSON.stringify(g.capture({type,level}));assert.notEqual(parts,previous);previous=parts;}}
});
test('Heavy smoke moves with rendering time, uses every chimney and is thinner than thermal smoke',()=>{
 const s=reset();s.debug=true;add(8,7,'road');const b=add(8,8,'heavy_industry',4);b.industryEfficiency=1;const smoke=g.cityParticles(0,[b]);assert.equal(smoke.length,14);assert.notDeepEqual(smoke,g.cityParticles(1,[b]));assert(smoke.every(p=>p.size<.22&&p.rgba[0]>.43&&p.rgba[0]<.58));
});
test('Building popup stays fixed through upgrades until closed',()=>{
 reset();add(8,7,'road');const b=add(8,8,'clinic'),popup=nodes.get('#buildingPopup'),original=popup.classList;let visible=false;popup.classList={add:()=>visible=true,remove:()=>visible=false,contains:()=>visible};g.openPopup(b.anchor);const position={...popup.style};assert(position.left&&position.top);g.upgradeSelected();popup.offsetHeight+=120;g.updatePopupPosition();assert.equal(popup.style.left,position.left);assert.equal(popup.style.top,position.top);g.closePopup();popup.offsetHeight-=120;popup.classList=original;
});

test('Cloud save round-trip preserves city data including enabled debug mode',()=>{const s=reset();add(8,8,'road');add(9,8,'road');add(10,8,'road');const park=add(8,9,'park',3);const home=add(10,9,'residential',4,65.7);s.day=200;s.money=43210;s.debug=true;s.unlockAt.school=42;const snapshot=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(snapshot)));const restored=g.getState();assert.equal(restored.money,43210);assert.equal(restored.day,200);assert.equal(restored.debug,true);assert.equal(restored.unlockAt.school,42);assert.equal(restored.grid[home.anchor].occ,g.buildingDef(restored.grid[home.anchor]).cap[4]);assert.equal(restored.grid[park.anchor].level,3);assert.strictEqual(restored.grid[park.anchor],restored.grid[park.anchor+1]);assert.equal(g.uniqueBuildings().length,6);const migrated=g.citySnapshot();snapshot.buildings.find(b=>b.anchor===home.anchor).occ=restored.grid[home.anchor].occ;const normalized={...snapshot,debug:true,civicRoad:migrated.civicRoad,buildings:[...snapshot.buildings,...migrated.buildings.filter(b=>b.type==='townhall')].sort((a,b)=>a.anchor-b.anchor)};migrated.buildings.sort((a,b)=>a.anchor-b.anchor);assert.deepEqual(JSON.parse(JSON.stringify(migrated)),JSON.parse(JSON.stringify(normalized)));});
test('Final local services retain disease, crime and water penalties; fire coverage is zero without firefighters',()=>{
 const s=reset();for(let x=4;x<=12;x++)add(x,8,'road',5);const h=add(5,9,'residential',8,800);add(6,9,'clinic',3);add(7,9,'police',2);add(8,9,'water',4);const power=add(10,9,'coal',4);g.calc();const health=s.health,security=s.security;assert.equal(s.fireSafety,0);assert.equal(g.fireProtection(h),0);s.diseaseDays=10;s.crimeDays=10;g.calc();assert(Math.abs(s.health-(health-8))<.001);assert(Math.abs(s.security-(security-6))<.001);s.diseaseDays=s.crimeDays=0;const services=g.uniqueBuildings();const full=g.localServices([h],services,0,1,1).health,dry=g.localServices([h],services,0,1,0).health;assert(dry<full-20);s.grid[power.anchor]=null;g.calc();assert(g.localServices([h],g.uniqueBuildings(),0,.2,1).health<g.localServices([h],g.uniqueBuildings(),0,1,1).health);assert(s.waterCap<g.DEF.water.waterCap[4]);assert(g.uniqueBuildings().find(b=>b.type==='clinic').serviceEfficiency<1);
});
test('Crime lowers satisfaction in uncovered homes; demand is reflected directly in coverage',()=>{
 const s=reset();for(let x=4;x<10;x++)add(x,8,'road');const h=add(5,9,'residential',4,80);add(6,9,'water',3);add(7,9,'coal',3);g.calc();const baseline=h.localSatisfaction;s.crimeDays=10;g.calc();assert(h.localSatisfaction<baseline-9);s.crimeDays=0;add(9,9,'school');const all=g.uniqueBuildings();h.occ=100;const small=g.localServices([h],all,0).education;h.occ=700;const large=g.localServices([h],all,0).education;assert(large<small);assert.equal(Math.round(h.serviceCoverage.education*100),Math.round(large));
});
test('Fire spreads only to immediately adjacent buildings, with less spread under fire cover',()=>{
 const s=reset();for(let x=3;x<12;x++)add(x,8,'road');const source=add(4,9,'commercial'),near=add(5,9,'residential'),far=add(8,9,'commercial');source.fire=5;s.fireSafety=0;near.localServices={fire:0};assert.equal(g.spreadFires(1,()=>.02),1);assert(near.fire>0);assert.equal(far.fire,0);near.fire=0;near.localServices.fire=95;s.fireSafety=95;assert.equal(g.spreadFires(1,()=>.02),0);
});
test('Unused roads do not dilute weighted congestion; full congestion nearly stops cars',()=>{
 const s=reset();for(let x=4;x<13;x++)add(x,8,'road');add(4,9,'residential',7,400);add(12,9,'commercial',5);g.calc();g.calc();const original=s.avgTraffic;assert(original>0);for(let x=0;x<20;x++)add(x,0,'road');g.calc();assert(Math.abs(s.avgTraffic-original)<.0001);assert(g.trafficSpeedFactor(100)<.02);assert(g.trafficSpeedFactor(30)>.2);
});
test('Higher taxes reduce satisfaction convexly; construction and upgrades have fixed authored costs',()=>{
 const s=reset();s.cityLevel=1;const initial=g.buildPrice('residential'),upgrade=g.upgradeCost('commercial',1);s.cityLevel=8;assert.equal(g.buildPrice('residential'),initial);assert.equal(g.upgradeCost('commercial',1),upgrade);assert.equal(g.taxDiscomfort(10),0);assert(g.taxDiscomfort(20)-g.taxDiscomfort(15)>g.taxDiscomfort(15)-g.taxDiscomfort(10));s.cityLevel=1;add(8,8,'road');add(8,7,'water');add(8,9,'residential',1,18);s.tax=10;g.calc();const happy=s.happiness;s.tax=20;g.calc();assert(s.happiness<happy-30);
});
test('Emergency loan respects bankruptcy, term, city cap and single outstanding debt; installments amortize exactly',()=>{
 const s=reset();s.cityLevel=3;s.money=1;assert(!g.takeLoan(10000,1.5));s.money=0;assert(!g.takeLoan(g.loanLimit()+1,3));assert(!g.takeLoan(10000,4));assert(g.takeLoan(10000,1.5));assert(!g.takeLoan(10,3));const payment=g.loanHourly();assert.equal(s.money,10000);assert.equal(s.loan.total,10600);g.advance(1);assert(Math.abs(s.loan.remaining-(10600-payment))<.0001);assert(Math.abs(s.money-(10000-payment))<.0001);g.advance(1.5*30*24);assert.equal(s.loan,null);assert(Math.abs(s.money+600)<.0001);assert(g.loanTerms(10000,12).interest>g.loanTerms(10000,3).interest);
});
test('Research is fixed capacity, gates building, never accumulates and shortages reduce output',()=>{
 const s=reset();s.cityLevel=5;for(let x=4;x<14;x++)add(x,8,'road');add(4,9,'residential',8,500);add(9,9,'coal',3);add(7,9,'water',3);s.debug=true;const lab=add(8,9,'research',3);s.debug=false;g.calc();assert(s.researchCap>0);const cap=s.researchCap;g.advance(.1);assert.equal(s.researchPoints,0);assert(!g.buildingLocked('solar'));s.manualRotation=0;g.build(g.idx(12,9),'solar');const plant=s.grid[g.idx(12,9)];assert(plant);g.calc();assert(s.researchUse>0);g.openPopup(lab.anchor);g.demolishSelected();g.calc();assert.equal(s.researchCap,0);assert.equal(plant.researchEfficiency,0);assert(g.buildingLocked('solar'));s.researchPoints=10000;g.calc();assert.equal(s.researchPoints,0);assert(g.buildingLocked('solar'));
});
test('Normal time is capped at x3 and debug settings survive save/load',()=>{const s=reset();g.setSpeed(1);assert.equal(g.simulationRate(),.175);g.setSpeed(3);assert(Math.abs(g.simulationRate()-.525)<1e-10);const snapshot=g.citySnapshot();snapshot.debug=true;g.restoreCity(snapshot);assert.equal(g.getState().debug,true);g.setSpeed(0);});
test('Starter budget reaches the first promotion with only level-one unlocks',()=>{const s=g.newState();s.river.fill(false);g.setState(s);add(20,18,'road');add(16,16,'water');add(15,16,'commercial');add(19,16,'commercial');for(const x of [15,16,17,18,19])add(x,18,'residential');assert(s.money>=0);for(let n=0;n<2000&&s.cityLevel<2;n++)g.advance(.25);assert(s.cityLevel>=2,`stalled ${s.pop}/${s.happiness}`);assert(s.money>0);});
test('Fusion of equal N4+ homes preserves capacity, occupancy and upkeep, upgrades and reloads as one unit',()=>{for(const level of [4,6,8]){const s=reset();for(let x=8;x<=11;x++){add(x,7,'road');add(x,10,'road');}const homes=[[9,8],[10,8],[9,9],[10,9]].map(([x,z])=>add(x,z,'residential',level,60));g.openPopup(homes[0].anchor);assert(g.fusionGroup());assert(g.mergeSelected());const b=s.grid[homes[0].anchor];assert.equal(b.type,'residential_block');assert.equal(b.level,level);assert.equal(b.occ,240);assert.equal(g.buildingDef(b).cap[level],g.DEF.residential.cap[level]*4);assert.equal(g.buildingDef(b).upkeep[level],g.DEF.residential.upkeep[level]*4);assert.equal(g.uniqueBuildings().filter(b=>b.type==='residential_block').length,1);g.upgradeSelected();assert.equal(b.level,Math.min(8,level+1));const saved=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(saved)));assert.equal(g.getState().grid[b.anchor].baseLevel,4);assert.equal(g.getState().grid[b.anchor].cells.length,4);}});
test('Fusion rejects mismatched levels and non-square groups',()=>{const s=reset();for(let x=8;x<13;x++)add(x,7,'road');const a=add(8,8,'residential',4);add(9,8,'residential',5);add(10,8,'residential',4);add(11,8,'residential',4);g.openPopup(a.anchor);assert.equal(g.fusionGroup(),null);assert(!g.mergeSelected());});
test('Park expansion is atomic, requires 3x3 land and preserves money and cells when blocked',()=>{const s=reset();add(8,7,'road');const park=add(8,8,'park',4);s.landUnlocked[g.idx(10,10)]=false;for(let z=7;z<=10;z++)s.landUnlocked[g.idx(7,z)]=false;g.openPopup(park.anchor);const cash=s.money;g.upgradeSelected();assert.equal(park.level,4);assert.equal(park.cells.length,4);assert.equal(s.money,cash);s.landUnlocked[g.idx(10,10)]=true;g.upgradeSelected();assert.equal(park.level,5);assert.equal(park.cells.length,9);assert(s.money<cash);assert.strictEqual(s.grid[g.idx(10,10)],park);});
test('Rectangular buildings rotate before placement; legacy compact buildings reload without overlap',()=>{for(const type of ['coal','hospital','solar']){const s=reset();s.debug=true;add(8,7,'road');s.tool=type;s.manualRotation=0;g.rotatePlacement();assert.equal(s.manualRotation,1);const b=add(8,8,type);assert.equal(b.rot,1);assert.equal(b.cells.length,2);}const s=reset();const state=g.citySnapshot();state.format=1;state.buildings=[{type:'coal',level:1,anchor:200,rot:0,occ:0,palette:0,fire:0},{type:'commercial',level:1,anchor:201,rot:0,occ:0,palette:0,fire:0}];g.restoreCity(state);assert.equal(g.getState().grid[200].cells.length,1);assert.equal(g.getState().grid[201].type,'commercial');});
test('Nuclear plants use 2x2 and gain a second cooling tower at N2',()=>{reset();assert.deepEqual(g.footprint('nuclear'),{w:2,h:2});const one=g.capture({type:'nuclear',level:1}),two=g.capture({type:'nuclear',level:2});assert.equal(one.filter(p=>p.mesh==='cooling').length,1);assert.equal(two.filter(p=>p.mesh==='cooling').length,2);});
test('Every river is connected and crosses the map between two borders; bridges cost twice a road',()=>{for(let seed=0;seed<30;seed++){const river=g.generateRiver(seed);assert(river.some(Boolean));const cells=river.flatMap((v,i)=>v?[i]:[]),seen=new Set([cells[0]]),queue=[cells[0]];while(queue.length){const i=queue.pop(),x=i%36;for(const n of [i-36,i+36,...(x>0?[i-1]:[]),...(x<35?[i+1]:[])])if(n>=0&&n<1296&&river[n]&&!seen.has(n)){seen.add(n);queue.push(n);}}assert.equal(seen.size,cells.length);const borders=new Set(cells.flatMap(i=>{const x=i%36,z=Math.floor(i/36),a=[];if(x===0)a.push('left');if(x===35)a.push('right');if(z===0)a.push('top');if(z===35)a.push('bottom');return a;}));assert(borders.size>=2,`river borders ${seed}`);for(const i of cells){const x=i%36,z=Math.floor(i/36);assert([-1,0].some(dx=>[-1,0].some(dz=>{const a=x+dx,b=z+dz;return a>=0&&a<35&&b>=0&&b<35&&[0,1,36,37].every(d=>river[b*36+a+d]);})),`river width at ${seed}:${i}`);}}const s=reset();s.river[g.idx(8,8)]=true;const cash=s.money,b=add(8,8,'road');assert.equal(cash-s.money,g.buildPrice('road')*2);assert.equal(g.buildingUpgradeCost(b),g.upgradeCost('road',1)*2);});
test('Land purchase requires Urbanizar; rename costs 10000; fixed day and layers do not stop simulation',()=>{const s=reset();s.landUnlocked[0]=false;s.tool='inspect';g.showLandPopup(0);g.buySelectedLand();assert(!s.landUnlocked[0]);s.tool='land';g.showLandPopup(0);g.buySelectedLand();assert(s.landUnlocked[0]);const cash=s.money;assert(g.renameCity('Nueva Toledo'));assert.equal(s.money,cash-10000);s.day=0;s.dayNight=false;assert.equal(g.currentSun().hour,12);s.dayNight=true;s.layer='traffic';assert.equal(g.currentSun().hour,12);s.layer='none';assert.equal(g.currentSun().hour,0);const day=s.day;g.advance(.1);assert(s.day>day);});
test('New geometry and every rectangular rotation remain within their parcels',()=>{for(const type of ['residential_block','park','coal','hospital','nuclear','recycling','university','transit','research','wastewater','school','police','office'])for(const level of type==='residential_block'?[4,8]:type==='park'?[4,5]:[1,g.DEF[type].max])for(const rot of [0,1,2,3]){const fp=g.footprint(type,rot,level),parts=g.capture({type,level,rot,palette:0});for(const p of parts){const ex=Math.abs(Math.cos(p.ry))*p.sx/2+Math.abs(Math.sin(p.ry))*p.sz/2,ez=Math.abs(Math.sin(p.ry))*p.sx/2+Math.abs(Math.cos(p.ry))*p.sz/2;assert(Math.abs(p.x)+ex<=fp.w/2+.02,`${type} N${level} rot${rot} X`);assert(Math.abs(p.z)+ez<=fp.h/2+.02,`${type} N${level} rot${rot} Z`);}}});

test('Fusion requires all four homes at N4, including debug; old low-level fused saves remain compatible',()=>{const s=reset();s.cityLevel=4;for(let x=10;x<12;x++){add(x,9,'road');add(x,12,'road');}for(let x=10;x<12;x++)for(let z=10;z<12;z++)add(x,z,'residential',1,5);g.openPopup(g.idx(10,10));assert.equal(nodes.get('#mergeBtn').disabled,true);assert(!g.mergeSelected());s.debug=true;assert.equal(g.fusionGroup(),null);for(const b of g.uniqueBuildings())if(b.type==='residential')b.level=4;assert(g.mergeSelected());const snapshot=g.citySnapshot();snapshot.buildings.find(b=>b.type==='residential_block').baseLevel=1;g.restoreCity(snapshot);assert.equal(g.buildingDef(g.getState().grid[g.idx(10,10)]).cap[4],4*g.DEF.residential.cap[1]);});
test('Asphalt is slightly below paving at all upgraded road levels; tower geometry is bounded and economical',()=>{const s=reset(),b=add(10,10,'road');for(let level=2;level<=8;level++){b.level=level;const parts=g.captureRoad(b.anchor),paving=parts.filter(p=>p.col==='#b4b7a9'),asphalt=parts.filter(p=>p.col===g.roadColor(0));assert(paving.length&&asphalt.length);assert(Math.max(...asphalt.map(p=>p.y+p.sy/2))<Math.min(...paving.map(p=>p.y+p.sy/2)));}assert(g.geometryFor('cooling').indices.length/3<=64);s.layer='none';s.pollution=10;assert.equal(g.smogAmount(),0);s.pollution=20;assert(g.smogAmount()>0);s.pollution=70;assert(g.smogAmount()>0);s.layer='traffic';assert.equal(g.smogAmount(),0);g.render3D();});

test('Park expands northwest when east and south are unavailable',()=>{const s=reset();add(9,10,'road');const b=add(8,8,'park',4);for(let z=7;z<=10;z++)s.landUnlocked[g.idx(10,z)]=false;for(let x=7;x<=10;x++)s.landUnlocked[g.idx(x,10)]=false;g.openPopup(b.anchor);g.upgradeSelected();assert.equal(b.level,5);assert.equal(b.anchor,g.idx(7,7));assert.equal(b.cells.length,9);assert.strictEqual(s.grid[g.idx(8,8)],b);});
test('Wastewater needs an orthogonal river neighbor for placement and relocation',()=>{const s=reset();add(8,7,'road');s.manualRotation=0;s.river[g.idx(9,10)]=true;assert(!g.canPlace(g.idx(8,8),'wastewater'));s.river[g.idx(9,9)]=true;const b=add(8,8,'wastewater');assert.equal(b.cells.length,2);add(12,7,'road');g.openPopup(b.anchor);g.moveSelected();g.placeMoved(g.idx(12,8));assert.equal(b.anchor,g.idx(8,8));s.river[g.idx(13,8)]=true;g.placeMoved(g.idx(12,8));assert.equal(b.anchor,g.idx(12,8));});
test('Old 30x24 cities migrate to 36x24 without changing coordinates or compact campus buildings',()=>{reset();const state=g.citySnapshot();state.format=2;state.width=30;state.height=24;state.landUnlocked=Array(720).fill(true);state.river=Array(720).fill(false);state.river[29]=true;state.buildings=[{type:'university',level:1,w:1,h:1,anchor:200,rot:0,occ:0,fire:0,palette:0}];g.restoreCity(state);const s=g.getState(),anchor=g.idx(20,6);assert.equal(s.grid.length,1296);assert.equal(s.grid[anchor].type,'university');assert.equal(s.grid[anchor].cells.length,1);assert(s.river[29]);assert(!s.landUnlocked[30]);assert.equal(g.citySnapshot().format,4);});
test('Bankruptcy immediately pauses, rejects insufficient rescue and preserves Game Over on reload',()=>{const s=reset();s.money=-501;g.setSpeed(1);g.renderEmergency();assert.equal(g.simulationRate(),0);assert.equal(nodes.get('#emergencyScreen').hidden,false);const day=s.day;g.advance(1);assert.equal(s.day,day);assert(!g.takeLoan(500,3));assert(g.takeLoan(1000,3));assert.equal(nodes.get('#emergencyScreen').hidden,true);s.money=-10;s.gameOver=true;const snapshot=g.citySnapshot();g.restoreCity(snapshot);assert(g.getState().gameOver);assert.equal(nodes.get('#restartCity').hidden,false);});
test('City promotion requires only population and the linear satisfaction target',()=>{const s=reset();s.pop=80;s.happiness=59;assert(!g.LEVELS[1].req(s));s.happiness=60;assert(g.LEVELS[1].req(s));s.pop=240;s.happiness=g.LEVELS[2].happiness;s.education=0;s.health=0;s.security=0;s.fireSafety=0;assert(g.LEVELS[2].req(s));s.happiness--;assert(!g.LEVELS[2].req(s));});
test('Weighted routing uses a reasonable parallel street when the direct route is loaded',()=>{const s=reset();for(let x=4;x<=9;x++){add(x,4,'road');add(x,6,'road');}add(4,5,'road');add(9,5,'road');const start=g.idx(4,4),end=g.idx(9,4);assert.equal(g.shortestRoadPath(start,new Set([end])).length,6);for(let x=5;x<9;x++)s.grid[g.idx(x,4)].trafficLoad=250;const alternate=g.shortestRoadPath(start,new Set([end]));assert(alternate.includes(g.idx(6,6)));assert(alternate.length<14);assert.equal(g.laneOffset({lane:0},4),g.laneOffset({lane:1},4));assert(g.laneOffset({lane:1},5)>g.laneOffset({lane:0},5));});
test('Elapsed time is preserved across hidden-tab delays, with normal and fast speed',()=>{const s=reset();g.setFrame(1000);g.setSpeed(1);const day=s.day;g.tickSimulation(61000);assert(Math.abs(s.day-day-60*.175)<1e-8);g.setSpeed(3);g.tickSimulation(63000);assert(Math.abs(s.day-day-62*.175-4*.175)<1e-8);g.setSpeed(0);const paused=s.day;g.tickSimulation(123000);assert.equal(s.day,paused);});
test('Simulation auto-pauses after exactly fifteen inactive minutes',()=>{const s=reset();g.setFrame(1000);g.setSpeed(1);const day=s.day;g.tickSimulation(1000+20*60*1000);assert.equal(g.getSpeed(),0);assert(Math.abs(s.day-day-15*60*.175)<1e-8);});
test('New maps are square and satisfaction requirements rise linearly from 60 to 85',()=>{const s=g.newState();g.setState(s);assert.equal(g.citySnapshot().width,g.citySnapshot().height);assert.equal(s.money,15000);const requirements=g.LEVELS.slice(1).map(l=>l.happiness);assert.equal(requirements[0],60);assert.equal(requirements.at(-1),85);for(let i=2;i<requirements.length;i++)assert(Math.abs((requirements[i]-requirements[i-1])-(requirements[i-1]-requirements[i-2]))<=1);assert(!g.debugAdvanceLevel());});
test('Music buffer has a blended wrap with bounded samples',()=>{const data=Float32Array.from({length:1000},(_,i)=>i/1000),buffer={sampleRate:100,length:1000,numberOfChannels:1,getChannelData:()=>data};let out;const ctx={createBuffer:(channels,length,rate)=>{out=new Float32Array(length);return {length,sampleRate:rate,getChannelData:()=>out};}};const loop=g.crossfadeMusic(ctx,buffer);assert.equal(loop.length,800);assert(Math.abs(out.at(-1)-out[0])<.01);assert(out.every(v=>v>=0&&v<=1));});
test('Layer exit restores normal view; fire risk respects grace and coverage',()=>{const s=reset();g.toggleAnalysis('layers');g.setLayer('traffic');g.toggleAnalysis('data');assert.equal(s.layer,'none');const b={type:'office',palette:2,anchor:400,rot:0};const pal=g.buildingPalette(b);b.rot=3;b.anchor=401;assert.strictEqual(g.buildingPalette(b),pal);s.cityLevel=5;s.day=10;s.unlockAt.fire=10;s.fireSafety=0;assert.equal(g.fireProbability(24),0);s.day=100;s.unlockAt.fire=0;const low=g.fireProbability(24);s.fireSafety=90;assert(low>g.fireProbability(24)*10);assert(low>.7);});
test('Police stations assign up to three cars according to building level',()=>{const s=reset();for(let x=4;x<14;x++)add(x,8,'road');const station=add(6,9,'police',1);g.updateCars(.01);assert.equal(g.getServiceCars().filter(c=>c.owner===station).length,1);station.level=3;g.updateCars(.01);assert.equal(g.getServiceCars().filter(c=>c.owner===station).length,2);station.level=5;g.updateCars(.01);assert.equal(g.getServiceCars().filter(c=>c.owner===station).length,3);});
test('N6–N8 parks and campus, reactor and transit upgrades have distinct geometry',()=>{reset();assert.equal(g.DEF.park.max,8);for(const type of ['park','university','nuclear','transit','research','wastewater']){let previous='';for(let level=type==='park'?5:1;level<=g.DEF[type].max;level++){const parts=JSON.stringify(g.capture({type,level,rot:0,palette:0}));assert.notEqual(parts,previous);previous=parts;}}});
test('Version 3 cities gain twelve locked rows while retaining buildings and river coordinates',()=>{reset();const old=g.citySnapshot();old.format=3;old.height=24;old.landUnlocked=Array(864).fill(true);old.river=Array(864).fill(false);old.river[100]=true;old.buildings=[{type:'commercial',level:1,w:1,h:1,anchor:200,rot:0,occ:0,fire:0,palette:0}];g.restoreCity(old);const s=g.getState();assert.equal(s.grid.length,1296);assert.equal(s.grid[200].type,'commercial');assert(s.river[100]);assert(s.landUnlocked.slice(864).every(v=>!v));});

test('Material responses and park lamp counts distinguish their surfaces and levels',()=>{assert(g.surfaceFor('#bedce0')[1]>g.surfaceFor('#d0dfcf')[1]);assert.equal(g.parkLampOffsets(4).length,2);assert.equal(g.parkLampOffsets(5).length,4);});

test('Compact wastewater saves preserve neighbors and expand safely on upgrade',()=>{const s=reset();add(8,7,'road');s.manualRotation=0;s.river[g.idx(9,9)]=true;const b=add(8,8,'wastewater');const saved=g.citySnapshot(),plant=saved.buildings.find(b=>b.type==='wastewater');plant.w=plant.h=1;g.restoreCity(saved);const restored=g.getState().grid[b.anchor];assert.equal(restored.cells.length,1);assert(restored.legacyFootprint);assert.equal(g.getState().grid[b.anchor+36],null);g.getState().researchCap=10;g.openPopup(b.anchor);g.upgradeSelected();assert.equal(restored.cells.length,2);assert.equal(restored.level,2);});

test('Disconnected moved buildings contribute nothing and resume on reconnection',()=>{const s=reset();add(8,7,'road');const plant=add(8,8,'coal');g.openPopup(plant.anchor);g.moveSelected();g.placeMoved(g.idx(20,20));assert.equal(plant.anchor,g.idx(20,20));g.calc();assert.equal(plant.netIncome,0);assert.equal(plant.netPollution,0);assert.equal(plant.workers,0);const capacity=s.powerCap;add(20,19,'road');g.calc();assert(s.powerCap>capacity);});
test('Loans keep total interest with half terms and allow full early repayment',()=>{const s=reset();s.money=0;assert(g.takeLoan(1000,1.5));assert.equal(s.loan.total,1060);assert.equal(s.loan.hourly,1060/(1.5*720));assert(!g.repayLoan());s.money=1060;assert(g.repayLoan());assert.equal(s.money,0);assert.equal(s.loan,null);});
test('Water and office improvements are available earlier',()=>{const s=reset();s.cityLevel=5;assert.equal(g.maxAllowedLevel('water'),5);s.cityLevel=g.DEF.office.unlock;assert(g.maxAllowedLevel('office')>=3);});


test('Merged parks sum mixed levels, preserve local influence, upgrade, move and reload in both orientations',()=>{
 for(const vertical of [false,true]){
  const s=reset();const rawPark=(x,z,level)=>{const b={type:'park',level,anchor:g.idx(x,z),w:3,h:3,rot:0,occ:0,fire:0,palette:0,cells:[]};for(let dz=0;dz<3;dz++)for(let dx=0;dx<3;dx++)b.cells.push(g.idx(x+dx,z+dz));b.cells.forEach(i=>s.grid[i]=b);return b;};
  const a=rawPark(8,8,5),b=rawPark(vertical?8:11,vertical?11:8,7);for(let x=8;x<14;x++)add(x,7,'road');for(let z=8;z<14;z++)add(7,z,'road');const home=add(6,9,'residential',1,12);g.calc();
  const before=g.localResidentialSatisfaction(home,[a,b,home],50),cash=s.money;
  g.openPopup(a.anchor);assert(g.parkFusionGroup());assert(g.mergeSelected());const park=s.grid[a.anchor];assert.equal(s.money,cash);assert.equal(park.cells.length,18);assert.equal(g.uniqueBuildings().filter(b=>b.type==='park').length,1);
  for(const k of ['happiness','upkeep','pollutionReduce'])assert.equal(g.buildingDef(park)[k][park.level],g.DEF.park[k][5]+g.DEF.park[k][7]);
  assert(Math.abs(g.localResidentialSatisfaction(home,[park,home],50)-before)<1e-8);
  assert(!g.parkFusionGroup());g.upgradeSelected();assert.equal(park.level,6);assert.equal(park.cells.length,18);assert.equal(g.buildingDef(park).upkeep[6],g.DEF.park.upkeep[6]+g.DEF.park.upkeep[8]);
  for(const part of g.capture(park)){const ex=Math.abs(Math.cos(part.ry))*part.sx/2+Math.abs(Math.sin(part.ry))*part.sz/2,ez=Math.abs(Math.sin(part.ry))*part.sx/2+Math.abs(Math.cos(part.ry))*part.sz/2;assert(Number.isFinite(part.y));assert(Math.abs(part.x)+ex<=park.w/2+.02);assert(Math.abs(part.z)+ez<=park.h/2+.02);}
  g.moveSelected();g.placeMoved(g.idx(20,20));assert.equal(park.anchor,g.idx(20,20));assert.equal(park.cells.length,18);g.calc();assert.equal(park.netIncome,0);assert.equal(park.netPollution,0);add(20,19,'road');g.calc();assert.equal(park.netPollution,-g.buildingDef(park).pollutionReduce[park.level]);
  const saved=JSON.parse(JSON.stringify(g.citySnapshot()));g.restoreCity(saved);const restored=g.getState().grid[park.anchor];assert.equal(restored.cells.length,18);assert.deepEqual(Array.from(restored.parkLevels),[5,7]);g.openPopup(restored.anchor);g.demolishSelected();assert(restored.cells.every(c=>!g.getState().grid[c]));
 }
});
test('Park fusion rejects partial shared edges and compact legacy parks',()=>{
 const s=reset();const a={type:'park',level:5,w:3,h:3,anchor:g.idx(8,8),fire:0},b={...a,anchor:g.idx(11,9)};s.grid[a.anchor]=a;s.grid[b.anchor]=b;g.openPopup(a.anchor);assert.equal(g.parkFusionGroup(),null);b.anchor=g.idx(11,8);s.grid[b.anchor]=b;a.w=2;assert.equal(g.parkFusionGroup(),null);
});
test('Road markings follow lane count and every lit-level intersection has visual signals',()=>{
 const s=reset();const road=add(10,10,'road');add(9,10,'road');add(11,10,'road');s.river[road.anchor]=true;
 for(let level=1;level<=8;level++){road.level=level;const parts=g.captureRoad(road.anchor),lines=parts.filter(p=>['#e0d4b4','#eee8d3'].includes(p.col));assert.equal(lines.length,(g.ROAD_LANES[level]-1)*3);}
 s.river[road.anchor]=false;add(10,9,'road');for(const level of [3,4,8]){road.level=level;const parts=g.captureRoad(road.anchor),signals=parts.filter(p=>p.col==='#263a43'&&p.sy===.133);assert.equal(signals.length,2);if(level>=4)assert(g.roadLamp(road.anchor,level));assert(parts.some(p=>['#e0d4b4','#eee8d3'].includes(p.col)));}
});


test('Goods are proportional continuous supply, isolated by road networks and create freight traffic',()=>{
 const s=reset();s.manualRotation=0;for(let x=5;x<=17;x++)add(x,7,'road');const factory=add(5,8,'heavy_industry'),a=add(10,8,'commercial'),b=add(15,8,'office');factory.workers=g.DEF.heavy_industry.jobs[1];
 const network=()=>{const all=g.uniqueBuildings(),rc=g.roadComponents();g.computeGoods(all,rc.comp,1,1);return {all,rc};};
 let {all,rc}=network();assert.equal(factory.goodsOutput,g.DEF.heavy_industry.goods[1]);assert.equal(a.goodsCoverage,1);assert.equal(b.goodsCoverage,1);assert.equal(g.goodsFactor(a),1);assert(s.goodsDelivered<=s.goodsCap);const routes=g.getGoodsRoutes();assert(routes.length>=2);assert(routes.every(r=>r.path.every(i=>s.grid[i]?.type==='road')));g.computeTraffic(all,rc.comp);assert(g.getTrafficRoutes().some(r=>r.kind==='freight'));assert(s.grid[g.idx(8,7)].trafficLoad>0);
 const demand=s.goodsUse;factory.workers=g.DEF.heavy_industry.jobs[1]*demand/g.DEF.heavy_industry.goods[1]/2;network();assert(Math.abs(a.goodsCoverage-.5)<1e-8);assert(Math.abs(b.goodsCoverage-.5)<1e-8);assert(Math.abs(g.goodsFactor(a)-.85)<1e-8);const output=factory.goodsOutput;network();assert.equal(factory.goodsOutput,output);assert(Math.abs(s.goodsDelivered-output)<1e-8);
 g.clearBuilding(s.grid[g.idx(8,7)]);network();assert.equal(a.goodsCoverage,0);assert.equal(b.goodsCoverage,0);assert.equal(g.goodsFactor(a),.7);assert.equal(g.getGoodsRoutes().length,0);assert(factory.goodsOutput>0);
 add(8,7,'road');factory.workers=65;({all,rc}=network());g.computeGoods(all,rc.comp,0,1);assert.equal(factory.goodsOutput,0);g.computeGoods(all,rc.comp,1,0);assert.equal(factory.goodsOutput,0);factory.workers=0;network();assert.equal(factory.goodsOutput,0);
});
test('Actual industrial operation uses assigned workers and supplies; consumers lose revenue when freight disappears',()=>{
 const s=reset();s.manualRotation=0;for(let x=4;x<=19;x++)add(x,8,'road');const home=add(4,9,'residential',8,800);add(6,9,'water',5);add(7,9,'water',5);add(8,9,'coal',5);const factory=add(11,9,'heavy_industry'),shop=add(14,9,'commercial');g.calc();assert.equal(factory.workers,g.DEF.heavy_industry.jobs[1]);assert(factory.goodsOutput>0);assert.equal(shop.goodsCoverage,1);assert.equal(shop.incomeBreakdown.goods,1);assert.equal(factory.currentIncome,g.DEF.heavy_industry.income[1]*factory.industryEfficiency);assert(factory.netPollution>0&&factory.netPollution<g.DEF.coal.pollution[1]);
 const parts=g.captureProduction([factory]);assert(parts.length>0);g.setSpeed(1);g.updateCars(1);assert.notDeepEqual(g.captureProduction([factory]),parts);g.setSpeed(0);
 g.openPopup(factory.anchor);g.moveSelected();g.placeMoved(g.idx(25,25));g.calc();assert.equal(factory.goodsOutput,0);assert.equal(factory.netIncome,0);assert.equal(factory.netPollution,0);assert.equal(shop.goodsCoverage,0);assert.equal(shop.incomeBreakdown.goods,.7);assert(Math.abs(shop.currentIncome-g.commercialRevenue(shop.incomeBreakdown.base,shop.workers,g.DEF.commercial.jobs[1],shop.incomeBreakdown.supply,shop.incomeBreakdown.environment)*.7)<1e-8);assert.equal(g.captureProduction([factory]).length,0);
});
test('Advanced construction and upgrades require free goods on their own network, basic buildings do not',()=>{
 const s=reset();for(let x=5;x<12;x++)add(x,7,'road');add(20,7,'road');const factory=add(5,8,'heavy_industry');factory.workers=65;const rc=g.roadComponents();g.computeGoods(g.uniqueBuildings(),rc.comp,1,1);assert(g.goodsCanPlace('hospital',1,[g.idx(10,8),g.idx(11,8)]));assert(!g.goodsCanPlace('hospital',1,[g.idx(20,8),g.idx(21,8)]));assert(g.goodsCanPlace('residential',1,[g.idx(20,8)]));assert.equal(g.goodsRequirement('commercial'),0);assert(g.goodsRequirement('commercial',4,3)>0);assert(g.goodsRequirement('office',3,2)>0);assert(!g.goodsCanPlace('office',3,[g.idx(20,8)],2));
 const office=add(20,8,'office',2);g.openPopup(office.anchor);const cash=s.money;g.upgradeSelected();assert.equal(office.level,2);assert.equal(s.money,cash);
});
test('Two matching heavy factories forming 2x2 merge with capacities, upkeep and upgrades preserved',()=>{
 const s=reset();s.manualRotation=0;for(let x=7;x<=13;x++)add(x,7,'road');const factories=[8,9].map(x=>add(x,8,'heavy_industry',3));g.openPopup(factories[0].anchor);s.cityLevel=2;assert(!g.industrialFusionGroup());s.cityLevel=3;factories[1].level=2;assert(!g.industrialFusionGroup());factories[1].level=3;assert(g.industrialFusionGroup());factories[0].palette=2;const oldCells=factories.flatMap(g.buildingCells),cash=s.money;assert(g.mergeSelected());const complex=g.uniqueBuildings().find(b=>b.type==='industrial_complex');assert(complex);assert.equal(complex.palette,2);assert.equal(complex.level,3);assert.equal(complex.cells.length,4);assert.equal(s.money,cash);assert.equal(oldCells.filter(c=>!s.grid[c]).length,0);
 for(const k of ['goods','jobs','income','pollution','upkeep','power','water'])assert.equal(g.buildingDef(complex)[k][3],2*g.DEF.heavy_industry[k][3]);assert.equal(g.buildingUpgradeCost(complex),2*g.upgradeCost('heavy_industry',3));s.cityLevel=8;g.upgradeSelected();assert.equal(complex.level,4);const save=JSON.parse(JSON.stringify(g.citySnapshot()));g.restoreCity(save);const loaded=g.getState().grid[complex.anchor];assert.equal(loaded.type,'industrial_complex');assert.equal(loaded.cells.length,4);assert.equal(loaded.level,4);
});
test('Industry tiers and geometry are distinct, bounded, and cleaner than thermal power; recycling relief increases 80 percent',()=>{
 reset();assert.equal(g.DEF.heavy_industry.unlock,2);assert.equal(g.DEF.light_industry.unlock,4);
 for(let l=1;l<=5;l++){const h=g.DEF.heavy_industry,q=g.DEF.light_industry;assert(h.pollution[l]<g.DEF.coal.pollution[l]);assert(q.goods[l]<h.goods[l]);assert(q.goods[l]/q.pollution[l]>h.goods[l]/h.pollution[l]);assert(q.income[l]>0);assert(h.income[l]>0);}
 for(const type of ['heavy_industry','light_industry','industrial_complex']){let previous='';for(let level=1;level<=5;level++)for(let rot=0;rot<4;rot++){const fp=g.footprint(type,rot,level),parts=g.capture({type,level,rot,palette:0});assert.equal(parts.some(p=>p.mesh==='sawtooth'),type!=='light_industry');for(const p of parts){assert(Number.isFinite(p.y));const ex=Math.abs(Math.cos(p.ry))*p.sx/2+Math.abs(Math.sin(p.ry))*p.sz/2,ez=Math.abs(Math.sin(p.ry))*p.sx/2+Math.abs(Math.cos(p.ry))*p.sz/2;assert(Math.abs(p.x)+ex<=fp.w/2+.02,`${type} ${level} x`);assert(Math.abs(p.z)+ez<=fp.h/2+.02,`${type} ${level} z`);}if(!rot){assert.notEqual(JSON.stringify(parts),previous);previous=JSON.stringify(parts);}}assert.notDeepEqual(g.buildingPalette({type,palette:0}),g.buildingPalette({type,palette:1}));}
 assert.equal(g.DEF.recycling.pollutionReduce[1],12.96);assert.equal(g.DEF.wastewater.pollutionReduce[1],7.2);
});
test('Recycling nuisance affects only residences within four grid blocks',()=>{
 const s=reset();add(8,7,'road');add(12,7,'road');const home=add(8,8,'residential',1,10),plant={type:'recycling',level:1,anchor:g.idx(12,8),w:1,h:1,cells:[g.idx(12,8)],fire:0};s.grid[plant.anchor]=plant;const base=g.localResidentialSatisfaction(home,[home],60);const near=g.localResidentialSatisfaction(home,[home,plant],60);assert(near<base);g.clearBuilding(plant);plant.anchor=g.idx(13,8);plant.cells=[plant.anchor];s.grid[plant.anchor]=plant;add(13,7,'road');assert.equal(g.localResidentialSatisfaction(home,[home,plant],60),base);
});


test('Guided tutorial waits for a road, two homes and a shop, and resumes after saving',()=>{
 const s=reset();s.cityLevel=1;nodes.get('#cityAccess').hidden=true;doc.querySelector('#startScreen').hidden=true;g.renderCityGuide();assert(!g.guideRequirementMet());g.advanceGuide();assert.equal(s.tutorialStep,0);
 add(8,8,'road');assert.equal(s.tutorialStep,1);add(8,9,'residential');assert(!g.guideRequirementMet());add(8,7,'residential');assert.equal(s.tutorialStep,2);
 g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));assert.equal(g.getState().tutorialStep,2);assert(!g.guideRequirementMet());add(9,8,'road');add(9,9,'commercial');assert.equal(g.getState().tutorialStep,3);
 g.getState().tutorialDone=true;g.getState().cityLevel=2;assert.equal(g.currentUnlockAdvice()[0],'townhall');g.advanceGuide();assert.equal(g.currentUnlockAdvice()[0],'heavy_industry');g.advanceGuide();assert.equal(g.currentUnlockAdvice(),undefined);
});
test('Maximum upgrade pays successive levels and stops on budget, city cap or blocked expansion',()=>{
 let s=reset();add(8,7,'road');let b=add(8,8,'residential');const c1=g.buildingUpgradeCost(b);b.level=2;const c2=g.buildingUpgradeCost(b);b.level=1;s.money=c1+c2;g.openPopup(b.anchor);g.upgradeToMaximum();assert.equal(b.level,3);assert.equal(s.money,0);
 s=reset();s.cityLevel=1;add(8,7,'road');b=add(8,8,'residential');g.openPopup(b.anchor);const cash=s.money;g.upgradeToMaximum();assert.equal(b.level,g.maxAllowedLevel('residential'));assert(s.money<=cash);
 s=reset();add(8,7,'road');b=add(8,8,'park',4);s.landUnlocked.fill(false);b.cells.forEach(c=>s.landUnlocked[c]=true);g.openPopup(b.anchor);const funds=s.money;g.upgradeToMaximum();assert.equal(b.level,4);assert.equal(s.money,funds);
});
test('Road quote includes bridge premiums, skips roads, stops at obstacles, and moving leaves no selection',()=>{
 const s=reset();add(8,8,'road');s.river[g.idx(9,8)]=true;const cells=[g.idx(8,8),g.idx(9,8),g.idx(10,8)];const q=g.roadConstructionQuote(cells);assert.equal(q.cost,g.buildPrice('road')*3);s.roadDragCells=cells;const cash=s.money;g.buildRoadDrag();assert.equal(cash-s.money,q.cost);
 const b=add(10,9,'residential');g.openPopup(b.anchor);g.moveSelected();g.placeMoved(g.idx(15,15));assert.equal(b.anchor,g.idx(15,15));assert.equal(s.selected,null);assert(g.buildingStats(b).some(([label])=>label==='Consumo eléctrico'));
});
test('News alternates queued facts with satire and never repeats after save and reload',()=>{
 const s=reset();doc.querySelector('#cityAccess').hidden=true;doc.querySelector('#startScreen').hidden=true;g.addEvent('Hito A');g.addEvent('Hito B');assert.equal(s.newsSeen[0],'Hito A');g.presentNextNews();assert(s.newsSeen[1]!==s.newsSeen[0]);g.presentNextNews();assert.equal(s.newsSeen[2],'Hito B');g.addEvent('Hito A');assert(!s.newsQueue.some(n=>n.text==='Hito A'));
 const seen=[...s.newsSeen];g.restoreCity(JSON.parse(JSON.stringify(g.citySnapshot())));g.addEvent('Hito A');assert.equal(g.getState().newsSeen.filter(t=>t==='Hito A').length,1);assert(seen.every(t=>g.getState().newsSeen.includes(t)));
});
test('Monuments have five distinct bounded models, including the ancient maple and corner cube',()=>{
 const s=reset();s.cityLevel=5;assert(g.buildingLocked('monument'));s.cityLevel=6;s.goodsByComponent={0:{capacity:100,demand:0}};assert(!g.buildingLocked('monument'));assert.equal(g.buildPrice('monument'),75000);assert.equal(g.DEF.monument.happiness[1],1);
 add(8,8,'road');const h=add(8,9,'residential',1,12);add(9,8,'road');s.goodsByComponent={0:{capacity:100,demand:0}};const cash=s.money,m=add(9,9,'monument');assert.equal(cash-s.money,75000);assert.equal(m.cells.length,1);g.calc();const base=g.localResidentialSatisfaction(h,[h],50),boost=g.localResidentialSatisfaction(h,[h,m],50)-base;assert(Math.abs(boost-g.DEF.monument.happiness[1]*g.goodsFactor(m)*1.25*(1-1/5.2))<1e-8);assert.equal(m.netPollution,0);assert.equal(m.netIncome,0);
 const models=[];for(let palette=0;palette<5;palette++){const parts=g.capture({type:'monument',level:1,palette,rot:0});models.push(JSON.stringify(parts));for(const part of parts){assert(Math.abs(part.x)+part.sx/2<=.5);assert(Math.abs(part.z)+part.sz/2<=.5);}}assert.equal(new Set(models).size,5);assert(Math.max(...g.capture({type:'monument',level:1,palette:3}).map(p=>p.y+p.sy/2))<1.6);
 const save=g.citySnapshot();g.restoreCity(JSON.parse(JSON.stringify(save)));assert.equal(g.getState().grid[m.anchor].palette,m.palette);
});


test('Demand bars use production as their maximum, including zero capacity',()=>{
 const s=reset();s.researchCap=4;s.researchUse=1;s.goodsCap=100;s.goodsUse=25;s.goodsDelivered=25;g.renderResearchAndLoan();assert.equal(nodes.get('#researchBar').style.width,'25%');assert.equal(nodes.get('#goodsBar').style.width,'25%');assert.equal(nodes.get('#researchText').textContent,'1.00 / 4.00');s.researchCap=0;s.goodsCap=0;g.renderResearchAndLoan();assert.equal(nodes.get('#researchBar').style.width,'100%');s.researchUse=s.goodsUse=0;g.renderResearchAndLoan();assert.equal(nodes.get('#researchBar').style.width,'0%');assert.equal(nodes.get('#goodsBar').style.width,'0%');
});
test('Transit relieves nearby roads more than remote ones and routing takes an alternative',()=>{
 const s=reset();for(let x=3;x<=17;x++)add(x,7,'road');const hub=add(7,8,'transit');hub.serviceEfficiency=1;const near=s.grid[g.idx(7,7)],far=s.grid[g.idx(17,7)];assert(g.transitRoadRelief(near,[hub])>0);assert.equal(g.transitRoadRelief(far,[hub]),0);hub.serviceEfficiency=0;assert.equal(g.transitRoadRelief(near,[hub]),0);assert.equal(g.ROAD_LANES[8],6);assert.equal(g.roadLaneDividers(8,.8).length,5);
});
test('Industry emissions match its actual output; employment is reduced and industrial income supports municipal incentives',()=>{
 const s=reset();s.debug=true;add(8,7,'road');const f=add(8,8,'heavy_industry');f.industryEfficiency=.5;assert.equal(g.buildingEmissions(f),g.DEF.heavy_industry.pollution[1]*.5);assert.equal(g.DEF.heavy_industry.jobs[1],13);assert.equal(g.DEF.light_industry.jobs[1],10);assert.equal(g.DEF.research.research[1],1.4);assert.equal(g.DEF.school.jobs[1],24);for(const type of ['heavy_industry','light_industry','industrial_complex'])for(let l=1;l<=5;l++)assert(g.DEF[type].income[l]>0);
 g.openPopup(f.anchor);g.moveSelected();g.placeMoved(g.idx(20,20));assert.equal(g.buildingEmissions(f),0);
});
test('Debug builds disconnected structures, while a merged residence needs only one road contact',()=>{
 const s=reset();s.debug=true;for(const [x,z] of [[12,12],[13,12],[12,13],[13,13]])add(x,z,'residential',4,25);g.openPopup(g.idx(12,12));assert(g.mergeSelected());const house=s.grid[g.idx(12,12)];g.calc();assert(!g.operational(house.anchor));assert.equal(house.netIncome,0);assert.equal(s.pop,0);add(11,12,'road');g.calc();assert(g.operational(house.anchor));assert.equal(s.pop,g.buildingDef(house).cap[house.level]);assert(s.powerUse>0);s.debug=false;s.cityLevel=2;assert.equal(g.maxAllowedLevel('park'),2);
});
test('Extinguished fires always remove exactly one level, regardless of protection',()=>{
 const s=reset();s.debug=false;for(let x=8;x<=12;x++)add(x,7,'road');const b=add(8,8,'commercial',3);add(10,8,'fire',5);b.fire=.001;const random=ctx.Math.random;ctx.Math.random=()=>.999;try{g.advance(.01);}finally{ctx.Math.random=random;}assert.equal(b.level,2);assert.equal(b.fire,0);
});
test('News stays unread under start screen and immediately becomes visible when play starts',()=>{
 const s=reset();doc.querySelector('#cityAccess').hidden=true;doc.querySelector('#startScreen').hidden=false;g.addEvent('Primera noticia');assert.equal(s.newsSeen.length,0);g.cityNews([]);assert.equal(s.newsSeen.length,0);doc.querySelector('#startScreen').hidden=true;g.cityNews([]);assert.equal(s.newsSeen[0],'Primera noticia');assert(s.newsActive);
});
