// vite.config.js
import vue from "file:///E:/Student_end/Vue+element/dormitory/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///E:/Student_end/Vue+element/dormitory/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///E:/Student_end/Vue+element/dormitory/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Student_end/Vue+element/dormitory/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Student_end/Vue+element/dormitory/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { VantResolver } from "file:///E:/Student_end/Vue+element/dormitory/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()]
    })
  ],
  server: {
    proxy: {
      "/path": {
        target: "http://127.0.0.1:3007",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/path/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTdHVkZW50X2VuZFxcXFxWdWUrZWxlbWVudFxcXFxkb3JtaXRvcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFN0dWRlbnRfZW5kXFxcXFZ1ZStlbGVtZW50XFxcXGRvcm1pdG9yeVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovU3R1ZGVudF9lbmQvVnVlK2VsZW1lbnQvZG9ybWl0b3J5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5cbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXG4gICAgLy8gLi4uXG4gICAgcGx1Z2luczogW3Z1ZSgpLFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICB9KSxcbiAgICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCksIFZhbnRSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvcGF0aCc6IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjMwMDcnLFxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvcGF0aC8sICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXNTLE9BQU8sU0FBUztBQUN0VCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUdwQyxTQUFTLG9CQUFvQjtBQUM3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUd4QixTQUFTO0FBQUEsSUFBQyxJQUFJO0FBQUEsSUFFVixXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsb0JBQW9CLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxNQUNqRDtBQUFBLElBQ0o7QUFBQSxFQUVKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
