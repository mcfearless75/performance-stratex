import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  Change '/performance-stratex/' to match your GitHub repo name exactly.
// e.g. if your repo is github.com/lgraham/investor-docs → base: '/investor-docs/'
// If you're using a custom domain → base: '/'

export default defineConfig({
  plugins: [react()],
  base: '/performance-stratex/',
})
