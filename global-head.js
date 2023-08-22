// const LOAD_MINIFIED = false; // SET IN WEBFLOW - Change to false to load non-minified files
// const DEV_MODE = true; // SET IN WEBFLOW - Change to false to not load dev server
// const SITENAME = 'jetpay' // SET IN WEBFLOW - Change to the proper sitename folder in webflow-cc
(async function() {
  var devServerURL = 'http://localhost:3000';
  var netlifyURL = `https://onenet-cc.netlify.app/sites/${SITENAME}`;
  var baseURL;

  // Function to check if the dev server is running
  var checkDevServer = async function() {
    try {
      var response = await fetch(devServerURL + '/check-dev-server');
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Determine the base URL depending on the dev server availability
  if (DEV_MODE && await checkDevServer()) {
    baseURL = devServerURL + `/sites/${SITENAME}`;
  } else {
    baseURL = netlifyURL;
  }

  var pagePath = window.location.pathname.replace(/^\//, '');
  if (pagePath === '') pagePath = 'home';

  var globalFiles = [
    'global/head.js',
    'global/head.css',
  ];

  var pageFiles = [
    pagePath + '/head.js',
    pagePath + '/head.css',
  ];

  // Load components mapping
  var componentsMapping = await fetch(baseURL + '/components-mapping.json').then(res => res.json());
  const pageComponents = componentsMapping[pagePath]?.components || [];

  var loadFile = function(file) {
    var element;
    var filePath = LOAD_MINIFIED ? file.replace(/\.js$/, '/min.js').replace(/\.css$/, '/min.css') : file;

    if (file.endsWith('.js')) {
      element = document.createElement('script');
      element.src = baseURL + '/' + filePath;
    } else if (file.endsWith('.css')) {
      element = document.createElement('link');
      element.href = baseURL + '/' + filePath;
      element.rel = 'stylesheet';
    }

    if (element) document.head.appendChild(element);
  };

  pageComponents.forEach(component => {
    loadFile(`components/${component}/head.js`);
    loadFile(`components/${component}/head.css`);
  });

  globalFiles.forEach(loadFile);
  pageFiles.forEach(loadFile);
})();
