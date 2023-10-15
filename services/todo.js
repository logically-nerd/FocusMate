const enterTask = document.querySelector('.enterTask')
const taskList = document.querySelector('.taskList')
let checkboxes;

$(document).ready(() => {
    //fetch all the tasks from local storage
    getTasks()
    $('body').on('click', 'input[type="checkbox"].task', (task) => {
        const taskId = task.target.parentNode.parentNode.id
        deleteTask(taskId)
    })
})

enterTask.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const task = enterTask.value;
        addTask(task);
    }
})

function addTask(task) {
    enterTask.value = '';
    // Get the task array from storage
    const taskPromise = chrome.storage.local.get('task');

    // Append the new task to the task array
    taskPromise.then((data) => {
        const taskArray = data.task || [];
        taskList.innerHTML += `<li id=${taskArray.length}><label class="checkbox"><input type="checkbox" class='task'>${task}</label></li>`
        taskArray.push(task);

        // Set the task array back to storage
        chrome.storage.local.set({ task: taskArray });
    });
}

function getTasks() {
    //fetch all the tasks from storage
    const taskArray = []
    const taskPromise = chrome.storage.local.get('task');

    taskPromise.then((data) => {
        if (data.task) {
            taskArray.push(...data.task);
        }

        // Callback function to iterate over the task array
        const iterateTaskArray = () => {
            for (let i = 0; i < taskArray.length; i++) {
                taskList.innerHTML += `<li id=${i}><label class="checkbox"><input class='task' type="checkbox">${taskArray[i]}</label></li>`;
            }
        };

        // Call the callback function
        iterateTaskArray();
    });
}

function deleteTask(taskId) {
    document.getElementById(taskId).remove()
    // Get the task array from storage
    const taskPromise = chrome.storage.local.get('task');

    // Remove the task from the task array
    taskPromise.then((data) => {
        const taskArray = data.task;
        taskArray.splice(taskId, 1);
        reassignListId()
        // Set the task array back to storage
        chrome.storage.local.set({ task: taskArray });
    });
}

function reassignListId() {
    taskList.innerHTML = ''
    setTimeout(getTasks, 5)
}