let countdown; // Global variable for interval
let time_seconds = 0; // Time to count down
let isPaused = true; // Start in a paused state

// Function to set the timer based on dropdown selections
function setTimer() {
  const hours = parseInt(document.getElementById('hours').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);

  // Convert hours, minutes, and seconds to total seconds
  time_seconds = (hours * 3600) + (minutes * 60) + seconds;

  if (time_seconds > 0) {
    document.getElementById('timerMessage').innerText = "Timer set for " + hours + " hr " + minutes + " min " + seconds + " sec";
    document.getElementById('play_pause').src = 'green_play.png'; // Reset play icon
    isPaused = true; // Set initial state to paused
    clearInterval(countdown); // Clear any existing intervals
  } else {
    alert("Please set a valid time!");
  }
}

// Function to toggle play/pause
function toggleTimer() {
  if (isPaused && time_seconds > 0) {
    startTimer();
  } else {
    pauseTimer();
  }
}

// Start or resume the timer
function startTimer() {
  isPaused = false;
  document.getElementById('play_pause').src = 'running_timer.png'; // Update icon to running
  countdown = setInterval(updateTimer, 1000); // Start the countdown
}

// Pause the timer
function pauseTimer() {
  clearInterval(countdown); // Stop the interval
  isPaused = true; // Timer is now paused
  document.getElementById('play_pause').src = 'stop.png'; // Update icon to paused
  document.getElementById('timerMessage').innerText = "Paused at " + formatTime(time_seconds);
}

// Update the timer every second
function updateTimer() {
  if (time_seconds > 0) {
    time_seconds--; // Decrease the time by 1 second
    document.getElementById('timerMessage').innerText = "Countdown: " + formatTime(time_seconds);
  } else {
    clearInterval(countdown); // Stop the interval when time is up
    document.getElementById('alarmSound').play();
    document.getElementById('play_pause').src = 'green_play.png'; // Reset to play icon
    document.getElementById('timerMessage').innerText = "Timer stopped";
    // Play the alarm sound
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();

    // Show alert and stop sound after user closes the alert
    alert("Timer done");
    alarmSound.pause();          // Pause the sound
    alarmSound.currentTime = 0;  // Reset the sound to the start
  }
}

// Format time as hh:mm:ss
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h + " hr " + m + " min " + s + " sec";
}

// Event listener for the play/pause button
document.getElementById('play_pause').addEventListener('click', toggleTimer);