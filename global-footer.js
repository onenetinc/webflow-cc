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

  var footerFiles = [
    'global/footer.js',
    pagePath + '/footer.js'
  ];

  var loadFile = function(file) {
    var element = document.createElement('script');
    var filePath = LOAD_MINIFIED ? file.replace(/\/footer\.js$/, '/min/footer-min.js') : file;
    element.src = baseURL + '/' + filePath;
    document.body.appendChild(element);
  };

  footerFiles.forEach(loadFile);
})();