import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3120/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    // createStyleImportPlugin({
    //   libs: [
    //     {
    //       libraryName: "@arco-design/web-vue",
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         // css
    //         return `@arco-design/web-vue/es/${name}/style/css.js`;
    //         // less
    //         return `@arco-design/web-vue/es/${name}/style/index.js`;
    //       },
    //     },
    //   ],
    // }),
    vueJsx(),
    // AutoImport({
    //   resolvers: [ArcoResolver()],
    // }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    Unocss(),
    
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
