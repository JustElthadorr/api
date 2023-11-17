"use strict";
// Function to fetch all tasks and display them
function getAllTasks() {
    fetch('http://localhost/api/app/?cmd=all')
        .then(response => response.json())
        .then(data => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        data.tasks.forEach(task => {
            const listItem = document.createElement('li');
            // Create a checkbox for the completion status
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                // Call a function to update the completion status when the checkbox is toggled
                updateCompletionStatus(task.id, checkbox.checked);
            });
            // Create a button for deleting the task
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                // Call a function to delete the task when the button is clicked
                deleteTask(task.id);
            });
            // Display the task content
            const taskContent = document.createElement('span');
            taskContent.textContent = task.content;
            // Append the checkbox, delete button, and task content to the list item
            listItem.appendChild(checkbox);
            listItem.appendChild(deleteButton);
            listItem.appendChild(taskContent);
            // Append the list item to the task list
            taskList.appendChild(listItem);
        });
    })
        .catch(error => console.error('Error fetching tasks:', error));
}
// Function to add a new task
function addTask() {
    const taskContentInput = document.getElementById('taskContent');
    const taskContent = taskContentInput.value;
    // Check if the task content is empty
    if (taskContent.trim() === '') {
        alert('Well come on, at least actually enter something you pigeon.'); // Display an alert or use another method to show an error message
        return;
    }
    fetch('http://localhost/api/app/?cmd=add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: taskContent }),
    })
        .then(response => response.json())
        .then(data => {
        console.log(data.message);
        getAllTasks(); // Refresh the task list after adding a new task
    })
        .catch(error => console.error('Error adding task:', error));
}
// Function to delete a task
function deleteTask(taskId) {
    fetch(`http://localhost/api/app/?cmd=delete&id=${taskId}`, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
        console.log(data.message);
        getAllTasks(); // Refresh the task list after deleting the task
    })
        .catch(error => console.error('Error deleting task:', error));
}
function updateCompletionStatus(taskId, completed) {
    fetch(`http://localhost/api/app/?cmd=update&id=${taskId}&completed=${completed ? 1 : 0}`, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
        console.log(data.message);
        getAllTasks(); // Refresh the task list after updating the completion status
    })
        .catch(error => console.error('Error updating completion status:', error));
}
// Initial load of tasks when the entire page is fully loaded
window.onload = () => {
    getAllTasks();
};
