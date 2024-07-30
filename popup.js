document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('pgn', function(data) {
      if (data.pgn) {
        document.getElementById('pgn-box').textContent = data.pgn;
      }
    });
  });
  