// Rodada 5: Brasa sem cara de sushi. Letras de caneta com menos contraste (menos pincel),
// moldura precisa em vez do anel de pincel aberto.
import { readFileSync, writeFileSync } from "node:fs";
const NIB = (-36 * Math.PI) / 180;
const bez = (p0,c1,c2,p1,t) => { const u=1-t; return [u*u*u*p0[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p1[0], u*u*u*p0[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p1[1]]; };
const ss = (a,b,x) => { const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
function stroke({ start, segs, wmin=2.3, wmax=4.4, tapStart=true, tapEnd=true, scale=1, dx=0, dy=0, n=16 }) {
  const pts=[]; let p0=start;
  for (const [c1,c2,p1] of segs) { for (let i=0;i<n;i++) pts.push(bez(p0,c1,c2,p1,i/n)); p0=p1; }
  pts.push(p0);
  const P=pts.map(([x,y])=>[x*scale+dx,y*scale+dy]);
  const L=[0]; for (let i=1;i<P.length;i++) L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
  const tot=L[L.length-1], left=[], right=[];
  for (let i=0;i<P.length;i++) {
    const a=P[Math.max(0,i-1)], b=P[Math.min(P.length-1,i+1)], ang=Math.atan2(b[1]-a[1],b[0]-a[0]), s=L[i]/tot;
    let tap=1; if (tapStart) tap*=0.45+0.55*ss(0,0.08,s); if (tapEnd) tap*=0.35+0.65*(1-ss(0.88,1,s));
    const w=(wmin+(wmax-wmin)*Math.abs(Math.sin(ang-NIB)))*tap*scale/2, nx=-Math.sin(ang), ny=Math.cos(ang);
    left.push([P[i][0]+nx*w,P[i][1]+ny*w]); right.push([P[i][0]-nx*w,P[i][1]-ny*w]);
  }
  const f=q=>q[0].toFixed(1)+" "+q[1].toFixed(1);
  return "M"+left.map(f).join("L")+"L"+right.reverse().map(f).join("L")+"Z";
}

// HN de caneta em escala/posição livres; tail = diagonal passa da letra
function HN(S, cx, cy, tail) {
  const o = { scale: S, dx: cx - 70 * S, dy: cy - 51 * S };
  const diagSegs = [[[71,34],[84,66],[97,90]]];
  if (tail === "ring") diagSegs.push([[103,101],[108,108],[112,112]]);
  if (tail === "axis") diagSegs.push([[100,96],[102,100],[104,104]]);
  return [
    ["k", stroke({...o, start:[27,13], segs:[[[24,36],[22,63],[25,91]]]})],
    ["k", stroke({...o, start:[11,57], wmax:4, segs:[[[28,52],[46,55],[66,50]]]})],
    ["k", stroke({...o, start:[63,92], tapEnd:false, segs:[[[65,66],[66,38],[64,11]]]})],
    ["a", stroke({...o, start:[64,11], tapStart:false, tapEnd:!!tail, segs: diagSegs})],
    ["k", stroke({...o, start:[97,90], tapStart:false, segs:[[[99,64],[100,38],[99,15]],[[99,8],[106,4],[117,8]]]})],
  ].map(([c,d]) => `<path class="${c}" d="${d}"/>`).join("");
}

// cor da brasa ao longo de um percurso (0 = vivo, 1 = vinho)
const STOPS = [[0,[255,70,50]],[0.55,[194,42,28]],[1,[78,14,9]]];
function brasa(t) {
  for (let i = 1; i < STOPS.length; i++) {
    const [a,ca] = STOPS[i-1], [b,cb] = STOPS[i];
    if (t <= b) { const u = (t-a)/(b-a); return "rgb(" + ca.map((v,j) => Math.round(v + (cb[j]-v)*u)).join(",") + ")"; }
  }
  return "rgb(78,14,9)";
}
const C = [65,56], R = 42, deg = Math.PI/180;
const pt = (a, r = R) => [C[0] + r*Math.cos(a*deg), C[1] + r*Math.sin(a*deg)];
const f2 = (p) => p[0].toFixed(2) + " " + p[1].toFixed(2);

// 1. Medidor: arco fino de 300 graus, a cor apaga ao longo da volta
function gauge() {
  const a0 = -95, sw = 300, N = 90; let out = "";
  for (let i = 0; i < N; i++) {
    const p = pt(a0 + sw*i/N), q = pt(a0 + sw*(i+1.15)/N);
    out += `<path d="M${f2(p)}A${R} ${R} 0 0 1 ${f2(q)}" stroke="${brasa(i/N)}" stroke-width="2.6" fill="none"/>`;
  }
  return out;
}
// 2. Régua: anel de marcações, como eixo de gráfico; a cada 5, uma maior
function ticks() {
  let out = ""; const N = 60;
  for (let i = 0; i < N; i++) {
    const a = -90 + 360*i/N, big = i % 5 === 0, p = pt(a, R - (big ? 4.5 : 2.2)), q = pt(a, R + (big ? 1.2 : 0.4));
    out += `<line x1="${p[0].toFixed(2)}" y1="${p[1].toFixed(2)}" x2="${q[0].toFixed(2)}" y2="${q[1].toFixed(2)}" stroke="${brasa(i/N)}" stroke-width="${big ? 2 : 1.3}"/>`;
  }
  return out;
}
const thinRing = `<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="url(#brasaL)" stroke-width="2.2"/>`;
const frame = `<rect x="25" y="16" width="80" height="80" fill="none" stroke="url(#brasaL)" stroke-width="2.2"/>`;
const S2 = 0.8, axisY = (52 - 51*S2 + 91*S2 + 3).toFixed(1);
const axis = `<line x1="18" y1="${axisY}" x2="112" y2="${axisY}" stroke="url(#brasaL)" stroke-width="2"/>`;

// anel de pincel original, para comparar
const T = JSON.parse(readFileSync("tracos.json", "utf8")).C;
const old = `<path d="${T.ring.outline}" fill="url(#brasaL)"/>` +
  ["h","bar","mid","diag","n"].map(k => `<path class="${k === "diag" ? "a" : "k"}" d="${T[k].outline}"/>`).join("");

const hnRing = HN(0.56, 65, 56, "ring");
const V = [
  ["Antes: Brasa", old, "O anel de pincel aberto é o ensō, o círculo zen japonês. Somado ao contraste forte de pincel nas letras, puxa para restaurante japonês.", true],
  ["Medidor", gauge() + hnRing, "O anel vira um arco fino de medidor, com a cor apagando ao longo da volta. A brasa continua, mas agora lembra um gráfico, não um pincel."],
  ["Régua", ticks() + HN(0.56, 65, 56, null), "O anel vira um mostrador de marcações, como o eixo de um gráfico ou um instrumento de precisão. A mão fica só nas letras."],
  ["Anel fino", thinRing + hnRing, "Círculo fechado de traço fino com o degradê. O mais limpo; a mão das letras contrasta com a geometria."],
  ["Moldura", frame + HN(0.56, 65, 56, null), "Quadrado de cantos vivos no lugar do círculo. Some qualquer leitura oriental e fica mais editorial."],
  ["Eixo", axis + HN(S2, 65, 52, "axis"), "Sem moldura: o HN maior apoiado numa linha de base, como o eixo de um gráfico, com a diagonal atravessando a linha."],
];
const card = ([n, svg, note, before], i) => `
<article class="v${before ? " before" : ""}">
  <div class="stage">
    <svg viewBox="14 4 102 104" class="big" role="img" aria-label="Selo HN, versão ${n}">${svg}</svg>
    <div class="wm"><div class="n">Hugo Nazário</div><div class="s">Análise de dados</div></div>
    <div class="av" aria-hidden="true"><svg viewBox="14 4 102 104">${svg}</svg></div>
  </div>
  <div class="meta"><span class="num">${before ? "—" : String(i).padStart(2, "0")}</span><div><h2>${n}</h2><p>${note}</p></div></div>
</article>`;

// reaproveita o CSS da rodada 4, fixando as cores da Brasa
const tpl = readFileSync("marca-cores.html", "utf8");
const head = tpl.slice(0, tpl.indexOf('<div class="wrap">'))
  .replace("--display:", "--let:#b9b3ad; --diag:#ff4632; --bg:#0a0a0b; --wm:#d8d2cc; --wm2:#6e6a66; --display:")
  + `<style>.before .stage{opacity:.55} .before h2{color:var(--ink2)}</style>`;
const html = head + `<div class="wrap">
  <header>
    <div class="eyebrow">Portfólio · identidade · rodada 5 · Brasa</div>
    <h1>Marca Hugo Nazário</h1>
    <p class="lede">A Brasa sem cara de restaurante japonês. As letras continuam escritas à mão, com menos contraste de pincel. Quem muda é a moldura: sai o anel de pincel aberto e entra uma forma precisa, várias delas tiradas do mundo dos gráficos.</p>
  </header>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="brasaL" gradientUnits="userSpaceOnUse" x1="30" y1="12" x2="100" y2="100">
      <stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#4e0e09"/>
    </linearGradient></defs></svg>
  <div class="grid">${V.map(card).join("")}</div>
</div>`;
writeFileSync("marca-hugo-nazario.html", html);
console.log("ok", html.length);
