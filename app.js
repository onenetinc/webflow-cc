import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';

// generated a self-signed certificate on Feb 3rd 2025. expires on May 3rd 2027
const httpsOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();


const port = process.env.PORT || 3000; // if you change the port, the global-footer and global-head files will also need to be updated 
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',  // Allow all origins (or specify your frontend URL)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// create dynamic routes for serverless functions to be served locally for testing
const functionsDir = path.join(__dirname, '.netlify', 'functions');

if (fs.existsSync(functionsDir)) {
  // Read all function files in the functions directory
  fs.readdirSync(functionsDir).forEach(async (file) => {
    const functionPath = path.join(functionsDir, file);
    const functionName = file.split('.')[0];

    // Import the function
    const func = await import(functionPath).then(module => module.default || module);

    // Create a route for the function
    app.get(`/.netlify/functions/${functionName}`, async (req, res) => {
      const result = await func.handler(req, {});
      res.status(result.statusCode).send(result.body);
    });

    console.log(`Route created for /.netlify/functions/${functionName}`);
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


https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Dev server is running at https://localhost:${port}`);
});