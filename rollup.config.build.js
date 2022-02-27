import ts from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/background/index.ts',
    output: {
      file: 'build/background/index.js',
      format: 'es',
    },
    plugins: getTsPlugins(),
  },
  {
    input: 'src/contentScript/index.ts',
    output: {
      file: 'build/contentScript/index.js',
      format: 'iife',
    },
    plugins: getTsPlugins(),
  },
  {
    input: 'src/injection/index.ts',
    output: {
      file: 'build/injection/index.js',
      format: 'iife',
    },
    plugins: getTsPlugins(),
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
            src: 'src/options/build/**/*',
            dest: 'build/options',
          },
        ],
      }),
    ],
  },
];

function getTsPlugins() {
  return [
    commonjs(),
    replace({
      preventAssignment: true,
      'process.env.DEV': 'false',
    }),
    ts({
      tsconfig: {
        resolveJsonModule: true,
        allowSyntheticDefaultImports: true,
      },
    }),
    nodeResolve(),
    json({
      namedExports: false,
    }),
  ];
}

