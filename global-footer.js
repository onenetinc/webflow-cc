(async function() {
  var devServerURL = 'http://localhost:3000';
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
  console.log("segments: ", segments);
  if (segments.length > 1) {
    if (segments[0].includes('product') || segments[0].includes('dev') || segments[0].includes('wip') || segments[0] == 'u') {
      // don't change pagePath
    } else {
      pagePath = segments[0] + '-template'; // Always use the template folder for collection URLs
    }
  }

  var globalFiles = [
    'global/footer.js',
  ];
  
  

  // Load components mapping
  var componentsMapping = await fetch(baseURL + '/components-mapping.json').then(res => res.json());
  const pageComponents = componentsMapping[pagePath]?.components || [];

  var loadFile = function(file) {
    var element;
    var filePath = LOAD_MINIFIED 
      ? file.replace(/\/footer\.js$/, '/min/footer-min.js') 
      : file;
  
    if (file.endsWith('.js')) {
      element = document.createElement('script');
      element.src = baseURL + '/' + filePath;
      document.body.appendChild(element);
    }
  };

  pageComponents.forEach(component => {
    loadFile(`components/${component}/footer.js`);
  });
  globalFiles.forEach(loadFile);
  loadFile(pagePath + '/footer.js');
})();

async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}
