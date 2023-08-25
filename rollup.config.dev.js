import fs from 'fs';
import path from 'path';
import ts from 'rollup-plugin-ts';
import watch from 'rollup-plugin-watch-globs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/background/index.ts',
    output: {
      file: 'dev/background/index.js',
      format: 'es',
    },
    plugins: getTsPlugins(),
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'src/contentScript/index.ts',
    output: {
      file: 'dev/contentScript/index.js',
      format: 'iife',
    },
    plugins: getTsPlugins(),
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'src/injection/index.ts',
    output: {
      file: 'dev/injection/index.js',
      format: 'iife',
    },
    plugins: getTsPlugins(),
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'rollup.unused.js',
    output: {
      file: 'unused/link.js',
    },
    plugins: [
      link(),
    ],
    watch: false,
    watch: {
      clearScreen: false,
    },
  },
];

function getTsPlugins() {
  return [
    watch(['src/runtime/style.css']),
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
      'process.env.DEV': 'true',
    }),
    {
      renderChunk(code, chunk) {
        return replaceStyle(code);
      },
      transform(code) {
        return replaceStyle(code);
      }
    }
  ];
}

function replaceStyle(code) {
  const begin = '/*__DH_STYLE_BEGIN__*/';
  const end = '/*__DH_STYLE_END__*/';
  const content = fs.readFileSync('src/runtime/style.css', 'utf8')
  const style = JSON.stringify(begin + content + end);

  const beginRegText = begin.replace(/\//g, '\\/').replace(/\*/g, '\\*');
  const endRegText = end.replace(/\//g, '\\/').replace(/\*/g, '\\*');
  const reg = new RegExp(`${beginRegText}[\\s\\S]*?${endRegText}`, 'g');

  return code
    .replace(reg, style.replace(/^"|"$/g, ''))
    .replace(/"__DH_STYLE__"|'__DH_STYLE__'/g, style);
}

function link() {
  let done = false;

  return {
    name: 'link',
    buildStart() {
      if (done) {
        return;
      }

      const srcDir = path.resolve(__dirname, 'src');
      const dstDir = path.resolve(__dirname, 'dev');
      if (!fs.existsSync(dstDir)) {
        fs.mkdirSync(dstDir);
      }

      const mainSrcDir = path.resolve(srcDir, 'main/build');
      const mainDstDir = path.resolve(dstDir, 'main');
      if (!fs.existsSync(mainDstDir)) {
        fs.symlinkSync(mainSrcDir, mainDstDir, 'dir');
      }

      const manifestSrc = path.resolve(srcDir, 'manifest.json');
      const manifestDst = path.resolve(dstDir, 'manifest.json');
      if (!fs.existsSync(manifestDst)) {
        fs.symlinkSync(manifestSrc, manifestDst, 'file');
      }

      const assetsSrcDir = path.resolve(srcDir, 'assets');
      const assetsDstDir = path.resolve(dstDir, 'assets');
      if (!fs.existsSync(assetsDstDir)) {
        fs.symlinkSync(assetsSrcDir, assetsDstDir, 'dir');
      }

      done = true;
    },
  };
}