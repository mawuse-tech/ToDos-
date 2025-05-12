const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

// ✅ Load saved tasks from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("todos");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => renderTask(task));
  }
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  localStorage.setItem("todos", JSON.stringify(tasks));
  renderTask(newTask);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const span = document.createElement("span");
  span.textContent = task.text;

  const deleteBtn = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-trash");

  deleteBtn.appendChild(icon);

  // ✅ Apply 'completed' class if task is marked completed
  if (task.completed) {
    li.classList.add("completed");
  }

  // ✅ Toggle completed on checkbox change
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    li.classList.toggle("completed");
    localStorage.setItem("todos", JSON.stringify(tasks));
  });

  // ✅ Delete task
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("todos", JSON.stringify(tasks));
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}







