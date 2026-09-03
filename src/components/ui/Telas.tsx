import { useState } from "react";
import { C, F, R } from "../../theme";
import { PhotoLightbox } from "./PhotoLightbox";

/**
 * Miniatura navegável das telas de um projeto.
 *
 * Um relatório Power BI tem 5 ou 6 páginas, um app Streamlit tem 4 ou 5 abas,
 * uma EDA tem 7 gráficos. O cartão mostrava só o nome e um parágrafo — quem não
 * clicasse no GitHub não via nada do que o projeto entrega.
 *
 * Decisões que valem explicar:
 *
 * - **`loading="lazy"` e só a tela atual no DOM.** São 27 imagens no total; a
 *   página não pode baixar todas na abertura.
 * - **Proporção fixa com `object-fit: contain`.** As telas têm formatos
 *   diferentes (gráfico largo, página de relatório 16:9, app com barra
 *   lateral). Recortar para preencher cortaria justamente o número que a tela
 *   existe para mostrar.
 * - **Setas e pontos, sem arrasto.** O cartão vive dentro de uma grade que
 *   rola na vertical; capturar gesto horizontal aqui brigaria com o scroll.
 */
export function Telas({ slug, total, alt }: { slug: string; total: number; alt: string }) {
  const [i, setI] = useState(0);
  if (!total) return null;

  const ir = (d: number) => setI((v) => (v + d + total) % total);
  const src = `${import.meta.env.BASE_URL}telas/${slug}/${String(i + 1).padStart(2, "0")}.png`;

  return (
    <div style={{ marginTop: "1.4rem" }}>
      <div style={{
        position: "relative", background: C.darkAlt,
        borderRadius: R.ctrl, overflow: "hidden",
        aspectRatio: "16 / 9",
      }}>
        <PhotoLightbox
          src={src}
          alt={`${alt} — tela ${i + 1} de ${total}`}
          onAnterior={total > 1 ? () => ir(-1) : undefined}
          onProxima={total > 1 ? () => ir(1) : undefined}
        >
          <img
            key={src} src={src} alt={`${alt} — tela ${i + 1} de ${total}`} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </PhotoLightbox>

        {total > 1 && (
          <>
            {[
              { d: -1, lado: { left: 8 }, sinal: "‹", rot: "Tela anterior" },
              { d:  1, lado: { right: 8 }, sinal: "›", rot: "Próxima tela" },
            ].map((b) => (
              <button
                key={b.sinal} onClick={() => ir(b.d)} aria-label={b.rot}
                style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  ...b.lado,
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(20,28,13,0.82)", color: C.acid,
                  border: `1px solid rgba(212,247,74,0.3)`,
                  cursor: "pointer", fontSize: "1rem", lineHeight: 1,
                  display: "grid", placeItems: "center", padding: 0,
                }}
              >{b.sinal}</button>
            ))}

            <div style={{
              position: "absolute", left: 8, bottom: 8,
              background: "rgba(20,28,13,0.82)", color: C.ink3,
              fontFamily: F.mono, fontSize: "0.62rem",
              borderRadius: R.chip, padding: "0.15rem 0.5rem",
            }}>{i + 1}/{total}</div>
          </>
        )}
      </div>

      {/* A faixa de pontos ocupa altura mesmo com uma tela só. Sem isso, um
          cartão de tela única sobe 13px em relação aos vizinhos da fileira e o
          rodapé sai desalinhado — o tipo de defeito que ninguém nomeia e todo
          mundo sente. */}
      <div style={{ height: 7, marginTop: "0.6rem" }}>
        {total > 1 && (
          <div style={{ display: "flex", gap: 5 }}>
            {Array.from({ length: total }, (_, n) => (
              /* O botao tem largura FIXA de 20px; quem cresce e a barra de
                 dentro, por `scaleX`. Antes a largura do proprio botao ia de 7
                 para 20px em 0,2s — animacao de propriedade de layout, que
                 obriga o navegador a remedir a fileira inteira a cada quadro,
                 e isso dentro de um carrossel que ja esta trocando imagem. */
              <button
                key={n} onClick={() => setI(n)} aria-label={`Ir para a tela ${n + 1}`}
                style={{
                  width: 20, height: 7, borderRadius: R.chip,
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, position: "relative", overflow: "hidden",
                }}
              >
                <span aria-hidden style={{
                  position: "absolute", inset: 0, borderRadius: R.chip,
                  transformOrigin: "left center",
                  transform: n === i ? "scaleX(1)" : "scaleX(0.35)",
                  background: n === i ? C.acid : "rgba(212,247,74,0.25)",
                  transition: "transform 0.2s ease, background 0.2s ease",
                }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
