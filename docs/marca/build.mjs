// Monta a página da rodada 3 a partir dos traços gerados por pena.mjs.
import { readFileSync, writeFileSync } from "node:fs";
const T = JSON.parse(readFileSync("tracos.json", "utf8"));

// ordem da escrita e quem leva a cor, por conceito
const ORDER = {
  A: [["h", "k"], ["bar", "k"], ["mid", "k"], ["diag", "a"], ["n", "k"]],
  B: [["hn", "k"], ["z", "a"]],
  C: [["ring", "k"], ["h", "k"], ["bar", "k"], ["mid", "k"], ["diag", "a"], ["n", "k"]],
};
// duração de cada traço em ms (traço longo demora mais, como na mão)
const DUR = { A: [420, 360, 380, 340, 520], B: [1500, 900], C: [900, 300, 260, 280, 360, 380] };

function big(id) {
  let t = 0, masks = "", paths = "";
  ORDER[id].forEach(([k, cls], i) => {
    const d = DUR[id][i], mid = `${id}-${k}`;
    masks += `<mask id="${mid}" maskUnits="userSpaceOnUse"><path class="d" style="--t:${t}ms;--d:${d}ms" pathLength="1" d="${T[id][k].center}"/></mask>`;
    paths += `<path class="${cls}" mask="url(#${mid})" d="${T[id][k].outline}"/>`;
    t += d - 60;
  });
  return { masks, paths, total: t };
}
function sym(id) {
  return ORDER[id].map(([k, cls]) => `<path class="${cls}" d="${T[id][k].outline}"/>`).join("");
}
const VB = { A: "4 0 120 104", B: "4 2 152 112", C: "14 4 102 104" };
const A = big("A"), B = big("B"), C = big("C");

const tiles = (id, w) => [16, 32, 64].map((s) =>
  `<figure><div class="tile t${s}" style="width:${s}px;height:${s}px"><svg viewBox="${VB[id]}" style="width:${w}%"><use href="#s${id}"/></svg></div><figcaption>${s}</figcaption></figure>`
).join("") + `<figure><div class="tile round t64" style="width:64px;height:64px"><svg viewBox="${VB[id]}" style="width:${w - 18}%"><use href="#s${id}"/></svg></div><figcaption>avatar</figcaption></figure>`;

const section = (id, n, title, text, rows, w) => `
  <section class="c run" id="c${id}">
    <div class="stage">
      <svg class="big" viewBox="${VB[id]}" role="img" aria-label="${title}">
        <defs>${({ A, B, C })[id].masks}</defs>${({ A, B, C })[id].paths}
      </svg>
      <div class="wm" style="--t:${({ A, B, C })[id].total}ms"><div class="n">Hugo Nazário</div><div class="r">Análise de dados</div></div>
      <button class="play" type="button" data-replay="c${id}">Escrever de novo</button>
    </div>
    <div class="info">
      <div><div class="eyebrow">Caminho ${n}</div><h2>${title}</h2></div>
      <p>${text}</p>
      <dl>${rows.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl>
      <div class="sizes">${tiles(id, w)}</div>
    </div>
  </section>`;

const tpl = readFileSync("tpl.html", "utf8")
  .replace("{{SYMS}}", `<g id="sA">${sym("A")}</g><g id="sB">${sym("B")}</g><g id="sC">${sym("C")}</g>`)
  .replace("{{SECTIONS}}",
    section("A", 1, "HN de pena",
      "O H e o N escritos com caneta de ponta chata e depois limpos: a descida sai grossa, a subida sai fina, e a travessa entra de fora da haste, como na referência. A diagonal do N leva a cor. Tem a mão de quem escreveu, mas continua firme.",
      [["Lê como", "HN"], ["Movimento", "A marca é escrita traço a traço, na ordem em que a mão faria, e a diagonal colorida entra no meio do gesto."], ["Força", "O mais legível e o mais fácil de usar em qualquer lugar."]], 86) +
    section("B", 2, "hnz assinatura",
      "Hugo NaZário em letra cursiva, numa linha só, como uma assinatura. O z ganha a cor e termina num laço que sai para a direita, puxando o olho para o resto da página.",
      [["Lê como", "hnz, em cursiva"], ["Movimento", "A caneta corre sem levantar: entra pelo laço do h, passa pelo n e fecha no z."], ["Força", "O mais pessoal. Ninguém tem uma igual porque é uma assinatura."], ["Risco", "Pequeno demais vira rabisco; no favicon precisaria de um símbolo à parte."]], 92) +
    section("C", 3, "Selo à mão",
      "O HN de pena dentro de um anel feito num gesto só, aberto em cima, que começa grosso e termina fino. A diagonal do N passa da letra e corre até encostar no anel. É o caminho 1 com cara de carimbo de autor.",
      [["Lê como", "HN dentro de um selo"], ["Movimento", "O anel é traçado primeiro, numa volta só; depois as letras são escritas dentro."], ["Força", "Funciona sozinho como foto redonda no LinkedIn e no GitHub."]], 96)
  );
writeFileSync("marca-hugo-nazario.html", tpl);
console.log("ok", tpl.length);
