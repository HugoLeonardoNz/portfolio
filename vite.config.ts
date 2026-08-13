import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // O site é servido em https://hugoleonardonz.github.io/portfolio/, ou seja,
  // dentro de um subdiretório. Sem o base, o HTML gerado pede /assets/... na
  // raiz do domínio e a página sobe em branco.
  base: '/portfolio/',
})
