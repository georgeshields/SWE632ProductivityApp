flatpickr("#taskDate", {
    enableTime: false,
    dateFormat: "Y-m-d H:i",
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Ensure calendar is initialized after DOM is fully loaded
    var calendarEl = document.getElementById('calendar');
    
    console.log("Initializing calendar...");
  
    // Initialize FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',  // Default to month grid
      events: fetchTasksAsEvents(), // Get tasks as calendar events
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay' // Month, week, day views
      }
    });
  
    console.log("Calendar initialized.");
    console.log("Rendering calendar...");
    calendar.render();
    console.log("Calendar rendered.");
  });
  
  // Function to fetch tasks from localStorage and convert them to FullCalendar events
  function fetchTasksAsEvents() {
    console.log("Fetching tasks from localStorage...");
    let tasksByDate = JSON.parse(localStorage.getItem('tasksByDate')) || {};
  
    console.log("Tasks fetched: ", tasksByDate);
    
    let events = [];
  
    // Add a test event to check if FullCalendar is rendering events
    events.push({
      title: "Test Event",
      start: new Date().toISOString().slice(0, 10),  // Today's date in YYYY-MM-DD format
      allDay: true
    });
  
    // Convert tasksByDate to FullCalendar events
    for (let date in tasksByDate) {
      tasksByDate[date].forEach(task => {
        events.push({
          title: task,  // Task name
          start: date,  // Task date
          allDay: true  // Mark as an all-day event
        });
      });
    }
  
    console.log("Events to display: ", events);
    return events;
  }
  