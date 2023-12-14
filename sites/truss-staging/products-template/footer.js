
// gsap.registerPlugin(ScrollTrigger);

// $('.acc-toggle').click(function(){
//   let $wrap = $(this).closest('.w-dyn-items');
//   let $currentAcc = $(this).closest('.acc');
//   let $currentContent = $currentAcc.find('.acc-content');
//   let speed = 300;

//   let contentActualHeight = $currentContent.prop('scrollHeight');

//   if ($currentAcc.hasClass('active')) {
//     $currentContent.animate({ maxHeight: '0px' }, speed, function() {
//       $currentAcc.removeClass('active');
//     });
//   } else {
//     $wrap.find('.acc').each(function() {
//       let $acc = $(this);
//       let $content = $acc.find('.acc-content');

//       if ($acc.is($currentAcc)) {
//         // Open the clicked accordion
//         $content.animate({ maxHeight: contentActualHeight + 'px' }, speed);
//         $acc.addClass('active');
//       } else {
//         // Close other accordions
//         $content.animate({ maxHeight: '0px' }, speed, function() {
//           $acc.removeClass('active');
//         });
//       }
//     });
//   }

// })

// // accent intro
// $(".main-heading em").each(function () {
//   $(this).append("<span class='accent'></div>");
// });

// // Select all main elements with a class of ".accent"
// var $accents = $(".main-heading em");

// // Loop through each main element
// $accents.each(function () {
//   var $main = $(this);

//   // Create a timeline for the animation
//   var tl = gsap.timeline({
//     defaults: {
//       duration: 1,
//       ease: "power2.out"
//     }
//   });

//   // Add the animation to the timeline
//   tl.fromTo(
//     $main.find(".accent"),
//     {
//       opacity: "0"
//     },
//     {
//       opacity: "1"
//     }
//   );

//   // Create a ScrollTrigger to trigger the animation
//   ScrollTrigger.create({
//     trigger: $main.get(0),
//     start: "top 80%",
//     animation: tl
//   });
// });

// // hide dropdown on nav click
// $(".nav-link-block").click(function () {
//   $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
// });


// function initSlickSlider() {
//   var $slider = $('.logo-marquee');

//   // Check if the screen width is less than or equal to 768px
//   if ($(window).width() <= 479) {
//       // Check if the slider is not initialized
//       if (!$slider.hasClass('slick-initialized')) {
//           $slider.slick({
//             speed: 4000,
//             autoplay: true,
//             autoplaySpeed: 0,
//             centerMode: true,
//             cssEase: 'linear',
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             variableWidth: true,
//             infinite: true,
//             initialSlide: 1,
//             arrows: false,
//             buttons: false
//           });
//       }
//   } else {
//       // If the screen is larger than 768px and the slider is initialized, unslick it
//       if ($slider.hasClass('slick-initialized')) {
//           $slider.slick('unslick');
//       }
//   }
// }


// initSlickSlider();

// $(window).resize(function() {
//   initSlickSlider();
// });


  

