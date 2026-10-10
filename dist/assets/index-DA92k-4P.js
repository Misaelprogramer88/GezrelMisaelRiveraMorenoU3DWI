(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function l(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=l(r);fetch(r.href,s)}})();var ne={};(function a(o,l,n,r){var s=!!(o.Worker&&o.Blob&&o.Promise&&o.OffscreenCanvas&&o.OffscreenCanvasRenderingContext2D&&o.HTMLCanvasElement&&o.HTMLCanvasElement.prototype.transferControlToOffscreen&&o.URL&&o.URL.createObjectURL),c=typeof Path2D=="function"&&typeof DOMMatrix=="function",d=function(){if(!o.OffscreenCanvas)return!1;try{var t=new OffscreenCanvas(1,1),e=t.getContext("2d");e.fillRect(0,0,1,1);var u=t.transferToImageBitmap();e.createPattern(u,"no-repeat")}catch{return!1}return!0}();function f(){}function i(t){var e=l.exports.Promise,u=e!==void 0?e:o.Promise;return typeof u=="function"?new u(t):(t(f,f),null)}var E=function(t,e){return{transform:function(u){if(t)return u;if(e.has(u))return e.get(u);var m=new OffscreenCanvas(u.width,u.height),h=m.getContext("2d");return h.drawImage(u,0,0),e.set(u,m),m},clear:function(){e.clear()}}}(d,new Map),B=function(){var t=Math.floor(16.666666666666668),e,u,m={},h=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(g){var v=Math.random();return m[v]=requestAnimationFrame(function p(y){h===y||h+t-1<y?(h=y,delete m[v],g()):m[v]=requestAnimationFrame(p)}),v},u=function(g){m[g]&&cancelAnimationFrame(m[g])}):(e=function(g){return setTimeout(g,t)},u=function(g){return clearTimeout(g)}),{frame:e,cancel:u}}(),x=function(){var t,e,u={};function m(h){function g(v,p){h.postMessage({options:v||{},callback:p})}h.init=function(p){var y=p.transferControlToOffscreen();h.postMessage({canvas:y},[y])},h.fire=function(p,y,I){if(e)return g(p,null),e;var M=Math.random().toString(36).slice(2);return e=i(function($){function _(P){P.data.callback===M&&(delete u[M],h.removeEventListener("message",_),e=null,E.clear(),I(),$())}h.addEventListener("message",_),g(p,M),u[M]=_.bind(null,{data:{callback:M}})}),e},h.reset=function(){h.postMessage({reset:!0});for(var p in u)u[p](),delete u[p]}}return function(){if(t)return t;if(!n&&s){var h=["var CONFETTI, SIZE = {}, module = {};","("+a.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{t=new Worker(URL.createObjectURL(new Blob([h])))}catch(g){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",g),null}m(t)}return t}}(),A={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function C(t,e){return e?e(t):t}function L(t){return t!=null}function b(t,e,u){return C(t&&L(t[e])?t[e]:A[e],u)}function j(t){return t<0?0:Math.floor(t)}function T(t,e){return Math.floor(Math.random()*(e-t))+t}function q(t){return parseInt(t,16)}function G(t){return t.map(O)}function O(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:q(e.substring(0,2)),g:q(e.substring(2,4)),b:q(e.substring(4,6))}}function D(t){var e=b(t,"origin",Object);return e.x=b(e,"x",Number),e.y=b(e,"y",Number),e}function U(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function X(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function oe(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}function Q(t,e,u,m,h,g,v,p,y){t.save(),t.translate(e,u),t.rotate(g),t.scale(m,h),t.arc(0,0,1,v,p,y),t.restore()}function ve(t){var e=t.angle*(Math.PI/180),u=t.spread*(Math.PI/180);return{x:t.x,y:t.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:t.startVelocity*.5+Math.random()*t.startVelocity,angle2D:-e+(.5*u-Math.random()*u),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:t.color,shape:t.shape,tick:0,totalTicks:t.ticks,decay:t.decay,drift:t.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:t.gravity*3,ovalScalar:.6,scalar:t.scalar,flat:t.flat}}function ye(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var u=e.tick++/e.totalTicks,m=e.x+e.random*e.tiltCos,h=e.y+e.random*e.tiltSin,g=e.wobbleX+e.random*e.tiltCos,v=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-u)+")",t.beginPath(),c&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))t.fill(Ee(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(g-m)*.1,Math.abs(v-h)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var p=Math.PI/10*e.wobble,y=Math.abs(g-m)*.1,I=Math.abs(v-h)*.1,M=e.shape.bitmap.width*e.scalar,$=e.shape.bitmap.height*e.scalar,_=new DOMMatrix([Math.cos(p)*y,Math.sin(p)*y,-Math.sin(p)*I,Math.cos(p)*I,e.x,e.y]);_.multiplySelf(new DOMMatrix(e.shape.matrix));var P=t.createPattern(E.transform(e.shape.bitmap),"no-repeat");P.setTransform(_),t.globalAlpha=1-u,t.fillStyle=P,t.fillRect(e.x-M/2,e.y-$/2,M,$),t.globalAlpha=1}else if(e.shape==="circle")t.ellipse?t.ellipse(e.x,e.y,Math.abs(g-m)*e.ovalScalar,Math.abs(v-h)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):Q(t,e.x,e.y,Math.abs(g-m)*e.ovalScalar,Math.abs(v-h)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var w=Math.PI/2*3,k=4*e.scalar,R=8*e.scalar,N=e.x,H=e.y,z=5,F=Math.PI/z;z--;)N=e.x+Math.cos(w)*R,H=e.y+Math.sin(w)*R,t.lineTo(N,H),w+=F,N=e.x+Math.cos(w)*k,H=e.y+Math.sin(w)*k,t.lineTo(N,H),w+=F;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(h)),t.lineTo(Math.floor(g),Math.floor(v)),t.lineTo(Math.floor(m),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}function be(t,e,u,m,h){var g=e.slice(),v=t.getContext("2d"),p,y,I=i(function(M){function $(){p=y=null,v.clearRect(0,0,m.width,m.height),E.clear(),h(),M()}function _(){n&&!(m.width===r.width&&m.height===r.height)&&(m.width=t.width=r.width,m.height=t.height=r.height),!m.width&&!m.height&&(u(t),m.width=t.width,m.height=t.height),v.clearRect(0,0,m.width,m.height),g=g.filter(function(P){return ye(v,P)}),g.length?p=B.frame(_):$()}p=B.frame(_),y=$});return{addFettis:function(M){return g=g.concat(M),I},canvas:t,promise:I,reset:function(){p&&B.cancel(p),y&&y()}}}function re(t,e){var u=!t,m=!!b(e||{},"resize"),h=!1,g=b(e,"disableForReducedMotion",Boolean),v=s&&!!b(e||{},"useWorker"),p=v?x():null,y=u?U:X,I=t&&p?!!t.__confetti_initialized:!1,M=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,$;function _(w,k,R){for(var N=b(w,"particleCount",j),H=b(w,"angle",Number),z=b(w,"spread",Number),F=b(w,"startVelocity",Number),$e=b(w,"decay",Number),Me=b(w,"gravity",Number),_e=b(w,"drift",Number),ie=b(w,"colors",G),qe=b(w,"ticks",Number),le=b(w,"shapes"),Be=b(w,"scalar"),Pe=!!b(w,"flat"),ce=D(w),de=N,ee=[],xe=t.width*ce.x,Ce=t.height*ce.y;de--;)ee.push(ve({x:xe,y:Ce,angle:H,spread:z,startVelocity:F,color:ie[de%ie.length],shape:le[T(0,le.length)],ticks:qe,decay:$e,gravity:Me,drift:_e,scalar:Be,flat:Pe}));return $?$.addFettis(ee):($=be(t,ee,y,k,R),$.promise)}function P(w){var k=g||b(w,"disableForReducedMotion",Boolean),R=b(w,"zIndex",Number);if(k&&M)return i(function(F){F()});u&&$?t=$.canvas:u&&!t&&(t=oe(R),document.body.appendChild(t)),m&&!I&&y(t);var N={width:t.width,height:t.height};p&&!I&&p.init(t),I=!0,p&&(t.__confetti_initialized=!0);function H(){if(p){var F={getBoundingClientRect:function(){if(!u)return t.getBoundingClientRect()}};y(F),p.postMessage({resize:{width:F.width,height:F.height}});return}N.width=N.height=null}function z(){$=null,m&&(h=!1,o.removeEventListener("resize",H)),u&&t&&(document.body.contains(t)&&document.body.removeChild(t),t=null,I=!1)}return m&&!h&&(h=!0,o.addEventListener("resize",H,!1)),p?p.fire(w,N,z):_(w,N,z)}return P.reset=function(){p&&p.reset(),$&&$.reset()},P}var Y;function se(){return Y||(Y=re(null,{useWorker:!0,resize:!0})),Y}function Ee(t,e,u,m,h,g,v){var p=new Path2D(t),y=new Path2D;y.addPath(p,new DOMMatrix(e));var I=new Path2D;return I.addPath(y,new DOMMatrix([Math.cos(v)*h,Math.sin(v)*h,-Math.sin(v)*g,Math.cos(v)*g,u,m])),I}function we(t){if(!c)throw new Error("path confetti are not supported in this browser");var e,u;typeof t=="string"?e=t:(e=t.path,u=t.matrix);var m=new Path2D(e),h=document.createElement("canvas"),g=h.getContext("2d");if(!u){for(var v=1e3,p=v,y=v,I=0,M=0,$,_,P=0;P<v;P+=2)for(var w=0;w<v;w+=2)g.isPointInPath(m,P,w,"nonzero")&&(p=Math.min(p,P),y=Math.min(y,w),I=Math.max(I,P),M=Math.max(M,w));$=I-p,_=M-y;var k=10,R=Math.min(k/$,k/_);u=[R,0,0,R,-Math.round($/2+p)*R,-Math.round(_/2+y)*R]}return{type:"path",path:e,matrix:u}}function Ie(t){var e,u=1,m="#000000",h='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof t=="string"?e=t:(e=t.text,u="scalar"in t?t.scalar:u,h="fontFamily"in t?t.fontFamily:h,m="color"in t?t.color:m);var g=10*u,v=""+g+"px "+h,p=new OffscreenCanvas(g,g),y=p.getContext("2d");y.font=v;var I=y.measureText(e),M=Math.ceil(I.actualBoundingBoxRight+I.actualBoundingBoxLeft),$=Math.ceil(I.actualBoundingBoxAscent+I.actualBoundingBoxDescent),_=2,P=I.actualBoundingBoxLeft+_,w=I.actualBoundingBoxAscent+_;M+=_+_,$+=_+_,p=new OffscreenCanvas(M,$),y=p.getContext("2d"),y.font=v,y.fillStyle=m,y.fillText(e,P,w);var k=1/u;return{type:"bitmap",bitmap:p.transferToImageBitmap(),matrix:[k,0,0,k,-M*k/2,-$*k/2]}}l.exports=function(){return se().apply(this,arguments)},l.exports.reset=function(){se().reset()},l.exports.create=re,l.exports.shapeFromPath=we,l.exports.shapeFromText=Ie})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ne,!1);const Le=ne.exports;ne.exports.create;const ke="/api",Se="http://localhost/GezrelMisaelRiveraMorenoU2/api";async function S(a,o={}){const l=`${ke}/${a}`,r={...o,headers:{...{"Content-Type":"application/json"},...o.headers}};try{const s=await fetch(l,r);if(!s.ok){const c=await s.json().catch(()=>({}));throw new Error(c.message||`Error HTTP: ${s.status}`)}return await s.json()}catch(s){try{const c=`${Se}/${a}`,d=await fetch(c,r);if(!d.ok){const f=await d.json().catch(()=>({}));throw new Error(f.message||`Error HTTP: ${d.status}`)}return await d.json()}catch(c){throw console.error("Error de comunicación API:",c),s}}}function Ae(a,o){const l=document.getElementById("bracket-container");if(!a||Object.keys(a).length===0){l.innerHTML=`
      <div class="bracket-empty">
        <div class="empty-icon-wrap">
          <span class="empty-icon">⚽</span>
          <span class="empty-glow"></span>
        </div>
        <h3>El torneo aún no ha comenzado</h3>
        <p>Presiona el botón <strong>"Generar Sorteo y Bracket"</strong> para armar los emparejamientos oficiales y dar inicio al campeonato.</p>
      </div>
    `;return}const n=Object.keys(a).sort((c,d)=>{const f={"Cuartos de Final":1,Semifinal:2,"Gran Final":3};return(f[c]||99)-(f[d]||99)});let r='<div class="bracket-tree">';n.forEach(c=>{const d=a[c],f=c==="Gran Final";r+=`
      <div class="bracket-round ${f?"round-grand-final":""}">
        <div class="round-title-badge">
          <span class="round-icon">${f?"🏆":"⚽"}</span>
          <span class="round-title">${c}</span>
        </div>
    `,d.forEach(i=>{const E=i.estado==="jugado",B=E&&i.ganador_id==i.equipo1_id&&i.equipo1_id,x=E&&i.ganador_id==i.equipo2_id&&i.equipo2_id,A=i.equipo1_nombre||"Por Definir",C=i.equipo2_nombre||"Por Definir",L=i.equipo1_color||"#475569",b=i.equipo2_color||"#475569",j=E?i.goles_equipo1:"-",T=E?i.goles_equipo2:"-",q=E&&i.penales_equipo1!==null&&i.penales_equipo2!==null;r+=`
        <div class="bracket-match-card ${f?"is-final":""} ${E?"card-played":"card-pending"}" data-match-id="${i.id}" title="Haz clic para registrar o ver el marcador">
          ${f?'<div class="final-trophy-watermark">🏆</div>':""}
          <div class="match-header-bar">
            <span class="match-number-tag">PARTIDO #${i.id}</span>
            <span class="status-pill ${E?"status-played":"status-pending"}">
              ${E?"✅ FINALIZADO":"⏳ POR JUGAR"}
            </span>
          </div>

          <div class="match-team-row ${B?"winner":""}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${L}; box-shadow: 0 0 8px ${L}66;">
                <span class="team-dot" style="background-color: ${L};"></span>
              </span>
              <span class="team-title-text ${i.equipo1_id?"":"tbd"}">${A}</span>
            </div>
            <div class="score-wrapper">
              ${B?'<span class="winner-icon">⚽</span>':""}
              <span class="score-badge ${B?"winner-score":""}">${j}</span>
            </div>
          </div>

          <div class="match-team-row ${x?"winner":""}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${b}; box-shadow: 0 0 8px ${b}66;">
                <span class="team-dot" style="background-color: ${b};"></span>
              </span>
              <span class="team-title-text ${i.equipo2_id?"":"tbd"}">${C}</span>
            </div>
            <div class="score-wrapper">
              ${x?'<span class="winner-icon">⚽</span>':""}
              <span class="score-badge ${x?"winner-score":""}">${T}</span>
            </div>
          </div>

          ${q?`
            <div class="penalties-note">
              🎯 Penales: <strong>${i.penales_equipo1} - ${i.penales_equipo2}</strong>
            </div>
          `:""}

          <div class="bracket-card-hover-cue">
            <span>${E?"✏️ Ver / Editar Marcador":"⚡ Cargar Marcador"}</span>
          </div>
        </div>
      `}),r+="</div>"}),r+="</div>",l.innerHTML=r,l.querySelectorAll(".bracket-match-card").forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-match-id");o&&d&&o(d)})})}let W=null,me=[],he=[];function ge(a,o="all",l){const n=document.getElementById("matches-list-container");if(!a||Object.keys(a).length===0){n.innerHTML=`
      <div class="glass-panel text-center padding-2">
        <p class="text-muted">No hay partidos programados en este momento.</p>
      </div>
    `;return}let r="";Object.keys(a).sort((d,f)=>{const i={"Cuartos de Final":1,Semifinal:2,"Gran Final":3};return(i[d]||99)-(i[f]||99)}).forEach(d=>{let f=a[d];o==="pendiente"?f=f.filter(i=>i.estado==="pendiente"):o==="jugado"&&(f=f.filter(i=>i.estado==="jugado")),f.length!==0&&(r+=`
      <div class="round-group">
        <h3 class="round-group-title">🏆 ${d}</h3>
        <div class="matches-cards-grid">
    `,f.forEach(i=>{const E=i.estado==="jugado",B=E&&i.ganador_id==i.equipo1_id&&i.equipo1_id,x=E&&i.ganador_id==i.equipo2_id&&i.equipo2_id,A=i.equipo1_nombre||"Por Definir",C=i.equipo2_nombre||"Por Definir",L=i.equipo1_color||"#475569",b=i.equipo2_color||"#475569",j=E?i.goles_equipo1:"-",T=E?i.goles_equipo2:"-",q=E&&i.penales_equipo1!==null&&i.penales_equipo2!==null;r+=`
        <div class="bracket-match-card match-fixture-card ${E?"card-played":"card-pending"}" data-match-id="${i.id}">
          <div class="match-header-bar">
            <span class="match-number-tag">PARTIDO #${i.id} • ${d}</span>
            <span class="status-pill ${E?"status-played":"status-pending"}">
              ${E?"✅ FINALIZADO":"⏳ POR JUGAR"}
            </span>
          </div>

          <div class="match-team-row ${B?"winner":""}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${L}; box-shadow: 0 0 8px ${L}66;">
                <span class="team-dot" style="background-color: ${L}"></span>
              </span>
              <span class="team-title-text">${A}</span>
            </div>
            <div class="score-wrapper">
              ${B?'<span class="winner-icon">⚽</span>':""}
              <span class="score-badge ${B?"winner-score":""}">${j}</span>
            </div>
          </div>

          <div class="match-team-row ${x?"winner":""}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${b}; box-shadow: 0 0 8px ${b}66;">
                <span class="team-dot" style="background-color: ${b}"></span>
              </span>
              <span class="team-title-text">${C}</span>
            </div>
            <div class="score-wrapper">
              ${x?'<span class="winner-icon">⚽</span>':""}
              <span class="score-badge ${x?"winner-score":""}">${T}</span>
            </div>
          </div>

          ${q?`
            <div class="penalties-note">
              🎯 Penales: <strong>${i.penales_equipo1} - ${i.penales_equipo2}</strong>
            </div>
          `:""}

          <div class="fixture-card-footer">
            <button class="btn btn-sm ${E?"btn-outline":"btn-emerald"} btn-sporty w-full">
              ${E?"✏️ Ver / Modificar Marcador Oficial":"⚽ Registrar Marcador y Goleadores"}
            </button>
          </div>
        </div>
      `}),r+=`
        </div>
      </div>
    `)}),r||(r='<div class="glass-panel text-center" style="padding:2rem;"><p class="text-muted">No se encontraron partidos para el filtro seleccionado.</p></div>'),n.innerHTML=r,n.querySelectorAll(".bracket-match-card").forEach(d=>{d.addEventListener("click",()=>{const f=d.getAttribute("data-match-id");l&&f&&l(f)})})}function Te(a){const o=document.getElementById("modal-match"),l=document.getElementById("btn-close-match-modal"),n=document.getElementById("btn-cancel-match-modal"),r=document.getElementById("form-match-result"),s=document.getElementById("m-team1-goals"),c=document.getElementById("m-team2-goals"),d=document.getElementById("penalties-box"),f=document.getElementById("btn-add-scorer-row"),i=()=>o.classList.add("hidden");l.addEventListener("click",i),n.addEventListener("click",i);const E=()=>{const B=parseInt(s.value||"0",10),x=parseInt(c.value||"0",10);B===x?d.classList.remove("hidden"):d.classList.add("hidden")};s.addEventListener("input",E),c.addEventListener("input",E),f.addEventListener("click",()=>{fe()}),r.addEventListener("submit",async B=>{B.preventDefault();const x=document.getElementById("match-id").value,A=parseInt(s.value||"0",10),C=parseInt(c.value||"0",10),L=document.getElementById("m-team1-penalties").value,b=document.getElementById("m-team2-penalties").value,j=A===C&&L!==""?parseInt(L,10):null,T=A===C&&b!==""?parseInt(b,10):null,q=[];document.querySelectorAll(".scorer-row").forEach(O=>{const D=O.querySelector(".select-jugador"),U=O.querySelector(".input-minuto"),X=O.querySelector(".select-tipo");if(D&&D.value){const Q=D.options[D.selectedIndex].getAttribute("data-equipo-id");q.push({jugador_id:parseInt(D.value,10),equipo_id:parseInt(Q,10),minuto:parseInt(U.value||"0",10),tipo:X.value})}});try{const O=await S("partidos.php",{method:"POST",body:JSON.stringify({action:"guardar_resultado",partido_id:parseInt(x,10),goles_equipo1:A,goles_equipo2:C,penales_equipo1:j,penales_equipo2:T,goleadores:q})});O.status==="success"&&(i(),a&&a(O))}catch(O){alert("Error: "+O.message)}})}async function te(a){const o=document.getElementById("modal-match");try{const l=await S(`partidos.php?id=${a}`);if(l.status!=="success")return;W=l.data;const n=W;if(!n.equipo1_id||!n.equipo2_id){alert("No se puede cargar resultado de este partido hasta que estén definidos ambos equipos.");return}document.getElementById("match-id").value=n.id,document.getElementById("modal-match-title").textContent=`Partido #${n.id} - ${n.fase_nombre}`,document.getElementById("m-team1-name").textContent=n.equipo1_nombre,document.getElementById("m-team2-name").textContent=n.equipo2_nombre,document.getElementById("m-team1-badge").style.color=n.equipo1_color||"#00ff87",document.getElementById("m-team2-badge").style.color=n.equipo2_color||"#00d2ff",document.getElementById("m-team1-goals").value=n.goles_equipo1!==null?n.goles_equipo1:0,document.getElementById("m-team2-goals").value=n.goles_equipo2!==null?n.goles_equipo2:0,document.getElementById("m-team1-penalties").value=n.penales_equipo1!==null?n.penales_equipo1:"",document.getElementById("m-team2-penalties").value=n.penales_equipo2!==null?n.penales_equipo2:"",document.getElementById("lbl-penal1").textContent=`Penales ${n.equipo1_nombre}`,document.getElementById("lbl-penal2").textContent=`Penales ${n.equipo2_nombre}`;const r=await S(`jugadores.php?equipo_id=${n.equipo1_id}`),s=await S(`jugadores.php?equipo_id=${n.equipo2_id}`);me=r.data||[],he=s.data||[];const c=document.getElementById("scorers-list");c.innerHTML="",n.goles_registrados&&n.goles_registrados.length>0&&n.goles_registrados.forEach(i=>{fe(i.jugador_id,i.minuto,i.tipo)});const d=parseInt(document.getElementById("m-team1-goals").value,10),f=parseInt(document.getElementById("m-team2-goals").value,10);d===f?document.getElementById("penalties-box").classList.remove("hidden"):document.getElementById("penalties-box").classList.add("hidden"),o.classList.remove("hidden")}catch(l){alert("Error al abrir el partido: "+l.message)}}function fe(a=null,o=0,l="normal"){const n=document.getElementById("scorers-list");let r='<option value="">-- Seleccionar Jugador --</option>';W&&(r+=`<optgroup label="${W.equipo1_nombre}">`,me.forEach(c=>{const d=a==c.id?"selected":"";r+=`<option value="${c.id}" data-equipo-id="${W.equipo1_id}" ${d}>#${c.numero} ${c.nombre}</option>`}),r+="</optgroup>",r+=`<optgroup label="${W.equipo2_nombre}">`,he.forEach(c=>{const d=a==c.id?"selected":"";r+=`<option value="${c.id}" data-equipo-id="${W.equipo2_id}" ${d}>#${c.numero} ${c.nombre}</option>`}),r+="</optgroup>");const s=document.createElement("div");s.className="scorer-row",s.innerHTML=`
    <select class="form-input select-jugador">${r}</select>
    <input type="number" class="form-input input-minuto" min="1" max="120" placeholder="Min" value="${o||""}" />
    <select class="form-input select-tipo">
      <option value="normal" ${l==="normal"?"selected":""}>Gol Normal</option>
      <option value="penal" ${l==="penal"?"selected":""}>Penal</option>
      <option value="autogol" ${l==="autogol"?"selected":""}>Autogol</option>
    </select>
    <button type="button" class="btn-remove-row">&times;</button>
  `,s.querySelector(".btn-remove-row").addEventListener("click",()=>{s.remove()}),n.appendChild(s)}async function Z(a){const o=document.getElementById("teams-grid-container");try{const l=await S("equipos.php");if(l.status!=="success")return;const n=l.data||[];if(n.length===0){o.innerHTML=`
        <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <h3>No hay equipos registrados</h3>
          <p class="text-muted">Presiona el botón "Registrar Nuevo Equipo" para agregar clubes al torneo.</p>
        </div>
      `;return}let r="";n.forEach(s=>{const c=s.jugadores||[];r+=`
        <div class="team-card sporty-club-card" data-team-id="${s.id}">
          <div class="team-card-top-stripe" style="background: linear-gradient(90deg, ${s.color_hex}, ${s.color_hex}44, transparent);"></div>
          <div class="team-card-header">
            <div class="team-card-title">
              <div class="team-icon-circle" style="background-color: ${s.color_hex}; border-color: ${s.color_hex}; box-shadow: 0 0 12px ${s.color_hex}55;">
                <span>🛡️</span>
              </div>
              <div>
                <h3 class="club-title">${s.nombre}</h3>
                <span class="club-roster-count">🛡️ ${c.length} futbolistas inscritos</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-delete-team" data-team-id="${s.id}" title="Eliminar Club">🗑️</button>
          </div>

          <div class="player-list-scroll">
            ${c.length===0?'<p class="empty-roster-msg">Sin futbolistas registrados en la plantilla</p>':""}
            ${c.map(d=>{const f={Delantero:'<span class="pos-badge pos-del">⚡ DEL</span>',Medio:'<span class="pos-badge pos-med">⚙️ MED</span>',Defensa:'<span class="pos-badge pos-def">🛡️ DEF</span>',Portero:'<span class="pos-badge pos-por">🧤 POR</span>'}[d.posicion]||`<span class="pos-badge">${d.posicion}</span>`;return`
                <div class="player-item-row">
                  <div class="player-name-col">
                    <span class="player-dorsal">#${d.numero}</span>
                    <strong class="player-name-text">${d.nombre}</strong>
                  </div>
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${f}
                    <button class="btn-remove-row btn-delete-player" data-player-id="${d.id}" title="Baja de jugador">&times;</button>
                  </div>
                </div>
              `}).join("")}
          </div>

          <div class="team-card-footer">
            <button class="btn btn-sm btn-outline-emerald btn-sporty btn-add-player w-full" data-team-id="${s.id}" data-team-name="${s.nombre}">
              ➕ Inscribir Futbolista
            </button>
          </div>
        </div>
      `}),o.innerHTML=r,o.querySelectorAll(".btn-delete-team").forEach(s=>{s.addEventListener("click",async c=>{c.stopPropagation();const d=s.getAttribute("data-team-id");confirm("¿Estás seguro de eliminar este equipo?")&&(await S(`equipos.php?id=${d}`,{method:"DELETE"}),Z(a),a&&a())})}),o.querySelectorAll(".btn-delete-player").forEach(s=>{s.addEventListener("click",async c=>{c.stopPropagation();const d=s.getAttribute("data-player-id");confirm("¿Eliminar jugador?")&&(await S(`jugadores.php?id=${d}`,{method:"DELETE"}),Z(a),a&&a())})}),o.querySelectorAll(".btn-add-player").forEach(s=>{s.addEventListener("click",()=>{const c=s.getAttribute("data-team-id"),d=s.getAttribute("data-team-name");je(c,d,()=>{Z(a),a&&a()})})})}catch(l){console.error("Error al cargar equipos:",l)}}function Oe(a){const o=document.getElementById("modal-team"),l=document.getElementById("btn-open-add-team"),n=document.getElementById("btn-close-team-modal"),r=document.getElementById("btn-cancel-team-modal"),s=document.getElementById("form-add-team"),c=document.getElementById("initial-players-container"),d=document.getElementById("btn-add-player-row");l.addEventListener("click",()=>{c.innerHTML="";for(let C=0;C<3;C++)ue();o.classList.remove("hidden")});const f=()=>o.classList.add("hidden");n.addEventListener("click",f),r.addEventListener("click",f),d.addEventListener("click",()=>{ue()}),s.addEventListener("submit",async C=>{C.preventDefault();const L=document.getElementById("t-nombre").value.trim(),b=document.getElementById("t-color").value,j=document.getElementById("t-escudo").value,T=[];c.querySelectorAll(".initial-player-row").forEach(q=>{const G=q.querySelector(".p-name").value.trim(),O=parseInt(q.querySelector(".p-num").value||"0",10),D=q.querySelector(".p-pos").value;G&&T.push({nombre:G,numero:O,posicion:D})});try{(await S("equipos.php",{method:"POST",body:JSON.stringify({nombre:L,color_hex:b,escudo_icon:j,jugadores:T})})).status==="success"&&(f(),s.reset(),Z(a),a&&a())}catch(q){alert("Error al guardar equipo: "+q.message)}});const i=document.getElementById("modal-player"),E=document.getElementById("btn-close-player-modal"),B=document.getElementById("btn-cancel-player-modal"),x=document.getElementById("form-add-single-player"),A=()=>i.classList.add("hidden");E.addEventListener("click",A),B.addEventListener("click",A),x.addEventListener("submit",async C=>{C.preventDefault();const L=parseInt(document.getElementById("p-team-id").value,10),b=document.getElementById("p-nombre").value.trim(),j=parseInt(document.getElementById("p-numero").value||"10",10),T=document.getElementById("p-posicion").value;try{(await S("jugadores.php",{method:"POST",body:JSON.stringify({equipo_id:L,nombre:b,numero:j,posicion:T})})).status==="success"&&(A(),x.reset(),window._onPlayerAddedCallback&&window._onPlayerAddedCallback())}catch(q){alert("Error al agregar jugador: "+q.message)}})}function ue(){const a=document.getElementById("initial-players-container"),o=document.createElement("div");o.className="initial-player-row form-row",o.style.marginBottom="0.5rem",o.innerHTML=`
    <input type="text" class="form-input p-name" placeholder="Nombre jugador" />
    <div style="display:flex; gap:0.5rem;">
      <input type="number" class="form-input p-num" placeholder="#" min="1" max="99" style="width:70px;" />
      <select class="form-input p-pos" style="flex:1;">
        <option value="Delantero">Delantero</option>
        <option value="Medio">Medio</option>
        <option value="Defensa">Defensa</option>
        <option value="Portero">Portero</option>
      </select>
    </div>
  `,a.appendChild(o)}function je(a,o,l){const n=document.getElementById("modal-player");document.getElementById("p-team-id").value=a,document.getElementById("modal-player-team-title").textContent=`Agregar Jugador a ${o}`,document.getElementById("p-nombre").value="",window._onPlayerAddedCallback=l,n.classList.remove("hidden")}async function Re(){const a=document.getElementById("pichichi-container");try{const o=await S("goleadores.php");if(o.status!=="success")return;const l=o.data||[];if(l.length===0){a.innerHTML=`
        <div class="text-center" style="padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚽</div>
          <h3>Aún no hay goles registrados</h3>
          <p class="text-muted">Conforme se jueguen los partidos y se anoten goles, aparecerá el ranking del Pichichi.</p>
        </div>
      `;return}const n=l[0]||null,r=l[1]||null,s=l[2]||null;let c="";n&&(c+='<div class="podium-container">',r&&(c+=`
          <div class="podium-card second">
            <div class="podium-rank-tag">#2 PLATA</div>
            <span class="podium-crown">🥈</span>
            <div class="podium-avatar-circle" style="border-color: ${r.equipo_color}; box-shadow: 0 0 12px ${r.equipo_color}66;">
              <span class="podium-dorsal">#${r.jugador_numero}</span>
            </div>
            <h4 class="podium-name">${r.jugador_nombre}</h4>
            <span class="podium-team" style="color: ${r.equipo_color};">${r.equipo_nombre}</span>
            <span class="podium-goals">${r.total_goles} ⚽</span>
          </div>
        `),c+=`
        <div class="podium-card first">
          <div class="podium-rank-tag gold-tag">👑 #1 BOTA DE ORO</div>
          <span class="podium-crown">🥇</span>
          <div class="podium-avatar-circle gold-circle" style="border-color: #ffb703; box-shadow: 0 0 20px rgba(255, 183, 3, 0.6);">
            <span class="podium-dorsal">#${n.jugador_numero}</span>
          </div>
          <h4 class="podium-name">${n.jugador_nombre}</h4>
          <span class="podium-team" style="color: ${n.equipo_color}; font-weight:700;">${n.equipo_nombre}</span>
          <span class="podium-goals gold-goals">${n.total_goles} ⚽</span>
        </div>
      `,s&&(c+=`
          <div class="podium-card third">
            <div class="podium-rank-tag">#3 BRONCE</div>
            <span class="podium-crown">🥉</span>
            <div class="podium-avatar-circle" style="border-color: ${s.equipo_color}; box-shadow: 0 0 12px ${s.equipo_color}66;">
              <span class="podium-dorsal">#${s.jugador_numero}</span>
            </div>
            <h4 class="podium-name">${s.jugador_nombre}</h4>
            <span class="podium-team" style="color: ${s.equipo_color};">${s.equipo_nombre}</span>
            <span class="podium-goals">${s.total_goles} ⚽</span>
          </div>
        `),c+="</div>"),c+=`
      <div class="table-responsive">
        <table class="leaderboard-table sporty-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Jugador</th>
              <th>Dorsal</th>
              <th>Club</th>
              <th>Demarcación</th>
              <th style="text-align: right;">Goles Totales</th>
            </tr>
          </thead>
          <tbody>
    `,l.forEach((d,f)=>{const i=f+1;let E=`<span class="rank-num">${i}</span>`;i===1?E='<span class="rank-medal gold">🥇 1</span>':i===2?E='<span class="rank-medal silver">🥈 2</span>':i===3&&(E='<span class="rank-medal bronze">🥉 3</span>');const B={Delantero:'<span class="pos-badge pos-del">⚡ DEL</span>',Medio:'<span class="pos-badge pos-med">⚙️ MED</span>',Defensa:'<span class="pos-badge pos-def">🛡️ DEF</span>',Portero:'<span class="pos-badge pos-por">🧤 POR</span>'}[d.jugador_posicion]||`<span class="pos-badge">${d.jugador_posicion}</span>`;c+=`
        <tr class="${i<=3?"top-scorer-row":""}">
          <td>${E}</td>
          <td><strong class="player-table-name">${d.jugador_nombre}</strong></td>
          <td><span class="player-dorsal">#${d.jugador_numero}</span></td>
          <td>
            <div class="team-cell-wrap">
              <span class="team-dot" style="background:${d.equipo_color}; box-shadow: 0 0 6px ${d.equipo_color};"></span>
              <span>${d.equipo_nombre}</span>
            </div>
          </td>
          <td>${B}</td>
          <td style="text-align: right;">
            <span class="goals-count-badge">⚽ <strong>${d.total_goles}</strong></span>
          </td>
        </tr>
      `}),c+=`
          </tbody>
        </table>
      </div>
    `,a.innerHTML=c}catch(o){console.error("Error al cargar la tabla de goleadores:",o)}}let K=null,pe="dashboard",ae="all";function Ne(){He(),ze(),Te(()=>{V("¡Resultado guardado y avance de bracket actualizado!"),J()}),Oe(()=>{V("¡Equipo/Jugador guardado con éxito!"),J()}),document.querySelectorAll(".btn-filter").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".btn-filter").forEach(o=>o.classList.remove("active")),a.classList.add("active"),ae=a.getAttribute("data-filter"),K&&K.bracket&&ge(K.bracket,ae,o=>te(o))})}),J()}async function J(){try{const a=await S("torneo.php");if(a.status!=="success")return;K=a,Fe(a.torneo,a.total_equipos),De(a),Ae(a.bracket,o=>te(o)),ge(a.bracket,ae,o=>te(o)),Z(()=>J()),Re(),a.torneo&&a.torneo.estado==="finalizado"&&a.torneo.campeon_nombre?We(a.torneo.campeon_nombre):Ve()}catch(a){console.error("Error al cargar datos del torneo:",a),V("Error al conectar con la API de PHP en XAMPP. Verifica que Apache y MySQL estén corriendo en XAMPP.",!0)}}function Fe(a,o){const l=document.getElementById("tournament-badge"),n=document.getElementById("tournament-status-text");a&&(l.className="badge",a.estado==="registro"?(l.classList.add("badge-registro"),n.textContent=`🟢 Registro Abierto (${o} Equipos)`):a.estado==="en_curso"?(l.classList.add("badge-en-curso"),n.textContent="⚡ Torneo En Curso (Eliminatoria Directa)"):a.estado==="finalizado"&&(l.classList.add("badge-finalizado"),n.textContent=`🏆 Torneo Finalizado - Campeón: ${a.campeon_nombre||""}`))}function De(a){document.getElementById("stat-equipos").textContent=a.total_equipos||0;let o=0,l=0;a.bracket&&Object.values(a.bracket).forEach(n=>{n.forEach(r=>{o++,r.estado==="jugado"&&l++})}),document.getElementById("stat-partidos").textContent=o,document.getElementById("stat-jugados").textContent=l,S("goleadores.php").then(n=>{if(n.data&&n.data.length>0){const r=n.data[0];document.getElementById("stat-pichichi").textContent=`${r.jugador_nombre} (${r.total_goles} ⚽)`}else document.getElementById("stat-pichichi").textContent="-"}).catch(()=>{})}function He(){const a=document.querySelectorAll(".nav-tab");a.forEach(o=>{o.addEventListener("click",()=>{a.forEach(n=>n.classList.remove("active")),o.classList.add("active"),pe=o.getAttribute("data-tab"),document.querySelectorAll(".tab-view").forEach(n=>n.classList.remove("active"));const l=document.getElementById(`view-${pe}`);l&&l.classList.add("active")})})}function ze(){const a=document.getElementById("btn-start-tournament"),o=document.getElementById("btn-draw-dash"),l=document.getElementById("btn-reset-tournament"),n=async()=>{if(confirm("¿Deseas realizar el sorteo aleatorio y generar las llaves del torneo?"))try{const r=await S("torneo.php",{method:"POST",body:JSON.stringify({action:"iniciar"})});r.status==="success"&&(V(r.message),document.querySelector('.nav-tab[data-tab="bracket"]').click(),J())}catch(r){V(r.message,!0)}};a.addEventListener("click",n),o.addEventListener("click",n),l.addEventListener("click",async()=>{if(confirm("⚠️ ¿Estás seguro de reiniciar el torneo? Se limpiarán los partidos y goles actuales."))try{(await S("torneo.php",{method:"POST",body:JSON.stringify({action:"reiniciar"})})).status==="success"&&(V("Torneo reiniciado correctamente"),J())}catch(r){V(r.message,!0)}})}function We(a){const o=document.getElementById("champion-banner"),l=document.getElementById("champion-name");l&&(l.textContent=a),o.classList.remove("hidden"),Le({particleCount:120,spread:80,origin:{y:.6}})}function Ve(){document.getElementById("champion-banner").classList.add("hidden")}function V(a,o=!1){const l=document.getElementById("toast-container"),n=document.createElement("div");n.className=`toast ${o?"toast-error":""}`,n.textContent=a,l.appendChild(n),setTimeout(()=>{n.remove()},4e3)}document.addEventListener("DOMContentLoaded",()=>{Ne()});
