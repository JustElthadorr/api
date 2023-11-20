interface Task {
  id: number;
  content: string;
  completed: boolean;
}

interface TaskData {
  tasks: Task[];
}

interface AddTaskResponse {
  message: string;
}

function handleError(error: any) {
  console.error('An error occurred:', error);
}

async function makeFetchCall(url: string, method: string = 'GET', body?: any) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    handleError(error);
  }
}

function createTaskElement(task: Task) {
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

async function getAllTasks() {
  const data = await makeFetchCall('http://localhost/api/app/?cmd=all');
  if (data) {
    const taskList = document.getElementById('taskList') as HTMLUListElement;
    taskList.innerHTML = '';

    data.tasks.forEach((task: TaskData['tasks'][0]) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  }
}

async function addTask() {
  const taskContentInput = document.getElementById('taskContent') as HTMLInputElement;
  const taskContent = taskContentInput.value;

  if (taskContent.trim() === '') {
    alert('Please enter a task.');
    return;
  }

  const data = await makeFetchCall('http://localhost/api/app/?cmd=add', 'POST', { content: taskContent });
  if (data) {
    getAllTasks();
  }
}

async function deleteTask(taskId: number) {
  const data = await makeFetchCall(`http://localhost/api/app/?cmd=delete&id=${taskId}`, 'POST');
  if (data) {
    getAllTasks();
  }
}

async function updateCompletionStatus(taskId: number, completed: boolean) {
  const data = await makeFetchCall(`http://localhost/api/app/?cmd=update&id=${taskId}&completed=${completed ? 1 : 0}`, 'POST');
  if (data) {
    getAllTasks();
  }
}

window.onload = () => {
  getAllTasks();
};