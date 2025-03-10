const mainPathname = window.location.pathname.replace(/^\//, '');

function setItemWithExpiry(key, value, expiryTimeInMinutes) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryTimeInMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // If the item has expired, remove it from storage and return null
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

if (mainPathname.split('/')[0] == 'product') {

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
    "lounge-chairs": { category: 'Seating', subcategory: ['Lounge Chairs'] },
    chaises: { category: 'Seating', subcategory: ['Chaises'] },
    "dining-chair": { category: 'Seating', subcategory: ['Dining Chairs'] },
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

  console.log("about to load products!")

  // fetch collection
  async function loadProducts() {

    async function fetchAllProducts() {
      getItemWithExpiry('allProducts');
      const allProducts = getItemWithExpiry('allProducts') ? JSON.parse(getItemWithExpiry('allProducts')) : null;
    
      if (allProducts) {
        return allProducts;
      } else {
        try {
          const response = await fetch("/dev/all-collection");
    
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
    
          const data = await response.text(); // Fetch returns raw HTML as text
          const tempDom = document.createElement('output');
          tempDom.innerHTML = data;
    
          const listItems = tempDom.querySelectorAll("span");
          let loadPromises = [];
    
          listItems.forEach(($item) => {
            let $img = $item.nextElementSibling; // Get next sibling image
    
            let loadPromise = new Promise((resolve) => {
              if (!$img || $img.tagName !== "IMG") {
                resolve(null);
                return;
              }
    
              $img.onload = function () {
                let naturalWidth = this.naturalWidth;
                let naturalHeight = this.naturalHeight;
    
                if (naturalWidth && naturalHeight) {
                  let aspectRatio = naturalWidth / naturalHeight;
                  resolve({
                    filename: $item.dataset.src?.split(cmsImageBaseUrl)[1],
                    name: $item.dataset.name,
                    slug: $item.dataset.slug,
                    aspectRatio: aspectRatio,
                    category: $item.dataset.category,
                    subcategory: $item.dataset.subcategory,
                    new: $item.dataset.new
                  });
                } else {
                  console.log('Invalid dimensions for image', $img.src);
                  resolve(null);
                }
              };
    
              // If image is already loaded
              if ($img.complete) {
                $img.onload();
              }
            });
    
            loadPromises.push(loadPromise);
          });
    
          const results = await Promise.all(loadPromises);
          console.log("about to set storage?");
          setItemWithExpiry('allProducts', JSON.stringify(results), 20);
          return results;
        } catch (error) {
          console.error("Failed to fetch products:", error);
          return [];
        }
      }
    }
    

    // async function fetchAllProducts() {
    //   getItemWithExpiry('allProducts');
    //   const allProducts = getItemWithExpiry('allProducts') ? JSON.parse(getItemWithExpiry('allProducts')) : null;
    //   if (allProducts) {
    //     return allProducts;
    //   } else {
    //     return new Promise((resolve, reject) => {
    //       $.get("/dev/all-collection", function(data) {
    //         var tempDom = $('<output>').append($.parseHTML(data));    
    //         var listItems = tempDom.find("span");
    //         let loadPromises = [];
        
    //         listItems.each(function() {
    //           let $item = $(this);
    //           let $img = $item.next('img');
        
    //           let loadPromise = new Promise((resolve) => {
    //             $img.on('load', function() {
    //               let naturalWidth = this.naturalWidth;
    //               let naturalHeight = this.naturalHeight;
        
    //               // Ensure dimensions are valid numbers
    //               if (naturalWidth && naturalHeight) {
    //                   let aspectRatio = naturalWidth / naturalHeight;
    //                   resolve({
    //                     filename: $item.data('src')?.split(cmsImageBaseUrl)[1],
    //                     name: $item.data('name'),
    //                     slug: $item.data('slug'),
    //                     aspectRatio: aspectRatio,
    //                     category: $item.data('category'),
    //                     subcategory: $item.data('subcategory'),
    //                     new: $item.data('new')
    //                 });
    //               } else {
    //                 console.log('Invalid dimensions for image', $img.attr('src'));
    //                 resolve(null);
    //               }
    //             });
    //             // Trigger load event manually if the image is already loaded
    //             if ($img[0].complete) {
    //               $img.trigger('load');
    //             }
    //           });
              
    //           loadPromises.push(loadPromise);
        
    //         });
            
    //         Promise.all(loadPromises).then(results => {
    //           console.log("about to set storage?")
    //           setItemWithExpiry('allProducts', JSON.stringify(results), 20);
    //           resolve(results);
    //         });
    //       }).fail(reject);
    //     });
    //   }
    // }
    
    const allProductsArray = await fetchAllProducts();

    // console.log("allProductsArray: ", allProductsArray);
    
    
    
    // shelving: { category: 'Storage', subcategory: ['Shelving'] },
    // console.log("pagePathName: ", pagePathName);
    dataArray = allProductsArray.filter(res => {
      // console.log("res.category: ", res.category);
      // console.log("res.subcategory: ", res.subcategory);
      if (res && pagePathName === 'all') {
        return res
      } else if (res && pagePathName == 'new') {
        return res.new === "true"; // Explicitly check for true string
      } else if (res && (res.category === pages[pagePathName]?.category && pages[pagePathName]?.subcategory.includes('All'))) {
        return res
      } else if (res && (res.category === pages[pagePathName]?.category && pages[pagePathName]?.subcategory.includes(res.subcategory))) {
        console.log("made here..")
        return res
      }
    });      

    // console.log("dataArray: ", dataArray);
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






// from old utilities.js

// const base = 'http://localhost:8888/.netlify/functions';
// const base = 'https://us-central1-demurodas.cloudfunctions.net';

const base = 'https://demurodas.netlify.app/.netlify/functions'; // live one

const signUpUrl = `${base}/signUp`;
const getPrivateWfDataUrl = `${base}/getPrivateWfData`;
const getProfileUrl = `${base}/getProfile`;
const updateProfileUrl = `${base}/updateProfile`;
const resetPasswordUrl = `${base}/resetPassword`;
const createZipUrl = `${base}/createZip`;
const generatePdfUrl = `${base}/generateProductPdf`;

const validateString = (string) => {

    if (string === "" || string.length < 2) {

        console.log(`String failed string vaildation`);
        return false;

    }

    return true;

}

const validateEmail = (email) => {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(email).toLowerCase());

    if (!result) {

        console.log(`Email failed email vaildation`);
        return false;

    }

    return true;

}

const validateWebsite = (website) => {

    if (!website || website.length === 0 || website === '') {

        return true;

    } else if (website.length > 1 && String(website).includes('.')) {

        return true;

    }

    console.log(`Website failed website vaildation`);
    return false;

}

const userLinks = document.querySelectorAll("[data-nav='userLinks']");
const signUp = document.querySelectorAll("[data-nav='signUp']");
const signIn = document.querySelectorAll("[data-nav='signIn']");
const signOut = document.querySelectorAll("[data-nav='signOut']");
const account = document.querySelectorAll("[data-nav='account']");
const divider = document.querySelectorAll("[data-nav='divider']");
const profileSettings = document.querySelectorAll("[data-nav='profileSettings']");
const hideFromMembers = document.querySelectorAll('.hide-from-members');

const currentPath = window.location.pathname;

firebase.auth().onAuthStateChanged((user) => {

    userLinks.forEach(el => {

        if (el) {

            el.style.display = 'none';

        }

    });

    if (user) {

        const pagesToHide = [
            '/u/sign-in',
            'u/sign-up'
        ];

        if (pagesToHide.includes(currentPath)) {

            window.location.replace('/');

        }

        [signUp, divider, signIn].forEach(el => {

            if (el) {

                el.forEach(child => child.style.display = 'none');

            }

        });

        userLinks.forEach(el => {

            if (el) {

                el.style.display = 'flex';

            }

        });

        gtag('config', 'UA-6372121-1', { 'user_id': user.uid });

        signOut.forEach(el => {

            el.addEventListener('click', async () => {

                userLinks.forEach(el => {

                    if (el) {

                        el.style.display = 'none';

                    }

                });

                await firebase.auth().signOut();

                window.location.reload();

            });

        })


    } else {

        console.log(`No user is signed in`);

        const pagesToHide = [
            '/u/profile-settings'
        ];

        if (pagesToHide.includes(currentPath)) {

            window.location.replace('/');

        }

        [account, profileSettings, signOut].forEach(el => {

            if (el) {

                el.forEach(child => child.style.display = 'none');

            }

        });

        userLinks.forEach(el => {

            if (el) { el.style.display = 'flex' }

        });

        hideFromMembers.forEach(el => {

            if (el) { el.style.display = 'block' }

        });

    }

});

const getCookies = () => {

    const cookies = document.cookie.split(';');

    let cookiesObj = {};

    cookies.forEach(cookie => {

        const arr = cookie.split('=');

        cookiesObj[arr[0].trim()] = arr[1];

    });

    return cookiesObj;

}

const cookiesBar = document.getElementById('cookiesBar');

if (cookiesBar) {

    const cookiesAccept = document.getElementById('cookiesAccept');
    const cookiesClose = document.getElementById('cookiesClose');

    const cookiesObj = getCookies();

    if (!cookiesObj._acceptedCookies) {

        cookiesBar.style.display = 'flex';

    }

    cookiesAccept.addEventListener('click', () => {

        let expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 9);
        expiryDate.toUTCString();

        document.cookie = `_acceptedCookies=true; expires=${expiryDate}; path=/`;
        cookiesBar.style.display = 'none';

    });

    cookiesClose.addEventListener('click', () => {

        cookiesBar.style.display = 'none';

    });

}

const waitingCont = document.getElementById('waitingContainer');

setTimeout(() => {

    if (waitingCont) {

        if (waitingCont.style.display !== 'none') {

            window.location.reload();

        }

    }

}, 5000);
