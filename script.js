const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const timerEl = document.querySelector('.timer');
const timerDisplay = document.querySelector('.timer-display');

let time = 25 * 60;
let interval;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update progress circle
  const progress = (1 - time / (25 * 60)) * 360;
  timerDisplay.style.background = `conic-gradient(var(--primary) ${progress}deg, #ddd ${progress}deg)`;
}

startBtn.addEventListener('click', () => {
  if (interval) return;
  interval = setInterval(() => {
    time--;
    updateTimer();
    
    if (time <= 0) {
      clearInterval(interval);
      interval = null;
      // Play completion sound
      new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-notification-bell-588.mp3').play();
    }
  }, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  time = 25 * 60;
  updateTimer();
});

updateTimer();
