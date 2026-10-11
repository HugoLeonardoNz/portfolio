import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Política de segurança de conteúdo (2026-10-11).
//
// O GitHub Pages não deixa configurar cabeçalho HTTP, então a CSP vai como
// <meta> no HTML. Ela diz ao navegador de onde esta página pode carregar cada
// tipo de recurso; qualquer coisa fora da lista é bloqueada. O site só precisa
// de: os próprios arquivos, a folha e as fontes do Google Fonts.
//
// - script-src 'self': nenhum script inline nem de terceiro roda aqui.
// - style-src precisa de 'unsafe-inline' porque o estilo do site é objeto
//   inline do React + uma <style> injetada (GlobalStyles).
// - Só na BUILD: em desenvolvimento o Vite injeta um script inline (React
//   Refresh) que esta política bloquearia.
// - `frame-ancestors` não funciona em <meta>; sem cabeçalho, não há como
//   declarar.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

function cspNaBuild(): Plugin {
  return {
    name: 'csp-na-build',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
      { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
    ],
  }
}

export default defineConfig({
  plugins: [react(), cspNaBuild()],
  // Domínio próprio (hugonazario.com) via GitHub Pages custom domain: o site
  // passa a ser servido na raiz do domínio, não mais em /portfolio/. Se algum
  // dia o CNAME for removido e o site voltar para
  // hugonazario.com/, isto tem que voltar para '/portfolio/'.
  base: '/',
})
