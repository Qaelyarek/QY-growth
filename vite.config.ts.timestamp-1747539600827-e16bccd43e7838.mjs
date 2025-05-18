// vite.config.ts
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-transform-runtime", { regenerator: true }]
          ]
        }
      })
    ],
    optimizeDeps: {
      exclude: ["lucide-react"]
    },
    // Add base URL configuration
    base: "/",
    // Configure server for SPA fallback
    server: {
      historyApiFallback: true
    },
    // Define env variables that are available at build time
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    // Add esbuild configuration to target ES2020
    esbuild: {
      target: "es2020"
    },
    // Configure how environment variables are handled in build
    build: {
      rollupOptions: {
        // Control how missing environment variables are handled
        onwarn(warning, warn) {
          if (warning.code === "MISSING_ENV_VAR" && warning.message.includes("VITE_ELEVENLABS_API_KEY")) {
            return;
          }
          warn(warning);
        }
      },
      target: "es2020"
      // Also set the build target
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgZW52IGZpbGUgYmFzZWQgb24gYG1vZGVgIGluIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gIFxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KHtcbiAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBbJ0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJ1bnRpbWUnLCB7IHJlZ2VuZXJhdG9yOiB0cnVlIH1dXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgIH0sXG4gICAgLy8gQWRkIGJhc2UgVVJMIGNvbmZpZ3VyYXRpb25cbiAgICBiYXNlOiAnLycsXG4gICAgLy8gQ29uZmlndXJlIHNlcnZlciBmb3IgU1BBIGZhbGxiYWNrXG4gICAgc2VydmVyOiB7XG4gICAgICBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG4gICAgfSxcbiAgICAvLyBEZWZpbmUgZW52IHZhcmlhYmxlcyB0aGF0IGFyZSBhdmFpbGFibGUgYXQgYnVpbGQgdGltZVxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfRU5WX186IEpTT04uc3RyaW5naWZ5KGVudi5BUFBfRU5WKSxcbiAgICB9LFxuICAgIC8vIEFkZCBlc2J1aWxkIGNvbmZpZ3VyYXRpb24gdG8gdGFyZ2V0IEVTMjAyMFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogXCJlczIwMjBcIixcbiAgICB9LFxuICAgIC8vIENvbmZpZ3VyZSBob3cgZW52aXJvbm1lbnQgdmFyaWFibGVzIGFyZSBoYW5kbGVkIGluIGJ1aWxkXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgLy8gQ29udHJvbCBob3cgbWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIGhhbmRsZWRcbiAgICAgICAgb253YXJuKHdhcm5pbmcsIHdhcm4pIHtcbiAgICAgICAgICAvLyBTdXBwcmVzcyBzcGVjaWZpYyB3YXJuaW5ncyBpZiBuZWVkZWRcbiAgICAgICAgICBpZiAod2FybmluZy5jb2RlID09PSAnTUlTU0lOR19FTlZfVkFSJyAmJiB3YXJuaW5nLm1lc3NhZ2UuaW5jbHVkZXMoJ1ZJVEVfRUxFVkVOTEFCU19BUElfS0VZJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2Fybih3YXJuaW5nKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IFwiZXMyMDIwXCIsIC8vIEFsc28gc2V0IHRoZSBidWlsZCB0YXJnZXRcbiAgICB9LFxuICB9O1xufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLGNBQWMsZUFBZTtBQUMvUCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUV2QyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsWUFDUCxDQUFDLG1DQUFtQyxFQUFFLGFBQWEsS0FBSyxDQUFDO0FBQUEsVUFDM0Q7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUMxQjtBQUFBO0FBQUEsSUFFQSxNQUFNO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLG9CQUFvQjtBQUFBLElBQ3RCO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLGFBQWEsS0FBSyxVQUFVLElBQUksT0FBTztBQUFBLElBQ3pDO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQTtBQUFBLFFBRWIsT0FBTyxTQUFTLE1BQU07QUFFcEIsY0FBSSxRQUFRLFNBQVMscUJBQXFCLFFBQVEsUUFBUSxTQUFTLHlCQUF5QixHQUFHO0FBQzdGO0FBQUEsVUFDRjtBQUNBLGVBQUssT0FBTztBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
