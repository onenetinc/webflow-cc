
  let mobile = window.matchMedia("(max-width: 479px)");
  let dataAttr = "bg-img-url";
  let imgCache = {};

  // Check if the media query matches
  function modifyMobile() {
    if (mobile.matches) {
      dataAttr = "m-img-url";
      $('.card-int.active').removeClass('active');
    } else {
      dataAttr = "bg-img-url";
      $('.h-mobile').remove();
    }
  }
  modifyMobile();

  mobile.addListener(function () {
    modifyMobile();
  });

  let sections = $(".feat-wrapper");

  sections.each(function (index) {
    var $featWrapper = $(this);
    var autoTransitions;
    var featClicked = false;

    let delay = index === 0 ? 0 : 2000;

    if (!featClicked && !mobile.matches) {
    
      $featWrapper.find(".feat-card-wrapper").hover(function () {
        featClicked = true;
      });
    
      autoTransitions = setInterval(function () {
        let $active = $featWrapper.find(".card-int.active");
        let nextIndex = ($active.index() + 1) % 3;
        let $next = $featWrapper.find(".card-int").eq(nextIndex);
        $active.removeClass("active");
        $next.addClass("active");
        updateBackground(
          $featWrapper,
          $featWrapper.find(".card-int.active").data(dataAttr)
        );
      }, 3000 + delay);
    }

    // Add an event listener for when a .card-int is clicked
    $featWrapper.find(".card-int").on("mouseover", function () {
      // Clear the auto transitions
      clearInterval(autoTransitions);

      // Check if the clicked card is not already active
      if (!$(this).hasClass("active")) {
        // Remove the active class from all .card-int elements
        $featWrapper.find(".card-int").removeClass("active");
        // Add the active class to the clicked .card-int element
        $(this).addClass("active");
        // Get the URL of the background image from the clicked .card-int element's data attribute
        var bgImgUrl = $(this).data(dataAttr);
        // Update the background image
        updateBackground($featWrapper, bgImgUrl);
      }
    });

    function updateBackground($featWrapper, bgImgUrl) {
      // Fade out the old background image, then set the new one and fade it in
      $featWrapper.find(".feat-image-wrapper").fadeOut(200, function () {
        var $this = $(this);
        // Check if the image is already in the cache
        if (imgCache[bgImgUrl]) {
          // Set the src of the current image element to the cached image
          $this.attr("src", imgCache[bgImgUrl].src);
          // Fade in the new image element
          $this.delay(100).fadeIn(200);
        } else {
          // Create a new image element and set its src to the bgImgUrl
          var img = new Image();
          img.src = bgImgUrl;
          img.onload = function () {
            // Add the loaded image to the cache
            imgCache[bgImgUrl] = img;
            // Change the src of the current image element to the new image element's src
            $this.attr("src", img.src);
            // Fade in the new image element
            $this.fadeIn(300, function () {
              // Ensure that the image is fully loaded before fading it in
              $this.css("opacity", "1");
            });
          };
        }
      });
    }

    // Set the initial background image to the active card's image
    var initialBgImgUrl = $featWrapper.find(".card-int.active").data(dataAttr);
    updateBackground($featWrapper, initialBgImgUrl);
  });

  // parallax:
  gsap.registerPlugin(ScrollTrigger);

  // accent intro
  $("span.a-wrapper").each(function () {
    $(this).append("<span class='accent'></div>");
  });

  // Select all main elements with a class of ".accent"
  var $accents = $(".a-wrapper");

  // Loop through each main element
  $accents.each(function () {
    var $main = $(this);

    // Create a timeline for the animation
    var tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.out"
      }
    });

    // Add the animation to the timeline
    tl.fromTo(
      $main.find(".accent"),
      {
        // width: "0%",
        opacity: "0"
      },
      {
        // width: "102%",
        opacity: "1"
      }
    );

    // Create a ScrollTrigger to trigger the animation
    ScrollTrigger.create({
      trigger: $main.get(0),
      start: "top 80%",
      animation: tl
    });
  });

  // hide dropdown on nav click
  $(".nav-link-block").click(function () {
    $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
  });
  
  


  function initSlickSlider() {
    var $slider = $('.logo-marquee');

    // Check if the screen width is less than or equal to 768px
    if ($(window).width() <= 479) {
        // Check if the slider is not initialized
        if (!$slider.hasClass('slick-initialized')) {
            $slider.slick({
                infinite: true,
                slidesToShow: 1, // Adjust based on your design
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000, // Speed in milliseconds
                arrows: false
            });
        }
    } else {
        // If the screen is larger than 768px and the slider is initialized, unslick it
        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }
    }
  }


  initSlickSlider();

  $(window).resize(function() {
    initSlickSlider();
  });
  
  
  
