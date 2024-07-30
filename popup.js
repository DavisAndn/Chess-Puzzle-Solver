document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ action: "fetchPGN" }, function(response) {
      if (response && response.success) {
        document.getElementById('pgn-box').textContent = response.pgn;
      } else {
        document.getElementById('pgn-box').textContent = "Failed to fetch PGN data.";
      }
    });
  });
  