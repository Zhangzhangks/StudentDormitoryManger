import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


import { VantResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({

    // ...
    plugins: [vue(),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver(), VantResolver()],
        }),
    ],
    server: {
        port: 8000,
        proxy: {
            '/path': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/path/, '')
            },
            '/mock': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/path/, '')
            },
        }

    },

})