
var spinning = false;
var animationId = null;

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
function getUniqueSymbols(count) {
  var shuffled = symbols.slice(); // make a copy

  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled.slice(0, count);
}
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

   reel.src = randomSymbol;
  }

  console.log("initializeReels complete");
}

// Spin function


function spin() {
if (animationId) {
  cancelAnimationFrame(animationId);
  animationId = null;
}

  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");

  if (!result || !spinBtn || spinning) return;

  spinning = true;

  var reels = [];
  var finalSymbols = getUniqueSymbols(5);

spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  var startTime = performance.now();
  var durations = [1000, 1400, 1800, 2200, 2500];
  var frameCounter = 0;

function animate() {
  var now = performance.now();
  var active = false;

  for (var n = 1; n <= 5; n++) {
    var reel = document.getElementById("reel" + n);
    if (!reel) continue;

    if (now - startTime < durations[n - 1]) {
      active = true;

      // update occasionally to reduce load
      if (Math.random() < 0.2) {
        var img = symbols[Math.floor(Math.random() * symbols.length)];
        reel.src = img;
      }

     } else {
     var finalImg = finalSymbols[n - 1];
     reels[n - 1] = finalImg;
     reel.src = finalImg;
}
  }

  if (active) {
    animationId = requestAnimationFrame(animate);
  } else {
    result.textContent = reels.every(r => r && r === reels[0])
      ? "🎉 Jackpot! You got 5 in a row!"
      : "Voici tes images!";

    spinBtn.disabled = false;
    spinning = false;
  }
}

requestAnimationFrame(animate);
}
window.addEventListener("DOMContentLoaded", initializeReels);
