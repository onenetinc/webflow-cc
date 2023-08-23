// $(window).on("load", function () {

  $('#prevBtnFaux').click(function(){
  	$('#prevBtn').click();
  })
  $('#nextBtnFaux').click(function(){
  	$('#nextBtn').click();
  })

  const emptySlides = $(".grid-mask-3 .w-slide:has(.w-dyn-empty)").length;
  if (emptySlides == 2) {
    $(".grid-slider-3 .fg-slider-nav").remove();
  } else if (emptySlides == 1) {
    $(".grid-slider-3 .fg-slider-nav .w-slider-dot:last-child").remove();
  }

  $(".fg-featured-left > div:first-child:empty").css("display", "none");

  // manual webflow link override
  const $webflowCard = $(
    ".grid-slider-3 .w-slide:first-child .w-dyn-item:first-child .fg-card"
  );
  if ($webflowCard.find(".fg-reg-heading").text().trim() == "Bryant Chou") {
    $webflowCard.attr("href", "/articles/how-webflow-found-product-market-fit");
  }

  // START MODAL JS
  // modal page code

  const runModalCode = () => {
    $(".uv2-cond").each(function () {
      if ($(this).find(".w-dyn-list > .w-dyn-empty").length > 0 || $(this).find('.w-condition-invisible').length >= 3) {
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
  $(".fg-link-block").each(function () {
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
  $(".fg-link-block").click(function (e) {
    e.preventDefault();
    // prevent body from scrolling
    $(".uv2-body")[0].style.overflow = "hidden";

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
    // scroll to top of modal
    $(".uv2-bio-modal.fg-landing").animate(
      {
        scrollTop: $("#bio-modal").position().top
      },
      "slow"
    );
  });

  // set body back to scroll
  $(".uv2-hide-bio-modal-overlay, .uv2-bio-modal-close").click(function () {
    $(".uv2-body")[0].style.overflow = "auto";
  });
  // END MODAL JS
// });
