import { useState } from "react";
import { C, F, R } from "../../theme";

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
        <img
          key={src} src={src} alt={`${alt} — tela ${i + 1} de ${total}`} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />

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
              fontFamily: F.ui, fontSize: "0.62rem",
              borderRadius: R.chip, padding: "0.15rem 0.5rem",
            }}>{i + 1}/{total}</div>
          </>
        )}
      </div>

      {total > 1 && (
        <div style={{ display: "flex", gap: 5, marginTop: "0.6rem", flexWrap: "wrap" }}>
          {Array.from({ length: total }, (_, n) => (
            <button
              key={n} onClick={() => setI(n)} aria-label={`Ir para a tela ${n + 1}`}
              style={{
                width: n === i ? 20 : 7, height: 7, borderRadius: R.chip,
                background: n === i ? C.acid : "rgba(212,247,74,0.25)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.2s, background 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
