# Webflow Custom Code Repository

This repository enables the automation of custom code file generation, management, and minification for Webflow websites. It utilizes automated scripts to initialize new website custom code files to be injected as external links/scripts into the head and footer of Webflow pages. Also manages dev mode with server side hosting, or live mode with netlify hosting. Enables automatically generating minified JavaScript and CSS files, and externally hosted asset management.

## Features

- Initialize custom code files for new Webflow websites with `npm run init-files sitename` (the site must have a sitemap generated in order to auto generate).
- Automatically links correct page-specific and global js and css for every page.
- Minify CSS and JS files automatically to optimize performance.
- Host assets externally in the /assets folder (useful for hosting larger video files)

## Getting Started

### Initialization of Custom Code Files

1. Clone this repository to your local machine.
2. Navigate to the repository root and run `npm install`.
3. To initialize custom code files for a new website, run the following command, replacing `sitename` with your specific website name (The sitename must be the webflow staging link to the site minus the .webflow.io. Eg: in this case, the webflow staging url would need to be: sitename.webflow.io. Also, the site would need to have a sitemap generated):
```bash
npm run init-files sitename

4. Add scripts to Webflow global head:
```javascript
<script>
  const LOAD_MINIFIED = false; // Change to true to load minified files if they exist
  const DEV_MODE = true; // Change to false to not load dev server. If set to true, it will only load the dev server if the dev server is running, otherwise will load files hosted from netlify
</script>
<script src="https://onenet-wf.netlify.app/global-head.js"></script>
```
5. Add script to global footer:
```javascript
<script src="https://onenet-wf.netlify.app/global-footer.js"></script>
```
6. Start dev server with:
```bash
npm run dev
```
7. When you want to minify all the page files on a website, run:
```bash
npm run minify sitename
```
8. When you want to minify the files of a single page on a website, run:
```bash
npm run minify sitename page1
```
9. During Development, easiest to set the global variables like this: DEV_MODE = true, LOAD_MINIFIED = false, then flipping the variables after the site is live.