import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/my_chillweb/", // 👈 nombre del repo
  plugins: [react()],
})
