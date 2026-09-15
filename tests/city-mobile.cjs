// Input/state regressions. This DOM/WebGL harness does not assert browser layout.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('public/ciudad-viva/index.html','utf8');
function harness(mobile=true,width=390,height=844){
 const nodes=new Map();
 function node(tag='div'){
  const classes=new Set(),listeners=new Map(),attributes={};let id='',markup='';
  const n={tagName:tag.toUpperCase(),hidden:false,inert:false,children:[],dataset:{},textContent:'',parentNode:null,style:{setProperty(k,v){this[k]=v;}},
   get id(){return id},set id(value){id=value;nodes.set('#'+value,n)},get innerHTML(){return markup},set innerHTML(value){markup=value;for(const m of value.matchAll(/\bid="([^"]+)"/g))if(!nodes.has('#'+m[1])){const child=node();child.id=m[1];n.appendChild(child);}},
   classList:{add(...xs){xs.forEach(x=>classes.add(x))},remove(...xs){xs.forEach(x=>classes.delete(x))},contains(x){return classes.has(x)},toggle(x,on=!classes.has(x)){on?classes.add(x):classes.delete(x);return on;}},
   addEventListener(t,fn){if(!listeners.has(t))listeners.set(t,[]);listeners.get(t).push(fn)},emit(t,e={}){for(const fn of listeners.get(t)||[])fn({target:n,preventDefault(){},...e});},click(){n.emit('click')},focus(){},scrollIntoView(){},setAttribute(k,v){attributes[k]=String(v)},getAttribute(k){return attributes[k]},
   appendChild(child){if(child.parentNode)child.parentNode.children=child.parentNode.children.filter(c=>c!==child);n.children.push(child);child.parentNode=n;return child;},prepend(child){n.appendChild(child);n.children=[child,...n.children.filter(c=>c!==child)]},contains(child){return child===n||n.children.some(c=>c.contains(child))},closest(){return n},querySelectorAll(){return[]},remove(){},setPointerCapture(){},
   getBoundingClientRect(){return id==='mobileJoystick'?{left:24,top:height-164,width:112,height:112}:{left:0,top:0,width,height}},clientWidth:width,clientHeight:height,offsetWidth:330,offsetHeight:320};return n;
 }
 const document={body:node('body'),hidden:false,querySelector(s){if(!nodes.has(s)){const n=node();if(s.startsWith('#'))n.id=s.slice(1);nodes.set(s,n);}return nodes.get(s)},querySelectorAll(){return[]},createElement:node,addEventListener(){}};
 const gl=new Proxy({getShaderParameter:()=>true,getProgramParameter:()=>true,getAttribLocation:()=>0,getUniformLocation:()=>({})},{get:(o,k)=>o[k]||(()=>({}))});document.querySelector('#glCanvas').getContext=()=>gl;
 const window={innerWidth:width,innerHeight:height,addEventListener(){},matchMedia:q=>({matches:mobile&&q.includes('pointer: coarse')})};
 const ctx={window,document,navigator:{userAgent:mobile?'Mozilla/5.0 iPhone':'Windows NT',maxTouchPoints:mobile?5:0},console,Math,performance:{now:()=>1000},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},setInterval(){},fetch:()=>new Promise(()=>{}),AbortSignal,Float32Array,Uint16Array,devicePixelRatio:3,testGame:{}};
 const expose=`Object.assign(testGame,{MOBILE,detectMobile,mobile,resetMobileGesture,mobilePointerDown,mobilePointerMove,mobilePointerUp,confirmMobilePlacement,mobileClosePanels,syncMobile,beginVisit,endVisit,updateVisit,walkablePoint,updateCamera,build,citySnapshot,restoreCity,renderUI,renderPalette,toggleAnalysis,openMunicipality,renderCityGuide,renderMobileJournal,getState:()=>S,getWalk:()=>walk,getCamera:()=>cam,projectPoint,worldFromCell,coord,idx,uniqueBuildings,resizeCanvas,getDrawSize:()=>[canvas.width,canvas.height]});})();`;
 vm.createContext(ctx);vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/\}\)\(\);\s*$/,expose),ctx);
 const g=ctx.testGame,s=g.getState();s.debug=true;s.money=1e8;s.river.fill(false);s.landUnlocked.fill(true);s.tutorialDone=true;g.resizeCanvas();g.updateCamera();return {g,s,nodes,document};
}
function pointer(id,x,y){return {pointerId:id,clientX:x,clientY:y,pointerType:'touch',button:0,preventDefault(){}};}
function point(g,x,z){const w=g.worldFromCell(x,z);g.updateCamera();return g.projectPoint(w.x,0,w.z);}
function tap(g,x,z,id=1){const p=point(g,x,z),e=pointer(id,p.x,p.y);g.mobilePointerDown(e);g.mobilePointerUp(e);}
const cases=[];function test(name,fn){fn();cases.push(name);console.log('PASS',name)}
test('Mobile detection keeps desktop opt-out and recognizes phones and iPad desktop user agents',()=>{
 const {g}=harness(false);assert.equal(g.MOBILE,false);assert.equal(g.detectMobile({userAgent:'iPhone'}),true);assert.equal(g.detectMobile({platform:'MacIntel',maxTouchPoints:5}),true);assert.equal(g.detectMobile({platform:'Win32',maxTouchPoints:0},()=>({matches:false})),false);
});
test('Mobile boot reparents existing controls, retains desktop DOM and limits drawing resolution',()=>{
 for(const [w,h] of [[320,568],[390,844],[844,390],[768,1024]]){const {g,nodes,document}=harness(true,w,h);assert.equal(g.MOBILE,true);assert(document.body.classList.contains('mobile-mode'));assert.equal(nodes.get('#dataTab').parentNode.id,'mobileNav');assert.equal(nodes.get('.controls').parentNode.id,'mobileMenu');g.resizeCanvas();assert.deepEqual([...g.getDrawSize()],[Math.floor(w*1.5),Math.floor(h*1.5)]);}
 const {g,nodes}=harness(false);assert(!nodes.has('#mobileNav'));g.resizeCanvas();assert.deepEqual([...g.getDrawSize()],[780,1688]);
});
test('Single-finger pan and two-finger pinch never place buildings',()=>{
 const {g,s}=harness();s.tool='residential';const cash=s.money,cam=g.getCamera(),before=[...cam.target];g.mobilePointerDown(pointer(1,180,300));g.mobilePointerMove(pointer(1,220,330));g.mobilePointerUp(pointer(1,220,330));assert.notDeepEqual([...cam.target],before);assert.equal(s.money,cash);assert.equal(g.mobile.cell,-1);
 const distance=cam.dist;g.mobilePointerDown(pointer(1,120,300));g.mobilePointerDown(pointer(2,220,300));g.mobilePointerMove(pointer(2,280,300));assert(cam.dist<distance);g.mobilePointerUp(pointer(2,280,300));g.mobilePointerUp(pointer(1,120,300));assert.equal(s.money,cash);assert.equal(g.mobile.cell,-1);
});
test('Buildings preview before confirmation, and interrupted road drags cost nothing',()=>{
 const {g,s}=harness();s.tool='residential';const cash=s.money;tap(g,15,18);assert.equal(s.money,cash);assert.equal(g.mobile.cell,g.idx(15,18));g.confirmMobilePlacement();assert.equal(s.grid[g.idx(15,18)].type,'residential');
 s.tool='road';const p=point(g,20,17),q=point(g,21,17),before=s.money;g.mobilePointerDown(pointer(1,p.x,p.y));g.mobilePointerMove(pointer(1,q.x,q.y));g.mobilePointerDown(pointer(2,q.x+70,q.y));g.mobilePointerUp(pointer(2,q.x+70,q.y));g.mobilePointerUp(pointer(1,q.x,q.y));assert.equal(s.money,before);assert.equal(s.grid[g.idx(21,17)],null);
 g.mobilePointerDown(pointer(1,p.x,p.y));g.mobilePointerMove(pointer(1,q.x,q.y));g.mobilePointerUp(pointer(1,q.x,q.y));assert.equal(s.grid[g.idx(21,17)].type,'road');
});
test('Terrain selects without buying; camera orbit, cancellations and panel switching are explicit',()=>{
 const {g,s,nodes}=harness();s.tool='land';s.landUnlocked[g.idx(15,19)]=false;const cash=s.money;tap(g,15,19);assert.equal(s.money,cash);assert.equal(s.selectedLand,g.idx(15,19));
 g.resetMobileGesture();assert.equal(s.landSelection.length,0);s.tool='inspect';g.mobile.mode='orbit';const before=g.getCamera().yaw;g.mobilePointerDown(pointer(1,150,300));g.mobilePointerMove(pointer(1,195,310));g.mobilePointerUp(pointer(1,195,310));assert.notEqual(g.getCamera().yaw,before);
 nodes.get('#buildDrawerTab').click();assert(nodes.get('#buildDrawer').classList.contains('open'));g.toggleAnalysis('data');g.syncMobile();assert(!nodes.get('#buildDrawer').classList.contains('open'));assert(nodes.get('#dataDrawer').classList.contains('open'));assert(nodes.get('#buildDrawer').inert);g.openMunicipality();assert(!nodes.get('#dataDrawer').classList.contains('open'));
});
test('Joystick and view drag operate simultaneously, remain on roads and stop on capture loss',()=>{
 const {g,nodes}=harness();assert(g.beginVisit());const w=g.getWalk(),stick=nodes.get('#mobileJoystick');stick.emit('pointerdown',pointer(7,80,730));stick.emit('pointermove',pointer(7,80,700));assert(w.touchForward>0);const yaw=w.yaw;g.mobilePointerDown(pointer(8,220,300));g.mobilePointerMove(pointer(8,250,310));assert.notEqual(w.yaw,yaw);assert(w.touchForward>0);for(let i=0;i<100;i++)g.updateVisit(.05);assert(g.walkablePoint(w.x,w.z));g.mobilePointerUp(pointer(8,250,310));assert(w.touchForward>0);stick.emit('lostpointercapture',pointer(7,80,700));assert.equal(w.touchForward,0);g.resetMobileGesture();assert.equal(w.touchSide,0);g.endVisit();assert.equal(g.getWalk(),null);
});
test('Tutorial uses touch instructions and registry paginates the full stored history',()=>{
 const {g,s,nodes,document}=harness();s.debug=false;s.tutorialDone=false;s.tutorialStep=0;document.querySelector('#cityAccess').hidden=document.querySelector('#startScreen').hidden=true;g.renderCityGuide();assert(nodes.get('#guideText').textContent.includes('Dos dedos'));s.newsSeen=Array.from({length:65},(_,i)=>'Noticia '+i);g.mobile.journalPage=3;g.renderMobileJournal();assert.equal(nodes.get('#mobileNews').children.length,5);assert.equal(nodes.get('#mobileNewsNext').disabled,true);
});
test('Inspection keeps upgrades and relocation accessible, and renaming uses a touch form',()=>{
 const {g,s,nodes}=harness();s.cityLevel=4;g.build(g.idx(15,18),'residential');s.tool='inspect';tap(g,15,18);assert(nodes.get('#buildingPopup').classList.contains('visible'));const house=s.grid[g.idx(15,18)];nodes.get('#upgradeBtn').click();assert.equal(house.level,2);nodes.get('#moveBtn').click();tap(g,16,19);assert.equal(s.grid[g.idx(16,19)],null);g.confirmMobilePlacement();assert.equal(s.grid[g.idx(16,19)],house);
 nodes.get('#cityTitle').click();assert.equal(nodes.get('#mobileRename').hidden,false);nodes.get('#mobileRenameInput').value='Ciudad táctil';nodes.get('#mobileRenameForm').emit('submit');assert.equal(s.cityName,'Ciudad táctil');assert.equal(nodes.get('#mobileRename').hidden,true);
});
console.log(`${cases.length} mobile input/state tests passed`);
