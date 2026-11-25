// Rodada 6: versões a partir das inspirações ins1..ins4 do Hugo, na paleta Brasa.
import { readFileSync, writeFileSync } from "node:fs";

// ---------- traço de caneta (para a família 2) ----------
const NIB = (-36 * Math.PI) / 180;
const bez = (p0,c1,c2,p1,t) => { const u=1-t; return [u*u*u*p0[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p1[0], u*u*u*p0[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p1[1]]; };
const ss = (a,b,x) => { const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
function pen({ start, segs, wmin=1.6, wmax=4.2, n=18 }) {
  const P=[]; let p0=start;
  for (const [c1,c2,p1] of segs) { for (let i=0;i<n;i++) P.push(bez(p0,c1,c2,p1,i/n)); p0=p1; }
  P.push(p0);
  const L=[0]; for (let i=1;i<P.length;i++) L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
  const tot=L[L.length-1], A=[], B=[];
  for (let i=0;i<P.length;i++) {
    const a=P[Math.max(0,i-1)], b=P[Math.min(P.length-1,i+1)], ang=Math.atan2(b[1]-a[1],b[0]-a[0]), s=L[i]/tot;
    const tap=(0.3+0.7*ss(0,0.1,s))*(0.15+0.85*(1-ss(0.85,1,s)));
    const w=(wmin+(wmax-wmin)*Math.abs(Math.sin(ang-NIB)))*tap/2, nx=-Math.sin(ang), ny=Math.cos(ang);
    A.push([P[i][0]+nx*w,P[i][1]+ny*w]); B.push([P[i][0]-nx*w,P[i][1]-ny*w]);
  }
  const f=q=>q[0].toFixed(1)+" "+q[1].toFixed(1);
  return "M"+A.map(f).join("L")+"L"+B.reverse().map(f).join("L")+"Z";
}

const poly = (pts, k = 0) => "M" + pts.map(([x,y]) => (x + k*(100-y)).toFixed(1) + " " + y.toFixed(1)).join("L") + "Z";

// ---------- Família 1 (ins1): HN itálico ----------
const HN1 = [[0,0],[16,0],[16,42],[42,42],[42,0],[60,0],[84,60],[84,0],[100,0],[100,100],[82,100],[58,40],[58,100],[42,100],[42,58],[16,58],[16,100],[0,100]];
const DIAG1 = [[42,0],[60,0],[100,100],[82,100]];
const K = 0.45, VB1 = "-8 -8 161 116";
const f1 = {
  a: `<path d="${poly(HN1,K)}" fill="none" stroke="url(#br)" stroke-width="2.6" stroke-linejoin="miter"/>`,
  b: `<path d="${poly(HN1,K)}" fill="url(#br)"/>`,
  c: `<path d="${poly(DIAG1,K)}" fill="#ff4632"/><path d="${poly(HN1,K)}" fill="none" stroke="#b9b3ad" stroke-width="2.4"/>`,
};

// ---------- Família 2 (ins2): assinatura atravessando o círculo ----------
const H2 = [
  pen({ start:[52,12], segs:[[[50,40],[47,70],[43,100]]] }),                    // haste esquerda, passa do círculo
  pen({ start:[75,20], segs:[[[73,40],[71,62],[68,82]]] }),                     // haste direita
  pen({ start:[24,60], wmax:3.4, segs:[[[45,50],[78,52],[112,40]]] }),          // travessa que sai pela direita
].map(d => `<path class="L" d="${d}"/>`).join("");
const N2 = pen({ start:[74,92], wmax:3.6, segs:[[[75,84],[76,78],[77,74]],[[80,68],[90,68],[90,76]],[[90,82],[89,88],[90,91]],[[91,94],[96,93],[100,89]]] });
const RING2 = `<circle cx="62" cy="54" r="38" fill="none" stroke-width="1.6"`;
const VB2 = "6 4 112 104";
const f2 = {
  a: `${RING2} stroke="url(#br)"/>${H2.replaceAll('class="L"','fill="#b9b3ad"')}<path d="${N2}" fill="#ff4632"/>`,
  b: `${RING2} stroke="#3a3836"/>${H2.replaceAll('class="L"','fill="url(#brV)"')}<path d="${N2}" fill="#b9b3ad"/>`,
  c: `<path d="M24 54 A38 38 0 0 1 100 54" fill="none" stroke="url(#br)" stroke-width="1.6"/>${H2.replaceAll('class="L"','fill="#ff4632"')}<path d="${N2}" fill="#ff4632"/>`,
};

// ---------- Família 3 (ins3): bloco anguloso ----------
const HN3 = [[0,10],[24,0],[24,40],[38,40],[38,0],[64,0],[76,33.3],[76,0],[100,0],[100,88],[88,100],[74,100],[62,66.7],[62,100],[38,100],[38,60],[24,60],[24,100],[0,100]];
const H3 = [[0,10],[24,0],[24,40],[38,40],[38,0],[61,0],[61,100],[38,100],[38,60],[24,60],[24,100],[0,100]];
const N3 = [[63,0],[64,0],[76,33.3],[76,0],[100,0],[100,88],[88,100],[74,100],[63,69.4]];
const VB3 = "-12 -12 124 124";
const f3 = {
  a: `<path d="${poly(HN3)}" fill="url(#br)"/>`,
  b: `<path d="${poly(H3)}" fill="#b9b3ad"/><path d="${poly(N3)}" fill="#ff4632"/>`,
  c: `<rect x="-12" y="-12" width="124" height="124" fill="url(#br)"/><path d="${poly(HN3.map(([x,y])=>[x*0.7+15,y*0.7+15]))}" fill="#0a0a0b"/>`,
};

// ---------- Família 4 (ins4): selo redondo, sem a letra cursiva ----------
const VB4 = "0 0 120 120";
const ring4 = (st, w = 1.6) => `<circle cx="60" cy="60" r="52" fill="none" stroke="${st}" stroke-width="${w}"/>`;
const f4 = {
  a: ring4("url(#br)") + `<g transform="translate(23 39) scale(0.5)"><path d="${poly(DIAG1,K)}" fill="#ff4632"/><path d="${poly(HN1,K)}" fill="none" stroke="#b9b3ad" stroke-width="2.4" vector-effect="non-scaling-stroke"/></g>`,
  b: ring4("#3a3836", 1.2) + ring4("url(#br)", 1.2).replace('r="52"','r="47"') +
     `<text x="49" y="78" text-anchor="middle" font-family="'Bodoni Moda', Didot, Georgia, serif" font-style="italic" font-weight="500" font-size="54" fill="#b9b3ad">H</text>` +
     `<text x="73" y="78" text-anchor="middle" font-family="'Bodoni Moda', Didot, Georgia, serif" font-style="italic" font-weight="500" font-size="54" fill="#ff4632">N</text>`,
  c: ring4("url(#br)", 2) + `<g transform="translate(36 36) scale(0.48)"><path d="${poly(H3)}" fill="#b9b3ad"/><path d="${poly(N3)}" fill="#ff4632"/></g>`,
};

const b64 = (i) => "data:image/png;base64," + readFileSync(`ins${i}.b64`, "utf8").trim();
const FAM = [
  [1, "Itálico vazado", "HN inclinado, desenhado só pelo contorno, como na ins1. A inclinação dá movimento; o vazado deixa leve.", VB1, [
    ["a", "Contorno em brasa", "O contorno inteiro em degradê, do vermelho ao vinho.", f1.a],
    ["b", "Cheio", "A mesma forma preenchida. Mais forte, aguenta melhor tamanho pequeno.", f1.b],
    ["c", "Diagonal acesa", "Contorno cinza e só a diagonal do N preenchida de vermelho.", f1.c]]],
  [2, "Assinatura no círculo", "H escrito à mão atravessando um círculo fino, com a travessa saindo pela borda e um n pequeno, como na ins2.", VB2, [
    ["a", "Anel em brasa", "Círculo em degradê, H cinza e o n em vermelho.", f2.a],
    ["b", "H em brasa", "O H leva o degradê; o círculo fica quase apagado.", f2.b],
    ["c", "Meio arco", "Só metade do círculo, em cima. Mais aberto, menos selo.", f2.c]]],
  [3, "Bloco anguloso", "HN sólido e pesado, com cortes em diagonal nos cantos, na linha da ins3.", VB3, [
    ["a", "Bloco em brasa", "A forma inteira com o degradê.", f3.a],
    ["b", "Duas cores", "H em cinza, N em vermelho. As duas letras se leem separadas.", f3.b],
    ["c", "Recortado", "Quadrado em brasa com o HN vazado em preto. Pronto para avatar.", f3.c]]],
  [4, "Selo redondo", "O selo da ins4 com outra letra: no lugar da cursiva, formas desta rodada e uma serifa clássica.", VB4, [
    ["a", "Selo itálico", "O HN vazado da família 1 dentro do anel em brasa.", f4.a],
    ["b", "Selo serifado", "Anel duplo e HN em serifa itálica de alto contraste, H cinza e N vermelho.", f4.b],
    ["c", "Selo em bloco", "O HN anguloso da família 3 dentro do anel.", f4.c]]],
];

const card = (vb, num, id, name, note, svg) => `
  <article class="v">
    <div class="stage">
      <svg viewBox="${vb}" class="big" role="img" aria-label="${name}">${svg}</svg>
      <div class="wm"><div class="n">Hugo Nazário</div><div class="s">Análise de dados</div></div>
      <div class="av" aria-hidden="true"><svg viewBox="${vb}">${svg}</svg></div>
    </div>
    <div class="meta"><span class="num">${num}${id}</span><div><h3>${name}</h3><p>${note}</p></div></div>
  </article>`;

const html = `<title>Marca Hugo Nazário</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=Bodoni+Moda:ital,wght@1,500&family=Geist+Mono:wght@400;500&display=swap">
<style>
/* Layout: uma faixa por inspiração; à esquerda a referência do Hugo, à direita as três versões em Brasa. */
:root { --page:#08080a; --tile:#0e0e10; --ink:#ececef; --ink2:#a1a1a9; --ink3:#66666e; --rule:rgba(236,236,239,.09);
  --display:"Archivo","Helvetica Neue",Arial,sans-serif; --mono:"Geist Mono",ui-monospace,Consolas,monospace; color-scheme:dark; }
* { box-sizing:border-box; }
body { background:var(--page); color:var(--ink); font-family:var(--display); font-size:16px; line-height:1.55;
  padding-left:max(16px,env(safe-area-inset-left,0px)); padding-right:max(16px,env(safe-area-inset-right,0px)); padding-block:0 64px; }
.wrap { max-width:1240px; margin:0 auto; }
header { padding-block:48px 28px; border-bottom:1px solid var(--rule); }
.eyebrow { font:12px var(--mono); letter-spacing:.08em; text-transform:uppercase; color:var(--ink3); }
h1 { font-size:clamp(32px,5vw,52px); font-weight:650; font-stretch:85%; line-height:1; letter-spacing:-.02em; margin:8px 0 0; }
.lede { color:var(--ink2); max-width:64ch; margin:12px 0 0; }
section.fam { display:grid; grid-template-columns:minmax(0,200px) minmax(0,1fr); gap:28px; padding-block:40px; border-bottom:1px solid var(--rule); }
.ref { display:flex; flex-direction:column; gap:10px; }
.ref img { width:100%; border-radius:4px; background:#000; }
.ref h2 { font-size:22px; font-weight:650; font-stretch:90%; margin:4px 0 0; line-height:1.15; }
.ref p { color:var(--ink2); font-size:14px; margin:0; }
.row { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.v { display:flex; flex-direction:column; gap:12px; min-width:0; }
.stage { background:var(--tile); border-radius:4px; aspect-ratio:1/1; max-width:100%; position:relative;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
.stage .big { width:54%; height:auto; overflow:visible; }
.wm { text-align:center; display:flex; flex-direction:column; gap:7px; }
.wm .n { color:#d8d2cc; font-weight:400; font-stretch:125%; font-size:13px; letter-spacing:.3em; margin-right:-.3em; text-transform:uppercase; line-height:1; }
.wm .s { color:#6e6a66; font:8.5px var(--mono); letter-spacing:.42em; margin-right:-.42em; text-transform:uppercase; line-height:1; }
.av { position:absolute; right:10px; top:10px; width:40px; height:40px; border-radius:50%; background:#0a0a0b;
  box-shadow:0 0 0 1px rgba(127,127,127,.25); display:grid; place-items:center; overflow:hidden; }
.av svg { width:74%; height:auto; }
.meta { display:flex; gap:12px; align-items:baseline; }
.num { font:12px var(--mono); color:#ff4632; }
.meta h3 { font-size:17px; font-weight:650; font-stretch:92%; margin:0; line-height:1.2; }
.meta p { margin:3px 0 0; color:var(--ink2); font-size:13.5px; }
@media (max-width:900px) { section.fam { grid-template-columns:minmax(0,1fr); } .ref img { max-width:220px; } }
@media (max-width:640px) { .row { grid-template-columns:minmax(0,1fr); } }
</style>
<div class="wrap">
  <header>
    <div class="eyebrow">Portfólio · identidade · rodada 6 · a partir das suas inspirações</div>
    <h1>Marca Hugo Nazário</h1>
    <p class="lede">Três versões para cada inspiração, todas na paleta Brasa: vermelho vivo descendo para o vinho, cinza quente e preto. O código no canto (1a, 2b...) serve para você dizer qual valida. O círculo pequeno mostra a foto redonda.</p>
  </header>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="br" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#6a130c"/></linearGradient>
    <linearGradient id="brV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff4632"/><stop offset="1" stop-color="#8a1a10"/></linearGradient>
  </defs></svg>
  ${FAM.map(([n, t, d, vb, vs]) => `
  <section class="fam">
    <div class="ref"><img src="${b64(n)}" alt="Inspiração ins${n}"><div class="eyebrow">ins${n}</div><h2>${t}</h2><p>${d}</p></div>
    <div class="row">${vs.map(([id, nm, nt, svg]) => card(vb, n, id, nm, nt, svg)).join("")}</div>
  </section>`).join("")}
</div>`;
writeFileSync("marca-hugo-nazario.html", html);
console.log("ok", html.length);
