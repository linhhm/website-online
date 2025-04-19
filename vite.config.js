import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/website-online/', // Thêm base path cho GitHub Pages (thay 'website-online' bằng tên repo của bạn)
})
