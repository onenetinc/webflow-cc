$(window).on("load",(function(){const e=$(".grid-mask-3 .w-slide:has(.w-dyn-empty)").length;2==e?$(".grid-slider-3 .fg-slider-nav").remove():1==e&&$(".grid-slider-3 .fg-slider-nav .w-slider-dot:last-child").remove(),setTimeout((function(){$(".grid-slider-2 .w-slide").each((function(){0===$(this).children().length&&$(this).remove()}));let e=0;$(".fg-slider.grid-slider-2 .w-slider-dot").each((function(){e>$(".fg-slider.grid-slider-2 .w-slide").length-1&&$(this).remove(),e++})),Webflow.require("slider").redraw()}),1e3),$(".fg-featured-left > div:first-child:empty").css("display","none");const i=$(".grid-slider-3 .w-slide:first-child .w-dyn-item:first-child .fg-card");"Bryant Chou"==i.find(".fg-reg-heading").text().trim()&&i.attr("href","/articles/how-webflow-found-product-market-fit");const t=()=>{$(".uv2-cond").each((function(){$(this).find(".w-dyn-list > .w-dyn-empty").length>0&&$(this).find("> *:first-child").hide()}));const e=document.querySelector(".uv2-qa-block"),i=document.querySelector(".uv2-q-a-faq-collection-hidden > div");i&&i.classList.contains("w-dyn-empty")&&(e.style.display="none");const t=document.querySelector(".uv2-member-logo-1-single.all > div").children.length,n=$(".uv2-member-logo-grid-1-toggle"),o=function(e,i){let t=$(`.uv2-member-logo-${e}-single.limited`),n=$(`.uv2-member-logo-${e}-single.all`),o=i.find(".acc-line");"block"==t.css("display")?(t.fadeOut((()=>{n.fadeIn()})),o.fadeOut()):(n.fadeOut((()=>{t.fadeIn()})),o.fadeIn())};n.click((function(){o("1",$(this))})),n.click(),t<=3&&n.hide();const l=document.querySelector(".uv2-member-logo-1-single.all > div").children.length,c=$(".uv2-member-logo-grid-2-toggle");c.click((function(){o("2",$(this))})),c.click(),l<=3&&c.hide(),$(".uv2-manual-accordian-wrapper").click((function(){if(!$(this).find(".hidden-rte")[0]){let e=$(this).find(".uv2-manual-accordian-rich-text").clone();e.css({position:"absolute",height:"auto",maxHeight:"none",pointerEvents:"none",display:"none"}),e.addClass("hidden-rte"),e.appendTo($(this).find(".uv2-manual-accordian-rich-text"))}let e=$(this).find(".hidden-rte").height();const i=".uv2-manual-accordian-collection";$(this)[0].classList.contains("active-acc")?($(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),$(this).closest(i).find(".active-acc").removeClass("active-acc")):($(this).closest(i).find(".active-acc .uv2-manual-accordian-rich-text:not(.hidden-rte)").css("maxHeight","0px"),$(this).closest(i).find(".active-acc").removeClass("active-acc"),$(this).addClass("active-acc"),$(this).find(".uv2-manual-accordian-rich-text").css("maxHeight",e+200))}))};let n={};$(".fg-link-block").each((function(){let e=$(this)[0].href;$.ajax({type:"get",url:e,success:function(i){let t=$(i).find(".uv2-team-member-wrapper");n[e]=t}})})),$(".fg-link-block").click((function(e){e.preventDefault(),$(".uv2-body")[0].style.overflow="hidden";let i=$(this)[0].href,o=$(n[i]);if($(".uv2-bio-modal-content *").remove(),i in n){let e=o.clone(!0);$(".uv2-bio-modal-content").append(e),setTimeout((function(){$(".uv2-hide-bio-modal-overlay")[0].style.minHeight=$(".uv2-bio-modal-content").height()+280+"px"}),2e3),t()}else setTimeout((function(){let e=$(n[i]).clone(!0);$(".uv2-bio-modal-content").append(e),setTimeout((function(){$(".uv2-hide-bio-modal-overlay")[0].style.minHeight=$(".uv2-bio-modal-content").height()+280+"px"}),2e3),t()}),4e3);$(".uv2-bio-modal.fg-landing").animate({scrollTop:$("#bio-modal").position().top},"slow")})),$(".uv2-hide-bio-modal-overlay, .uv2-bio-modal-close").click((function(){$(".uv2-body")[0].style.overflow="auto"}))}));