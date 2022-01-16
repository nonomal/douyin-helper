import fs from 'fs';
import path from 'path';
import ts from 'rollup-plugin-ts';

function link() {
  let done = false;

  return {
    name: 'link',
    buildStart() {
      if (done) {
        return;
      }

      const srcDir = path.resolve(__dirname, 'src');
      const dstDir = path.resolve(__dirname, 'build');
      if (!fs.existsSync(dstDir)) {
        fs.mkdirSync(dstDir);
      }

      const popupSrcDir = path.resolve(srcDir, 'popup/build');
      const popupDstDir = path.resolve(dstDir, 'popup');
      if (!fs.existsSync(popupDstDir)) {
        fs.symlinkSync(popupSrcDir, popupDstDir, 'dir');
      }

      const manifestSrc = path.resolve(srcDir, 'manifest.json');
      const manifestDst = path.resolve(dstDir, 'manifest.json');
      if (!fs.existsSync(manifestDst)) {
        fs.symlinkSync(manifestSrc, manifestDst, 'file');
      }

      const assetSrcDir = path.resolve(srcDir, 'assets');
      const assetDstDir = path.resolve(dstDir, 'assets');
      if (!fs.existsSync(assetDstDir)) {
        fs.symlinkSync(assetSrcDir, assetDstDir, 'dir');
      }

      done = true;
    },
  };
}

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
    watch: {
      clearScreen: false,
    },
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
    watch: {
      clearScreen: false,
    },
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
