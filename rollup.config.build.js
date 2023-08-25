import fs from 'fs';
import ts from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

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
            src: 'src/main/build/**/*',
            dest: 'build/main',
          },
        ],
      }),
    ],
  },
];

function getTsPlugins() {
  const style = fs.readFileSync('src/runtime/style.css', 'utf8');
  return [
    commonjs(),
    nodeResolve({
      browser: true,
    }),
    json({
      namedExports: false,
    }),
    ts({
      tsconfig: {
        resolveJsonModule: true,
        moduleResolution: 'node',
        allowSyntheticDefaultImports: true,
      },
    }),
    replace({
      preventAssignment: true,
      delimiters: ['', ''],
      'process.env.DEV': 'false',
      '\'__STYLE__\'': JSON.stringify(style),
      '"__STYLE__"': JSON.stringify(style),
    }),
    terser(),
  ];
}

function generateConfigFile() {
  const json = fs.readFileSync('src/runtime/config.v2.json', 'utf8');
  const style = fs.readFileSync('src/runtime/style.css', 'utf8');
  const content = json.replace(/"__STYLE__"/g, JSON.stringify(style));
  fs.writeFileSync('build/runtime/config.v2.json', content, 'utf8');
}
generateConfigFile();