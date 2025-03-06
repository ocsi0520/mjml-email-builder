import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import rollupDynamicImportVars from '@rollup/plugin-dynamic-import-vars';

import { fromRollup } from '@web/dev-server-rollup';

const dynamicImportvars = fromRollup(rollupDynamicImportVars);

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];

// TODO: dynamic import still doesnt work
export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  rootDir: 'src',
  watch: false,
  manual: false,
  port: 8005,
  playwright: true,
  plugins: [
    esbuildPlugin({ ts: true, tsconfig: './tsconfig.json' }),
    dynamicImportvars({
      warnOnError: false,
      include: ['**/src/localization/**/*'],
      exclude: ['**/node_modules/**/*'],
    }),
  ],

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === 'string' &&
        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    // playwrightLauncher({ product: 'firefox' }),
    // playwrightLauncher({ product: 'webkit' }),
  ],

  coverage: true,
  coverageConfig: {
    // threshold: {
    //   lines: 100,
    //   branches: 100,
    //   functions: 100,
    //   statements: 100,
    // },
    include: ['**/*.ts'],
    exclude: [
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.mock.ts',
      '**/__tests__/**/*',
      '**/__mocks__/**/*',
    ],
  },

  // See documentation for all available options
});
