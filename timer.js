let countdown;
let time_seconds = 0;
let isPaused = true; 

function setTimer() { // take information form index.html
  let hours = parseInt(document.getElementById('hours').value) ;
  let minutes = parseInt(document.getElementById('minutes').value) ;
  let seconds = parseInt(document.getElementById('seconds').value) ;

// math to calculate the time in seconds to make all under same variable
  time_seconds = (hours * 3600) + (minutes * 60) + seconds;

  // while timer is running
  if (time_seconds > 0) {
    document.getElementById('timerMessage').innerText = "Timer set for " + hours + " hr " + minutes + " min " + seconds + " sec";
    document.getElementById('play_pause').src = 'green_play.png';
    clearInterval(countdown);
  } else {
    alert("Please set a valid time!"); // if time is 0. 
  }
}

function toggleTimer() {
  if (time_seconds == 0){
    setTimer(); // activates set timer if button was not pressed. Or if user did not set their timer settings
  }
  if (isPaused && time_seconds > 0) {
    startTimer(); // if timer paused and is running start the timer
  } else {
    pauseTimer(); 
  }
}

function startTimer() {
  
  isPaused = false; // not paused
  document.getElementById('play_pause').src = 'running_timer.png';
  countdown = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  isPaused = true;
  document.getElementById('play_pause').src = 'stop.png';
  document.getElementById('timerMessage').innerText = "Paused at " + formatTime(time_seconds);
}

function updateTimer() { // called by start timer function
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
