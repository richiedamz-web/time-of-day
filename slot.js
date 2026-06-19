let spinning = false;

function getCacheBustedUrl(url) {
  return url + "?v=" + Date.now();
}

// Symbol list
var symbols = [
  "images/neufheures.jpg",
  "images/dixheures.jpg",
  "images/onzeheures.jpg",
  "images/douzeheures.jpg",
  "images/uneheure.jpg",
  "images/deuxheures.jpg",
  "images/troisheures.jpg",
  "images/neufheuresdix.jpg",
  "images/deuxheuresdix.jpg",
  "images/dixheuresvingt.jpg",
  "images/troisheuresvingtcinq.jpg",
  "images/troisheuresetdemie.jpg",
  "images/uneheureetdemie.jpg",
  "images/onzeheuresmoinsvingtcinq.jpg",
  "images/onzeheuresmoinsvingt.jpg",
  "images/deuxheuresmoinslequart.jpg",
  "images/quatreheuresmoinslequart.jpg",
  "images/quatreheuresmoinsdix.jpg"
];

// Initialize reels
function initializeReels() {
  for (var i = 1; i <= 5; i++) {
    var reel = document.getElementById("reel" + i);
    if (reel) {
      var randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = getCacheBustedUrl(randomSymbol);
    }
  }

  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }
}

// Spin function
function spin() {
  if (symbols.length < 5) {
    var result = document.getElementById("result");
    if (result) result.textContent = "Not enough symbols!";
    return;
  }

  var reels = [] 
  var availableSymbols = symbols.slice();
  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");

  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  for (var n = 1; n <= 5; n++) {
    (function(n) {
      var reel = document.getElementById("reel" + n);
      if (!reel) return;

      reel.classList.add("spinning");

      var duration = 2000 + (n - 1) * 500;
      var startTime = performance.now();

    
    })(n);
  }
}
function spin() {
  var reels = [];
  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");

  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  for (var n = 1; n <= 5; n++) {
    var reel = document.getElementById("reel" + n);

    var duration = 2000 + (n - 1) * 500;

    reels[n - 1] = symbols[Math.floor(Math.random() * symbols.length)];

    reel.src = reels[n - 1];
  }

  setTimeout(function () {
    if (reels.every(r => r === reels[0])) {
      result.textContent = "🎉 Jackpot! You got 5 in a row!";
    } else {
      result.textContent = "Voici tes images!";
    }
    spinBtn.disabled = false;
  }, 3500);
}
// Run on page load
window.addEventListener("load", initializeReels);
initializeReels();
