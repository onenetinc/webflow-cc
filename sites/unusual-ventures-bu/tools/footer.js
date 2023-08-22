// $(window).on("load", function () {
  // sort tools
  $(".article-item").each(function () {
    const $articleItem = $(this);
    const topicTitle = $articleItem.find("h3.topic-title-text").text().trim();

    // Find the matching container using the data-id attribute
    const $container = $(`[data-id="${topicTitle}"]`);

    // If a matching container is found, append the article-item to it
    if ($container.length) {
      $container.append($articleItem);
    }
  });

  $(".fg-articles-wrapper.tools").css("transition", "all 200ms ease");
  $(".fg-articles-wrapper.tools").css("opacity", "1");

  // setup nav to overflow when expanded
  let ddCount = 0;
  $(".fg-nav-dd, body").click(function () {
    let found = false;
    setTimeout(function () {
      $(".fg-nav-dd-toggle").each(function () {
        if ($(this).attr("aria-expanded") == "true") {
          found = true;
        }
      });
      if (found || ddCount == 0) {
        $(".sidebars.top").addClass("open");
      } else {
        $(".sidebars.top").removeClass("open");
      }
      ddCount++;
    }, 10);
  });

  setTimeout(function () {
    $(".articles-collection").css("display", "block");
  }, 2000);

  // clone sidebar lists into mobile dd's
  $(".fg-mob-toc-target").append($(".toc-wrapper").clone());
  $(".fg-mob-toc-target")
    .find("a")
    .click(function () {
      $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
    });

  $(".fg-topic-overlay:has(p.w-dyn-bind-empty)").addClass("no-description");
// });
