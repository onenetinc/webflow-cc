// video link clicks
let player2;
let player1;

function initYouTubePlayer() {
return new Promise(function(resolve) {
  var ytReady = setInterval(function() {
    if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
      clearInterval(ytReady);

      player1 = new YT.Player('youtube-player1', {
        height: '360',
        width: '640',
        videoId: '8uuWw2sSwjs',
        events: {
          'onReady': function(event) {
            console.log("player1 is ready");
            checkPlayersReady();
          }
        }
      });

      player2 = new YT.Player('youtube-player2', {
        height: '360',
        width: '640',
        videoId: 'kzVd0u5rw0o',
        events: {
          'onReady': function(event) {
            console.log("player2 is ready");
            checkPlayersReady();
          }
        }
      });
    }
  }, 100);

  function checkPlayersReady() {
    if (player1 && player2) {
      resolve();
    }
  }
});
}

// Load the YouTube API script
$.getScript("https://www.youtube.com/iframe_api")
  .then(initYouTubePlayer)
  .then(function() {

    $(".vidlink.one").click(function() {
      console.log("player1.getPlayerState() === YT.PlayerState.PLAYING: ", player1.getPlayerState() === YT.PlayerState.PLAYING)
      if (player1.getPlayerState() !== YT.PlayerState.PLAYING) {
        player1.playVideo();
      }
    });

    $(".academy-video-modal .academy-hide-video-modal-overlay, .academy-video-modal .academy-video-modal-close").click(function(){
      if (player1.getPlayerState() === YT.PlayerState.PLAYING) {
        // vid is playing
        player1.pauseVideo();
      }
    })


    $(".vidlink.two").click(function() {
      if (!player2.getPlayerState() !== YT.PlayerState.PLAYING) {
        player2.playVideo();
      }
    });

    $(".academy-video-modal-2 .academy-hide-video-modal-overlay, .academy-video-modal-2 .academy-video-modal-close").click(function(){
      if (player2.getPlayerState() === YT.PlayerState.PLAYING) {
        // vid is playing
        player2.pauseVideo();
      }
    })

  });



// Show appropriate number of testimonials based on availability in CMS
const testRefLength = document.querySelectorAll('.uv2-collection-hidden .w-dyn-item').length
const testSingle = document.querySelector('.uv2-wide-testimonial-single')
const testSlider = document.querySelector('.uv2-wide-testimonial-slider3')
if (testRefLength == 1) {
// only 1 item, so hide slider, and show single testimonial
testSlider.classList.add('uv2-hide')
testSingle.classList.remove('uv2-hide')
} else if (testRefLength == 2) {
// only 2 items, so remove last slide
const slideList = testSlider.querySelector('.w-slider-mask')
slideList.removeChild(slideList.lastElementChild);
}





// This adds custom slider autoplay using jquery. Also, needed a .noConflict wrapper in order to work properly
// Sometimes $() jquery selector won't work without the noConflict wrapper

jQuery.noConflict();
(function( $ ) {
  $(function() {
    let timer = setInterval(function() {
          $('.uv2-wide-testimonial-slider4 .w-slider-arrow-right').click()
    }, 5000);
    
    $('.uv2-left-vertical-dots .w-slider-dot').bind("click", function() {
      clearInterval(timer)
      timer = setInterval(function() {
          $('.uv2-wide-testimonial-slider4 .w-slider-arrow-right').click()
      }, 5000);
    });
    
    // set video to stop playing when modal is closed
    const source = $('.modal-video-player iframe')[0].src;  
    $('.uv2-white-play-button').click(function(){
      $('.modal-video-player iframe')[0].src = source;
    })

    $('.uv2-em-video-close').click(function(){
      $('.modal-video-player iframe')[0].src = '';
    })
    
      
    // manual accordian
    $('.uv2-manual-accordian-wrapper-rd').click(function(){

      if (!$(this).find('.hidden-rte')[0]) {
        let clonedRte = $(this).find('.uv2-manual-accordian-rich-text').clone();
        clonedRte.css({
          "position":"absolute",
          "height":"auto",
          "maxHeight":"none",
          "pointerEvents":"none",
          "display":"none"
        })
        clonedRte.addClass('hidden-rte');
        clonedRte.appendTo($(this).find('.uv2-manual-accordian-rich-text'));
      }
      let rteHeight = $(this).find('.hidden-rte').height();
      const wrapper = '.uv2-manual-accordian-collection';
      if ($(this)[0].classList.contains('active-acc')) {
        $(this).closest(wrapper).find('.active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)').css('maxHeight', '0px');
        $(this).closest(wrapper).find('.active-acc').removeClass('active-acc');
      } else {
        $(this).closest(wrapper).find('.active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)').css('maxHeight', '0px');
        $(this).closest(wrapper).find('.active-acc').removeClass('active-acc');
        $(this).addClass('active-acc');
        $(this).find('.uv2-manual-accordian-rich-text').css('maxHeight',(rteHeight + 200));
      }
    })
    

  });
  
  
  
  // START MODAL JS
  // modal page code
  const runModalCode = () => {
  
    $(".uv2-cond").each(function () {
      if ($(this).find(".w-dyn-list > .w-dyn-empty").length > 0 || $(this).find('.w-condition-invisible').length >= 3) {
        $(this).find("> *:first-child").hide();
      }
    });
  
    const qaBlock = document.querySelector('.uv2-qa-block');
    const refQaList = document.querySelector('.uv2-q-a-faq-collection-hidden > div');
    if (refQaList && refQaList.classList.contains('w-dyn-empty')) {
      qaBlock.style.display = "none";
    }

    const grid1Listcount = document.querySelector('.uv2-member-logo-1-single.all > div').children.length;
    const grid1Toggle = $('.uv2-member-logo-grid-1-toggle');

    const toggleClick = function(grid, toggle) {
      let limited = $(`.uv2-member-logo-${grid}-single.limited`);
      let all = $(`.uv2-member-logo-${grid}-single.all`);
      let line = toggle.find('.acc-line');
      if (limited.css('display') == 'block') {
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
    }
    grid1Toggle.click(function(){
      toggleClick('1',$(this));
    })
    grid1Toggle.click();
    if (grid1Listcount <= 3) {
      // less than or equal to 3
      grid1Toggle.hide();
    }

    const grid2Listcount = document.querySelector('.uv2-member-logo-1-single.all > div').children.length;
    const grid2Toggle = $('.uv2-member-logo-grid-2-toggle');
    grid2Toggle.click(function(){
      toggleClick('2',$(this));
    })
    grid2Toggle.click();
    if (grid2Listcount <= 3) {
      // less than or equal to 3
      grid2Toggle.hide();
    }

    // manual accordian
    $('.uv2-manual-accordian-wrapper').click(function(){

      if (!$(this).find('.hidden-rte')[0]) {
        let clonedRte = $(this).find('.uv2-manual-accordian-rich-text').clone();
        clonedRte.css({
          "position":"absolute",
          "height":"auto",
          "maxHeight":"none",
          "pointerEvents":"none",
          "display":"none"
        })
        clonedRte.addClass('hidden-rte');
        clonedRte.appendTo($(this).find('.uv2-manual-accordian-rich-text'));
      }
      let rteHeight = $(this).find('.hidden-rte').height();
      const wrapper = '.uv2-manual-accordian-collection';
      if ($(this)[0].classList.contains('active-acc')) {
        $(this).closest(wrapper).find('.active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)').css('maxHeight', '0px');
        $(this).closest(wrapper).find('.active-acc').removeClass('active-acc');
      } else {
        $(this).closest(wrapper).find('.active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)').css('maxHeight', '0px');
        $(this).closest(wrapper).find('.active-acc').removeClass('active-acc');
        $(this).addClass('active-acc');
        $(this).find('.uv2-manual-accordian-rich-text').css('maxHeight',(rteHeight + 200));
      }
    })
    

  }

  // load modals
  let modals = {}
  $('.uv2-services-card-wrapper').each(function(){
    let url = $(this)[0].href;
    $.ajax({
      'type': 'get',
      'url': url,
      success: function(response){
        let data = $(response).find('.uv2-team-member-wrapper');
        modals[url] = data
      } 
    });
  }) 

  // show modals
  $('.uv2-services-card-wrapper').click(function(e){
    e.preventDefault();
    // prevent body from scrolling
    $('.uv2-body')[0].style.overflow = 'hidden';

    let url = $(this)[0].href;
    let originalBio = $(modals[url]);
    $('.uv2-bio-modal-content *').remove();

    if (url in modals) {
      let clonedSection = originalBio.clone(true);
      $(".uv2-bio-modal-content").append(clonedSection);
      setTimeout(function(){
        $('.uv2-hide-bio-modal-overlay')[0].style.minHeight = ($('.uv2-bio-modal-content').height() + 280) + "px";
      }, 2000);
      runModalCode()
    } else {
      setTimeout(function(){
        let clonedSection = $(modals[url]).clone(true);
        $(".uv2-bio-modal-content").append(clonedSection);
        setTimeout(function(){
          $('.uv2-hide-bio-modal-overlay')[0].style.minHeight = ($('.uv2-bio-modal-content').height() + 280) + "px";
        }, 2000);
        runModalCode()
      }, 4000);
    }
  })

  // set body back to scroll
  $('.uv2-hide-bio-modal-overlay, .uv2-bio-modal-close').click(function(){
    $('.uv2-body')[0].style.overflow = 'auto';
  })
  // END MODAL JS
        
  
})(jQuery);



const applicationDateString = $('#applicationDate').text().trim();
const applicationDate = new Date(applicationDateString); // Replace with the actual date
const today = new Date();
const differenceInDays = (applicationDate - today) / (1000 * 3600 * 24);
let applicationOpen = differenceInDays >= -1 && differenceInDays <= 29;



$('#applicationDateSwap').text(applicationDateString + "!")

if (applicationOpen) {
  $("[data-application='closed']").hide();
  $("[data-application='open']").show();
  $('#applicationBlock').css("display","block");
  setTimeout(function(){
    $('#applicationBlock, .uv2-academy-image-el, .academy-hero-content').css("opacity","1");
    setTimeout(function(){
      $('#leadersSection').css("opacity","1");
    }, 300)
  }, 300)
  // console.log("form IS showing");
} else {
  $("[data-application='closed']").show();
  $("[data-application='open']").hide();
  // console.log("form NOT showing");
  $('#applicationBlock').css("display","block");
  setTimeout(function(){
    $('#applicationBlock, .uv2-academy-image-el, .academy-hero-content').css("opacity","1");
    setTimeout(function(){
      $('#leadersSection').css("opacity","1");
    }, 300)
  }, 300)
}


