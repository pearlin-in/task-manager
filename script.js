function addTask() {
    const titleInput = document.getElementById("taskTitle");
    const dateInput = document.getElementById("taskDate");

    const taskTitle = titleInput.value.trim();
    const taskDate = dateInput.value;

    if (taskTitle === "" || taskDate === "") {
        alert("Please enter both title and date.");
        return;
    }

    // Calculate days left manually like Java code
    const today = new Date();
    const dueDate = new Date(taskDate);
    
    const daysLeft = calculateDaysLeft(today, dueDate);

    // Determine task class based on how soon the task is due
    let taskClass = '';
    if (daysLeft < 0) {
        taskClass = 'overdue'; 
    } else if (daysLeft <= 3) {
        taskClass = 'due-soon'; 
    } else {
        taskClass = 'upcoming'; 
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.classList.add(taskClass);

    li.innerHTML = `
        <strong>${taskTitle}</strong><br>
        Due: ${taskDate}<br>
        <span>${daysLeft} days left</span>
        <button class="checkmark" onclick="markAsCompleted(this)">✔</button>
        <button class="delete" onclick="this.parentElement.remove()">X</button>
    `;

    taskList.appendChild(li);

    titleInput.value = "";
    dateInput.value = "";
    sortTasks();
}

// Manually calculate days left between two dates (similar to Java logic)
function calculateDaysLeft(today, dueDate) {
    // Get the number of days from January 1st to today's date
    const todayDays = getDayOfYear(today);

    // Get the number of days from January 1st to the due date
    const dueDays = getDayOfYear(dueDate);

    // Return the difference in days
    return dueDays - todayDays;
}

// Function to calculate the day of the year for a given date
function getDayOfYear(date) {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dayOfYear = 0;
    
    // Calculate day of the year by summing up the days of previous months
    for (let i = 0; i < date.getMonth(); i++) {
        dayOfYear += daysInMonths[i];
    }
    
    // Add the days of the current month
    dayOfYear += date.getDate();

    return dayOfYear;
}
function markAsCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.style.textDecoration = "line-through";
    taskItem.style.color = "#666";
    button.disabled = true; // Disable the checkmark after marking
}