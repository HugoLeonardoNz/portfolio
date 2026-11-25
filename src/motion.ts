import type { CSSProperties } from "react";

/**
 * Movimento: o gesto da caneta. Um módulo só, ligado uma vez pelo Index.
 *
 * A gramática tem três verbos e nada mais:
 * 1. ESCREVER: traço que se desenha (a logo, o anel da foto, o fio sob cada
 *    título, a linha da trajetória). `stroke-dashoffset` de 1 a 0.
 * 2. SUBIR: texto que nasce de uma máscara, 0,9 s, curva que desacelera longa.
 * 3. REVELAR: bloco que aparece com 14 px de subida, uma vez, quando entra.
 *
 * Seguro por construção: nada fica escondido sem JS (o estado oculto só vale
 * sob `html.hl-motion`, que este script põe) e nada anima com "reduzir
 * movimento" ligado no sistema.
 */

/** Atraso de entrada de um elemento da abertura, lido pelo CSS como `--d`. */
export function atraso(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

function revelar() {
  const io = new IntersectionObserver((entradas) => {
    let n = 0;
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      // Blocos que entram juntos chegam em cascata curta, não de uma vez.
      el.style.setProperty("--d", `${n++ * 70}ms`);
      el.classList.add("is-in");
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
  document.querySelectorAll(".hl-revela, .contato-titulo, .hl-assina").forEach((el) => io.observe(el));
}

function trilho() {
  const t = document.querySelector<HTMLElement>(".trilho");
  if (!t) return;
  const marcos = [...t.querySelectorAll<HTMLElement>(".exp")];
  let pendente = false;
  const medir = () => {
    pendente = false;
    const r = t.getBoundingClientRect();
    // 0 quando o topo do trilho cruza 70% da tela; 1 quando o fim cruza 70%.
    const alvo = window.innerHeight * 0.7;
    const p = Math.max(0, Math.min(1, (alvo - r.top) / r.height));
    t.style.setProperty("--p", p.toFixed(4));
    const ponta = r.top + p * r.height;
    marcos.forEach((m) => m.classList.toggle("aceso", m.getBoundingClientRect().top + 10 <= ponta));
  };
  const agendar = () => { if (!pendente) { pendente = true; requestAnimationFrame(medir); } };
  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
  medir();
}

let ligado = false;

export function iniciarMovimento() {
  // StrictMode roda o efeito duas vezes em dev; observador dobrado anima dobrado.
  if (ligado) return;
  ligado = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // `?estatico` desliga o movimento: serve para print de página inteira.
  if (new URLSearchParams(window.location.search).has("estatico")) return;
  if (!("IntersectionObserver" in window)) return;
  const html = document.documentElement;
  html.classList.add("hl-motion");
  // Dois quadros: o primeiro pinta o estado escondido, o segundo dispara a entrada.
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add("hl-entrou")));
  revelar();
  trilho();
}
