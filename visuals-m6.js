/* Ilustraciones SVG del Módulo 6 · Factores del Fuego (representación ilustrativa). */
(()=>{const V=window.SSOVisual;
const tag=t=>`<span class="scene-tag">${t}</span>`;
const person=(x,y,c='#c8592f',s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="7" cy="-40" fill="#e7c34f"/><rect x="-8" y="-33" width="16" height="26" rx="5" fill="${c}"/><rect x="-7" y="-9" width="5" height="17" fill="#3b3a2e"/><rect x="2" y="-9" width="5" height="17" fill="#3b3a2e"/></g>`;
const flame=(x,y,s=1,k=0)=>`<g transform="translate(${x} ${y}) scale(${s})"><path class="fl" style="--d:-${k*.3}s" d="M0 0q-16-26 0-58q6 22 14 10q10 26-2 48z" fill="#ff7a22"/><path class="fl" style="--d:-${k*.3+.15}s" d="M3 0q-8-14 1-30q4 10 7 6q5 14-1 24z" fill="#ffd36a"/></g>`;
const forest=label=>window.RodalVisual('forest',{}).replace(/<span class="scene-tag">[^<]*<\/span>/,label?tag(label):'');

/* ---------- Tetraedro (slides 02 a 05) ---------- */
function tetra(mode){const ok=mode==='ok'||mode==='solved',ko=mode==='review-ko';
 const TL=[170,80],TR=[630,80],B=[400,385],C=[400,200];
 const stroke=ok?'#9fe27a':ko?'#ff6a50':'#d9d2b8';
 const fires=mode==='ok'?'':`<ellipse cx="170" cy="200" rx="150" ry="130" fill="#ff7a22" opacity=".18" class="glowpulse"/>`+[[95,300,2.4],[135,300,3.1],[175,300,3.6],[215,300,3],[250,300,2.2],[60,305,1.8],[285,305,1.6]].map(([x,y,k],i)=>flame(x,y,k,i)).join('');
 const sky=`<path d="M470 0 H800 V230 Q640 260 470 210Z" fill="#7fb7c9" opacity="${mode==='ok'?.25:.35}"/><g fill="none" stroke="#d6f3f7" stroke-width="3" stroke-linecap="round" opacity=".7" class="windvec"><path d="M560 40q30-12 60 0t60 0"/><path d="M590 70q30-12 60 0t60 0"/><path d="M540 150q30-12 60 0t60 0"/></g>`;
 const bg=`<rect width="800" height="460" fill="${mode==='ok'?'#4a5048':'#3a2a20'}"/><path d="M0 300 Q400 260 800 300 V460 H0Z" fill="#2c3326"/>${Array.from({length:16},(_,i)=>`<path d="M${i*52} 300l12-70 12 70Z" fill="#1f2b20" opacity=".9"/>`).join('')}<path class="smk" d="M200 120 q40 -80 -10 -160" stroke="${mode==='ok'?'#e8e8e8':'#5a5045'}" stroke-width="70" fill="none" opacity=".35"/>${sky}${fires}`;
 const tri=`<g class="${mode==='ok'?'tetra-break':''}" fill="none" stroke="${stroke}" stroke-width="${ok?4:2.5}" stroke-opacity="${mode==='context'?.55:.95}"><path d="M${TL} L${TR} L${B}Z"/><path d="M${TL} L${C} M${TR} L${C} M${B} L${C}" stroke-dasharray="8 7"/></g>`;
 const marks=mode==='context'?[[TL,'#F57C00'],[TR,'#009688'],[B,'#4CAF50'],[C,'#5D4037']].map(([[x,y],col],i)=>`<circle class="zone-blink" style="--d:${i*.3}s" cx="${x}" cy="${y}" r="18" fill="${col}" stroke="#fff" stroke-width="2"/>`).join(''):'';
 const water=mode==='ok'?'<path class="jet" d="M800 40 Q500 0 190 90" stroke="#8fd3ff" stroke-width="10" fill="none" stroke-linecap="round"/><circle class="splash" cx="185" cy="92" r="26" fill="#cfe9ff" opacity=".7"/><text x="400" y="440" fill="#e9fbff" font-size="14" text-anchor="middle">CALOR ELIMINADO · REACCIÓN DETENIDA</text>':'';
 return `<svg viewBox="0 0 800 460" role="img" aria-label="Diagrama del triángulo y tetraedro del fuego superpuesto a un incendio en plantación de pinos">${bg}${tri}${marks}${water}</svg>`}
V.map=(c,mode)=>tetra(mode);

/* ---------- Diagramas de las tarjetas del caso 2 ---------- */
V.cardArt=(c,k)=>{const d={A:{w:1,dist:10,lab:'1 m · 10 m'},B:{w:3,dist:40,lab:'3 m · 40 m'},C:{w:0,dist:0,lab:'Ataque frontal'}}[k];
 const edge=22,x=edge+d.dist*1.6,w=Math.max(4,d.w*5);
 return `<svg class="card-art" viewBox="0 0 120 48" aria-hidden="true"><rect width="120" height="48" rx="6" fill="#e8e0c8"/>${Array.from({length:4},(_,i)=>`<path d="M${2+i*5} 40l3-14 3 14Z" fill="#35553e"/>`).join('')}<path class="art-heat" d="M${edge} 8 Q${edge+8} 24 ${edge} 40" stroke="#ff7a22" stroke-width="3" fill="none"/>${d.w?`<rect class="art-strip" x="${x}" y="6" width="${w}" height="36" fill="#b0894e"/><path d="M${edge} 45 H${x}" stroke="#5d4037" stroke-width="1"/><text x="${(edge+x)/2+2}" y="45" font-size="6" fill="#5d4037" text-anchor="middle">${d.dist} m</text>`:`<g class="art-strip">${person(edge+8,40,'#c8592f',.5)}</g>`}<text x="114" y="12" font-size="7" fill="#3b3a2e" text-anchor="end" font-weight="700">${d.lab}</text></svg>`};

/* ---------- Plantación vista desde arriba (slides 08 y 09) ---------- */
function plantation(state,choice){
 const dist=state==='ok'||choice==='B'?40:choice==='C'?0:10,w=state==='ok'||choice==='B'?3:1;
 const edge=260,x=edge+dist*5,sw=Math.max(8,w*14);
 const trees=Array.from({length:30},(_,i)=>`<circle cx="${30+(i%5)*44}" cy="${40+Math.floor(i/5)*70}" r="18" fill="${state==='ok'?'#2f4a2a':'#3a2a1a'}"/>`).join('');
 const fires=Array.from({length:6},(_,i)=>flame(60+(i%3)*70,120+Math.floor(i/3)*190,1.6,i)).join('');
 const radiation=state==='ok'?`<rect x="${edge}" y="0" width="${dist*5-10}" height="460" fill="url(#radg)" class="rad-fade"/>`:`<rect x="${edge}" y="0" width="540" height="460" fill="url(#radg2)" class="rad-wave"/>`;
 const rear=state==='ko'?Array.from({length:5},(_,i)=>flame(x+sw+60+i*60,200+(i%2)*120,1.1,i)).join(''):'';
 const crew=[0,1,2].map(i=>person(x+sw+30,170+i*60,'#c8592f',.9)).join('');
 return `<div class="scene-view plantation ${state}"><svg viewBox="0 0 800 460" role="img" aria-label="Vista superior: plantación en llamas, radiación térmica y faja de contención"><defs><linearGradient id="radg"><stop stop-color="#ff7a22" stop-opacity=".7"/><stop offset="1" stop-color="#ff7a22" stop-opacity="0"/></linearGradient><linearGradient id="radg2"><stop stop-color="#ff5a1a" stop-opacity=".85"/><stop offset=".7" stop-color="#ff7a22" stop-opacity=".55"/><stop offset="1" stop-color="#ff7a22" stop-opacity=".2"/></linearGradient></defs><rect width="800" height="460" fill="#8a8a5a"/><rect width="${edge}" height="460" fill="#2a2418"/>${trees}${fires}${radiation}<rect x="${x}" y="0" width="${sw}" height="460" fill="#b0894e"/><text x="${x+sw/2}" y="450" fill="#2a2418" font-size="13" text-anchor="middle" font-weight="700">FAJA ${w} m · ${dist} m</text>${crew}${rear}${state==='ok'?'<g class="bigcheck"><circle cx="640" cy="110" r="56" fill="#5e9d4a"/><path d="M610 112l22 22 40-46" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>':''}</svg>${tag('PLANTACIÓN PINO Y EUCALIPTO · VISTA SUPERIOR')}</div>`}

/* ---------- Ladera 50 % (slides 10, 12 y 13) ---------- */
function slope(state){
 const fireUp=state==='ok'?Array.from({length:12},(_,i)=>flame(160+i*45,380-i*26,1.6,i)).join(''):state==='ko'?Array.from({length:12},(_,i)=>flame(160+i*45,380-i*26,1.4,i)).join('')+Array.from({length:6},(_,i)=>flame(420+i*30,250-i*18,1.2,i+2)).join(''):Array.from({length:6},(_,i)=>flame(160+i*40,380-i*23,1.1,i)).join('');
 const crew=state==='ok'?'<path d="M470 250 Q560 300 700 400" stroke="#9fe27a" stroke-width="7" stroke-dasharray="14 10" fill="none" class="route"/><path d="M690 395l18 8-14 12" fill="#9fe27a"/><rect x="640" y="395" width="150" height="55" rx="8" fill="#3f8f3a55" stroke="#9fe27a" stroke-width="3"/><text x="715" y="440" fill="#eaffd9" font-size="12" text-anchor="middle" font-weight="700">ZONA DE SEGURIDAD</text><text x="560" y="285" fill="#d9ffc4" font-size="12" transform="rotate(30 560 285)">RUTA DE ESCAPE</text>'+[0,1,2,3,4].map(i=>person(660+i*24,420,'#c8592f',.75)).join(''):[0,1,2,3,4].map(i=>person(440+i*22,262-i*12,'#c8592f',.75)).join('');
 const torch=state==='ok'?'<rect class="torching" x="140" y="40" width="440" height="360" fill="#ff7a22" opacity="0"/>':'';
 return `<div class="scene-view steep ${state}"><svg viewBox="0 0 800 460" role="img" aria-label="Ladera escarpada con 50 % de inclinación y fuego avanzando cuesta arriba"><defs><linearGradient id="ssky" x2="0" y2="1"><stop stop-color="${state==='ko'?'#3a1a14':'#6e4a32'}"/><stop offset="1" stop-color="#b48a5a"/></linearGradient></defs><rect width="800" height="460" fill="url(#ssky)"/><path d="M0 460 L0 420 L640 40 L800 40 V460Z" fill="#5a4a30"/>${Array.from({length:18},(_,i)=>`<path d="M${40+i*34} ${410-i*21}l8-34 8 34Z" fill="#3b3524"/>`).join('')}<path class="smk" d="M300 300 q-40 -150 40 -300" stroke="#2a2420" stroke-width="90" fill="none" opacity=".45"/>${fireUp}${torch}${crew}${state==='ko'?'<rect width="800" height="460" fill="#3a0a0a" opacity=".35" class="static"/>':''}</svg>${tag('LADERA 50 % · 35 °C · VIENTO 35 KM/H')}${state==='ko'?'<div class="mayday">¡ALERTA MAYDAY!</div>':''}</div>`}

/* ---------- Escenas ---------- */
V.scene=(c,ctx)=>{const {a2,ch,dnd,cards,m}=ctx;
 if(c.type==='intro'){const smoke='<rect width="800" height="460" fill="#4a3a30" opacity=".35"/><path class="smk" d="M560 300 q-30 -140 30 -300" stroke="#5a5045" stroke-width="90" fill="none" opacity=".5"/>'+[0,1,2].map(i=>flame(520+i*40,300,1,i)).join('');
  return `<div class="visual-wrap pov">${forest('PUESTO DE MANDO · LADERA FORESTAL').replace('</svg>',smoke+'</svg>')}<div class="hud-panel glass"><small>MÓDULO 2 - FACTORES E INFLUENCIAS EN EL COMPORTAMIENTO DEL FUEGO</small><b>${c.hud}</b></div></div>`}
 if(c.type==='context'){
  if(c.case===1)return `<div class="scene-view holo">${tetra('context')}${tag('MAPA TÁCTICO · DIAGRAMA SUPERPUESTO')}</div>`;
  if(c.case===2){const front=Array.from({length:7},(_,i)=>flame(470+i*45,300,2,i)).join('');return `<div class="visual-wrap">${forest('PLANTACIÓN PINO RADIATA Y EUCALIPTO').replace('</svg>',front+'</svg>')}<div class="telemetry">${c.alert}</div></div>`}
  return `<div class="visual-wrap"><div class="mayday-band">${c.alert}</div>${slope('context')}<div class="triad">${c.triad.map((t,i)=>`<span style="--d:${i*.3}s">${['🔥','🌬','⛰'][i]} ${t}</span>`).join('<b>+</b>')}</div></div>`}
 if(c.type==='ok'){
  if(c.case===1)return `<div class="visual-wrap ok-glow">${dnd(ctx.byId(3),'ok')}</div>`;
  if(c.case===2)return plantation('ok');
  return slope('ok')}
 if(c.type==='ko'){
  if(c.case===1)return `<div class="visual-wrap ${a2?'':'red'}">${dnd(m,a2?'solved':'review-ko')}</div>`;
  if(c.case===2)return a2?`<div class="visual-wrap">${cards(m,'B',true)}</div>`:`<div class="visual-wrap red flash">${plantation('ko',ch)}</div>`;
  return a2?`<div class="visual-wrap">${cards(m,'B',true)}</div>`:`<div class="visual-wrap red">${slope('ko')}${ch==='T'?'<p class="timeout">TIEMPO AGOTADO</p>':''}</div>`}
 return ''};
})();
