console.log("almost running"),$(window).on("load",(function(){console.log("running"),$(".fg-section-link").each((function(){const i=$(this).find(".fg-nav-title").text().toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"");const t=$(this).attr("href")+"#"+i;$(this).attr("href",t)}));let i=$(".fg-article-topic-section").text().trim();i&&$(".fg-nav-topic-section").filter((function(){return $(this).find(".fg-nav-title").text().trim()===i})).addClass("active"),$(".fg-topics-block:not(.w-condition-invisible)").each((function(){$(this).clone().insertBefore($(this).parent()),$(this).remove()})),$(".fg-nav-grid._2").each((function(){let i=$(this),t=i.children().detach();t.sort((function(i,t){let n=Number($(i).find(".topic-order:first").text().trim()),e=Number($(t).find(".topic-order:first").text().trim());return n!==e?n-e:Number($(i).find(".topic-section-order:first").text().trim())-Number($(t).find(".topic-section-order:first").text().trim())})),i.append(t)}));let t=$(".fg-topics-block").prev(".fg-topic-nav-wrap").find(".fg-solid:last-child");t.prev().removeClass("w-condition-invisible"),t.css("display","none"),setTimeout((function(){$(window).trigger("resize")}),0);let n=!1,e=$(window).width();$(window).resize((function(){const i=()=>$(window).width()<566?2:$(window).width()<924?3:$(window).width()<1160?5:($(window).width()<1300||$(window).width(),6);if(i()<5&&n&&$(this).width()===e)return;e=$(this).width();const t=$(".fg-nav-carousel .fg-nav-grid._2");console.log("$carouselEl: ",t),t.hasClass("slick-initialized")&&t.slick("unslick");const o=$(".fg-nav-title._2.bold:not(.w-condition-invisible)").closest(".fg-topic-nav-wrap");let s=o.parent().children().index(o);t.on("init",(function(i){t.hasClass("slick-initialized")&&($(".fg-loading").hide(),$(".fg-nav-collection").css("opacity","1")),$(".fg-nav-main .slick-track").hover((function(){$(this).closest(".fg-nav-main").css({"pointer-events":"auto"})}),(function(){$(this).closest(".fg-nav-main").css({"pointer-events":"none"})})),$(".fg-nav-main").addClass("loaded")})),console.log("slides to count: ",i()),i()>=2&&(t.slick({infinite:!1,slidesToShow:i(),slidesToScroll:i(),draggable:!0,nextArrow:$(".fg-caret-btn.right"),prevArrow:$(".fg-caret-btn.left"),initialSlide:s-2>=0?s-2:0,arrows:i()>=4}),t.on("afterChange",(function(n,e,o){o<i()&&t.slick("slickGoTo",0)})),t.on("afterChange",(function(i,n,e){var o=n.options.slidesToShow;if(e+o<n.slideCount&&e+2*o>=n.slideCount){var s=n.slideCount;e!==s&&t.slick("slickGoTo",s>=0?s:0)}}))),n=!0}))}));