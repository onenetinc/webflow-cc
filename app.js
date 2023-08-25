import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();


const port = process.env.PORT || 3000; // if you change the port, the global-footer and global-head files will also need to be updated 
const app = express();

// Enable CORS for all routes
app.use(cors());

// create dynamic routes for serverless functions to be served locally for testing
const functionsDir = path.join(__dirname, '.netlify', 'functions');
if (fs.existsSync(functionsDir)) {
  fs.readdirSync(functionsDir).forEach((site) => {
    const siteDir = path.join(functionsDir, site);

    // Read all function files for the site
    fs.readdirSync(siteDir).forEach(async (file) => {
      const functionPath = path.join(siteDir, file);
      const functionName = file.split('.')[0];

      // Import the function
      // const func = require(functionPath);
      const func = await import(functionPath).then(module => module.default || module);

      

      // Create a route for the function
      app.get(`/.netlify/functions/${site}/${functionName}`, async (req, res) => {
        const result = await func.handler(req, {});
        res.status(result.statusCode).send(result.body);
      });

      console.log(`Route created for /.netlify/functions/${site}/${functionName}`);
    });
  });
} else {
  console.warn(`Directory ${functionsDir} does not exist. No functions loaded.`);
}

// Serve static files
app.use('/sites', express.static(path.join(__dirname, 'sites')));
// app.use('/sites/:siteName/assets', express.static(path.join(__dirname, 'sites', req.params.siteName, 'assets')));
app.use('/sites/:siteName/assets', (req, res, next) => {
  express.static(path.join(__dirname, 'sites', req.params.siteName, 'assets'))(req, res, next);
});

// Check dev server endpoint (from webflow)
app.get('/check-dev-server', (req, res) => {
  res.sendStatus(200);
});

app.get('/config', (req, res) => {
  res.json({ port: process.env.PORT });
});

app.listen(port, () => {
  console.log(`Dev server is running at http://localhost:${port}`);
});