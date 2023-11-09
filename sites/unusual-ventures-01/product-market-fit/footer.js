// video link clicks
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
    }
  }, 100);

  function checkPlayersReady() {
    if (player1) {
      resolve();
    }
  }
});
}

// Load the YouTube API script
$.getScript("https://www.youtube.com/iframe_api")
  .then(initYouTubePlayer)
  .then(function() {

    $(".pmf-hero-vid-block, .pmf-inline-vid-block").click(function() {
      const vidId = $(this).data('youtube-id');
      console.log("player1.getPlayerState() === YT.PlayerState.PLAYING: ", player1.getPlayerState() === YT.PlayerState.PLAYING)


      player1.loadVideoById(vidId);

      if (player1.getPlayerState() !== YT.PlayerState.PLAYING) {
        player1.playVideo();
      }
    });

    $(".uv-video-modal .uv-hide-video-modal-overlay, .uv-video-modal .uv-video-modal-close").click(function(){
      if (player1.getPlayerState() === YT.PlayerState.PLAYING) {
        // vid is playing
        player1.pauseVideo();
      }
    })

  });



  // update to most recent spotify embeds
$.ajax({
  url: `https://onenet-cc.netlify.app/.netlify/functions/spotify`,
  // url: `http://localhost:3000/.netlify/functions/spotify`,
  type: "GET"
})
.done(function(response) {
  const parsedResponse = JSON.parse(response);
  const episodeIds = parsedResponse.episodeIds;
  console.log("episodeIds: ", episodeIds)
  if (episodeIds && episodeIds.length === 6) {
    const iframes = $('.pmf-podcast-wrapper iframe');
    iframes.each(function(index, iframe) {
      console.log("replacing vids")
      // Replace only as many iframes as we have new IDs for
      if (index < episodeIds.length) {
        const newSrc = `https://open.spotify.com/embed/episode/${episodeIds[index]}/video?utm_source=generator`;
        $(iframe).attr('src', newSrc);
      }
    });
  }
})
.fail(function(jqXHR, textStatus) {
  console.log("Request failed: " + textStatus);
});