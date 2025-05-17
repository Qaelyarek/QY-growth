import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-transform-runtime', { regenerator: true }]
          ]
        }
      })
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Add base URL configuration
    base: '/',
    // Configure server for SPA fallback
    server: {
      historyApiFallback: true,
    },
    // Define env variables that are available at build time
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Add esbuild configuration to target ES2020
    esbuild: {
      target: "es2020",
    },
    // Configure how environment variables are handled in build
    build: {
      rollupOptions: {
        // Control how missing environment variables are handled
        onwarn(warning, warn) {
          // Suppress specific warnings if needed
          if (warning.code === 'MISSING_ENV_VAR' && warning.message.includes('VITE_ELEVENLABS_API_KEY')) {
            return;
          }
          warn(warning);
        },
      },
      target: "es2020", // Also set the build target
    },
  };
});