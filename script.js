function addTask() {
    const titleInput = document.getElementById("taskTitle");
    const dateInput = document.getElementById("taskDate");

    const taskTitle = titleInput.value.trim();
    const taskDate = dateInput.value;

    if (taskTitle === "" || taskDate === "") {
        alert("Please enter both title and date.");
        return;
    }

    const today = new Date();
    const dueDate = new Date(taskDate);
    
    const daysLeft = calculateDaysLeft(today, dueDate);
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
function calculateDaysLeft(today, dueDate) {
    const todayDays = getDayOfYear(today);
    const dueDays = getDayOfYear(dueDate);
    return dueDays - todayDays;
}
function getDayOfYear(date) {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dayOfYear = 0;
    for (let i = 0; i < date.getMonth(); i++) {
        dayOfYear += daysInMonths[i];
    }
    
    dayOfYear += date.getDate();
    return dayOfYear;
}
function markAsCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.style.textDecoration = "line-through";
    taskItem.style.color = "#666";
    button.disabled = true; 
}