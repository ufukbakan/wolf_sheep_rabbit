import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    hmr:{
      port: 443
    },
    proxy: {
      '/api': {
        target: 'http://wolf-sheep-rabbit-server:6512',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://wolf-sheep-rabbit-server:6512',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()]
})
