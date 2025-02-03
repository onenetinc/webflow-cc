// const LOAD_MINIFIED = false; // SET IN WEBFLOW - Change to false to load non-minified files
// const DEV_MODE = true; // SET IN WEBFLOW - Change to false to not load dev server
// const SITENAME = 'jetpay' // SET IN WEBFLOW - Change to the proper sitename folder in webflow-cc
(async function() {
  var devServerURL = 'https://localhost:3000';
  var netlifyURL = `https://onenet-cc.netlify.app/sites/${SITENAME}`;
  var baseURL;

  // Function to check if the dev server is running
  var checkDevServer = async function() {
    try {
      var response = await fetch(devServerURL + '/check-dev-server');
      if (response.ok) {
        baseURL = devServerURL + `/sites/${SITENAME}`;
      } else {
        baseURL = netlifyURL;
      }
    } catch (error) {
      baseURL = netlifyURL;
    }
  };

  // Determine the base URL depending on the dev server availability
  if (DEV_MODE) {
    await checkDevServer();
  } else {
    baseURL = netlifyURL;
  }

  var pagePath = window.location.pathname.replace(/^\//, '');
  if (pagePath === '') pagePath = 'home';

  // Check if the page path should use a template
  var segments = pagePath.split('/');
  if (segments.length > 1) {
    if (segments[0] == 'product' || segments[0] == 'dev' || segments[0] == 'wip' || segments[0] == 'u') {
      // don't change pagePath
    } else {
      pagePath = segments[0] + '-template'; // Always use the template folder for collection URLs
    }
  }


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

  // var loadFile = function(file) {
  //   var element;
  //   var filePath = LOAD_MINIFIED ? file.replace(/\.js$/, '/min.js').replace(/\.css$/, '/min.css') : file;

  //   if (file.endsWith('.js')) {
  //     element = document.createElement('script');
  //     element.src = baseURL + '/' + filePath;
  //   } else if (file.endsWith('.css')) {
  //     element = document.createElement('link');
  //     element.href = baseURL + '/' + filePath;
  //     element.rel = 'stylesheet';
  //   }

  //   if (element) document.head.appendChild(element);
  // };
  var loadFile = function(file) {
    var element;
    var filePath = LOAD_MINIFIED 
      ? file.replace(/\/head\.js$/, '/min/head-min.js').replace(/\/head\.css$/, '/min/head-min.css') 
      : file;
  
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

async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}
