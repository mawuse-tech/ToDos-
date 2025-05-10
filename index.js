const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];
window.addEventListener("DOMContentLoaded", () => {
  savedTasks = localStorage.getItem('todos');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      renderTask(task)
    });

  }
})

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  tasks.push(taskText);
  localStorage.setItem("todos", JSON.stringify(tasks));
  renderTask(taskText);
  taskInput.value = ""
};

function renderTask(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("todos", JSON.stringify(tasks));
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
