import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        approach: resolve(__dirname, 'approach/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        work: resolve(__dirname, 'work/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})
