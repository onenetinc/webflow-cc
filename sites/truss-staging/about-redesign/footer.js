
gsap.registerPlugin(ScrollTrigger);

$('.acc-toggle').click(function(){
  $(this).closest('.acc').toggleClass('active');
})

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








  

