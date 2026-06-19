function getCacheBustedUrl(url) {
  return url + "?v=" + new Date().getTime();
}

// Symbol list (use the actual filenames of your new sharp images)
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
  "images/dixheuresvingtcinq.jpg",
  "images/troisheuresetdemie.jpg",
  "images/uneheureetdemie.jpg", 
  "images/onzeheuresmoinsvingtcinq.jpg",
  "images/onzeheuresmoinsvingt.jpg", 
  "images/deuxheuresmoinslequart.jpg",
  "images/quatreheuresmoinslequart.jpg",
  "images/quatreheuresmoinsdix.jpg"
];

// Initialize reels on page load
function initializeReels() {
  for (var i = 1; i <= 5; i++) {
    var reel = document.getElementById("reel" + i);
    if (reel) {
      // Pick a random symbol and add a cache-buster
      var spinningChoice = symbols[Math.floor(Math.random() * symbols.length)];

      console.log("Spinning:", spinningChoice);

      reel.src = getCacheBustedUrl(spinningChoice);
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

  var reels = [];
  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) spinBtn.disabled = true;
  if (result) result.textContent = "Ça tourne!... 🎰";

  for (var n = 1; n <= 5; n++) {
    (function(n) {
      var reel = document.getElementById("reel" + n);
      if (!reel) return;

      reel.classList.add("spinning");
      var duration = 2000 + (n - 1) * 500;
      var startTime = performance.now();

  function animate(now) {
  var elapsed = now - startTime;

  if (elapsed < duration) {

    var currentSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    reel.src = getCacheBustedUrl(currentSymbol);

    requestAnimationFrame(animate);

  } else {

    var finalChoice = symbols[Math.floor(Math.random() * symbols.length)];

    reel.src = getCacheBustedUrl(finalChoice);

    reel.classList.remove("spinning");
    reel.classList.add("stopping");

    setTimeout(function () {
      reel.classList.remove("stopping");
    }, 400);

    reels[n - 1] = finalChoice;

    if (n === 5) {
      if (reels.every(function (r) { return r === reels[0]; })) {
        result.textContent = "🎉 Jackpot! You got 5 in a row!";
      } else {
        result.textContent = "Voici tes images!";
      }
      spinBtn.disabled = false;
    }
  }
}
      requestAnimationFrame(animate);
    })(n);
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", initializeReels);
