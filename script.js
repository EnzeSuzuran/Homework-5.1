const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const showAllButton = document.getElementById('show-all');
const showDoneButton = document.getElementById('show-done');
const showNotDoneButton = document.getElementById('show-not-done');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, done: false });
        newTaskInput.value = '';
        renderTaskList();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    renderTaskList();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleDone(taskIndex) {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    renderTaskList();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskIndex) {
    const taskText = prompt('Введите новый текст задачи:', tasks[taskIndex].text);
    if (taskText) {
        tasks[taskIndex].text = taskText;
        renderTaskList();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function filterTasks(filterType) {
    let filteredTasks = tasks;
    if (filterType === 'done') {
        filteredTasks = tasks.filter(task => task.done);
    } else if (filterType === 'not-done') {
        filteredTasks = tasks.filter(task => !task.done);
    }
    renderTaskList(filteredTasks);
}

function renderTaskList(tasksToRender = tasks) {
    taskList.innerHTML = '';
    tasksToRender.forEach((task, index) => {
        const taskListItem = document.createElement('li');
        taskListItem.textContent = task.text;
        if (task.done) {
            taskListItem.classList.add('done');
        }
        taskListItem.addEventListener('dblclick', () => editTask(index));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTask(index));
        taskListItem.appendChild(deleteButton);
        const doneButton = document.createElement('button');
        doneButton.textContent = task.done ? 'Отменить' : 'Выполнено';
        doneButton.addEventListener('click', () => toggleDone(index));
        taskListItem.appendChild(doneButton);
        taskList.appendChild(taskListItem);
    });
}

addTaskButton.addEventListener('click', addTask);
showAllButton.addEventListener('click', () => filterTasks('all'));
showDoneButton.addEventListener('click', () => filterTasks('done'));
showNotDoneButton.addEventListener('click', () => filterTasks('not-done'));

renderTaskList();
