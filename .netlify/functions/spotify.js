import axios  from "axios";
import querystring  from "querystring";


export async function handler(event, context) {
  // Replace these with your Spotify client ID and secret
  const clientId = "ad07ac5851c949ea89047bfe35d599e4";
  const clientSecret = "3bd29bd90c3a468995da2978ed042cca";

  // Base64 encode the client ID and secret
  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "client_credentials"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${encodedCredentials}`
        }
      }
    );

    console.log("token: ", response.data.access_token);
    const token = response.data.access_token;

    
    try {
      
      // Step 2: Fetch playlist tracks (podcast episodes in this case)
      var showId = "21jmEOg6jww0zX29no4FGA";
      const showResponse = await axios.get(
        `https://api.spotify.com/v1/shows/${showId}/episodes`,
        {
          headers: {
            "Authorization": 'Bearer ' + token
          }
        }
      );

      console.log("showResponse: ", showResponse.data);
      const episodeIds = showResponse.data.items.slice(0, 6).map(item => item.id);
  
      console.log("episodeIds: ", episodeIds);
  
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({ episodeIds })
      };

    } catch (error) {
      console.log("playlist error: ", error.response.data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch playlist" })
      };
    }


  } catch (error) {
    console.log("token error: ", error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch token" })
    };
  }
};



{/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/21jmEOg6jww0zX29no4FGA/video?utm_source=generator" width="624" height="351" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}