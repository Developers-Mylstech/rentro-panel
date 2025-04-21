// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig, loadEnv } from "vite"
// import { VITE_APP_KEY } from "./src/env";

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     server: {
//       proxy: {
//         '/api': {
//           target: 'https://yqndqaeqly2o.share.zrok.io/api/v1',
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       }
//     }
//   }
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://demo.rentro.ae',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})