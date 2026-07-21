import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so a tunnel (or a phone on the same wifi) can
    // reach the dev server, and allow Cloudflare quick-tunnel hostnames —
    // Vite blocks unknown Host headers by default.
    host: true,
    allowedHosts: ['.trycloudflare.com', 'localhost'],
  },
})
