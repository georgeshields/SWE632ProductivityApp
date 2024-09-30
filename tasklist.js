let tasksByDate = {}; // Object to store tasks by date
let dragged; // Variable to store the dragged item

// Function to create a new task
function newElement() {
  const taskDate = document.getElementById("taskDate").value;
  const taskText = document.getElementById("inputText").value;

  if (taskText === '' || taskDate === '') {
    alert("Please enter a task and pick a date.");
    return;
  }

  // If there are no tasks for the selected date, initialize an empty array for that date
  if (!tasksByDate[taskDate]) {
    tasksByDate[taskDate] = [];
  }

  // Add the task to the tasks array for the selected date
  tasksByDate[taskDate].push(taskText);

  // Clear the task input field
  document.getElementById("inputText").value = '';

  // Save tasks to local storage (optional for persistence)
  localStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));

  // Display tasks for the selected date
  displayTasksForDate(taskDate);
}

// Function to display tasks for a specific date
function displayTasksForDate(date) {
  const taskList = document.getElementById('list');
  taskList.innerHTML = ''; // Clear existing tasks in the list

  const tasks = tasksByDate[date] || [];

  // Iterate over the tasks for the selected date and display them
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.draggable = true;
    li.textContent = task;

    // Add drag event listeners
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragover', dragOver);
    li.addEventListener('drop', drop);

    // Add close button to the task
    const button = document.createElement("button");
    const txt = document.createTextNode("\u00D7");
    button.className = "close";
    button.appendChild(txt);
    button.onclick = function () {
      tasks.splice(index, 1); // Remove the task from the tasks array
      tasksByDate[date] = tasks; // Update tasks for the date
      displayTasksForDate(date); // Re-render the task list
    };

    li.appendChild(button);
    taskList.appendChild(li);
  });
}

// Drag and drop event handlers
function dragStart(e) {
  dragged = e.target;  // Store the dragged item
  e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
  e.preventDefault();  // Allow the dragover event to trigger the drop
  e.dataTransfer.dropEffect = 'move';  // Indicate a move action
}

function drop(e) {
  e.preventDefault();

  if (e.target.tagName === 'LI' && dragged !== e.target) {
    const parent = e.target.parentNode;
    const targetRect = e.target.getBoundingClientRect();
    const mouseY = e.clientY; // Mouse Y-coordinate when drop happens

    // If the mouse is below the midpoint of the target element, insert after
    if (mouseY > targetRect.top + targetRect.height / 2) {
      parent.insertBefore(dragged, e.target.nextSibling); // Insert after target
    } else {
      parent.insertBefore(dragged, e.target); // Insert before target
    }
  }
}

// Load tasks from local storage on page load (if using local storage)
window.onload = function () {
  const savedTasks = localStorage.getItem('tasksByDate');
  if (savedTasks) {
    tasksByDate = JSON.parse(savedTasks);
  }
}

// Event listener to display tasks for the selected date
document.getElementById('taskDate').addEventListener('change', function () {
  const selectedDate = document.getElementById('taskDate').value;
  displayTasksForDate(selectedDate);
});
