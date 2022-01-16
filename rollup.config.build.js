import ts from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/background/index.ts',
    output: {
      file: 'build/background/index.js',
      format: 'iife',
    },
    plugins: [
      ts(),
    ],
  },
  {
    input: 'src/contentScript/index.ts',
    output: {
      file: 'build/contentScript/index.js',
      format: 'iife',
    },
    plugins: [
      ts(),
    ],
  },
  {
    input: 'src/injection/index.ts',
    output: {
      file: 'build/injection/index.js',
      format: 'iife',
    },
    plugins: [
      ts(),
    ],
  },
  {
    input: 'rollup.unused.js',
    output: {
      file: 'unused/copy.js',
    },
    plugins: [
      copy({
        targets: [
          {
            src: 'src/manifest.json',
            dest: 'build',
          },
          {
            src: 'src/assets/**/*',
            dest: 'build/assets',
          },
          {
            src: 'src/popup/build/**/*',
            dest: 'build/popup',
          },
        ],
      }),
    ],
  },
];
