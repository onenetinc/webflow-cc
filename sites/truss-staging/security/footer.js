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