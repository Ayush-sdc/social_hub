const config=window.PORTFOLIO;
document.querySelector('h1').textContent=config.name;
document.title=config.name+' | Portfolio';
const paths={facebook:'M22 12h-4V9c0-1 .7-1.5 1.7-1.5H22V2.3A28 28 0 0 0 18.6 2C15.2 2 13 4 13 8v4H9v5h4v13h5V17h3.5Z',linkedin:'M4 10h5v20H4ZM6.5 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM13 10h5v2.8c1-2 3-3.3 5.5-3.3 5 0 6.5 3.2 6.5 8V30h-5V19c0-3-1-4.5-3-4.5-2.8 0-4 2-4 4.5v11h-5Z',github:'M16 2a14 14 0 0 0-4.4 27.3c.7.1 1-.3 1-.7v-2.7c-3.9.9-4.7-1.6-4.7-1.6-.6-1.6-1.6-2-1.6-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.3 2.1 3.3 1.5 4.1 1.1.1-.9.5-1.5.9-1.9-3.1-.4-6.4-1.6-6.4-7a5.5 5.5 0 0 1 1.4-3.8c-.2-.4-.6-1.8.2-3.8 0 0 1.2-.4 3.9 1.4a13.4 13.4 0 0 1 7 0c2.7-1.8 3.9-1.4 3.9-1.4.8 2 .3 3.4.2 3.8a5.5 5.5 0 0 1 1.4 3.8c0 5.4-3.3 6.6-6.4 7 .5.4 1 1.3 1 2.6v4c0 .4.3.8 1 .7A14 14 0 0 0 16 2Z',twitter:'M30 7a12 12 0 0 1-3.4 1 6 6 0 0 0 2.6-3.3 12 12 0 0 1-3.8 1.4A6 6 0 0 0 15.2 11 17 17 0 0 1 2.8 4.7a6 6 0 0 0 1.9 8 6 6 0 0 1-2.7-.8 6 6 0 0 0 4.8 5.9 6 6 0 0 1-2.7.1 6 6 0 0 0 5.6 4.2A12 12 0 0 1 2 24.8a17 17 0 0 0 26.2-14.4A12 12 0 0 0 30 7Z',email:'M3 4h26a3 3 0 0 1 3 3v1L16 19 0 8V7a3 3 0 0 1 3-3ZM0 11l15 10a2 2 0 0 0 2 0l15-10v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3Z'};
for(const [name,path] of Object.entries(paths)){const a=document.createElement('a');a.className='icon';a.dataset.link=name;a.setAttribute('aria-label',name==='twitter'?'Twitter':name[0].toUpperCase()+name.slice(1));a.title=a.getAttribute('aria-label');a.innerHTML=`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="${path}"/></svg>`;document.querySelector('nav').append(a)}
let toastTimer;document.querySelectorAll('[data-link]').forEach(a=>{const url=config.links[a.dataset.link];if(url){a.href=url;if(!url.startsWith('mailto:')){a.target='_blank';a.rel='noopener noreferrer'}}else{a.setAttribute('role','button');a.tabIndex=0;const notify=()=>{const n=document.querySelector('#notice');n.textContent=a.getAttribute('aria-label')+' link hasn’t been added yet.';n.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.classList.remove('visible'),2800)};a.addEventListener('click',notify);a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();notify()}})}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const typed=document.querySelector('#typed');let position=10,back=false;function type(){const text=config.tagline;position+=back?-1:1;typed.textContent=text.slice(0,position);let delay=back?65:115;if(position>=text.length){back=true;delay=2200}else if(position<=0){back=false;delay=450}setTimeout(type,delay)}if(!reduced)setTimeout(type,1400);else typed.textContent=config.tagline;
const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');let w,h,points=[],pointer={x:-1000,y:-1000},last=0;
function resize(){w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(115,Math.max(38,Math.floor(w*h/15000)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.65,vy:(Math.random()-.5)*.65,r:Math.random()*3+1}));if(reduced)draw(0)}
function draw(time){const dt=last?Math.min((time-last)/16.67,2):1;last=time;ctx.clearRect(0,0,w,h);const distance=Math.min(300,w*.22);for(let i=0;i<points.length;i++){const p=points[i];if(!reduced){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1}for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<distance){ctx.strokeStyle=`rgba(191,201,204,${(1-d/distance)*.38})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}const pd=Math.hypot(p.x-pointer.x,p.y-pointer.y);if(pd<180){ctx.strokeStyle=`rgba(220,235,230,${(1-pd/180)*.65})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke()}ctx.fillStyle='rgba(48,202,45,.55)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}if(!reduced)requestAnimationFrame(draw)}
const touchCursor=document.createElement('div');
touchCursor.className='touch-cursor';
touchCursor.setAttribute('aria-hidden','true');
document.body.append(touchCursor);
let activeTouch=null;
function updatePointer(e){
  pointer.x=e.clientX;pointer.y=e.clientY;
  const touching=e.pointerType==='touch'||e.pointerType==='pen';
  touchCursor.classList.toggle('active',touching);
  touchCursor.style.left=pointer.x+'px';
  touchCursor.style.top=pointer.y+'px';
  if(reduced)draw(0);
}
function clearPointer(){
  activeTouch=null;pointer.x=-1000;pointer.y=-1000;
  touchCursor.classList.remove('active');
  if(reduced)draw(0);
}
addEventListener('pointerdown',e=>{
  if(!e.isPrimary)return;
  if(e.pointerType!=='mouse')activeTouch=e.pointerId;
  updatePointer(e);
});
addEventListener('pointermove',e=>{
  if(!e.isPrimary)return;
  if(e.pointerType!=='mouse'&&e.pointerId!==activeTouch)return;
  updatePointer(e);
});
addEventListener('pointerup',e=>{if(e.pointerId===activeTouch)clearPointer()});
addEventListener('pointercancel',e=>{if(e.pointerId===activeTouch)clearPointer()});
addEventListener('blur',clearPointer);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearPointer()});
document.addEventListener('pointerleave',clearPointer);
addEventListener('resize',resize);
resize();if(!reduced)requestAnimationFrame(draw);
