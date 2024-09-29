let countdown;
let time_seconds = 0;
let isPaused = true; 

function setTimer() {
  const hours = parseInt(document.getElementById('hours').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);

  time_seconds = (hours * 3600) + (minutes * 60) + seconds;

  if (time_seconds > 0) {
    document.getElementById('timerMessage').innerText = "Timer set for " + hours + " hr " + minutes + " min " + seconds + " sec";
    document.getElementById('play_pause').src = 'green_play.png';
    isPaused = true;
    clearInterval(countdown);
  } else {
    alert("Please set a valid time!");
  }
}

function toggleTimer() {
  if (isPaused && time_seconds > 0) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  isPaused = false;
  document.getElementById('play_pause').src = 'running_timer.png';
  countdown = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  isPaused = true;
  document.getElementById('play_pause').src = 'stop.png';
  document.getElementById('timerMessage').innerText = "Paused at " + formatTime(time_seconds);
}

function updateTimer() {
  if (time_seconds > 0) {
    time_seconds--;
    document.getElementById('timerMessage').innerText = "Countdown: " + formatTime(time_seconds);
  } else {
    clearInterval(countdown);
    document.getElementById('alarmSound').play();
    document.getElementById('play_pause').src = 'green_play.png';
    document.getElementById('timerMessage').innerText = "Timer stopped";
    alert("Timer done");
    document.getElementById('alarmSound').pause();
    document.getElementById('alarmSound').currentTime = 0;
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h + " hr " + m + " min " + s + " sec";
}

document.getElementById('play_pause').addEventListener('click', toggleTimer);
