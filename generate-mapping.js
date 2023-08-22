#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const siteName = process.argv[2];

if (!siteName) {
  console.error('Please provide a site name.');
  process.exit(1);
}

const basePath = path.join(__dirname, 'sites', siteName);

const questions = [
  {
    type: 'input',
    name: 'pages',
    message: 'Enter the page names (comma-separated):'
  }
];

inquirer.prompt(questions).then(async (answers) => {
  const pages = answers.pages.split(',').map(page => page.trim());
  const mappingPath = path.join(basePath, 'components-mapping.json');

  // Read the existing mapping if it exists
  let existingMapping = {};
  if (await fs.pathExists(mappingPath)) {
    existingMapping = await fs.readJSON(mappingPath);
  }

  for (const page of pages) {
    const { components } = await inquirer.prompt({
      type: 'input',
      name: 'components',
      message: `Enter the components for page "${page}" (comma-separated):`
    });

    existingMapping[page] = {
      components: components.split(',').map(component => component.trim())
    };
  }

  // Write the updated mapping
  await fs.writeJSON(mappingPath, existingMapping, { spaces: 2 });

  console.log('Mapping JSON generated successfully.');
});

