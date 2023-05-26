const startButton = document.getElementById("start-button");
const timerSpan = document.getElementById("time-left");

let timeLeft = 5;

function startGame() {
  const gameInterval = setInterval(() => {
    timerSpan.textContent = --timeLeft;

    if (!timeLeft) {
      clearInterval(gameInterval);
      window.location.href = "highscore.html";
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);
