chrome.webRequest.onCompleted.addListener(
    function(details) {
      fetch(details.url, {
        method: 'GET',
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,ta;q=0.8',
          'dnt': '1',
          'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.pgn) {
          chrome.storage.local.set({pgn: data.pgn});
        }
      });
    },
    {urls: ["https://www.chess.com/callback/tactics/rated/next"]},
    []
  );
  