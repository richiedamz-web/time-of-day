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
  var reels = [];
  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");

  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  var startTime = performance.now();
  var durations = [];

  for (var i = 1; i <= 5; i++) {
    durations[i - 1] = 2000 + (i - 1) * 500;
  }

  function animate() {
    var now = performance.now();
    var active = false;

    for (var n = 1; n <= 5; n++) {
      var reel = document.getElementById("reel" + n);

      if (now - startTime < durations[n - 1]) {
        active = true;

        reel.src = getCacheBustedUrl(
          symbols[Math.floor(Math.random() * symbols.length)]
        );
      } else if (!reels[n - 1]) {
        reels[n - 1] =
          symbols[Math.floor(Math.random() * symbols.length)];

        reel.src = reels[n - 1];
      }
    }

    if (active) {
      requestAnimationFrame(animate);
    } else {
      if (reels.every(r => r === reels[0])) {
        result.textContent = "🎉 Jackpot! You got 5 in a row!";
      } else {
        result.textContent = "Voici tes images!";
      }

      spinBtn.disabled = false;
    }
  }

  requestAnimationFrame(animate);
}   
 
