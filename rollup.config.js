import path from 'path';
import html from '@web/rollup-plugin-html';
import { copy } from '@web/rollup-plugin-copy';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import esbuild from 'rollup-plugin-esbuild';
import { generateSW } from 'rollup-plugin-workbox';

export default {
  input: 'index.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,

  plugins: [
    // TODO: use another type of copy plugin, so we can put it into
    // folder not called 'node_modules'
    copy({ patterns: ['node_modules/tinymce/**/*.min.*'] }),
    copy({ patterns: ['favicon.ico'] }),
    copy({ patterns: ['node_modules/mjml-browser/lib/index.js'] }),
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: true,
      injectServiceWorker: true,
      serviceWorkerPath: 'dist/sw.js',
    }),
    /** Resolve bare module imports */
    nodeResolve({ browser: true }),
    /** Minify JS, compile JS to a lower language target */
    esbuild({
      minify: true,
      target: ['chrome64', 'firefox67', 'safari11.1'],
    }),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    /** Minify html and css tagged template literals */
    babel({
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
    /** Create and inject a service worker */
    generateSW({
      globIgnores: ['polyfills/*.js', 'nomodule-*.js'],
      navigateFallback: '/index.html',
      // where to output the generated sw
      swDest: path.join('dist', 'sw.js'),
      // directory to match patterns against to be precached
      globDirectory: path.join('dist'),
      // cache any html js and css by default
      globPatterns: ['**/*.{html,js,css,webmanifest}'],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{ urlPattern: 'polyfills/*.js', handler: 'CacheFirst' }],
    }),
    dynamicImportVars({
      include: ['**/src/localization/index.js'],
    }),
  ],
};
