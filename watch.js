let timer;
let running = false;
let elapsedTime = 0;
let startTime = 0;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 1000);
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
  }
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  elapsedTime = 0;
  startTime = 0;
  lapCount = 0;
  timeDisplay.textContent = '00:00:00';
  lapList.innerHTML = '';
}

function recordLap() {
  if (running) {
    lapCount++;
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}
