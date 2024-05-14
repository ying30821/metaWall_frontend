import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // specifies the target server to proxy requests (only for development)
      ...(env.VITE_PROXY_TARGET_URL && {
        proxy: {
          '/api': {
            target: env.VITE_PROXY_TARGET_URL,
            changeOrigin: true,
          },
        },
      }),
    },
  };
};
