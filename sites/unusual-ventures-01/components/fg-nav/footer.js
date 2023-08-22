console.log("almost running");
$(window).on("load", function () {
  console.log("running");
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  $(".fg-section-link").each(function () {
    const sectionSlug = slugify($(this).find(".fg-nav-title").text());
    const url = $(this).attr("href") + "#" + sectionSlug;
    $(this).attr("href", url);
  });

  let topicSectionText = $(".fg-article-topic-section").text().trim();

  if (topicSectionText) {
    $(".fg-nav-topic-section")
      .filter(function () {
        const title = $(this).find(".fg-nav-title").text().trim();
        return title === topicSectionText;
      })
      .addClass("active");
  }

  // clean up the nav list topics
  $(".fg-topics-block:not(.w-condition-invisible)").each(function () {
    $(this).clone().insertBefore($(this).parent()); // move this .fg-topics-block before its parent
    $(this).remove();
  });

  // Sort nav
  let $parents = $(".fg-nav-grid._2");

  $parents.each(function () {
    // Get this parent
    let $parent = $(this);

    // Detach children elements from the DOM
    let $children = $parent.children().detach();

    // Sort the children
    $children.sort(function (a, b) {
      let aTopic = Number($(a).find(".topic-order:first").text().trim());
      let bTopic = Number($(b).find(".topic-order:first").text().trim());

      // If 'topic' values are not equal, sort by 'topic'
      if (aTopic !== bTopic) {
        return aTopic - bTopic;
      }

      // If 'topic' values are equal, sort by 'topic section'
      let aTopicSection = Number(
        $(a).find(".topic-section-order:first").text().trim()
      );
      let bTopicSection = Number(
        $(b).find(".topic-section-order:first").text().trim()
      );

      return aTopicSection - bTopicSection;
    });

    // Append sorted children back to the parent
    $parent.append($children);
  });

  // modify lines
  let $lastSolids = $(".fg-topics-block")
    .prev(".fg-topic-nav-wrap")
    .find(".fg-solid:last-child");
  $lastSolids.prev().removeClass("w-condition-invisible");
  $lastSolids.css("display", "none");

  // resize to call slick slider
  setTimeout(function () {
    // init slick slider
    $(window).trigger("resize");
  }, 0);

  let init = false;
  let windowWidth = $(window).width();
  $(window).resize(function () {
    const slidesCount = () => {
      if ($(window).width() < 566) {
        return 2;
      } else if ($(window).width() < 924) {
        return 3;
      } else if ($(window).width() < 1160) {
        return 5;
      } else if ($(window).width() < 1300) {
        return 6; // 4
      } else if ($(window).width() < 1500) {
        return 6; // 5
      } else {
        return 6; // 6
      }
    };
    if (slidesCount() < 5 && init && $(this).width() === windowWidth) {
      return;
    }
    windowWidth = $(this).width();
    const $carouselEl = $(".fg-nav-carousel .fg-nav-grid._2");
    console.log("$carouselEl: ", $carouselEl);

    if ($carouselEl.hasClass("slick-initialized")) {
      $carouselEl.slick("unslick");
    }

    const $elInList1 = $(
      ".fg-nav-title._2.bold:not(.w-condition-invisible)"
    ).closest(".fg-topic-nav-wrap");
    let currentNavInd1 = $elInList1.parent().children().index($elInList1);

    $carouselEl.on("init", function (slick) {
      if ($carouselEl.hasClass("slick-initialized")) {
        // Call slick methods here
        $(".fg-loading").hide();
        $(".fg-nav-collection").css("opacity", "1");
      }
      // pointer events swapping between nav and page
      $(".fg-nav-main .slick-track").hover(
        function () {
          // Mouse enter
          $(this).closest(".fg-nav-main").css({
            "pointer-events": "auto"
          });
        },
        function () {
          // Mouse leave
          $(this).closest(".fg-nav-main").css({
            "pointer-events": "none"
          });
        }
      );
      $(".fg-nav-main").addClass("loaded");
    });

    console.log("slides to count: ", slidesCount());

    if (slidesCount() >= 2) {
      $carouselEl.slick({
        infinite: false,
        slidesToShow: slidesCount(),
        // slidesToScroll: slidesCount() >= 4 ? 1 : slidesCount(),
        slidesToScroll: slidesCount(),
        draggable: true,
        nextArrow: $(".fg-caret-btn.right"),
        prevArrow: $(".fg-caret-btn.left"),
        // initialSlide: 0,
        initialSlide: currentNavInd1 - 2 >= 0 ? currentNavInd1 - 2 : 0,
        // swipeToSlide: true,
        arrows: slidesCount() >= 4 ? true : false
      });

      // go to first if stuck trying to
      $carouselEl.on("afterChange", function (event, slick, currentSlide) {
        if (currentSlide < slidesCount()) {
          $carouselEl.slick("slickGoTo", 0);
        }
      });

      // go to end if stuck trying to
      $carouselEl.on("afterChange", function (event, slick, currentSlide) {
        var slidesToShow = slick.options.slidesToShow;
        if (
          currentSlide + slidesToShow < slick.slideCount &&
          currentSlide + 2 * slidesToShow >= slick.slideCount
        ) {
          // var endSlideIndex = slick.slideCount - slidesToShow;
          var endSlideIndex = slick.slideCount;
          if (currentSlide !== endSlideIndex) {
            $carouselEl.slick(
              "slickGoTo",
              endSlideIndex >= 0 ? endSlideIndex : 0
            );
          }
        }
      });
    }
    init = true;
  });
});
