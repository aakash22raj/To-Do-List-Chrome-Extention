document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from storage when the page is loaded
    chrome.storage.sync.get(['tasks'], (result) => {
      const tasks = result.tasks || [];
      // Add each task to the task list
      tasks.forEach(task => {
        addTaskToList(task);
      });
    });
  
    // Add new task
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToList(taskText);
        saveTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Add task to list
    function addTaskToList(taskText) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.textContent = taskText;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        taskItem.remove();
        deleteTask(taskText);
      });
  
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    }
  
    // Save task to storage a new task to Chrome storage
    function saveTask(taskText) {
      chrome.storage.sync.get(['tasks'], (result) => {
        const tasks = result.tasks || [];
        tasks.push(taskText);
        chrome.storage.sync.set({ tasks: tasks });
      });
    }
  
    // Delete task from storage
    function deleteTask(taskText) {
      chrome.storage.sync.get(['tasks'], (result) => {
        let tasks = result.tasks || [];
        tasks = tasks.filter(task => task !== taskText);
        chrome.storage.sync.set({ tasks: tasks });
      });
    }
  });
  