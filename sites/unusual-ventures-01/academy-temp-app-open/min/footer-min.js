let player2,player1;function initYouTubePlayer(){return new Promise((function(e){var t=setInterval((function(){"undefined"!=typeof YT&&void 0!==YT.Player&&(clearInterval(t),player1=new YT.Player("youtube-player1",{height:"360",width:"640",videoId:"8uuWw2sSwjs",events:{onReady:function(e){console.log("player1 is ready"),i()}}}),player2=new YT.Player("youtube-player2",{height:"360",width:"640",videoId:"kzVd0u5rw0o",events:{onReady:function(e){console.log("player2 is ready"),i()}}}))}),100);function i(){player1&&player2&&e()}}))}$.getScript("https://www.youtube.com/iframe_api").then(initYouTubePlayer).then((function(){$(".vidlink.one").click((function(){console.log("player1.getPlayerState() === YT.PlayerState.PLAYING: ",player1.getPlayerState()===YT.PlayerState.PLAYING),player1.getPlayerState()!==YT.PlayerState.PLAYING&&player1.playVideo()})),$(".academy-video-modal .academy-hide-video-modal-overlay, .academy-video-modal .academy-video-modal-close").click((function(){player1.getPlayerState()===YT.PlayerState.PLAYING&&player1.pauseVideo()})),$(".vidlink.two").click((function(){!player2.getPlayerState()!==YT.PlayerState.PLAYING&&player2.playVideo()})),$(".academy-video-modal-2 .academy-hide-video-modal-overlay, .academy-video-modal-2 .academy-video-modal-close").click((function(){player2.getPlayerState()===YT.PlayerState.PLAYING&&player2.pauseVideo()}))}));const testRefLength=document.querySelectorAll(".uv2-collection-hidden .w-dyn-item").length,testSingle=document.querySelector(".uv2-wide-testimonial-single"),testSlider=document.querySelector(".uv2-wide-testimonial-slider3");if(1==testRefLength)testSlider.classList.add("uv2-hide"),testSingle.classList.remove("uv2-hide");else if(2==testRefLength){const e=testSlider.querySelector(".w-slider-mask");e.removeChild(e.lastElementChild)}jQuery.noConflict(),function(e){e((function(){let t=setInterval((function(){e(".uv2-wide-testimonial-slider4 .w-slider-arrow-right").click()}),5e3);e(".uv2-left-vertical-dots .w-slider-dot").bind("click",(function(){clearInterval(t),t=setInterval((function(){e(".uv2-wide-testimonial-slider4 .w-slider-arrow-right").click()}),5e3)}));const i=e(".modal-video-player iframe")[0].src;e(".uv2-white-play-button").click((function(){e(".modal-video-player iframe")[0].src=i})),e(".uv2-em-video-close").click((function(){e(".modal-video-player iframe")[0].src=""})),e(".uv2-manual-accordian-wrapper").click((function(){if(!e(this).find(".hidden-rte")[0]){let t=e(this).find(".uv2-manual-accordian-rich-text").clone();t.css({position:"absolute",height:"auto",maxHeight:"none",pointerEvents:"none",display:"none"}),t.addClass("hidden-rte"),t.appendTo(e(this).find(".uv2-manual-accordian-rich-text"))}let t=e(this).find(".hidden-rte").height();const i=".uv2-manual-accordian-collection";e(this)[0].classList.contains("active-acc")?(e(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),e(this).closest(i).find(".active-acc").removeClass("active-acc")):(e(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),e(this).closest(i).find(".active-acc").removeClass("active-acc"),e(this).addClass("active-acc"),e(this).find(".uv2-manual-accordian-rich-text").css("maxHeight",t+200))}))}));const t=()=>{e(".uv2-cond").each((function(){(e(this).find(".w-dyn-list > .w-dyn-empty").length>0||e(this).find(".w-condition-invisible").length>=3)&&e(this).find("> *:first-child").hide()}));const t=document.querySelector(".uv2-qa-block"),i=document.querySelector(".uv2-q-a-faq-collection-hidden > div");i&&i.classList.contains("w-dyn-empty")&&(t.style.display="none");const a=document.querySelector(".uv2-member-logo-1-single.all > div").children.length,o=e(".uv2-member-logo-grid-1-toggle"),c=function(t,i){let a=e(`.uv2-member-logo-${t}-single.limited`),o=e(`.uv2-member-logo-${t}-single.all`),c=i.find(".acc-line");"block"==a.css("display")?(a.fadeOut((()=>{o.fadeIn()})),c.fadeOut()):(o.fadeOut((()=>{a.fadeIn()})),c.fadeIn())};o.click((function(){c("1",e(this))})),o.click(),a<=3&&o.hide();const n=document.querySelector(".uv2-member-logo-1-single.all > div").children.length,l=e(".uv2-member-logo-grid-2-toggle");l.click((function(){c("2",e(this))})),l.click(),n<=3&&l.hide(),e(".uv2-manual-accordian-wrapper").click((function(){if(!e(this).find(".hidden-rte")[0]){let t=e(this).find(".uv2-manual-accordian-rich-text").clone();t.css({position:"absolute",height:"auto",maxHeight:"none",pointerEvents:"none",display:"none"}),t.addClass("hidden-rte"),t.appendTo(e(this).find(".uv2-manual-accordian-rich-text"))}let t=e(this).find(".hidden-rte").height();const i=".uv2-manual-accordian-collection";e(this)[0].classList.contains("active-acc")?(e(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),e(this).closest(i).find(".active-acc").removeClass("active-acc")):(e(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),e(this).closest(i).find(".active-acc").removeClass("active-acc"),e(this).addClass("active-acc"),e(this).find(".uv2-manual-accordian-rich-text").css("maxHeight",t+200))}))};let i={};e(".uv2-services-card-wrapper").each((function(){let t=e(this)[0].href;e.ajax({type:"get",url:t,success:function(a){let o=e(a).find(".uv2-team-member-wrapper");i[t]=o}})})),e(".uv2-services-card-wrapper").click((function(a){a.preventDefault(),e(".uv2-body")[0].style.overflow="hidden";let o=e(this)[0].href,c=e(i[o]);if(e(".uv2-bio-modal-content *").remove(),o in i){let i=c.clone(!0);e(".uv2-bio-modal-content").append(i),setTimeout((function(){e(".uv2-hide-bio-modal-overlay")[0].style.minHeight=e(".uv2-bio-modal-content").height()+280+"px"}),2e3),t()}else setTimeout((function(){let a=e(i[o]).clone(!0);e(".uv2-bio-modal-content").append(a),setTimeout((function(){e(".uv2-hide-bio-modal-overlay")[0].style.minHeight=e(".uv2-bio-modal-content").height()+280+"px"}),2e3),t()}),4e3)})),e(".uv2-hide-bio-modal-overlay, .uv2-bio-modal-close").click((function(){e(".uv2-body")[0].style.overflow="auto"}))}(jQuery);let form=!1;window.location.href.indexOf("form")>-1&&(form=!0);const applicationDateString=$("#applicationDate").text().trim(),applicationDate=new Date(applicationDateString),today=new Date,differenceInDays=(applicationDate-today)/864e5;$("#applicationDateSwap").text(applicationDateString+"!"),console.log("differenceInDays: ",differenceInDays),form?differenceInDays>=0&&differenceInDays<=60?($("[data-application='closed']").hide(),$("[data-application='open']").show(),$("#applicationBlock").css("display","block"),setTimeout((function(){$("#applicationBlock, .uv2-academy-image-el, .academy-hero-content").css("opacity","1"),setTimeout((function(){$("#leadersSection").css("opacity","1")}),300)}),300),console.log("form IS showing")):($("[data-application='closed']").show(),$("[data-application='open']").hide(),console.log("form NOT showing"),$("#applicationBlock").css("display","block"),setTimeout((function(){$("#applicationBlock, .uv2-academy-image-el, .academy-hero-content").css("opacity","1"),setTimeout((function(){$("#leadersSection").css("opacity","1")}),300)}),300)):differenceInDays>=0&&differenceInDays<=10?($("[data-application='closed']").hide(),$("[data-application='open']").show(),$("#applicationBlock").css("display","block"),setTimeout((function(){$("#applicationBlock, .uv2-academy-image-el, .academy-hero-content").css("opacity","1"),setTimeout((function(){$("#leadersSection").css("opacity","1")}),300)}),300),console.log("form IS showing")):($("[data-application='closed']").show(),$("[data-application='open']").hide(),console.log("form NOT showing"),$("#applicationBlock").css("display","block"),setTimeout((function(){$("#applicationBlock, .uv2-academy-image-el, .academy-hero-content").css("opacity","1"),setTimeout((function(){$("#leadersSection").css("opacity","1")}),300)}),300));