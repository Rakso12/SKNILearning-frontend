import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "oki.com",
  },
  plugins: [react()],
  base: 'http://oki.com:8000/'
})
