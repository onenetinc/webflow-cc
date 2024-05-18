function getDevPath() {
  const pathname = window.location.pathname.replace(/^\//, '');
  if (pathname.includes('product')) {
    return true;
  } else {
    return false;
  }
}

if (getDevPath()) {

  function getPlainPath() {
    const pathname = window.location.pathname.replace(/^\//, '');
    const pathParts = pathname.split('/');
    // Get the last part of the path
    let lastPart;
    console.log("pathname: ", pathname);
    console.log("pathParts: ", pathParts);
    if (pathParts.length < 3 || !pathParts.includes('all')) {
      lastPart = pathParts.pop() || pathParts.pop();  // Handle potential trailing slash
    } else if (pathParts.length === 3 && pathParts.includes('all')){
      lastPart = pathParts[1] + '-' + pathParts[2];
    }
    return lastPart;
  }

  const pagePathName = getPlainPath();

  console.log("pagePathName: ", pagePathName);




  const pages = {
    all: { category: 'All' },
    new: { category: 'New' },
    "seating-all": { category: 'Seating', subcategory: ['All'] },
    sofas: { category: 'Seating', subcategory: ['Sofas'] },
    chairs: { category: 'Seating', subcategory: ['Chairs'] },
    chaises: { category: 'Seating', subcategory: ['Chaises'] },
    "dining-chair": { category: 'Seating', subcategory: ['Dining chair'] },
    benches: { category: 'Seating', subcategory: ['Benches'] },
    "tables-all": { category: 'Tables', subcategory: ['All'] },
    "side-tables": { category: 'Tables', subcategory: ['Side Tables'] },
    "coffee-cocktail-tables": { category: 'Tables', subcategory: ['Coffee/Cocktail Tables'] },
    "dining-tables": { category: 'Tables', subcategory: ['Dining Tables'] },
    consoles: { category: 'Tables', subcategory: ['Consoles'] },
    "storage-all": { category: 'Storage', subcategory: ['All'] },
    cabinets: { category: 'Storage', subcategory: ['Cabinets'] },
    shelving: { category: 'Storage', subcategory: ['Shelving'] },
    "bedside-tables": { category: 'Tables', subcategory: ['Bedside Tables'] },
    "accessories-all": { category: 'Accessories', subcategory: ['All'] },
    mirrors: { category: 'Accessories', subcategory: ['Mirrors'] },
    screens: { category: 'Accessories', subcategory: ['Screens'] },
  }


  // fetch collection
  async function loadProducts() {

    async function fetchAllProducts() {
      const allProducts = localStorage.getItem('allProducts') ? JSON.parse(localStorage.getItem('allProducts')) : null;
      if (allProducts) {
        return allProducts;
      } else {
        return new Promise((resolve, reject) => {
          $.get("/dev/all-collection", function(data) {
            var tempDom = $('<output>').append($.parseHTML(data));    
            var listItems = tempDom.find("span");
            let loadPromises = [];
        
            listItems.each(function() {
              let $item = $(this);
              let $img = $item.next('img');
        
              let loadPromise = new Promise((resolve) => {
                $img.on('load', function() {
                  let naturalWidth = this.naturalWidth;
                  let naturalHeight = this.naturalHeight;
        
                  // Ensure dimensions are valid numbers
                  if (naturalWidth && naturalHeight) {
                      let aspectRatio = naturalWidth / naturalHeight;
                      resolve({
                        filename: $item.data('src')?.split(cmsImageBaseUrl)[1],
                        name: $item.data('name'),
                        slug: $item.data('slug'),
                        aspectRatio: aspectRatio,
                        category: $item.data('category'),
                        subcategory: $item.data('subcategory'),
                        new: $item.data('new')
                    });
                  } else {
                    console.log('Invalid dimensions for image', $img.attr('src'));
                    resolve(null);
                  }
                });
                // Trigger load event manually if the image is already loaded
                if ($img[0].complete) {
                  $img.trigger('load');
                }
              });
              
              loadPromises.push(loadPromise);
        
            });
            
            Promise.all(loadPromises).then(results => {
              console.log("about to set storage?")
              localStorage.setItem('allProducts', JSON.stringify(results));
              resolve(results);
            });
          }).fail(reject);
        });
      }
    }
    
    const allProductsArray = await fetchAllProducts();
    
    
    
    
    
    dataArray = allProductsArray.filter(res => {
      if (res && pagePathName === 'all') {
        return res
      } else if (res && pagePathName == 'new') {
        return res.new;
      } else if (res && (res.category === pages[pagePathName]?.category && pages[pagePathName]?.subcategory.includes('All'))) {
        return res
      } else if (res && (res.category === pages[pagePathName]?.category && pages[pagePathName]?.subcategory.includes(res.subcategory))) {
        return res
      }
    });      
    const b = document.getElementById("pig");
    
    new Pig(dataArray, {
      spaceBetweenImages: 20,
      urlForSize: function (a, b) {
        return twicPicsUrl + a + "?twic=v1/resize=-x" + b
      },
      getImageSize: function(lastWindowWidth) {
        if (lastWindowWidth <= 640)  // Phones
          return 100;
        else if (lastWindowWidth <= 1920) // Tablets and latops
          return 600;
        return 600;  // Large desktops
      },
      getMinAspectRatio: function (a) {
        if (640 >= a) return 2;
        return 1280 >= a ? 2 : 1920 >= a ? 3 : 4;
      },
        
    }).enable();
    b.innerText = "";
    
    const c = new MutationObserver(function (b) {
      for (const c of b) {
        if ("childList" == c.type && "pig-figure" === c.target.className) {
          const b = c.addedNodes[0];
          
          if (b && b.src) {
          
            const d = new URL(b.src),
                  e = d.pathname,
                  f = e.split('/'),
                  g = f[f.length - 1];
            dataArray.forEach((a) => {
              if (a.filename === g) {
                const d = a.slug;
                b.addEventListener("click", function () {
                  window.location.href = "/products/" + d;
                });
                d.toUpperCase().replaceAll("-", " ");
                c.target.dataset.product = a.name;
              }
            });
    
          }
        }
      }
    });
    c.observe(b, { attributes: !0, childList: !0, subtree: !0 });

  }

  loadProducts()

}