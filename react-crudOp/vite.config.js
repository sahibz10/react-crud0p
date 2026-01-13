// vite.config.js
// Purpose: Vite build/dev configuration for the React app.
// - Enables the React plugin and the optional React compiler babel plugin used by this template.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
