// $(window).on("load", function () {
  // setTimeout(function () {
  $(".article-thumb").each(function () {
    const src = $(this).attr("src");
    $(this).attr("src", "");
    $(this).attr("src", src);
  });
  // }, 4000);
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

  // set current dropdown list
  const topicTitle = $("#topicTitle").text().trim();

  $(".fg-dd-list")
    .filter(function () {
      return (
        $(this).closest(".fg-nav-dd").find(".fg-nav-title").text().trim() ===
        topicTitle
      );
    })
    .append($(".articles-collection"))
    .closest(".fg-nav-dd")
    .find(".w-dropdown-toggle")
    .addClass("w--open");

  $(".fg-nav-dd").click(function () {
    const $wrap = $(this);
    if ($wrap.find(".fg-nav-title").text().trim() === topicTitle) {
      setTimeout(function () {
        $wrap.find(".w-dropdown-toggle").addClass("w--open");
      }, 10);
    }
  });

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

  // Add other dropdown lists
  const $navLinks = $(".fg-dd-list");

  // Loop through each URL
  $(".fg-topic-link").each(function () {
    const url = $(this).attr("href");

    // Create a temporary container to load the fetched page
    const $tempContainer = $("<div>");

    // Load the fetched page into the temporary container
    $tempContainer.load(url, function () {
      // Get the div from the fetched page
      const tempTopicTitle = $tempContainer.find("#topicTitle").text().trim();
      const div = $tempContainer.find(".articles-collection");

      const filtered = $navLinks.filter(function () {
        return (
          $(this).closest(".fg-nav-dd").find(".fg-nav-title").text().trim() ===
          tempTopicTitle
        );
      });
      filtered.append(div);
    });
  });

  setTimeout(function () {
    // $(".articles-collection").css("display", "block");

    $(".fg-nav-subheading").each(function () {
      // const iD = slugify($(this).text());
      const iD = $(this).attr("href");
      if (
        $(this).closest(".fg-nav-dd").find(".fg-nav-title").text().trim() ==
        topicTitle
      ) {
        // $(this).attr("href", "#" + iD);
      } else {
        const topicLink = slugify(
          $(this).closest(".fg-nav-dd").find(".fg-nav-title").text().trim()
        );
        $(this).attr("href", topicLink + iD);
      }
      $(this).click(function () {
        $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
      });
    });
  }, 2000);

  // fixed sidebar navigation styles
  // Get all the sidebar links with class .toc-link
  var sidebarLinks = $(".toc-link");

  const fractionAmount = 4;

  function setActiveToc() {
    if (sidebarLinks.length && sidebarLinks.length > 1) {
      var viewportTop =
        $(window).scrollTop() + $(window).height() / fractionAmount;
      var firstSectionTop = $(sidebarLinks.first().attr("href")).offset().top;

      // Check if the viewport is at the very top of the page
      if (viewportTop < firstSectionTop + $(window).height() / fractionAmount) {
        sidebarLinks.removeClass("w--current");
        sidebarLinks.first().addClass("w--current");
        return;
      }

      // Loop through each sidebar link
      sidebarLinks.each(function () {
        // Get the ID of the corresponding section
        var sectionId = $(this).attr("href");

        // Get the position of the top of the section
        var sectionTop = $(sectionId).offset().top;

        // Get the height of the section
        var sectionHeight = $(sectionId).height();

        // Calculate the position of the top of the viewport with 1/4 distance from the top
        var viewportTop =
          $(window).scrollTop() + $(window).height() / fractionAmount;

        // Check if the section is currently in view
        if (
          sectionTop <= viewportTop &&
          sectionTop + sectionHeight >= viewportTop
        ) {
          // Add the active class to the sidebar link
          $(this).addClass("w--current");
        } else {
          // Remove the active class from the sidebar link
          $(this).removeClass("w--current");
        }
      });
    }
  }

  // triggerline for testing
  function drawTriggerLine() {
    $("#trigger-line").remove(); // Remove existing line if any
    var viewportTop =
      $(window).scrollTop() + $(window).height() / fractionAmount;
    var line = $('<div id="trigger-line"></div>');
    line.css({
      position: "absolute",
      top: viewportTop + "px",
      left: 0,
      width: "100%",
      height: "2px",
      background: "red",
      zIndex: 9999
    });
    $("body").append(line);
  }

  // Add an event listener to the window's scroll event with throttle
  $(window).scroll(function () {
    setActiveToc();
    // drawTriggerLine(); // Draw the line
  });

  setTimeout(function () {
    setActiveToc();
    // drawTriggerLine(); // Draw the line
  }, 0);

  $(".fg-articles-wrapper").css("opacity", "1");

  // clone sidebar lists into mobile dd's
  $(".fg-mob-rc-target").append($(".fg-rc-list").clone());
  $(".fg-mob-toc-target").append($(".toc-wrapper").clone());
  $(".fg-mob-toc-target")
    .find("a")
    .click(function () {
      $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
    });

  // hide related content if there's none
  if (
    !(
      $(".fg-sidebar-sticky:last-of-type > .w-dyn-list > .w-dyn-empty")
        .length === 3
    )
  ) {
    $(".fg-sidebar-sticky:last-of-type").css("opacity", "1");
  }

  // add class to sticky bottom when DD open
  $(".fg-sticky-mobile-bottom").click(function () {
    $(this).toggleClass(
      "is-open",
      !$(this).find(".fg-mob-dd-toggle.w-dropdown-toggle").hasClass("w--open")
    );
  });

  // mobile thumbnails
  setTimeout(function () {
    $(".article-thumb.square-mobile").css("object-fit", "cover !important");
  }, 2000);

  // limit related content to 6
  $(".fg-sidebar-sticky._2 .w-dyn-item").each(function (index, el) {
    if (index > 5) {
      $(this).hide();
    }
  });
// });
