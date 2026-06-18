import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.VITE_SITE_URL ?? ''

export default defineConfig({
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
