// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default {
  server: {
    proxy: {
      // anything that starts with /api will be forwarded to 5000
      '/api': 'http://localhost:5000',
      // let you visit http://localhost:5173/ping in the browser too
      '/ping': 'http://localhost:5000',
    },
  },
};
