(async function() {
  var devServerURL = 'http://localhost:3000';
  var netlifyURL = `https://onenet-cc.netlify.app/sites/${SITENAME}`;
  var baseURL;

  // Determine the base URL depending on the dev server availability
  if (DEV_MODE) {
    baseURL = devServerURL + `/sites/${SITENAME}`;
  } else {
    baseURL = netlifyURL;
  }

  var pagePath = window.location.pathname.replace(/^\//, '');
  if (pagePath === '') pagePath = 'home';

  // Load components mapping
  var componentsMapping = await fetch(baseURL + '/components-mapping.json').then(res => res.json());
  const pageComponents = componentsMapping[pagePath]?.components || [];

  var loadFile = function(file) {
    var element;
    var filePath = LOAD_MINIFIED ? file.replace(/\.js$/, '/min.js') : file;

    if (file.endsWith('.js')) {
      element = document.createElement('script');
      element.src = baseURL + '/' + filePath;
      document.body.appendChild(element);
    }
  };

  pageComponents.forEach(component => {
    loadFile(`components/${component}/footer.js`);
  });

  loadFile(pagePath + '/footer.js');
})();
