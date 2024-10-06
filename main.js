let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let clearBtn = document.querySelector(".clear");

let arrayOfTasks = [];
let editMode = false;
let taskIdToEdit = null;

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add or Update Task
submit.onclick = function () {
  if (input.value !== "") {
    if (editMode) {
      updateTaskInArray(taskIdToEdit, input.value);
      editMode = false;
      submit.textContent = "Add Task";
      submit.classList.remove("save-btn");
      taskIdToEdit = null;
    } else {
      addTaskToArray(input.value);
    }
    input.value = ""; 
  }
};

// Clear All Tasks
clearBtn.onclick = function () {
  arrayOfTasks = [];
  taskDiv.innerHTML = "";
  localStorage.removeItem("tasks");
};

// Enter Key
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value !== "") {
    submit.click();
  }
});

// Click on Task Element
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  // Edit Button
  if (e.target.classList.contains("edit")) {
    let taskId = e.target.parentElement.getAttribute("data-id");
    let taskTitle = e.target.parentElement.firstChild.textContent;

    editMode = true;
    taskIdToEdit = taskId;
    input.value = taskTitle;
    submit.textContent = "Save Task";
    submit.classList.add("save-btn");
  }

  // Toggle Completed Task
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function updateTaskInArray(taskId, newTitle) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].title = newTitle;
    }
  }
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  taskDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);

    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    let editBtn = document.createElement("span");
    editBtn.className = "edit";
    editBtn.appendChild(document.createTextNode("Edit"));

    div.appendChild(editBtn);
    div.appendChild(span); 

    taskDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
