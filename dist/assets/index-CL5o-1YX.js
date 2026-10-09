(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function l(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=l(r);fetch(r.href,i)}})();var ne={};(function a(n,l,o,r){var i=!!(n.Worker&&n.Blob&&n.Promise&&n.OffscreenCanvas&&n.OffscreenCanvasRenderingContext2D&&n.HTMLCanvasElement&&n.HTMLCanvasElement.prototype.transferControlToOffscreen&&n.URL&&n.URL.createObjectURL),c=typeof Path2D=="function"&&typeof DOMMatrix=="function",u=function(){if(!n.OffscreenCanvas)return!1;try{var t=new OffscreenCanvas(1,1),e=t.getContext("2d");e.fillRect(0,0,1,1);var d=t.transferToImageBitmap();e.createPattern(d,"no-repeat")}catch{return!1}return!0}();function E(){}function s(t){var e=l.exports.Promise,d=e!==void 0?e:n.Promise;return typeof d=="function"?new d(t):(t(E,E),null)}var w=function(t,e){return{transform:function(d){if(t)return d;if(e.has(d))return e.get(d);var p=new OffscreenCanvas(d.width,d.height),h=p.getContext("2d");return h.drawImage(d,0,0),e.set(d,p),p},clear:function(){e.clear()}}}(u,new Map),x=function(){var t=Math.floor(16.666666666666668),e,d,p={},h=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(g){var f=Math.random();return p[f]=requestAnimationFrame(function m(v){h===v||h+t-1<v?(h=v,delete p[f],g()):p[f]=requestAnimationFrame(m)}),f},d=function(g){p[g]&&cancelAnimationFrame(p[g])}):(e=function(g){return setTimeout(g,t)},d=function(g){return clearTimeout(g)}),{frame:e,cancel:d}}(),C=function(){var t,e,d={};function p(h){function g(f,m){h.postMessage({options:f||{},callback:m})}h.init=function(m){var v=m.transferControlToOffscreen();h.postMessage({canvas:v},[v])},h.fire=function(m,v,I){if(e)return g(m,null),e;var $=Math.random().toString(36).slice(2);return e=s(function(M){function _(B){B.data.callback===$&&(delete d[$],h.removeEventListener("message",_),e=null,w.clear(),I(),M())}h.addEventListener("message",_),g(m,$),d[$]=_.bind(null,{data:{callback:$}})}),e},h.reset=function(){h.postMessage({reset:!0});for(var m in d)d[m](),delete d[m]}}return function(){if(t)return t;if(!o&&i){var h=["var CONFETTI, SIZE = {}, module = {};","("+a.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{t=new Worker(URL.createObjectURL(new Blob([h])))}catch(g){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",g),null}p(t)}return t}}(),k={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function P(t,e){return e?e(t):t}function T(t){return t!=null}function b(t,e,d){return P(t&&T(t[e])?t[e]:k[e],d)}function j(t){return t<0?0:Math.floor(t)}function A(t,e){return Math.floor(Math.random()*(e-t))+t}function q(t){return parseInt(t,16)}function G(t){return t.map(O)}function O(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:q(e.substring(0,2)),g:q(e.substring(2,4)),b:q(e.substring(4,6))}}function D(t){var e=b(t,"origin",Object);return e.x=b(e,"x",Number),e.y=b(e,"y",Number),e}function U(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function X(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function oe(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}function Q(t,e,d,p,h,g,f,m,v){t.save(),t.translate(e,d),t.rotate(g),t.scale(p,h),t.arc(0,0,1,f,m,v),t.restore()}function ve(t){var e=t.angle*(Math.PI/180),d=t.spread*(Math.PI/180);return{x:t.x,y:t.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:t.startVelocity*.5+Math.random()*t.startVelocity,angle2D:-e+(.5*d-Math.random()*d),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:t.color,shape:t.shape,tick:0,totalTicks:t.ticks,decay:t.decay,drift:t.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:t.gravity*3,ovalScalar:.6,scalar:t.scalar,flat:t.flat}}function ye(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var d=e.tick++/e.totalTicks,p=e.x+e.random*e.tiltCos,h=e.y+e.random*e.tiltSin,g=e.wobbleX+e.random*e.tiltCos,f=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-d)+")",t.beginPath(),c&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))t.fill(Ee(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(g-p)*.1,Math.abs(f-h)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var m=Math.PI/10*e.wobble,v=Math.abs(g-p)*.1,I=Math.abs(f-h)*.1,$=e.shape.bitmap.width*e.scalar,M=e.shape.bitmap.height*e.scalar,_=new DOMMatrix([Math.cos(m)*v,Math.sin(m)*v,-Math.sin(m)*I,Math.cos(m)*I,e.x,e.y]);_.multiplySelf(new DOMMatrix(e.shape.matrix));var B=t.createPattern(w.transform(e.shape.bitmap),"no-repeat");B.setTransform(_),t.globalAlpha=1-d,t.fillStyle=B,t.fillRect(e.x-$/2,e.y-M/2,$,M),t.globalAlpha=1}else if(e.shape==="circle")t.ellipse?t.ellipse(e.x,e.y,Math.abs(g-p)*e.ovalScalar,Math.abs(f-h)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):Q(t,e.x,e.y,Math.abs(g-p)*e.ovalScalar,Math.abs(f-h)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var y=Math.PI/2*3,L=4*e.scalar,N=8*e.scalar,F=e.x,z=e.y,H=5,R=Math.PI/H;H--;)F=e.x+Math.cos(y)*N,z=e.y+Math.sin(y)*N,t.lineTo(F,z),y+=R,F=e.x+Math.cos(y)*L,z=e.y+Math.sin(y)*L,t.lineTo(F,z),y+=R;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(h)),t.lineTo(Math.floor(g),Math.floor(f)),t.lineTo(Math.floor(p),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}function be(t,e,d,p,h){var g=e.slice(),f=t.getContext("2d"),m,v,I=s(function($){function M(){m=v=null,f.clearRect(0,0,p.width,p.height),w.clear(),h(),$()}function _(){o&&!(p.width===r.width&&p.height===r.height)&&(p.width=t.width=r.width,p.height=t.height=r.height),!p.width&&!p.height&&(d(t),p.width=t.width,p.height=t.height),f.clearRect(0,0,p.width,p.height),g=g.filter(function(B){return ye(f,B)}),g.length?m=x.frame(_):M()}m=x.frame(_),v=M});return{addFettis:function($){return g=g.concat($),I},canvas:t,promise:I,reset:function(){m&&x.cancel(m),v&&v()}}}function re(t,e){var d=!t,p=!!b(e||{},"resize"),h=!1,g=b(e,"disableForReducedMotion",Boolean),f=i&&!!b(e||{},"useWorker"),m=f?C():null,v=d?U:X,I=t&&m?!!t.__confetti_initialized:!1,$=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,M;function _(y,L,N){for(var F=b(y,"particleCount",j),z=b(y,"angle",Number),H=b(y,"spread",Number),R=b(y,"startVelocity",Number),Me=b(y,"decay",Number),$e=b(y,"gravity",Number),_e=b(y,"drift",Number),ie=b(y,"colors",G),qe=b(y,"ticks",Number),le=b(y,"shapes"),Be=b(y,"scalar"),Pe=!!b(y,"flat"),ce=D(y),de=F,ee=[],xe=t.width*ce.x,Ce=t.height*ce.y;de--;)ee.push(ve({x:xe,y:Ce,angle:z,spread:H,startVelocity:R,color:ie[de%ie.length],shape:le[A(0,le.length)],ticks:qe,decay:Me,gravity:$e,drift:_e,scalar:Be,flat:Pe}));return M?M.addFettis(ee):(M=be(t,ee,v,L,N),M.promise)}function B(y){var L=g||b(y,"disableForReducedMotion",Boolean),N=b(y,"zIndex",Number);if(L&&$)return s(function(R){R()});d&&M?t=M.canvas:d&&!t&&(t=oe(N),document.body.appendChild(t)),p&&!I&&v(t);var F={width:t.width,height:t.height};m&&!I&&m.init(t),I=!0,m&&(t.__confetti_initialized=!0);function z(){if(m){var R={getBoundingClientRect:function(){if(!d)return t.getBoundingClientRect()}};v(R),m.postMessage({resize:{width:R.width,height:R.height}});return}F.width=F.height=null}function H(){M=null,p&&(h=!1,n.removeEventListener("resize",z)),d&&t&&(document.body.contains(t)&&document.body.removeChild(t),t=null,I=!1)}return p&&!h&&(h=!0,n.addEventListener("resize",z,!1)),m?m.fire(y,F,H):_(y,F,H)}return B.reset=function(){m&&m.reset(),M&&M.reset()},B}var Y;function se(){return Y||(Y=re(null,{useWorker:!0,resize:!0})),Y}function Ee(t,e,d,p,h,g,f){var m=new Path2D(t),v=new Path2D;v.addPath(m,new DOMMatrix(e));var I=new Path2D;return I.addPath(v,new DOMMatrix([Math.cos(f)*h,Math.sin(f)*h,-Math.sin(f)*g,Math.cos(f)*g,d,p])),I}function we(t){if(!c)throw new Error("path confetti are not supported in this browser");var e,d;typeof t=="string"?e=t:(e=t.path,d=t.matrix);var p=new Path2D(e),h=document.createElement("canvas"),g=h.getContext("2d");if(!d){for(var f=1e3,m=f,v=f,I=0,$=0,M,_,B=0;B<f;B+=2)for(var y=0;y<f;y+=2)g.isPointInPath(p,B,y,"nonzero")&&(m=Math.min(m,B),v=Math.min(v,y),I=Math.max(I,B),$=Math.max($,y));M=I-m,_=$-v;var L=10,N=Math.min(L/M,L/_);d=[N,0,0,N,-Math.round(M/2+m)*N,-Math.round(_/2+v)*N]}return{type:"path",path:e,matrix:d}}function Ie(t){var e,d=1,p="#000000",h='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof t=="string"?e=t:(e=t.text,d="scalar"in t?t.scalar:d,h="fontFamily"in t?t.fontFamily:h,p="color"in t?t.color:p);var g=10*d,f=""+g+"px "+h,m=new OffscreenCanvas(g,g),v=m.getContext("2d");v.font=f;var I=v.measureText(e),$=Math.ceil(I.actualBoundingBoxRight+I.actualBoundingBoxLeft),M=Math.ceil(I.actualBoundingBoxAscent+I.actualBoundingBoxDescent),_=2,B=I.actualBoundingBoxLeft+_,y=I.actualBoundingBoxAscent+_;$+=_+_,M+=_+_,m=new OffscreenCanvas($,M),v=m.getContext("2d"),v.font=f,v.fillStyle=p,v.fillText(e,B,y);var L=1/d;return{type:"bitmap",bitmap:m.transferToImageBitmap(),matrix:[L,0,0,L,-$*L/2,-M*L/2]}}l.exports=function(){return se().apply(this,arguments)},l.exports.reset=function(){se().reset()},l.exports.create=re,l.exports.shapeFromPath=we,l.exports.shapeFromText=Ie})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ne,!1);const Le=ne.exports;ne.exports.create;const Se="/api",ke="http://localhost/GezrelMisaelRiveraMorenoU2/api";async function S(a,n={}){const l=`${Se}/${a}`,r={...n,headers:{...{"Content-Type":"application/json"},...n.headers}};try{const i=await fetch(l,r);if(!i.ok){const c=await i.json().catch(()=>({}));throw new Error(c.message||`Error HTTP: ${i.status}`)}return await i.json()}catch(i){try{const c=`${ke}/${a}`,u=await fetch(c,r);if(!u.ok){const E=await u.json().catch(()=>({}));throw new Error(E.message||`Error HTTP: ${u.status}`)}return await u.json()}catch(c){throw console.error("Error de comunicación API:",c),i}}}function Te(a,n){const l=document.getElementById("bracket-container");if(!a||Object.keys(a).length===0){l.innerHTML=`
      <div class="bracket-empty">
        <div class="empty-icon">🏆</div>
        <h3>El torneo aún no ha comenzado</h3>
        <p>Presiona el botón <strong>"Generar Sorteo y Bracket"</strong> para armar las llaves aleatorias.</p>
      </div>
    `;return}const o=Object.keys(a).sort((c,u)=>{const E={"Cuartos de Final":1,Semifinal:2,"Gran Final":3};return(E[c]||99)-(E[u]||99)});let r='<div class="bracket-tree">';o.forEach(c=>{const u=a[c],E=c==="Gran Final";r+=`
      <div class="bracket-round">
        <div class="round-title">${c}</div>
    `,u.forEach(s=>{const w=s.estado==="jugado",x=w&&s.ganador_id==s.equipo1_id&&s.equipo1_id,C=w&&s.ganador_id==s.equipo2_id&&s.equipo2_id,k=s.equipo1_nombre||"Por Definir",P=s.equipo2_nombre||"Por Definir",T=s.equipo1_color||"#475569",b=s.equipo2_color||"#475569",j=w?s.goles_equipo1:"-",A=w?s.goles_equipo2:"-",q=w&&s.penales_equipo1!==null&&s.penales_equipo2!==null;r+=`
        <div class="bracket-match-card ${E?"is-final":""}" data-match-id="${s.id}">
          <div class="match-header-bar">
            <span>Partido #${s.id}</span>
            <span class="status-pill">${w?"✅ Jugado":"⏳ Pendiente"}</span>
          </div>

          <div class="match-team-row ${x?"winner":""}">
            <div class="team-badge-name">
              <span class="team-dot" style="background-color: ${T}; color: ${T};"></span>
              <span class="team-title-text ${s.equipo1_id?"":"tbd"}">${k}</span>
            </div>
            <span class="score-badge ${x?"winner-score":""}">${j}</span>
          </div>

          <div class="match-team-row ${C?"winner":""}">
            <div class="team-badge-name">
              <span class="team-dot" style="background-color: ${b}; color: ${b};"></span>
              <span class="team-title-text ${s.equipo2_id?"":"tbd"}">${P}</span>
            </div>
            <span class="score-badge ${C?"winner-score":""}">${A}</span>
          </div>

          ${q?`
            <div class="penalties-note">
              🎯 Penales: ${s.penales_equipo1} - ${s.penales_equipo2}
            </div>
          `:""}
        </div>
      `}),r+="</div>"}),r+="</div>",l.innerHTML=r,l.querySelectorAll(".bracket-match-card").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-match-id");n&&u&&n(u)})})}let W=null,pe=[],he=[];function ge(a,n="all",l){const o=document.getElementById("matches-list-container");if(!a||Object.keys(a).length===0){o.innerHTML=`
      <div class="glass-panel text-center padding-2">
        <p class="text-muted">No hay partidos programados en este momento.</p>
      </div>
    `;return}let r="";Object.keys(a).sort((u,E)=>{const s={"Cuartos de Final":1,Semifinal:2,"Gran Final":3};return(s[u]||99)-(s[E]||99)}).forEach(u=>{let E=a[u];n==="pendiente"?E=E.filter(s=>s.estado==="pendiente"):n==="jugado"&&(E=E.filter(s=>s.estado==="jugado")),E.length!==0&&(r+=`
      <div class="round-group">
        <h3 class="round-group-title">🏆 ${u}</h3>
        <div class="matches-cards-grid">
    `,E.forEach(s=>{const w=s.estado==="jugado",x=w&&s.ganador_id==s.equipo1_id&&s.equipo1_id,C=w&&s.ganador_id==s.equipo2_id&&s.equipo2_id,k=s.equipo1_nombre||"Por Definir",P=s.equipo2_nombre||"Por Definir",T=s.equipo1_color||"#475569",b=s.equipo2_color||"#475569",j=w?s.goles_equipo1:"-",A=w?s.goles_equipo2:"-";r+=`
        <div class="bracket-match-card" data-match-id="${s.id}">
          <div class="match-header-bar">
            <span>Partido #${s.id} • ${u}</span>
            <span class="status-pill">${w?"✅ Finalizado":"⏳ Pendiente"}</span>
          </div>

          <div class="match-team-row ${x?"winner":""}">
            <div class="team-badge-name">
              <span class="team-dot" style="background-color: ${T}"></span>
              <span class="team-title-text">${k}</span>
            </div>
            <span class="score-badge ${x?"winner-score":""}">${j}</span>
          </div>

          <div class="match-team-row ${C?"winner":""}">
            <div class="team-badge-name">
              <span class="team-dot" style="background-color: ${b}"></span>
              <span class="team-title-text">${P}</span>
            </div>
            <span class="score-badge ${C?"winner-score":""}">${A}</span>
          </div>

          <div style="padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.15); display: flex; justify-content: flex-end;">
            <button class="btn btn-sm ${w?"btn-outline":"btn-emerald"}">
              ${w?"✏️ Ver / Editar Marcador":"⚽ Registrar Marcador"}
            </button>
          </div>
        </div>
      `}),r+=`
        </div>
      </div>
    `)}),r||(r='<div class="glass-panel text-center" style="padding:2rem;"><p class="text-muted">No se encontraron partidos para el filtro seleccionado.</p></div>'),o.innerHTML=r,o.querySelectorAll(".bracket-match-card").forEach(u=>{u.addEventListener("click",()=>{const E=u.getAttribute("data-match-id");l&&E&&l(E)})})}function Ae(a){const n=document.getElementById("modal-match"),l=document.getElementById("btn-close-match-modal"),o=document.getElementById("btn-cancel-match-modal"),r=document.getElementById("form-match-result"),i=document.getElementById("m-team1-goals"),c=document.getElementById("m-team2-goals"),u=document.getElementById("penalties-box"),E=document.getElementById("btn-add-scorer-row"),s=()=>n.classList.add("hidden");l.addEventListener("click",s),o.addEventListener("click",s);const w=()=>{const x=parseInt(i.value||"0",10),C=parseInt(c.value||"0",10);x===C?u.classList.remove("hidden"):u.classList.add("hidden")};i.addEventListener("input",w),c.addEventListener("input",w),E.addEventListener("click",()=>{fe()}),r.addEventListener("submit",async x=>{x.preventDefault();const C=document.getElementById("match-id").value,k=parseInt(i.value||"0",10),P=parseInt(c.value||"0",10),T=document.getElementById("m-team1-penalties").value,b=document.getElementById("m-team2-penalties").value,j=k===P&&T!==""?parseInt(T,10):null,A=k===P&&b!==""?parseInt(b,10):null,q=[];document.querySelectorAll(".scorer-row").forEach(O=>{const D=O.querySelector(".select-jugador"),U=O.querySelector(".input-minuto"),X=O.querySelector(".select-tipo");if(D&&D.value){const Q=D.options[D.selectedIndex].getAttribute("data-equipo-id");q.push({jugador_id:parseInt(D.value,10),equipo_id:parseInt(Q,10),minuto:parseInt(U.value||"0",10),tipo:X.value})}});try{const O=await S("partidos.php",{method:"POST",body:JSON.stringify({action:"guardar_resultado",partido_id:parseInt(C,10),goles_equipo1:k,goles_equipo2:P,penales_equipo1:j,penales_equipo2:A,goleadores:q})});O.status==="success"&&(s(),a&&a(O))}catch(O){alert("Error: "+O.message)}})}async function te(a){const n=document.getElementById("modal-match");try{const l=await S(`partidos.php?id=${a}`);if(l.status!=="success")return;W=l.data;const o=W;if(!o.equipo1_id||!o.equipo2_id){alert("No se puede cargar resultado de este partido hasta que estén definidos ambos equipos.");return}document.getElementById("match-id").value=o.id,document.getElementById("modal-match-title").textContent=`Partido #${o.id} - ${o.fase_nombre}`,document.getElementById("m-team1-name").textContent=o.equipo1_nombre,document.getElementById("m-team2-name").textContent=o.equipo2_nombre,document.getElementById("m-team1-badge").style.color=o.equipo1_color||"#00ff87",document.getElementById("m-team2-badge").style.color=o.equipo2_color||"#00d2ff",document.getElementById("m-team1-goals").value=o.goles_equipo1!==null?o.goles_equipo1:0,document.getElementById("m-team2-goals").value=o.goles_equipo2!==null?o.goles_equipo2:0,document.getElementById("m-team1-penalties").value=o.penales_equipo1!==null?o.penales_equipo1:"",document.getElementById("m-team2-penalties").value=o.penales_equipo2!==null?o.penales_equipo2:"",document.getElementById("lbl-penal1").textContent=`Penales ${o.equipo1_nombre}`,document.getElementById("lbl-penal2").textContent=`Penales ${o.equipo2_nombre}`;const r=await S(`jugadores.php?equipo_id=${o.equipo1_id}`),i=await S(`jugadores.php?equipo_id=${o.equipo2_id}`);pe=r.data||[],he=i.data||[];const c=document.getElementById("scorers-list");c.innerHTML="",o.goles_registrados&&o.goles_registrados.length>0&&o.goles_registrados.forEach(s=>{fe(s.jugador_id,s.minuto,s.tipo)});const u=parseInt(document.getElementById("m-team1-goals").value,10),E=parseInt(document.getElementById("m-team2-goals").value,10);u===E?document.getElementById("penalties-box").classList.remove("hidden"):document.getElementById("penalties-box").classList.add("hidden"),n.classList.remove("hidden")}catch(l){alert("Error al abrir el partido: "+l.message)}}function fe(a=null,n=0,l="normal"){const o=document.getElementById("scorers-list");let r='<option value="">-- Seleccionar Jugador --</option>';W&&(r+=`<optgroup label="${W.equipo1_nombre}">`,pe.forEach(c=>{const u=a==c.id?"selected":"";r+=`<option value="${c.id}" data-equipo-id="${W.equipo1_id}" ${u}>#${c.numero} ${c.nombre}</option>`}),r+="</optgroup>",r+=`<optgroup label="${W.equipo2_nombre}">`,he.forEach(c=>{const u=a==c.id?"selected":"";r+=`<option value="${c.id}" data-equipo-id="${W.equipo2_id}" ${u}>#${c.numero} ${c.nombre}</option>`}),r+="</optgroup>");const i=document.createElement("div");i.className="scorer-row",i.innerHTML=`
    <select class="form-input select-jugador">${r}</select>
    <input type="number" class="form-input input-minuto" min="1" max="120" placeholder="Min" value="${n||""}" />
    <select class="form-input select-tipo">
      <option value="normal" ${l==="normal"?"selected":""}>Gol Normal</option>
      <option value="penal" ${l==="penal"?"selected":""}>Penal</option>
      <option value="autogol" ${l==="autogol"?"selected":""}>Autogol</option>
    </select>
    <button type="button" class="btn-remove-row">&times;</button>
  `,i.querySelector(".btn-remove-row").addEventListener("click",()=>{i.remove()}),o.appendChild(i)}async function Z(a){const n=document.getElementById("teams-grid-container");try{const l=await S("equipos.php");if(l.status!=="success")return;const o=l.data||[];if(o.length===0){n.innerHTML=`
        <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <h3>No hay equipos registrados</h3>
          <p class="text-muted">Presiona el botón "Registrar Nuevo Equipo" para agregar clubes al torneo.</p>
        </div>
      `;return}let r="";o.forEach(i=>{const c=i.jugadores||[];r+=`
        <div class="team-card" data-team-id="${i.id}">
          <div class="team-card-header">
            <div class="team-card-title">
              <div class="team-icon-circle" style="background-color: ${i.color_hex}">🛡️</div>
              <div>
                <h3>${i.nombre}</h3>
                <span style="font-size:0.75rem; color: var(--text-muted);">${c.length} jugadores inscritos</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-delete-team" data-team-id="${i.id}">🗑️</button>
          </div>

          <div class="player-list-scroll">
            ${c.length===0?'<p style="font-size:0.8rem; color:var(--text-muted); padding:0.5rem 0;">Sin jugadores registrados</p>':""}
            ${c.map(u=>`
              <div class="player-item-row">
                <div>
                  <span class="player-dorsal">#${u.numero}</span>
                  <strong>${u.nombre}</strong>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="font-size:0.75rem; color:var(--text-muted);">${u.posicion}</span>
                  <button class="btn-remove-row btn-delete-player" data-player-id="${u.id}">&times;</button>
                </div>
              </div>
            `).join("")}
          </div>

          <div class="team-card-footer">
            <button class="btn btn-sm btn-outline-emerald btn-add-player" data-team-id="${i.id}" data-team-name="${i.nombre}">
              ➕ Agregar Jugador
            </button>
          </div>
        </div>
      `}),n.innerHTML=r,n.querySelectorAll(".btn-delete-team").forEach(i=>{i.addEventListener("click",async c=>{c.stopPropagation();const u=i.getAttribute("data-team-id");confirm("¿Estás seguro de eliminar este equipo?")&&(await S(`equipos.php?id=${u}`,{method:"DELETE"}),Z(a),a&&a())})}),n.querySelectorAll(".btn-delete-player").forEach(i=>{i.addEventListener("click",async c=>{c.stopPropagation();const u=i.getAttribute("data-player-id");confirm("¿Eliminar jugador?")&&(await S(`jugadores.php?id=${u}`,{method:"DELETE"}),Z(a),a&&a())})}),n.querySelectorAll(".btn-add-player").forEach(i=>{i.addEventListener("click",()=>{const c=i.getAttribute("data-team-id"),u=i.getAttribute("data-team-name");je(c,u,()=>{Z(a),a&&a()})})})}catch(l){console.error("Error al cargar equipos:",l)}}function Oe(a){const n=document.getElementById("modal-team"),l=document.getElementById("btn-open-add-team"),o=document.getElementById("btn-close-team-modal"),r=document.getElementById("btn-cancel-team-modal"),i=document.getElementById("form-add-team"),c=document.getElementById("initial-players-container"),u=document.getElementById("btn-add-player-row");l.addEventListener("click",()=>{c.innerHTML="";for(let P=0;P<3;P++)ue();n.classList.remove("hidden")});const E=()=>n.classList.add("hidden");o.addEventListener("click",E),r.addEventListener("click",E),u.addEventListener("click",()=>{ue()}),i.addEventListener("submit",async P=>{P.preventDefault();const T=document.getElementById("t-nombre").value.trim(),b=document.getElementById("t-color").value,j=document.getElementById("t-escudo").value,A=[];c.querySelectorAll(".initial-player-row").forEach(q=>{const G=q.querySelector(".p-name").value.trim(),O=parseInt(q.querySelector(".p-num").value||"0",10),D=q.querySelector(".p-pos").value;G&&A.push({nombre:G,numero:O,posicion:D})});try{(await S("equipos.php",{method:"POST",body:JSON.stringify({nombre:T,color_hex:b,escudo_icon:j,jugadores:A})})).status==="success"&&(E(),i.reset(),Z(a),a&&a())}catch(q){alert("Error al guardar equipo: "+q.message)}});const s=document.getElementById("modal-player"),w=document.getElementById("btn-close-player-modal"),x=document.getElementById("btn-cancel-player-modal"),C=document.getElementById("form-add-single-player"),k=()=>s.classList.add("hidden");w.addEventListener("click",k),x.addEventListener("click",k),C.addEventListener("submit",async P=>{P.preventDefault();const T=parseInt(document.getElementById("p-team-id").value,10),b=document.getElementById("p-nombre").value.trim(),j=parseInt(document.getElementById("p-numero").value||"10",10),A=document.getElementById("p-posicion").value;try{(await S("jugadores.php",{method:"POST",body:JSON.stringify({equipo_id:T,nombre:b,numero:j,posicion:A})})).status==="success"&&(k(),C.reset(),window._onPlayerAddedCallback&&window._onPlayerAddedCallback())}catch(q){alert("Error al agregar jugador: "+q.message)}})}function ue(){const a=document.getElementById("initial-players-container"),n=document.createElement("div");n.className="initial-player-row form-row",n.style.marginBottom="0.5rem",n.innerHTML=`
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
  `,a.appendChild(n)}function je(a,n,l){const o=document.getElementById("modal-player");document.getElementById("p-team-id").value=a,document.getElementById("modal-player-team-title").textContent=`Agregar Jugador a ${n}`,document.getElementById("p-nombre").value="",window._onPlayerAddedCallback=l,o.classList.remove("hidden")}async function Ne(){const a=document.getElementById("pichichi-container");try{const n=await S("goleadores.php");if(n.status!=="success")return;const l=n.data||[];if(l.length===0){a.innerHTML=`
        <div class="text-center" style="padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚽</div>
          <h3>Aún no hay goles registrados</h3>
          <p class="text-muted">Conforme se jueguen los partidos y se anoten goles, aparecerá el ranking del Pichichi.</p>
        </div>
      `;return}const o=l[0]||null,r=l[1]||null,i=l[2]||null;let c="";o&&(c+='<div class="podium-container">',r&&(c+=`
          <div class="podium-card second">
            <span class="podium-crown">🥈</span>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${r.equipo_color}; margin: 0 auto;"></div>
            <h4 class="podium-name">${r.jugador_nombre}</h4>
            <span class="podium-team">${r.equipo_nombre}</span>
            <span class="podium-goals">${r.total_goles} ⚽</span>
          </div>
        `),c+=`
        <div class="podium-card first">
          <span class="podium-crown">👑 🥇</span>
          <div style="width: 14px; height: 14px; border-radius: 50%; background: ${o.equipo_color}; margin: 0 auto;"></div>
          <h4 class="podium-name">${o.jugador_nombre}</h4>
          <span class="podium-team">${o.equipo_nombre}</span>
          <span class="podium-goals">${o.total_goles} ⚽</span>
        </div>
      `,i&&(c+=`
          <div class="podium-card third">
            <span class="podium-crown">🥉</span>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${i.equipo_color}; margin: 0 auto;"></div>
            <h4 class="podium-name">${i.jugador_nombre}</h4>
            <span class="podium-team">${i.equipo_nombre}</span>
            <span class="podium-goals">${i.total_goles} ⚽</span>
          </div>
        `),c+="</div>"),c+=`
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Jugador</th>
            <th>Dorsal</th>
            <th>Equipo</th>
            <th>Posición</th>
            <th style="text-align: right;">Goles Totales</th>
          </tr>
        </thead>
        <tbody>
    `,l.forEach((u,E)=>{const s=E+1;let w=s;s===1?w="🥇 1":s===2?w="🥈 2":s===3&&(w="🥉 3"),c+=`
        <tr>
          <td><strong>${w}</strong></td>
          <td><strong>${u.jugador_nombre}</strong></td>
          <td><span class="player-dorsal">#${u.jugador_numero}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="width:10px; height:10px; border-radius:50%; background:${u.equipo_color}; display:inline-block;"></span>
              ${u.equipo_nombre}
            </div>
          </td>
          <td><span style="font-size:0.8rem; color:var(--text-muted);">${u.jugador_posicion}</span></td>
          <td style="text-align: right;"><strong style="color:var(--primary-emerald); font-size:1.1rem;">${u.total_goles}</strong></td>
        </tr>
      `}),c+=`
        </tbody>
      </table>
    `,a.innerHTML=c}catch(n){console.error("Error al cargar la tabla de goleadores:",n)}}let K=null,me="dashboard",ae="all";function Fe(){ze(),He(),Ae(()=>{J("¡Resultado guardado y avance de bracket actualizado!"),V()}),Oe(()=>{J("¡Equipo/Jugador guardado con éxito!"),V()}),document.querySelectorAll(".btn-filter").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".btn-filter").forEach(n=>n.classList.remove("active")),a.classList.add("active"),ae=a.getAttribute("data-filter"),K&&K.bracket&&ge(K.bracket,ae,n=>te(n))})}),V()}async function V(){try{const a=await S("torneo.php");if(a.status!=="success")return;K=a,Re(a.torneo,a.total_equipos),De(a),Te(a.bracket,n=>te(n)),ge(a.bracket,ae,n=>te(n)),Z(()=>V()),Ne(),a.torneo&&a.torneo.estado==="finalizado"&&a.torneo.campeon_nombre?We(a.torneo.campeon_nombre):Je()}catch(a){console.error("Error al cargar datos del torneo:",a),J("Error al conectar con la API de PHP en XAMPP. Verifica que Apache y MySQL estén corriendo en XAMPP.",!0)}}function Re(a,n){const l=document.getElementById("tournament-badge"),o=document.getElementById("tournament-status-text");a&&(l.className="badge",a.estado==="registro"?(l.classList.add("badge-registro"),o.textContent=`🟢 Registro Abierto (${n} Equipos)`):a.estado==="en_curso"?(l.classList.add("badge-en-curso"),o.textContent="⚡ Torneo En Curso (Eliminatoria Directa)"):a.estado==="finalizado"&&(l.classList.add("badge-finalizado"),o.textContent=`🏆 Torneo Finalizado - Campeón: ${a.campeon_nombre||""}`))}function De(a){document.getElementById("stat-equipos").textContent=a.total_equipos||0;let n=0,l=0;a.bracket&&Object.values(a.bracket).forEach(o=>{o.forEach(r=>{n++,r.estado==="jugado"&&l++})}),document.getElementById("stat-partidos").textContent=n,document.getElementById("stat-jugados").textContent=l,S("goleadores.php").then(o=>{if(o.data&&o.data.length>0){const r=o.data[0];document.getElementById("stat-pichichi").textContent=`${r.jugador_nombre} (${r.total_goles} ⚽)`}else document.getElementById("stat-pichichi").textContent="-"}).catch(()=>{})}function ze(){const a=document.querySelectorAll(".nav-tab");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(o=>o.classList.remove("active")),n.classList.add("active"),me=n.getAttribute("data-tab"),document.querySelectorAll(".tab-view").forEach(o=>o.classList.remove("active"));const l=document.getElementById(`view-${me}`);l&&l.classList.add("active")})})}function He(){const a=document.getElementById("btn-start-tournament"),n=document.getElementById("btn-draw-dash"),l=document.getElementById("btn-reset-tournament"),o=async()=>{if(confirm("¿Deseas realizar el sorteo aleatorio y generar las llaves del torneo?"))try{const r=await S("torneo.php",{method:"POST",body:JSON.stringify({action:"iniciar"})});r.status==="success"&&(J(r.message),document.querySelector('.nav-tab[data-tab="bracket"]').click(),V())}catch(r){J(r.message,!0)}};a.addEventListener("click",o),n.addEventListener("click",o),l.addEventListener("click",async()=>{if(confirm("⚠️ ¿Estás seguro de reiniciar el torneo? Se limpiarán los partidos y goles actuales."))try{(await S("torneo.php",{method:"POST",body:JSON.stringify({action:"reiniciar"})})).status==="success"&&(J("Torneo reiniciado correctamente"),V())}catch(r){J(r.message,!0)}})}function We(a){const n=document.getElementById("champion-banner"),l=document.getElementById("champion-name");l&&(l.textContent=a),n.classList.remove("hidden"),Le({particleCount:120,spread:80,origin:{y:.6}})}function Je(){document.getElementById("champion-banner").classList.add("hidden")}function J(a,n=!1){const l=document.getElementById("toast-container"),o=document.createElement("div");o.className=`toast ${n?"toast-error":""}`,o.textContent=a,l.appendChild(o),setTimeout(()=>{o.remove()},4e3)}document.addEventListener("DOMContentLoaded",()=>{Fe()});
