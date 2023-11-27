
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


initSlickSlider();

$(window).resize(function() {
  initSlickSlider();
});



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

// Create a GSAP timeline
var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

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


$('.testimonial-nav .w-slider-dot').click(function(event){
  if (!$(this).hasClass('w-active')) {
      const $wrap = $(this).closest('.testimonial-wrap');
      $wrap.toggleClass('alt-color');
  } else {
      event.stopPropagation();
  }
});

document.addEventListener('swiped-left', function(e) {
  if (e.target.classList.contains('testimonial-wrap')) {
    const $wrap = $(e.target);
    $wrap.toggleClass('alt-color');
  }
});

document.addEventListener('swiped-right', function(e) {
  if (e.target.classList.contains('testimonial-wrap')) {
    const $wrap = $(e.target);
    $wrap.toggleClass('alt-color');
  }
});

  

