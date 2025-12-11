import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import path from 'path'

const config = defineConfig({
  plugins: [
    devtools(),
    // cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: {
      // Alias for using custom AntD wrappers
      // Comment out this line to use original antd directly
      // 'antd': path.resolve(__dirname, './src/components/antd-wrappers'),
    },
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3002',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
        secure: false,
      }
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    }
  },
})

export default config
