// Rodada 8: variações da 2a (Hn no círculo cortado), traço mais grosso e n melhorado.
import { writeFileSync } from "node:fs";
const RED = "#ff4632", BG = "#0e0e10";
const C = [310, 245], R = 145, d = Math.PI / 180;
const pc = (a) => [+(C[0] + R * Math.cos(a * d)).toFixed(1), +(C[1] + R * Math.sin(a * d)).toFixed(1)];
const arc = (a0, a1) => { const p = pc(a0), q = pc(a1); return `M${p[0]} ${p[1]} A${R} ${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${q[0]} ${q[1]}`; };

// n: todos inclinados como as hastes do H
const N = {
  arco:   "M396 322 L403 287 C407 280 425 278 423 296 L419 322",
  saida:  "M396 322 L403 287 C407 280 425 278 423 296 L420 314 Q418 325 430 318",
  alto:   "M394 322 L404 272 C409 263 434 261 430 285 L425 314 Q423 326 436 318",
  ligado: null, // sai da haste do H
};
const mark = ({ w = 9, ring = w, nKey = "arco", a0 = 84, col = RED, ringCol = RED, dot = true }) => {
  const s = (dd, c = col, sw = w) => `<path d="${dd}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const stemR = nKey === "ligado" ? "M405 183 L382 322 L391 284 C396 275 415 273 413 291 L409 314 Q407 325 420 318" : "M405 183 L382 322";
  return s(arc(a0, 362), ringCol, ring) +
    (dot ? `<circle cx="${pc(a0)[0]}" cy="${pc(a0)[1]}" r="${(ring * 0.95).toFixed(1)}" fill="${ringCol}"/>` : "") +
    s("M455 250 L245 262 L238 385") + s("M347 148 L238 385") + s(stemR) + (N[nKey] ? s(N[nKey]) : "");
};

const F = { w: 12, nKey: "saida", dot: false };
const tone = (c) => mark({ ...F, col: c, ringCol: c });
const V = [
  ["1", "Tom do círculo · #C22A1C", "O vermelho do meio do degradê da f6, usado em tudo. Mais fechado e sério.", tone("#c22a1c")],
  ["2", "Vivo · #FF4632", "O vermelho das letras da f6, puxado para o laranja. É o mais aceso.", tone("#ff4632")],
  ["3", "Vermelho puro · #E8291C", "Entre os dois: vermelho cheio, sem puxar para laranja nem vinho.", tone("#e8291c")],
  ["4", "Carmim · #D61F3A", "Puxa levemente para o rosa. Mais elegante, menos alerta.", tone("#d61f3a")],
  ["5", "Rubi · #A51D1D", "Escuro e quente. Discreto no preto, combina com o site sóbrio.", tone("#a51d1d")],
  ["6", "Vinho · #7E1610", "O fundo do degradê. Bem fechado; no preto fica quase uma assinatura gravada.", tone("#7e1610")],
];

const VB = "140 85 350 330";
const card = ([id, name, note, svg]) => `
  <article class="v"><div class="stage">
    <svg viewBox="${VB}" class="big" role="img" aria-label="${name}">${svg}</svg>
    <div class="wm"><div class="n">Hugo Nazário</div><div class="s">Análise de dados</div></div>
    <div class="mini" aria-hidden="true"><span class="av"><svg viewBox="${VB}">${svg}</svg></span><span class="fav"><svg viewBox="${VB}">${svg}</svg></span></div>
  </div><div class="meta"><span class="num">t${id}</span><div><h3>${name}</h3><p>${note}</p></div></div></article>`;

const html = `<title>Marca Hugo Nazário</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=Geist+Mono:wght@400;500&display=swap">
<style>
/* Grade de seis variações da 2a; cada cartão mostra grande, foto redonda e ícone de aba. */
:root { --page:#08080a; --tile:${BG}; --ink:#ececef; --ink2:#a1a1a9; --ink3:#66666e; --rule:rgba(236,236,239,.09);
  --display:"Archivo","Helvetica Neue",Arial,sans-serif; --mono:"Geist Mono",ui-monospace,Consolas,monospace; color-scheme:dark; }
* { box-sizing:border-box; }
body { background:var(--page); color:var(--ink); font-family:var(--display); font-size:16px; line-height:1.55;
  padding-left:max(16px,env(safe-area-inset-left,0px)); padding-right:max(16px,env(safe-area-inset-right,0px)); padding-block:0 64px; }
.wrap { max-width:1240px; margin:0 auto; }
header { padding-block:48px 28px; border-bottom:1px solid var(--rule); margin-bottom:32px; }
.eyebrow { font:12px var(--mono); letter-spacing:.08em; text-transform:uppercase; color:var(--ink3); }
h1 { font-size:clamp(32px,5vw,52px); font-weight:650; font-stretch:85%; line-height:1; letter-spacing:-.02em; margin:8px 0 0; }
.lede { color:var(--ink2); max-width:64ch; margin:12px 0 0; }
.row { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:28px 20px; }
.v { display:flex; flex-direction:column; gap:12px; min-width:0; }
.stage { background:var(--tile); border-radius:4px; aspect-ratio:1/1; max-width:100%; position:relative;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
.stage .big { width:56%; height:auto; overflow:visible; }
.wm { text-align:center; display:flex; flex-direction:column; gap:7px; }
.wm .n { color:#d8d2cc; font-weight:400; font-stretch:125%; font-size:13px; letter-spacing:.3em; margin-right:-.3em; text-transform:uppercase; line-height:1; }
.wm .s { color:#6e6a66; font:8.5px var(--mono); letter-spacing:.42em; margin-right:-.42em; text-transform:uppercase; line-height:1; }
.mini { position:absolute; right:10px; top:10px; display:flex; gap:8px; align-items:center; }
.av { width:44px; height:44px; border-radius:50%; background:#0a0a0b; box-shadow:0 0 0 1px rgba(127,127,127,.25); display:grid; place-items:center; }
.av svg { width:80%; }
.fav { width:20px; height:20px; display:grid; place-items:center; }
.fav svg { width:100%; }
.meta { display:flex; gap:12px; align-items:baseline; }
.num { font:12px var(--mono); color:${RED}; white-space:nowrap; }
.meta h3 { font-size:17px; font-weight:650; font-stretch:92%; margin:0; line-height:1.2; }
.meta p { margin:3px 0 0; color:var(--ink2); font-size:13.5px; }
@media (max-width:900px) { .row { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:560px) { .row { grid-template-columns:minmax(0,1fr); } }
</style>
<div class="wrap">
  <header>
    <div class="eyebrow">Portfólio · identidade · rodada 10 · tons da f6</div>
    <h1>Marca Hugo Nazário</h1>
    <p class="lede">A f6 com um tom único de vermelho em tudo, em seis tons. No canto de cada cartão: a foto redonda e o ícone de aba, para ver se aguenta pequeno.</p>
  </header>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="br" gradientUnits="userSpaceOnUse" x1="170" y1="100" x2="450" y2="390"><stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#6a130c"/></linearGradient>
  </defs></svg>
  <div class="row">${V.map(card).join("")}</div>
</div>`;
writeFileSync("marca-hugo-nazario.html", html);
console.log("ok");
