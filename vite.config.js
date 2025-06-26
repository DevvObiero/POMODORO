import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ✅ VERY IMPORTANT for Electron to load assets correctly
  plugins: [tailwindcss(), react()],
})
