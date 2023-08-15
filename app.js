const express = require('express');
const path = require('path');
const cors = require('cors');

// Enable CORS for all routes

const app = express();
const port = 3000;

app.use(cors());

// Static files serving
app.use('/sites', express.static(path.join(__dirname, 'sites')));
app.use('/sites/:siteName/assets', express.static(path.join(__dirname, 'sites', req.params.siteName, 'assets')));

// Check dev server endpoint
app.get('/check-dev-server', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Development server is running at http://localhost:${port}`);
});