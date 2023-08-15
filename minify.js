#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const Terser = require('terser');
const CleanCSS = require('clean-css');

const site = process.argv[2];
const page = process.argv[3];

const basePath = path.join(__dirname, 'sites', site);

const minifyJS = async (filePath) => {
  console.log('Minifying JS file:', filePath);
  const code = await fs.readFile(filePath, 'utf-8');
  console.log('Original code:', code);
  const result = await Terser.minify(code);

  if (result.error) {
    console.error('Terser error:', result.error);
    return;
  }

  console.log('Terser result:', result);

  const minPath = path.join(path.dirname(filePath), 'min');
  await fs.ensureDir(minPath);
  const minFilePath = path.join(minPath, path.basename(filePath).replace('.js', '-min.js'));
  await fs.writeFile(minFilePath, result.code);
  console.log('Minified JS file written to:', minFilePath);
};

// const minifyJS = async (filePath) => {
//   const code = await fs.readFile(filePath, 'utf-8');
//   const result = Terser.minify(code);
//   if (result.error) {
//     console.error('Terser error:', result.error);
//     return;
//   }

//   if (!result.code) {
//     console.error('No minified code generated for:', filePath);
//     return;
//   }

//   const minPath = path.join(path.dirname(filePath), 'min');
//   await fs.ensureDir(minPath);
//   await fs.writeFile(path.join(minPath, path.basename(filePath).replace('.js', '-min.js')), result.code);
// };

const minifyCSS = async (filePath) => {
  const code = await fs.readFile(filePath, 'utf-8');
  const result = new CleanCSS().minify(code);

  const dirPath = path.join(path.dirname(filePath), 'min');
  await fs.ensureDir(dirPath);

  const minFilePath = path.join(dirPath, path.basename(filePath).replace('.css', '-min.css'));
  await fs.writeFile(minFilePath, result.styles);
};

const processFiles = async (dirPath) => {
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      // Skip the 'min' directory
      if (file !== 'min') {
        await processFiles(filePath);
      }
    } else {
      if (path.extname(file) === '.js') {
        await minifyJS(filePath);
      } else if (path.extname(file) === '.css') {
        await minifyCSS(filePath);
      }
    }
  }
};

const startMinification = async () => {
  const targetPath = page ? path.join(basePath, page) : basePath;
  if (!await fs.pathExists(targetPath)) {
    console.error('Target path does not exist:', targetPath);
    return;
  }

  await processFiles(targetPath);
  console.log('Minification complete.');
};

startMinification().catch((err) => console.error('Minification error:', err));
