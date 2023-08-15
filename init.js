const axios = require('axios');
const fs = require('fs-extra');
const xml2js = require('xml2js');
const urlModule = require('url');

// const fetchPages = async (site) => {
//   // Adjust the URL to match the Webflow endpoint
//   const response = await axios.get(`https://${site}.webflow.io/api/pages`);
//   return response.data.pages || [];
// };


const fetchPages = async (site) => {
  // Fetch the sitemap
  const response = await axios.get(`https://${site}.webflow.io/sitemap.xml`);
  const xml = response.data;

  // Parse the XML
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);

  // Create a set to store unique first-level paths
  const firstLevelPaths = new Set();

  result.urlset.url.forEach(u => {
    const urlPath = urlModule.parse(u.loc[0].trim()).pathname;
    const parts = urlPath.split('/').filter(Boolean);

    // If there's only one part and it's not "search", it's a first-level path
    if ((parts.length === 1 || parts.length === 2) && parts[0] !== 'search') {
      firstLevelPaths.add(parts[0]);
    }
  });

  // Convert to array and add "home"
  const pages = Array.from(firstLevelPaths);
  pages.push('home');
  console.log("pages: ", pages);
  return pages;
};


const generateFiles = async (site, pages) => {
  const basePath = `./sites/${site}`;

  // Create global directory
  await fs.ensureDir(`${basePath}/global`);

  // Create assets directory
  await fs.ensureDir(`${basePath}/assets`);

  // Create global files if they don't exist
  for (const file of ['head.js', 'footer.js', 'head.css']) {
    const filePath = `${basePath}/global/${file}`;
    if (!await fs.pathExists(filePath)) {
      await fs.createFile(filePath);
    }
  }

  // Iterate through pages to create page-specific files
  for (const page of pages) {
    const pagePath = `${basePath}/${page}`;
    await fs.ensureDir(pagePath);

    for (const file of ['head.js', 'footer.js', 'head.css']) {
      const filePath = `${pagePath}/${file}`;
      if (!await fs.pathExists(filePath)) {
        await fs.createFile(filePath);
      }
    }
  }
};

const init = async (site) => {
  const pages = await fetchPages(site);
  await generateFiles(site, pages);
  console.log('Initialization complete.');
};

// Get site name from command line arguments
const site = process.argv[2];

if (site) {
  init(site).catch((err) => console.error('Initialization error:', err));
} else {
  console.error('Please provide a site name.');
}