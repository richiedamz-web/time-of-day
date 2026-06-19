

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

  var spinBtn = document.getElementById("spinBtn");

  // safety: always ensure button is usable
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }

  for (var i = 1; i <= 5; i++) {
    var reel = document.getElementById("reel" + i);

    if (!reel) {
      console.warn("Missing reel:", i);
      continue;
    }

    var randomSymbol =
      symbols[Math.floor(Math.random() * symbols.length)];

    reel.src = getCacheBustedUrl(randomSymbol);
  }

  console.log("initializeReels complete");
}

// Spin function

function spin() {

  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");

  if (!result || !spinBtn || spinning) return;

  spinning = true;

  var reels = [];

  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  var startTime = performance.now();
  var durations = [2000, 2500, 3000, 3500, 4000];

  function animate() {
    var now = performance.now();
    var active = false;

    for (var n = 1; n <= 5; n++) {
      var reel = document.getElementById("reel" + n);
      if (!reel) continue;

      if (now - startTime < durations[n - 1]) {
      active = true;

      var img = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = getCacheBustedUrl(img);

}     else {
      var finalImg = symbols[Math.floor(Math.random() * symbols.length)];
      reels[n - 1] = finalImg;
      reel.src = finalImg;
}
    }

    if (active) {
      requestAnimationFrame(animate);
    } else {
      if (reels.every(r => r && r === reels[0])) {
        result.textContent = "🎉 Jackpot! You got 5 in a row!";
      } else {
        result.textContent = "Voici tes images!";
      }
      spinBtn.disabled = false;
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}
