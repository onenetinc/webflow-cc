function slugify(i){return i.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}console.log("running"),$(".fg-section-link").each((function(){const i=slugify($(this).find(".fg-nav-title").text()),t=$(this).attr("href")+"#"+i;$(this).attr("href",t)}));let topicSectionText=$(".fg-article-topic-section").text().trim();topicSectionText&&$(".fg-nav-topic-section").filter((function(){return $(this).find(".fg-nav-title").text().trim()===topicSectionText})).addClass("active"),$(".fg-topics-block:not(.w-condition-invisible)").each((function(){$(this).clone().insertBefore($(this).parent()),$(this).remove()}));let $parents=$(".fg-nav-grid._2");$parents.each((function(){let i=$(this),t=i.children().detach();t.sort((function(i,t){let n=Number($(i).find(".topic-order:first").text().trim()),e=Number($(t).find(".topic-order:first").text().trim());return n!==e?n-e:Number($(i).find(".topic-section-order:first").text().trim())-Number($(t).find(".topic-section-order:first").text().trim())})),i.append(t)}));let $lastSolids=$(".fg-topics-block").prev(".fg-topic-nav-wrap").find(".fg-solid:last-child");$lastSolids.prev().removeClass("w-condition-invisible"),$lastSolids.css("display","none"),setTimeout((function(){$(window).trigger("resize")}),0);let init=!1,windowWidth=$(window).width();$(window).resize((function(){const i=()=>$(window).width()<566?2:$(window).width()<924?3:$(window).width()<1160?5:($(window).width()<1300||$(window).width(),6);if(i()<5&&init&&$(this).width()===windowWidth)return;windowWidth=$(this).width();const t=$(".fg-nav-carousel .fg-nav-grid._2");console.log("$carouselEl: ",t),t.hasClass("slick-initialized")&&t.slick("unslick");const n=$(".fg-nav-title._2.bold:not(.w-condition-invisible)").closest(".fg-topic-nav-wrap");let e=n.parent().children().index(n);t.on("init",(function(i){t.hasClass("slick-initialized")&&($(".fg-loading").hide(),$(".fg-nav-collection").css("opacity","1")),$(".fg-nav-main .slick-track").hover((function(){$(this).closest(".fg-nav-main").css({"pointer-events":"auto"})}),(function(){$(this).closest(".fg-nav-main").css({"pointer-events":"none"})})),$(".fg-nav-main").addClass("loaded")})),console.log("slides to count: ",i()),i()>=2&&(t.slick({infinite:!1,slidesToShow:i(),slidesToScroll:i(),draggable:!0,nextArrow:$(".fg-caret-btn.right"),prevArrow:$(".fg-caret-btn.left"),initialSlide:e-2>=0?e-2:0,arrows:i()>=4}),t.on("afterChange",(function(n,e,o){o<i()&&t.slick("slickGoTo",0)})),t.on("afterChange",(function(i,n,e){var o=n.options.slidesToShow;if(e+o<n.slideCount&&e+2*o>=n.slideCount){var s=n.slideCount;e!==s&&t.slick("slickGoTo",s>=0?s:0)}}))),init=!0}));