/**
 * Movimento — a luz na fibra. Um módulo só, ligado uma vez pelo Index.
 *
 * O tema vem do trabalho de quem assina a página: a operação medida é uma rede
 * de fibra. O CSS (GlobalStyles, bloco "a luz na fibra") desenha; este arquivo
 * só decide QUANDO:
 *
 * 1. CABEÇALHOS. Quando uma seção chega, a luz corre no fio do topo e o título
 *    sobe da máscara — o mesmo gesto do nome no cartaz. Uma vez só.
 * 2. PROJETOS. Os cartões entram como lista (cascata curta) e os números de
 *    cada cartão contam de 0 até o valor publicado (88.501, AUC 0,785…). O texto final é idêntico
 *    ao do HTML: a contagem reescreve o nó durante ~0,9 s e devolve o original.
 * 3. TRAJETÓRIA. O fio lima desce com a rolagem e cada marco acende quando a
 *    luz chega nele.
 *
 * 4. FAIXA. A faixa de tecnologias pausa quando sai da tela.
 *
 * Seguro por construção: nada fica escondido sem JS (o estado oculto só vale
 * sob `html.hl-motion`, que este script põe) e nada roda com "reduzir
 * movimento" ligado no sistema.
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function cabecalhos() {
  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      e.target.classList.add("is-in");
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.2 });
  document.querySelectorAll(".hl-head, .hl-contato-titulo").forEach((el) => io.observe(el));
}

function cartoes() {
  const io = new IntersectionObserver((entradas) => {
    let i = 0;
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      el.classList.add("is-in");
      // WAAPI e não transição CSS: o cartão tem `transition` e `transform`
      // inline (hover), que venceriam qualquer regra de folha.
      el.animate(
        [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }],
        { duration: 700, delay: Math.min(i, 6) * 80, easing: EASE, fill: "backwards" },
      );
      i++;
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  document.querySelectorAll("#projetos article").forEach((el) => {
    el.setAttribute("data-rv", "");
    io.observe(el);
  });
}

/** Número pt-BR: 88.501 · 0,785 · 15,9 · 600. Ano solto (1900–2099) não conta. */
const NUM = /\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+,\d+|\d+/g;

function contagem() {
  const raizes = document.querySelectorAll("#projetos article p");
  const nos: Text[] = [];
  raizes.forEach((r) => {
    const w = document.createTreeWalker(r, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (/\d/.test(n.nodeValue ?? "")) nos.push(n as Text);
    }
  });

  const tocar = (no: Text) => {
    const original = no.nodeValue ?? "";
    const partes: { ini: number; fim: number; valor: number; casas: number; milhar: boolean }[] = [];
    for (const m of original.matchAll(NUM)) {
      const s = m[0];
      const valor = Number(s.replace(/\./g, "").replace(",", "."));
      const ano = /^\d{4}$/.test(s) && valor >= 1900 && valor < 2100;
      if (ano || !Number.isFinite(valor) || valor === 0) continue;
      partes.push({
        ini: m.index!, fim: m.index! + s.length, valor,
        casas: s.includes(",") ? s.split(",")[1].length : 0,
        milhar: s.includes("."),
      });
    }
    if (!partes.length) return;

    const fmt = (v: number, casas: number, milhar: boolean) =>
      v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas, useGrouping: milhar });

    const t0 = performance.now(), dur = 900;
    const passo = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      let s = "", cur = 0;
      for (const p of partes) {
        const v = p.casas ? p.valor * e : Math.round(p.valor * e);
        s += original.slice(cur, p.ini) + fmt(v, p.casas, p.milhar);
        cur = p.fim;
      }
      no.nodeValue = k < 1 ? s + original.slice(cur) : original;
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      nos.filter((n) => e.target.contains(n)).forEach(tocar);
    }
  }, { threshold: 0.4 });
  raizes.forEach((r) => io.observe(r));
}

function trilho() {
  const t = document.querySelector<HTMLElement>(".hl-trilho");
  if (!t) return;
  const marcas = [...t.querySelectorAll<HTMLElement>(".hl-exp-marca")];
  let pendente = false;
  const medir = () => {
    pendente = false;
    const r = t.getBoundingClientRect();
    // 0 quando o topo do trilho cruza 70% da tela; 1 quando o fim cruza 70%.
    const alvo = window.innerHeight * 0.7;
    const p = Math.max(0, Math.min(1, (alvo - r.top) / r.height));
    t.style.setProperty("--p", p.toFixed(4));
    // O marco acende quando a ponta da luz passa por ele — a mesma conta.
    const ponta = r.top + p * r.height;
    marcas.forEach((m) => m.classList.toggle("aceso", m.getBoundingClientRect().top <= ponta + 1));
  };
  const agendar = () => { if (!pendente) { pendente = true; requestAnimationFrame(medir); } };
  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
  medir();
}

function faixa() {
  const el = document.querySelector(".hl-faixa");
  if (!el) return;
  new IntersectionObserver(([e]) => el.classList.toggle("hl-fora", !e.isIntersecting)).observe(el);
}

let ligado = false;

export function iniciarMovimento() {
  // StrictMode roda o efeito duas vezes em dev; observador dobrado anima dobrado.
  if (ligado) return;
  ligado = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("hl-motion");
  cabecalhos();
  cartoes();
  contagem();
  trilho();
  faixa();
}
