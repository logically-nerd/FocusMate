const enterTask = document.querySelector('.enterTask')
const taskList = document.querySelector('.taskList')

//fetch all the tasks from local storage
getTasks()

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
        taskList.innerHTML += `<li id=${taskArray.length}><label class="checkbox"><input type="checkbox">${task}</label></li>`
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
        taskArray.push(...data.task);

        // Callback function to iterate over the task array
        const iterateTaskArray = () => {
            for (let i = 0; i < taskArray.length; i++) {
                taskList.innerHTML += `<li id=${i}><label class="checkbox"><input type="checkbox">${taskArray[i]}</label></li>`;
            }
        };

        // Call the callback function
        iterateTaskArray();
    });
}
