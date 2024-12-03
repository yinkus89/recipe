import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Add this if using React
import path from 'path';

export default defineConfig({
  plugins: [react()], // Include plugins if necessary
  css: {
    postcss: './postcss.config.js', // Ensure Vite uses the correct PostCSS config
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for simplified imports
    },
  },
  define: {
    'process.env': {
      API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:5000'), // Backend API URL
    },
  },
  server: {
    port: 5173, // Set the frontend server to run on port 5173
    open: true, // Automatically open the app in the browser
  },
});
