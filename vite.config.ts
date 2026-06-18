import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.VITE_SITE_URL ?? ''
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-meta-transform',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_URL__', siteUrl)
      },
    },
  ],
})
