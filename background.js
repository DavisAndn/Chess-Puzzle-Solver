chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1,
          priority: 1,
          action: { 
            type: "modifyHeaders",
            responseHeaders: [
              { header: "Content-Type", operation: "set", value: "application/json" }
            ]
          },
          condition: {
            urlFilter: "https://www.chess.com/callback/tactics/rated/next",
            resourceTypes: ["xmlhttprequest"]
          }
        }
      ],
      removeRuleIds: [1]
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchPGN") {
      fetch("https://www.chess.com/callback/tactics/rated/next", {
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
          chrome.storage.local.set({ pgn: data.pgn });
          sendResponse({ success: true, pgn: data.pgn });
        } else {
          sendResponse({ success: false });
        }
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        sendResponse({ success: false, error: error.message });
      });
      return true; // Keep the messaging channel open for sendResponse
    }
  });
  