// Gerador de traço de pena chata: recebe a linha central (cúbicas) e devolve o contorno
// com espessura que varia com a direção do traço, como numa caligrafia de verdade.
import { writeFileSync } from "node:fs";

const NIB = (-36 * Math.PI) / 180; // ângulo da ponta da pena

function bez(p0, c1, c2, p1, t) {
  const u = 1 - t;
  return [
    u*u*u*p0[0] + 3*u*u*t*c1[0] + 3*u*t*t*c2[0] + t*t*t*p1[0],
    u*u*u*p0[1] + 3*u*u*t*c1[1] + 3*u*t*t*c2[1] + t*t*t*p1[1],
  ];
}
function sstep(a, b, x) { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t*t*(3-2*t); }

// segs: lista de [c1, c2, p1] encadeados a partir de start
function stroke({ start, segs, wmin = 1.5, wmax = 5.6, tapStart = true, tapEnd = true, scale = 1, dx = 0, dy = 0, n = 16 }) {
  const pts = [];
  let p0 = start;
  for (const [c1, c2, p1] of segs) {
    for (let i = 0; i < n; i++) pts.push(bez(p0, c1, c2, p1, i / n));
    p0 = p1;
  }
  pts.push(p0);
  const P = pts.map(([x, y]) => [x * scale + dx, y * scale + dy]);
  // comprimento acumulado para o afinamento das pontas
  const L = [0];
  for (let i = 1; i < P.length; i++) L.push(L[i-1] + Math.hypot(P[i][0]-P[i-1][0], P[i][1]-P[i-1][1]));
  const total = L[L.length - 1];
  const left = [], right = [];
  for (let i = 0; i < P.length; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const s = L[i] / total;
    let tap = 1;
    if (tapStart) tap *= 0.3 + 0.7 * sstep(0, 0.09, s);
    if (tapEnd) tap *= 0.18 + 0.82 * (1 - sstep(0.86, 1, s));
    const w = (wmin + (wmax - wmin) * Math.abs(Math.sin(ang - NIB))) * tap * scale / 2;
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    left.push([P[i][0] + nx * w, P[i][1] + ny * w]);
    right.push([P[i][0] - nx * w, P[i][1] - ny * w]);
  }
  const f = (q) => q[0].toFixed(1) + " " + q[1].toFixed(1);
  const outline = "M" + left.map(f).join("L") + "L" + right.reverse().map(f).join("L") + "Z";
  const center = "M" + P.map(f).join("L");
  return { outline, center };
}

// ---------- Conceito A: HN num gesto só ----------
const HN = (o = {}) => ({
  h: stroke({ ...o, start: [27, 13], segs: [
    [[24, 36], [22, 63], [25, 91]],      // haste esquerda, levemente arqueada
  ]}),
  bar: stroke({ ...o, start: [11, 57], wmax: 5, segs: [
    [[28, 52], [46, 55], [66, 50]],      // travessa: entra de fora da haste, como na referencia
  ]}),
  mid: stroke({ ...o, start: [63, 92], tapEnd: false, segs: [
    [[65, 66], [66, 38], [64, 11]],      // haste do meio, de baixo para cima
  ]}),
  diag: stroke({ ...o, start: [64, 11], tapStart: false, tapEnd: false, segs: [
    [[71, 34], [84, 66], [97, 90]],      // diagonal do N
  ]}),
  n: stroke({ ...o, start: [97, 90], tapStart: false, segs: [
    [[99, 64], [100, 38], [99, 15]],     // haste direita
    [[99, 8], [106, 4], [117, 8]],       // remate
  ]}),
});
const A = HN();

// ---------- Conceito B: hnz cursivo ----------
const B = {
  hn: stroke({ start: [8, 83], tapEnd: false, wmax: 5.2, segs: [
    [[20, 70], [40, 40], [38, 18]],      // entrada que sobe para o laço do h
    [[37, 7], [25, 7], [26, 20]],
    [[26, 40], [24, 64], [22, 82]],      // haste do h
    [[26, 62], [34, 50], [44, 50]],      // arco do h
    [[54, 50], [56, 61], [55, 72]],
    [[54, 79], [57, 82], [63, 80]],      // gancho de ligação
    [[67, 64], [71, 52], [81, 51]],      // arco do n
    [[91, 50], [93, 62], [92, 72]],
    [[91, 79], [95, 82], [101, 80]],     // gancho de ligação
  ]}),
  z: stroke({ start: [101, 80], tapStart: false, wmax: 5.2, segs: [
    [[105, 66], [107, 55], [113, 52]],
    [[119, 50], [127, 50], [131, 53]],   // barra de cima do z
    [[123, 62], [115, 70], [111, 78]],   // diagonal
    [[121, 76], [131, 80], [129, 91]],   // começo da volta de baixo
    [[127, 105], [110, 109], [112, 99]], // laço
    [[114, 90], [135, 88], [152, 95]],   // saída
  ]}),
};

// ---------- Conceito C: selo à mão (anel aberto + HN) ----------
function ring() {
  // anel desenhado em espiral leve: começa largo e fecha um pouco por dentro
  const pts = [];
  const a0 = (-112 * Math.PI) / 180, sweep = (338 * Math.PI) / 180;
  for (let i = 0; i <= 160; i++) {
    const t = i / 160, a = a0 + sweep * t, r = 47 - 3.5 * t + 1.2 * Math.sin(t * Math.PI * 3);
    pts.push([65 + r * Math.cos(a), 56 + r * Math.sin(a)]);
  }
  // reaproveita o gerador montando cúbicas degeneradas entre pontos vizinhos
  const segs = [];
  for (let i = 1; i < pts.length; i++) segs.push([pts[i-1], pts[i], pts[i]]);
  return stroke({ start: pts[0], segs, wmin: 1.2, wmax: 6.4, n: 1 });
}
const s = 0.56, ox = 65 - 70 * s, oy = 56 - 51 * s; // HN do conceito A encolhido no centro
const hn = HN({ scale: s, dx: ox, dy: oy });
hn.diag = stroke({ start: [64, 11], tapStart: false, scale: s, dx: ox, dy: oy, segs: [
  [[71, 34], [84, 66], [97, 90]], [[103, 101], [108, 108], [112, 112]],
]});
const C = { ring: ring(), ...hn };

writeFileSync(process.argv[2], JSON.stringify({ A, B, C }));
console.log("ok");
