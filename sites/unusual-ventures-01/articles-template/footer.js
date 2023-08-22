$(window).on("load", function () {
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

  $("h2")
    .filter(function () {
      return /&zwj;/.test($(this).html());
    })
    .remove();

  // set seo title
  const $h1 = $("#customTitle").text().trim();
  if ($h1.length > 0) {
    $("title").text($h1);
  }

  // remove old toc and blank spaces
  $(".fg-article-rte ul li:first-child").each(function () {
    if (
      $(this).text().trim().toLowerCase().includes("table of contents") ||
      $(this).text().trim().toLowerCase().includes("toc")
    ) {
      $(this).closest("ul").remove();
    }
  });

  // set blockquotes
  $(".fg-article-rte blockquote")
    .wrap($(".fg-assets .fg-rte-grid").clone())
    .closest(".fg-rte-grid")
    .addClass("fg-blockquote")
    .prepend($(".fg-blockquote-icon").clone());

  // set social share
  $(".fg-article-rte > *").each(function () {
    if ($(this).text().trim() === "<share>") {
      $(this)
        .nextUntil(":contains('<share>')")
        .wrapAll("<div class='fg-share-wrapper'>");
      $(this).nextAll(":contains('<share>')").first().remove();
      $(this).remove();
    }
  });

  // Clone the share dropdown widget and insert it into the wrapper element
  var $clone = $(".fg-share-dd").clone();
  $(".fg-share-wrapper")
    .wrap($(".fg-assets .fg-rte-grid").clone())
    .closest(".fg-rte-grid")
    .addClass("fg-social-share-wrapper")
    .prepend($clone);

  // Re-bind the share dropdown interaction to the cloned widget
  Webflow.require("dropdown").ready(function () {
    var api = Webflow.dropdown;
    var $dropdown = $clone.find(".dropdown");

    // Destroy the original dropdown interaction on the cloned widget
    api.destroy($dropdown);

    // Re-initialize the dropdown interaction on the cloned widget
    api.ready();

    // Enable dropdown interaction on cloned widget
    api.init($dropdown, {});
  });

  // set share btns
  $(".fg-social-share-wrapper").each(function () {
    // Get the share content element
    const $shareContent = $(this).find(".fg-share-wrapper");

    // Update the LinkedIn share icon
    const linkedInUrl =
      "https://www.linkedin.com/shareArticle?url=" +
      encodeURIComponent(window.location.href) +
      "&title=" +
      encodeURIComponent(document.title) +
      "&summary=" +
      encodeURIComponent($shareContent.text());
    $(this).find(".linkedin").attr("href", linkedInUrl);

    // Update the Twitter share icon
    const twitterUrl =
      "https://twitter.com/share?url=" +
      encodeURIComponent(window.location.href) +
      "&text=" +
      encodeURIComponent($shareContent.text());
    $(this).find(".twitter").attr("href", twitterUrl);
  });

  // Get the list of fg-tools at the bottom of the page
  const $fgTools = $(".fg-tool");

  // Replace <tool> tags with fg-tools
  $(".fg-article-rte *:contains(<tool)").each(function (index) {
    const numMatch = $(this)
      .text()
      .trim()
      .match(/<tool(\d*)>/);
    let num;
    if (numMatch && numMatch[1] !== "") {
      num = parseInt(numMatch[1]);
    } else {
      num = null;
    }
    if (num === null) {
      // If no number is specified, replace with the first fg-tool
      if ($fgTools.length > 0) {
        const $fgTool = $fgTools.eq(index);
        $(this).replaceWith($fgTool);
      } else {
        console.warn(`No fg-tool found for <tool>`);
      }
    } else if (num > $fgTools.length) {
      // If the specified number is greater than the number of fg-tools, do nothing
      console.warn(`No fg-tool found for <tool${num}>`);
    } else {
      // Replace with the corresponding fg-tool
      const $fgTool = $fgTools.eq(num - 1);
      $(this).replaceWith($fgTool);
    }
  });

  // set toc
  // Get all h1 and h2 elements within the container
  const headings = $(".fg-article-rte h1, .fg-article-rte h2");

  // Loop through each heading element
  for (let i = 0; i < headings.length; i++) {
    const heading = $(headings[i]);

    // Calculate the distance to the next heading
    const nextHeading = heading.nextAll("h1, h2, *:last-child").first();
    if (nextHeading && nextHeading.offset()) {
      const distance =
        nextHeading.offset().top - heading.offset().top - heading.outerHeight();

      // Create a div with the calculated height and insert it after the current heading
      $("<div class='faux-height'>")
        .css("height", distance + 170 + "px")
        .appendTo(heading);
    }
  }

  const anchors = $(".fg-article-rte h1, .fg-article-rte h2");

  anchors.each(function () {
    const heading = $(this);
    const text = heading.text().trim();
    if (text) {
      const linkText = text.replace(/<(.+?)>/g, "").trim(); // remove angled bracket text and whitespace
      let alternateLinkText = "";

      // extract alternate link title from angled brackets in heading text
      const match = text.match(/<(.+?)>/);
      if (match) {
        alternateLinkText = match[1].trim();
        // link.find(".toc-link-text").text(alternateLinkText);
      }
      const final =
        alternateLinkText &&
        alternateLinkText &&
        alternateLinkText.indexOf(" ") !== -1
          ? alternateLinkText
          : linkText;
      if (final && final !== "" && final.length > 2) {
        const link = $(
          `<a class="toc-link" href="#${slugify(
            final
          )}"><h4 class="toc-link-text">${final}</h4></a>`
        );

        $(".toc-wrapper").append(link);
        heading.find(".faux-height").attr("id", slugify(final));
      }
    }
  });

  // remove custom tags
  const $elements = $(
    ".fg-article-rte p, .fg-article-rte h1, .fg-article-rte h2, .fg-article-rte h3, .fg-article-rte h4, .fg-article-rte h5, .fg-article-rte h6, .fg-article-rte h1 > *, .fg-article-rte h2 > *, .fg-article-rte h3 > *, .fg-article-rte h4 > *, .fg-article-rte h5 > *, .fg-article-rte h6 > *"
  );

  $elements.each(function () {
    const $element = $(this);
    const $contents = $element.contents();
    $contents
      .filter(function () {
        return this.nodeType === 3; // filter out non-text nodes
      })
      .each(function () {
        const $node = $(this);
        const originalText = $node.text();
        const filteredText = originalText.replace(/<[^>]+>/g, "");
        $node.replaceWith(document.createTextNode(filteredText)); // replace text node with new text node
      });
  });

  // set TLDR
  $(".fg-article-rte ul li:first-child").each(function () {
    if (
      $(this).text().trim().toLowerCase().includes("tldr") ||
      $(this).text().trim().toLowerCase().includes("tl;dr")
    ) {
      $(this).closest("ul").addClass("tldr");
      $(this)
        .closest("ul")
        .find("li:not(:first-child)")
        .wrapAll("<div class='tldr-list'>");
    }
  });
  $(".fg-article-rte ul").css("opacity", "1");

  // set current dropdown list
  const topicTitle = $("#topicTitle").text().trim();
  const articleTitle = $("#articleTitle").text().trim();

  if (topicTitle) {
    setTimeout(function () {
      $(".fg-nav-topic-section.active .fg-nav-line-height .fg-nav-article")
        .filter(function () {
          return $(this).text().trim() === articleTitle;
        })
        .addClass("current-article");
    }, 1000);
  }

  // end

  setTimeout(function () {
    $(".articles-collection").css("display", "block");

    $(".fg-nav-subheading").each(function () {
      $(this).click(function () {
        $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
      });
    });

    // pagination links
    const $currentList = $(".fg-nav-topic-section.active").find(
      ".fg-nav-article"
    );

    const $nextIfLast = $(".slick-slide .fg-nav-topic-section.active")
      .closest(".slick-slide")
      .nextAll(".fg-topic-nav-wrap")
      .first()
      .find(".fg-nav-article")
      .first();

    const $prevIfFirst = $(".slick-slide .fg-nav-topic-section.active")
      .closest(".slick-slide")
      .prevAll(".fg-topic-nav-wrap")
      .first()
      .find(".fg-nav-article")
      .last();

    const currentIndex = $currentList.index(
      $currentList.filter(".current-article")
    );

    let $nextArticle = $currentList.eq(currentIndex + 1);
    let $prevArticle = $currentList.eq(currentIndex - 1);

    if (currentIndex === 0) {
      $prevArticle = $prevIfFirst;
      if ($currentList.length === 1) {
        $nextArticle = $nextIfLast;
      }
    } else if (currentIndex === $currentList.length - 1) {
      $nextArticle = $nextIfLast;
    }

    if ($nextArticle.length) {
      const nextLink = [$nextArticle.text().trim(), $nextArticle.attr("href")];

      if (nextLink[0] && nextLink[1]) {
        $(".fg-next-article-text")
          .text(nextLink[0])
          .closest("a")
          .attr("href", nextLink[1]);
      }
    } else {
      $(".fg-article-pag:last-child").remove();
    }
    if ($prevArticle.length) {
      const prevLink = [$prevArticle.text().trim(), $prevArticle.attr("href")];

      if (prevLink[0] && prevLink[1]) {
        $(".fg-prev-article-text")
          .text(prevLink[0])
          .closest("a")
          .attr("href", prevLink[1]);
      }
    } else {
      $(".fg-article-pag:first-child").remove();
    }

    $(".fg-articles-footer").css("opacity", "1");
  }, 4000);

  // fixed sidebar navigation styles
  // Get all the sidebar links with class .toc-link
  var sidebarLinks = $(".toc-link");

  // Add an event listener to the window's scroll event
  $(window).scroll(function () {
    if (sidebarLinks.length && sidebarLinks.length > 1) {
      // Loop through each sidebar link
      sidebarLinks.each(function () {
        // Get the ID of the corresponding section
        var sectionId = $(this).attr("href");

        // Get the position of the top of the section
        var sectionTop = $(sectionId).offset().top;

        // Get the height of the section
        var sectionHeight = $(sectionId).height();

        // Calculate the position of the top of the viewport with 1/4 distance from the top
        var viewportTop = $(window).scrollTop() + $(window).height() / 6;

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
  });

  // adjust layout of dynamic content
  $(".article-item:has(.topic-title-text.full:visible)").css(
    "grid-column",
    "1/4"
  );
  $(".article-item:has(.topic-title-text.full:visible)").addClass(
    "section-top"
  );
  $(".section-top").each(function () {
    const title = slugify($(this).find("h3").text());
    $(this)
      .nextUntil(".section-top")
      .addBack()
      .wrapAll(`<div class="section-wrapper"></div>`)
      .closest(".section-wrapper")
      .append(`<div id="${title}" class="section-faux-id"></div>`);
  });
  $(".fg-articles-wrapper").css("opacity", "1");

  // clone sidebar lists into mobile dd's
  $(".fg-mob-rc-target").append($(".fg-rc-list").clone());
  $(".fg-mob-toc-target").append($(".toc-wrapper").clone());
  $(".fg-mob-toc-target")
    .find("a")
    .click(function () {
      $(this).closest(".w-dropdown").triggerHandler("w-close.w-dropdown");
    });

  // intro
  $("#introEl").append(
    "<div class='faux-height' id='intro' style='height: 250%'>"
  );

  // hide related content if there's none
  if (
    !(
      $(".fg-sidebar-sticky:last-of-type > .w-dyn-list > .w-dyn-empty")
        .length === 3
    )
  ) {
    $(".fg-sidebar-sticky:last-of-type").css("opacity", "1");
  }

  // content tabs
  $(".fg-faux-tab").click(function (e) {
    e.preventDefault();
    $(".fg-faux-tab").removeClass("active");
    $(this).addClass("active");
  });
  $(".fg-read").click(function (e) {
    e.preventDefault();
    $(".fg-article-tabs > a:first-child").click();
  });
  $(".fg-watch").click(function (e) {
    e.preventDefault();
    $(".fg-article-tabs > a:nth-child(2)").click();
  });
  $(".fg-listen").click(function (e) {
    e.preventDefault();
    $(".fg-article-tabs > a:last-of-type").click();
  });

  // add class to sticky bottom when DD open
  $(".fg-sticky-mobile-bottom").click(function () {
    $(this).toggleClass(
      "is-open",
      !$(this).find(".fg-mob-dd-toggle.w-dropdown-toggle").hasClass("w--open")
    );
  });

  // add class to blockquote with em
  $(".fg-article-rte blockquote:has(em)").addClass("has-em");

  // if no read content, hide tab, and select video tab
  const emptyMainContent = $(
    ".w-tab-content > div:first-child .fg-article-rte.w-dyn-bind-empty, .w-tab-content > div:first-child .fg-article-rte * "
  );
  const emptyMainContentVideo = $(
    ".w-tab-content > div:nth-child(2) .fg-article-rte.w-dyn-bind-empty, .w-tab-content > div:nth-child(2) .fg-article-rte * "
  );

  // Set default tab per content available
  // Select elements that contain only blank child elements
  let blankItems = [];
  $(".w-tab-pane").each(function () {
    let $fgArticleRte = $(this).find(".fg-article-rte");
    if (
      $fgArticleRte.children().length === 0 ||
      $fgArticleRte.text().trim() === ""
    ) {
      blankItems.push($(this).index());
    }
  });

  $(".fg-read-gap > a").each(function () {
    if (blankItems.includes(0) && blankItems.includes(1)) {
      $(".fg-read-gap > a:first-child, .fg-read-gap > a:nth-child(2)").hide();
      $(".fg-read-gap > a:last-child").click();
    } else if (blankItems.includes(0)) {
      $(".fg-read-gap > a:first-child").hide();
      $(".fg-read-gap > a:nth-child(2)").click();
    } else if (blankItems.length === 2) {
      $(".fg-faux-tab.fg-read.active").css({
        "pointer-events": "none"
      });
    }
  });

  // nest primary tag
  let primaryTag = $(".primary-tag:visible");
  if (primaryTag.length) {
    let tags = $(".tags-wrap .fg-tag");
    let match = false;
    tags.each(function () {
      if ($(this).text().trim() === primaryTag.find(".fg-tag").text().trim()) {
        match = true;
      }
    });
    if (match) {
      primaryTag.hide();
      $(".tags-wrap").css("opacity", "1");
    } else {
      $(".tags-wrap > div").prepend(primaryTag);
      $(".tags-wrap, .primary-tag").css("opacity", "1");
    }
  } else {
    $(".tags-wrap").css("opacity", "1");
  }

  // START MODAL JS
  // modal page code

  const runModalCode = () => {
    $(".uv2-cond").each(function () {
      if ($(this).find(".w-dyn-list > .w-dyn-empty").length > 0) {
        $(this).find("> *:first-child").hide();
      }
    });

    const qaBlock = document.querySelector(".uv2-qa-block");
    const refQaList = document.querySelector(
      ".uv2-q-a-faq-collection-hidden > div"
    );
    if (refQaList && refQaList.classList.contains("w-dyn-empty")) {
      qaBlock.style.display = "none";
    }

    const grid1Listcount = document.querySelector(
      ".uv2-member-logo-1-single.all > div"
    ).children.length;
    const grid1Toggle = $(".uv2-member-logo-grid-1-toggle");

    const toggleClick = function (grid, toggle) {
      let limited = $(`.uv2-member-logo-${grid}-single.limited`);
      let all = $(`.uv2-member-logo-${grid}-single.all`);
      let line = toggle.find(".acc-line");
      if (limited.css("display") == "block") {
        limited.fadeOut(() => {
          all.fadeIn();
        });
        line.fadeOut();
      } else {
        all.fadeOut(() => {
          limited.fadeIn();
        });
        line.fadeIn();
      }
    };
    grid1Toggle.click(function () {
      toggleClick("1", $(this));
    });
    grid1Toggle.click();
    if (grid1Listcount <= 3) {
      // less than or equal to 3
      grid1Toggle.hide();
    }

    const grid2Listcount = document.querySelector(
      ".uv2-member-logo-1-single.all > div"
    ).children.length;
    const grid2Toggle = $(".uv2-member-logo-grid-2-toggle");
    grid2Toggle.click(function () {
      toggleClick("2", $(this));
    });
    grid2Toggle.click();
    if (grid2Listcount <= 3) {
      // less than or equal to 3
      grid2Toggle.hide();
    }

    // manual accordian
    $(".uv2-manual-accordian-wrapper").click(function () {
      if (!$(this).find(".hidden-rte")[0]) {
        let clonedRte = $(this).find(".uv2-manual-accordian-rich-text").clone();
        clonedRte.css({
          position: "absolute",
          height: "auto",
          maxHeight: "none",
          pointerEvents: "none",
          display: "none"
        });
        clonedRte.addClass("hidden-rte");
        clonedRte.appendTo($(this).find(".uv2-manual-accordian-rich-text"));
      }
      let rteHeight = $(this).find(".hidden-rte").height();
      const wrapper = ".uv2-manual-accordian-collection";
      if ($(this)[0].classList.contains("active-acc")) {
        $(this)
          .closest(wrapper)
          .find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)")
          .css("maxHeight", "0px");
        $(this).closest(wrapper).find(".active-acc").removeClass("active-acc");
      } else {
        $(this)
          .closest(wrapper)
          .find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)")
          .css("maxHeight", "0px");
        $(this).closest(wrapper).find(".active-acc").removeClass("active-acc");
        $(this).addClass("active-acc");
        $(this)
          .find(".uv2-manual-accordian-rich-text")
          .css("maxHeight", rteHeight + 200);
      }
    });
  };

  // load modals
  let modals = {};
  $(".fg-author-link").each(function () {
    let url = $(this)[0].href;
    $.ajax({
      type: "get",
      url: url,
      success: function (response) {
        let data = $(response).find(".uv2-team-member-wrapper");
        modals[url] = data;
      }
    });
  });

  // show modals
  $(".fg-author-link").click(function (e) {
    e.preventDefault();
    // prevent body from scrolling
    $("body")[0].style.overflow = "hidden";

    let url = $(this)[0].href;
    let originalBio = $(modals[url]);
    $(".uv2-bio-modal-content *").remove();

    if (url in modals) {
      let clonedSection = originalBio.clone(true);
      $(".uv2-bio-modal-content").append(clonedSection);
      setTimeout(function () {
        $(".uv2-hide-bio-modal-overlay")[0].style.minHeight =
          $(".uv2-bio-modal-content").height() + 280 + "px";
      }, 2000);
      runModalCode();
    } else {
      setTimeout(function () {
        let clonedSection = $(modals[url]).clone(true);
        $(".uv2-bio-modal-content").append(clonedSection);
        setTimeout(function () {
          $(".uv2-hide-bio-modal-overlay")[0].style.minHeight =
            $(".uv2-bio-modal-content").height() + 280 + "px";
        }, 2000);
        runModalCode();
      }, 4000);
    }
  });

  // set body back to scroll
  $(".uv2-hide-bio-modal-overlay, .uv2-bio-modal-close").click(function () {
    $("body")[0].style.overflow = "auto";
  });
  // END MODAL JS

  // limit related content to 6
  $(".fg-sidebar-sticky._2 .w-dyn-item").each(function (index, el) {
    if (index > 5) {
      $(this).hide();
    }
  });
});

// Update meta tags
$(document).ready(function () {
  const $seoTitle = $(".custom-seo-title");
  const seoTitleText = $seoTitle.text().trim();
  if (seoTitleText) {
    $("head title").text(seoTitleText);
    $('meta[property="og:title"]').attr("content", seoTitleText);
    $('meta[property="twitter:title"]').attr("content", seoTitleText);
  }
});
