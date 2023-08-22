#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const siteName = process.argv[2];
const componentName = process.argv[3];

if (!siteName || !componentName) {
  console.error('Please provide a site name and component name.');
  process.exit(1);
}

const basePath = path.join(__dirname, 'sites', siteName, 'components', componentName);

const createFile = async (file) => {
  const filePath = path.join(basePath, file);
  if (!await fs.pathExists(filePath)) {
    await fs.createFile(filePath);
  }
};

const initComponent = async () => {
  // Create component directory
  await fs.ensureDir(basePath);

  // Create component files if they don't exist
  await createFile('head.js');
  await createFile('footer.js');
  await createFile('head.css');

  console.log('Component initialization complete.');
};

initComponent().catch((err) => console.error('Initialization error:', err));
