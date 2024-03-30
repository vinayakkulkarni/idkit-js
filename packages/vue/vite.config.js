import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json' assert { type: 'json' };

const banner = `/*!
 * @worldcoin/idkit-vue v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default defineConfig({
  build: {
    outDir: 'build',
    target: 'esnext',
    sourcemap: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueIdKit',
      formats: ['es', 'cjs', 'umd'],
      fileName: pkg.name,
    },
    commonjsOptions: {
      extensions: ['.js', '.ts', '.vue'],
      strictRequires: true,
      transformMixedEsModules: true,
      exclude: 'src/**',
      include: 'node_modules/**',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        banner,
        exports: 'named',
        strict: true,
        extend: true,
        globals: {
          vue: 'vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-idkit.css';
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [vue()],
});
