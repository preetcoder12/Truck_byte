import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures proper routing on Vercel
  build: {
    outDir: 'dist', // Output directory for build
  },
  server: {
    proxy: {
      '/api': 'https://your-backend.onrender.com', // Proxy API requests to Render
    },
  },
});
