document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ action: "fetchPGN" }, function(response) {
      if (response && response.success) {
        const pgnData = response.pgn;
        const puzzleLengthMatch = pgnData.match(/\[Puzzle_Length\s+"(\d+)"\]/);
        const moveSequenceMatch = pgnData.match(/(\d+\..+?(?=\s+\(|$))/g);
  
        let displayText = '';
        
        if (puzzleLengthMatch) {
          displayText += `Puzzle Length: ${puzzleLengthMatch[1]}\n\n`;
        }
  
        if (moveSequenceMatch) {
          moveSequenceMatch.forEach(move => {
            displayText += move + '\n';
          });
        }
  
        document.getElementById('pgn-box').textContent = displayText;
      } else {
        document.getElementById('pgn-box').textContent = "Failed to fetch PGN data.";
      }
    });
  });
  