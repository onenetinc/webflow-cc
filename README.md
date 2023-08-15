# Webflow Custom Code Repository

This repository enables the automation of custom code file generation, management, and minification for Webflow websites. It utilizes scripts to initialize new website directories, to be injected as custom code into the head and footer of Webflow pages, and minify JavaScript and CSS files.

## Features

- Initialize custom code files for new websites with `npm run init-files sitename`.
- The sitename must be the webflow staging link to the site minus the .webflow.io. Eg: in this case, the webflow staging url would need to be: sitename.webflow.io. Also, the site must have a sitemap generated, this is what is used to populate the pages.
- Automatically link correct page-specific and global code.
- Minify CSS and JS files to optimize performance.

## Getting Started

### Initialization of Custom Code Files

1. Clone this repository to your local machine.
2. Navigate to the repository root and run `npm install`.
3. To initialize custom code files for a new website, run the following command, replacing `sitename` with your specific website name (The sitename must be the webflow staging link to the site minus the .webflow.io. Eg: in this case, the webflow staging url would need to be: sitename.webflow.io. Also, the site ):
   ```bash
   npm run init-files sitename

4. Adding Webflow Code to the global Head and Footer: Go to the 'Project settings' > 'Custom Code' in your Webflow project. In the 'Head Code' section, add the following code: