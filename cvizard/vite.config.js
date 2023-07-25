import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist", // Specify the output directory for the build
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Add proxy configuration if needed
    },
  },
});

