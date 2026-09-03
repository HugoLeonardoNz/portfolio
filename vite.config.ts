import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), ],
  // Domínio próprio (hugonazario.com) via GitHub Pages custom domain: o site
  // passa a ser servido na raiz do domínio, não mais em /portfolio/. Se algum
  // dia o CNAME for removido e o site voltar para
  // hugonazario.com/, isto tem que voltar para '/portfolio/'.
  base: '/',
})
