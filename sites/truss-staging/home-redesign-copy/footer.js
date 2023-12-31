let images = $('.fw-image');

images.each(function() {
  const currentImg = $(this); // Reference to the current jQuery image element in the loop
  const tempImg = new Image();
  tempImg.src = currentImg.attr('src');

  tempImg.onload = () => {
    currentImg.addClass('img-loaded'); // Add the class only to the currently loaded image
  };
});



var Webflow = Webflow || [];
Webflow.push(function () {
  var namespace = '.w-slider';
  function slideChangeEvent(evt) {
    var slider;
    if($(evt.target).is(namespace)) {
      slider = $(evt.target);
    } else {
      slider = $(evt.target).closest(namespace)
    }
    if(slider) {
      $(slider).trigger('slider-event', $(slider).data(namespace));
    }
  }
  var tap_selector = $.map(['.w-slider-arrow-left', '.w-slider-arrow-right', '.w-slider-dot'], function(s) { return namespace + ' ' + s; }).join(', ');
  // listeners
  $(document).off('tap' + namespace, tap_selector, slideChangeEvent).on('tap' + namespace, tap_selector, slideChangeEvent);
  $(document).off('swipe' + namespace, namespace, slideChangeEvent).on('swipe' + namespace, namespace, slideChangeEvent);
  // initial slide - manually trigger the event
  $(namespace + ':visible').each(function(i, s) {
    slideChangeEvent({ target: s });
  });
});

// change colour when sliders change
Webflow.push(function () {
  $(document).on('slider-event', '.w-slider', function(e, data) {
      const $slider = $(e.target);
      const $wrapper = $slider.closest('.testimonial-wrap');
      $wrapper.toggleClass('alt-color');
 	});
});



// accent intro
gsap.registerPlugin(ScrollTrigger);

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
      opacity: "0"
    },
    {
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

function mobileSliders() {
  
  if (window.innerWidth <= 992) {
    // detect swipes
    function detectswipe(swiper, func) {
      swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 60; //20 min x swipe for horizontal swipe
      var max_x = 40; //max x difference for vertical swipe
      var min_y = 40; //min y swipe for vertical swipe
      var max_y = 50; //max y difference for horizontal swipe
      var direc = "";
      swiper[0].addEventListener(
        "touchstart",
        function (e) {
          var t = e.touches[0];
          swipe_det.sX = t.screenX;
          swipe_det.sY = t.screenY;
        },
        false
      );
      swiper[0].addEventListener(
        "touchmove",
        function (e) {
          var t = e.touches[0];
          swipe_det.eX = t.screenX;
          swipe_det.eY = t.screenY;
          // calculate the direction of the swipe
          var isHorizontal =
            Math.abs(swipe_det.eX - swipe_det.sX) >
            Math.abs(swipe_det.eY - swipe_det.sY);
          // only prevent default when the swipe is more horizontal than vertical
          if (isHorizontal) {
            e.preventDefault();
          }
        },
        false
      );
      swiper[0].addEventListener(
        "touchend",
        function (e) {
          //horizontal detection
          if (
            (swipe_det.eX - min_x > swipe_det.sX ||
              swipe_det.eX + min_x < swipe_det.sX) &&
            swipe_det.eY < swipe_det.sY + max_y &&
            swipe_det.sY > swipe_det.eY - max_y
          ) {
            if (swipe_det.eX > swipe_det.sX) direc = "right";
            else direc = "left";
          }
          //vertical detection
          if (
            (swipe_det.eY - min_y > swipe_det.sY ||
              swipe_det.eY + min_y < swipe_det.sY) &&
            swipe_det.eX < swipe_det.sX + max_x &&
            swipe_det.sX > swipe_det.eX - max_x
          ) {
            if (swipe_det.eY > swipe_det.sY) direc = "down";
            else direc = "up";
          }
    
          if (direc != "") {
            if (typeof func == "function") func(swiper, direc);
          }
          direc = "";
        },
        false
      );
    }
    
    function myfunction(el, d) {
      if (d != "") {
        const $wrap = el.closest('.testimonial-wrap');
        $wrap.toggleClass('alt-color');
      }
    }
    $('.testimonial-slider').each(function(){
      let $swiper = $(this)
      detectswipe($swiper, myfunction);
    })
    
  }

  
}




function initSlickSlider() {
  var $slider = $('.logo-marquee');

  // Check if the screen width is less than or equal to 768px
  if ($(window).width() <= 479) {
      // Check if the slider is not initialized
      if (!$slider.hasClass('slick-initialized')) {
          $slider.slick({
            speed: 4000,
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            initialSlide: 1,
            arrows: false,
            buttons: false
          });
      }
  } else {
      // If the screen is larger than 768px and the slider is initialized, unslick it
      if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
      }
  }
}



function cycleHeroText(){

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Assuming you have an element with the class 'hero-text .a-wrapper'
    var $textElement = $('.hero-text .a-wrapper');
    
    // Texts to be displayed and their timings in seconds
    var textChanges = [
      { text: 'home builders', time: 6.5 },
      { text: 'renovators', time: 12.5 },
      { text: 'remodelers', time: 19.5 },
      { text: 'pool builders', time: 25.5 },
      { text: 'roofers', time: 32.5 },
      { text: 'contractors', time: 35 }
    ];
    
    // Loop through each text change and set the timing
    textChanges.forEach(function(change, index) {
        // Fade out and change text at the specified time
        tl.to($textElement, { duration: 0.5, autoAlpha: 0 }, change.time)
          .call(() => {
            // Change only the text content, preserving the nested span
            $textElement.contents().filter(function() {
                return this.nodeType === 3; // Node.TEXT_NODE
            }).remove();
            $textElement.prepend(document.createTextNode(change.text));
          }, null, change.time + 0.5)
          .to($textElement, { duration: 0.5, autoAlpha: 1 }); // Fade in right after text change
    });
    
  // Start the timeline
  tl.play();

}


initSlickSlider();
cycleHeroText();

$(window).resize(function() {
  initSlickSlider();
});






  

