import { readFileSync, writeFileSync } from "node:fs";
const T = JSON.parse(readFileSync("tracos.json","utf8")).C;
const cls = { ring:"r", h:"k", bar:"k", mid:"k", diag:"a", n:"k" };
const sym = Object.entries(cls).map(([k,c]) => `<path class="${c}" d="${T[k].outline}"/>`).join("");
// nome, fundo, anel, letras, diagonal, nome escrito, subtítulo, nota
const V = [
  ["Brasa", "#0a0a0b", "url(#brasa)", "#b9b3ad", "#ff4632", "#d8d2cc", "#6e6a66", "O anel vai do vermelho vivo ao vinho, como tinta acabando na pena. As letras saem do branco para um cinza quente."],
  ["Só o acento", "#0a0a0b", "#2b2a2e", "#8e8a90", "#ff4632", "#a9a5ab", "#5c5a60", "Tudo em grafite e só a diagonal em vermelho. O mais discreto: a cor vira assinatura."],
  ["Tom sobre tom", "#0a0a0b", "#5e130e", "#e2402c", "#ff7a5c", "#e2402c", "#7a2a22", "Três vermelhos: anel vinho, letras vermelhas e diagonal mais clara, que acende."],
  ["Vermelho inteiro", "#0a0a0b", "#ff4632", "#ff4632", "#ffc2b5", "#ff4632", "#8a3127", "Marca toda em vermelho; a diagonal clara mantém o desenho legível."],
  ["Carmim", "#0a0a0b", "#b3261e", "#a8a29c", "#ff4632", "#cfc9c3", "#6a6560", "Anel carmim fechado, letras cinza, diagonal no vermelho vivo. Mais sóbrio que a Brasa."],
  ["Vinho", "#22070a", "#ff4632", "#f1b6aa", "#ff7a5c", "#f1b6aa", "#9a5a52", "Fundo vinho em vez de preto, letras rosadas. Mais quente; serve como seção de destaque no site."],
  ["Selo invertido", "#e2402c", "#0d0b0b", "#0d0b0b", "#f6ede6", "#0d0b0b", "#6e1d14", "Fundo vermelho, marca preta e diagonal clara. Feito para a foto redonda e o card de compartilhamento."],
  ["Brasa vermelha", "#0a0a0b", "url(#brasa)", "#e2402c", "#ffc2b5", "#e2402c", "#7a2a22", "A Brasa sem cinza: anel em degradê, letras vermelhas e a diagonal clara puxando o olho."],
  ["Papel", "#f1ece6", "#c62b1c", "#1b1a1c", "#ff4632", "#1b1a1c", "#8a847e", "Versão clara para currículo e PDF impresso."],
];
const card = ([n,bg,ring,let_,diag,wm,wm2,note], i) => `
<article class="v" style="--bg:${bg};--ring:${ring};--let:${let_};--diag:${diag};--wm:${wm};--wm2:${wm2}">
  <div class="stage">
    <svg viewBox="14 4 102 104" class="big" role="img" aria-label="Selo HN, versão ${n}"><use href="#selo"/></svg>
    <div class="wm"><div class="n">Hugo Nazário</div><div class="s">Análise de dados</div></div>
    <div class="av" aria-hidden="true"><svg viewBox="14 4 102 104"><use href="#selo"/></svg></div>
  </div>
  <div class="meta"><span class="num">${String(i+1).padStart(2,"0")}</span><div><h2>${n}</h2><p>${note}</p></div></div>
</article>`;
const html = `<title>Marca Hugo Nazário</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=Geist+Mono:wght@400;500&display=swap">
<style>
/* Layout: grade de versões de cor do Selo à mão; cada cartão é o selo no próprio fundo,
   com o nome embaixo e a prévia redonda de avatar no canto. */
:root { --page:#08080a; --ink:#ececef; --ink2:#a1a1a9; --ink3:#66666e; --rule:rgba(236,236,239,.09);
  --display:"Archivo","Helvetica Neue",Arial,sans-serif; --mono:"Geist Mono",ui-monospace,Consolas,monospace; color-scheme:dark; }
* { box-sizing:border-box; }
body { background:var(--page); color:var(--ink); font-family:var(--display); font-size:16px; line-height:1.55;
  padding-left:max(16px,env(safe-area-inset-left,0px)); padding-right:max(16px,env(safe-area-inset-right,0px)); padding-block:0 64px; }
.wrap { max-width:1180px; margin:0 auto; }
header { padding-block:48px 32px; border-bottom:1px solid var(--rule); margin-bottom:40px; }
.eyebrow { font:12px var(--mono); letter-spacing:.08em; text-transform:uppercase; color:var(--ink3); }
h1 { font-size:clamp(32px,5vw,52px); font-weight:650; font-stretch:85%; line-height:1; letter-spacing:-.02em; margin:8px 0 0; }
.lede { color:var(--ink2); max-width:62ch; margin:12px 0 0; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr)); gap:40px 28px; }
.v { display:flex; flex-direction:column; gap:16px; min-width:0; }
.stage { background:var(--bg); border-radius:4px; aspect-ratio:1/1; max-width:100%; position:relative;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.04); }
.stage .big { width:48%; height:auto; overflow:visible; }
.wm { text-align:center; display:flex; flex-direction:column; gap:8px; }
.wm .n { color:var(--wm); font-weight:400; font-stretch:125%; font-size:15px; letter-spacing:.3em; margin-right:-.3em; text-transform:uppercase; line-height:1; }
.wm .s { color:var(--wm2); font:9.5px var(--mono); letter-spacing:.42em; margin-right:-.42em; text-transform:uppercase; line-height:1; }
.av { position:absolute; right:12px; top:12px; width:44px; height:44px; border-radius:50%; background:var(--bg);
  box-shadow:0 0 0 1px rgba(127,127,127,.25); display:grid; place-items:center; }
.av svg { width:86%; height:auto; --sw:2.2; }
.r { fill:var(--ring); stroke:var(--ring); stroke-width:var(--sw,0); stroke-linejoin:round; }
.k { fill:var(--let); stroke:var(--let); stroke-width:var(--sw,0); stroke-linejoin:round; }
.a { fill:var(--diag); stroke:var(--diag); stroke-width:var(--sw,0); stroke-linejoin:round; }
.meta { display:flex; gap:14px; align-items:baseline; }
.num { font:12px var(--mono); color:var(--ink3); font-variant-numeric:tabular-nums; }
.meta h2 { font-size:20px; font-weight:650; font-stretch:92%; margin:0; line-height:1.2; }
.meta p { margin:4px 0 0; color:var(--ink2); font-size:14px; max-width:46ch; }
.v .big { animation: in .9s cubic-bezier(.2,.7,0,1) both; }
@keyframes in { from { opacity:.0; transform: scale(.96) rotate(-4deg); } to { opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce) { * { animation:none !important; } }
</style>
<div class="wrap">
  <header>
    <div class="eyebrow">Portfólio · identidade · rodada 4 · Selo à mão</div>
    <h1>Marca Hugo Nazário</h1>
    <p class="lede">Nove versões de cor do selo, todas em vermelho, com menos branco. O círculo no canto de cada quadro mostra como fica a foto redonda do LinkedIn e do GitHub.</p>
  </header>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="brasa" gradientUnits="userSpaceOnUse" x1="30" y1="12" x2="100" y2="100">
      <stop offset="0" stop-color="#ff4632"/><stop offset=".55" stop-color="#c22a1c"/><stop offset="1" stop-color="#4e0e09"/>
    </linearGradient>
    <g id="selo">${sym}</g></defs></svg>
  <div class="grid">${V.map(card).join("")}</div>
</div>`;
writeFileSync("marca-cores.html", html);
console.log("ok", html.length);
