"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function handleError(error) {
    console.error('An error occurred:', error);
}
function makeFetchCall(url, method = 'GET', body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            const data = yield response.json();
            console.log(data.message);
            return data;
        }
        catch (error) {
            handleError(error);
        }
    });
}
function createTaskElement(task) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'completion-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        updateCompletionStatus(task.id, checkbox.checked);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
    });
    const taskContent = document.createElement('span');
    taskContent.textContent = task.content;
    taskContent.className = 'task-content';
    listItem.appendChild(checkbox);
    listItem.appendChild(taskContent);
    listItem.appendChild(deleteButton);
    return listItem;
}
function getAllTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield makeFetchCall('http://localhost/api/app/?cmd=all');
        if (data) {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            data.tasks.forEach((task) => {
                const taskElement = createTaskElement(task);
                taskList.appendChild(taskElement);
            });
        }
    });
}
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskContentInput = document.getElementById('taskContent');
        const taskContent = taskContentInput.value;
        if (taskContent.trim() === '') {
            alert('Please enter a task.');
            return;
        }
        const data = yield makeFetchCall('http://localhost/api/app/?cmd=add', 'POST', { content: taskContent });
        if (data) {
            getAllTasks();
        }
    });
}
function deleteTask(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield makeFetchCall(`http://localhost/api/app/?cmd=delete&id=${taskId}`, 'POST');
        if (data) {
            getAllTasks();
        }
    });
}
function updateCompletionStatus(taskId, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield makeFetchCall(`http://localhost/api/app/?cmd=update&id=${taskId}&completed=${completed ? 1 : 0}`, 'POST');
        if (data) {
            getAllTasks();
        }
    });
}
window.onload = () => {
    getAllTasks();
};
