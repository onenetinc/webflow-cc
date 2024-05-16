const category = "Seating", subcategory = "Chairs";

console.log("running..")

  // fetch collection
  $.get("/dev/all-wip-collection", function(data) {
    var tempDom = $('<output>').append($.parseHTML(data));    
    var listItems = tempDom.find("span");
    var dataArray = [];
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
                subcategory: $item.data('subcategory')
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
    
      dataArray = results.filter(res => {
      	return res && (res.category === category && res.subcategory == subcategory);
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

    });
    
  });