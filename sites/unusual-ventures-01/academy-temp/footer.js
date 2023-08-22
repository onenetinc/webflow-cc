
console.log("it's alive!")

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
      // More code using $ as alias to jQuery
      let timer = setInterval(function() {
            $('.uv2-wide-testimonial-slider4 .w-slider-arrow-right').click()
      }, 10000);
      
      $('.uv2-left-vertical-dots .w-slider-dot').bind("click", function() {
        clearInterval(timer)
        timer = setInterval(function() {
            $('.uv2-wide-testimonial-slider4 .w-slider-arrow-right').click()
        }, 10000);
      });
      
      // set video to stop playing when modal is closed
      const source = $('.modal-video-player iframe')[0].src;  
      $('.uv2-white-play-button').click(function(){
        $('.modal-video-player iframe')[0].src = source;
      })  

      $('.uv2-em-video-close').click(function(){
        $('.modal-video-player iframe')[0].src = '';
      })
      
      
      // remove empty stat slides
      $('.uv2-stats-slider').find('.w-dyn-empty').each(function(){
        $(this).closest('.w-slide')[0].remove()           
        Webflow.require('slider').redraw();
      })
      
      let applicationsOpen = $('.uv2-academy-hero-applications-collection .w-dyn-item > div:first-child')
      if (applicationsOpen[0].classList.contains('w-condition-invisible')) {
        // applications are closed
        $('.uv2-stats-slider').css('marginTop','2em');
      } else {
        // applicastions are open
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
      

    });
    
    
    
    // START MODAL JS
    // modal page code
    const runModalCode = () => {
    
      $(".uv2-cond").each(function () {
        if ($(this).find(".w-dyn-list > .w-dyn-empty").length > 0) {
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

