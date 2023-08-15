// const LOAD_MINIFIED = false; // SET IN WEBFLOW - Change to false to load non-minified files
// const DEV_MODE = true; // SET IN WEBFLOW - Change to false to not load dev server
(async function() {
  var devServerURL = 'http://localhost:3000';
  var netlifyURL = 'https://onenet-wf.netlify.app/sites/jetpay';
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
    baseURL = devServerURL + '/sites/jetpay';
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

  var loadFile = function(file) {
    var element;
    var filePath = LOAD_MINIFIED ? file.replace(/\/(head|footer)\.js$/, '/min/$1-min.js').replace(/\/head\.css$/, '/min/head-min.css') : file;

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

  globalFiles.forEach(loadFile);
  pageFiles.forEach(loadFile);
})();