// Rodada 7: redesenho fiel das inspirações ins1..ins4, com variações pequenas, na paleta Brasa.
import { readFileSync, writeFileSync } from "node:fs";
const P = (pts) => "M" + pts.map(p => p.join(" ")).join("L") + "Z";
const RED = "#ff4632", GREY = "#cfc8c1", BG = "#0e0e10";

// ---------- ins1: HN itálico vazado (coordenadas da referência ampliada) ----------
const N1 = [[45,385],[172,100],[358,345],[500,50],[430,50],[318,290],[211,150],[105,385]];
const B1 = [[160,385],[225,385],[376,50],[311,50]];
const VB1 = "20 25 510 385";
const i1 = (stroke, w, fillDiag) => `
  <path d="${P(B1)}" fill="${BG}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="miter"/>
  <path d="${P(N1)}" fill="${fillDiag ? fillDiag : BG}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="miter"/>`;
const f1 = [
  ["Fiel", "O desenho da referência, linhas em vermelho.", i1(RED, 7)],
  ["Degradê", "Mesmo desenho, contorno em brasa e traço um pouco mais grosso.", i1("url(#br)", 9)],
  ["N cheio", "O N preenchido em brasa; o segundo traço do H fica só no contorno.", i1(RED, 7, "url(#br)")],
];

// ---------- ins2: Hn atravessando o círculo cortado ----------
const C2 = [310, 245], R2 = 145, d = Math.PI / 180;
const pc = (a) => [(C2[0] + R2 * Math.cos(a * d)).toFixed(1), (C2[1] + R2 * Math.sin(a * d)).toFixed(1)];
const arc = (a0, a1) => { const p = pc(a0), q = pc(a1); return `M${p[0]} ${p[1]} A${R2} ${R2} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${q[0]} ${q[1]}`; };
const letters2 = (col, w) => `
  <path d="M455 250 L245 262 L238 385" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M347 148 L238 385" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
  <path d="M405 183 L382 322" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
  <path d="M391 323 L395 299 Q401 289 407 299 L404 322" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const VB2 = "140 85 350 330";
const f2 = [
  ["Fiel", "Círculo cortado pela travessa, H alto e o n pequeno, como na referência.",
    `<path d="${arc(84, 362)}" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>${letters2(RED, 6)}<circle cx="${pc(84)[0]}" cy="${pc(84)[1]}" r="6" fill="${RED}"/>`],
  ["Círculo vermelho, letras claras", "O círculo leva a cor e as letras ficam em cinza claro.",
    `<path d="${arc(84, 362)}" fill="none" stroke="url(#br)" stroke-width="6" stroke-linecap="round"/>${letters2(GREY, 5.5)}<circle cx="${pc(84)[0]}" cy="${pc(84)[1]}" r="6" fill="${RED}"/>`],
  ["Círculo mais curto", "O arco termina antes, abrindo um respiro embaixo à esquerda.",
    `<path d="${arc(140, 362)}" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>${letters2(GREY, 5.5)}<circle cx="${pc(140)[0]}" cy="${pc(140)[1]}" r="6" fill="${RED}"/>`],
];

// ---------- ins3: bloco anguloso (coordenadas da referência ampliada) ----------
const L3 = [[48,30],[125,72],[125,375],[205,418],[48,505]];
const R3 = [[378,118],[535,30],[535,505],[458,465],[458,160]];
const M3 = [[190,95],[395,215],[395,300],[335,265],[335,315],[395,350],[395,440],[190,325],[190,240],[248,273],[248,228],[190,195]];
const VB3 = "20 5 545 525";
const f3 = [
  ["Fiel", "O desenho da referência em vermelho chapado.", `<g fill="${RED}"><path d="${P(L3)}"/><path d="${P(R3)}"/><path d="${P(M3)}"/></g>`],
  ["Degradê", "Mesmo desenho com o degradê da brasa.", `<g fill="url(#brA)"><path d="${P(L3)}"/><path d="${P(R3)}"/><path d="${P(M3)}"/></g>`],
  ["Centro claro", "As laterais em vermelho e o bloco do meio, onde está o H, em cinza claro.", `<g fill="${RED}"><path d="${P(L3)}"/><path d="${P(R3)}"/></g><path d="${P(M3)}" fill="${GREY}"/>`],
];

// ---------- ins4: selo redondo, com outra letra no lugar da cursiva ----------
const VB4 = "0 0 300 300";
const disc = `<circle cx="150" cy="150" r="118" fill="#1a1516"/>`;
const ring = (extra = "") => `<circle cx="150" cy="150" r="118" fill="none" stroke="${RED}" stroke-width="6" ${extra}/>`;
const txt = (fam, style, w, size, x, y, col, ch) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${fam}" font-style="${style}" font-weight="${w}" font-size="${size}" fill="${col}">${ch}</text>`;
const f4 = [
  ["Serifa itálica", "Círculo inteiro como na referência; no lugar da cursiva, H e N sobrepostos em serifa itálica.",
    disc + ring() + txt("'Cormorant Garamond', Georgia, serif", "italic", 600, 170, 128, 205, GREY, "H") + txt("'Cormorant Garamond', Georgia, serif", "italic", 600, 170, 176, 222, RED, "N")],
  ["Serifa reta, círculo cortado", "Letras retas de alto contraste e um corte pequeno no círculo, em cima à direita.",
    disc + ring('pathLength="100" stroke-dasharray="90 10" transform="rotate(-62 150 150)"') + txt("'Bodoni Moda', Didot, Georgia, serif", "normal", 500, 150, 124, 200, GREY, "H") + txt("'Bodoni Moda', Didot, Georgia, serif", "normal", 500, 150, 180, 214, RED, "N")],
  ["Traço à mão", "O Hn de traço fino da ins2 dentro do selo inteiro.",
    disc + ring() + `<g transform="translate(-118 -95) scale(0.86)">${letters2(GREY, 6).replace('M455 250 L245 262 L238 385', 'M410 252 L245 262 L238 385')}</g>`],
];

const b64 = (i) => "data:image/png;base64," + readFileSync(`ins${i}.b64`, "utf8").trim();
const FAM = [[1, "Itálico vazado", VB1, f1], [2, "Hn no círculo cortado", VB2, f2], [3, "Bloco anguloso", VB3, f3], [4, "Selo redondo", VB4, f4]];
const card = (vb, n, i, [name, note, svg]) => `
  <article class="v"><div class="stage">
    <svg viewBox="${vb}" class="big" role="img" aria-label="${name}">${svg}</svg>
    <div class="wm"><div class="n">Hugo Nazário</div><div class="s">Análise de dados</div></div>
  </div><div class="meta"><span class="num">${n}${"abc"[i]}</span><div><h3>${name}</h3><p>${note}</p></div></div></article>`;

const html = `<title>Marca Hugo Nazário</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=Bodoni+Moda:wght@500&family=Cormorant+Garamond:ital,wght@1,600&family=Geist+Mono:wght@400;500&display=swap">
<style>
/* Layout: uma faixa por inspiração; a referência do Hugo à esquerda e três redesenhos fiéis ao lado. */
:root { --page:#08080a; --tile:${BG}; --ink:#ececef; --ink2:#a1a1a9; --ink3:#66666e; --rule:rgba(236,236,239,.09);
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
.row { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.v { display:flex; flex-direction:column; gap:12px; min-width:0; }
.stage { background:var(--tile); border-radius:4px; aspect-ratio:1/1; max-width:100%;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
.stage .big { width:56%; height:auto; overflow:visible; }
.wm { text-align:center; display:flex; flex-direction:column; gap:7px; }
.wm .n { color:#d8d2cc; font-weight:400; font-stretch:125%; font-size:13px; letter-spacing:.3em; margin-right:-.3em; text-transform:uppercase; line-height:1; }
.wm .s { color:#6e6a66; font:8.5px var(--mono); letter-spacing:.42em; margin-right:-.42em; text-transform:uppercase; line-height:1; }
.meta { display:flex; gap:12px; align-items:baseline; }
.num { font:12px var(--mono); color:${RED}; }
.meta h3 { font-size:17px; font-weight:650; font-stretch:92%; margin:0; line-height:1.2; }
.meta p { margin:3px 0 0; color:var(--ink2); font-size:13.5px; }
@media (max-width:900px) { section.fam { grid-template-columns:minmax(0,1fr); } .ref img { max-width:220px; } }
@media (max-width:640px) { .row { grid-template-columns:minmax(0,1fr); } }
</style>
<div class="wrap">
  <header>
    <div class="eyebrow">Portfólio · identidade · rodada 7 · fiel às inspirações</div>
    <h1>Marca Hugo Nazário</h1>
    <p class="lede">Cada inspiração redesenhada em vetor seguindo as linhas da imagem, com poucas mudanças entre as três versões: cor, espessura e um corte no círculo. Na ins4, a cursiva foi trocada por outras letras. Diga o código (1a, 2b...) que valida.</p>
  </header>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="br" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#6a130c"/></linearGradient>
    <linearGradient id="brA" gradientUnits="userSpaceOnUse" x1="40" y1="20" x2="540" y2="520"><stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#6a130c"/></linearGradient>
  </defs></svg>
  ${FAM.map(([n, t, vb, vs]) => `
  <section class="fam">
    <div class="ref"><img src="${b64(n)}" alt="Inspiração ins${n}"><div class="eyebrow">ins${n}</div><h2>${t}</h2></div>
    <div class="row">${vs.map((v, i) => card(vb, n, i, v)).join("")}</div>
  </section>`).join("")}
</div>`;
writeFileSync("marca-hugo-nazario.html", html);
console.log("ok", html.length);
