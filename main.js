let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let taskDiv = document.querySelector(".tasks")


let arrayOfTasks = [];


if(localStorage.getItem("tasks")){
  arrayOfTasks = JSON.parse(localStorage.getItem('tasks'))
}


getDataFromLocalStorage()

// Add Task
submit.onclick = function(){
  if(input.value !== ""){
    addTaskToArray(input.value); 
    input.value = ""; 
  }
}

// Click On Task Element 
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if(e.target.classList.contains("del")){
    // Remove task From Local Storage 
    deleteTaskWith(e.target.parentElement.getAttribute("data-id")) 
    // Remove Element From Page
    e.target.parentElement.remove() 
  }

  // Task Element 
  if(e.target.classList.contains("task")){
    // Toggle Completed the task 
    toggleStatusTaskWith(e.target.getAttribute("data-id"))
    // Toggle done class
    e.target.classList.toggle("done")
  }
  
})  

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  }
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks)
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
  
  taskDiv.innerHTML = "";
  
  arrayOfTasks.forEach((task) => {
    
    let div = document.createElement("div")
    div.className = 'task';
    
    if(task.completed){
      div.className = "task done"
    }
    div.setAttribute("data-id" , task.id)
 
    div.appendChild(document.createTextNode(task.title))
   
    let span = document.createElement('span')
    span.className = 'del';
    span.appendChild(document.createTextNode("Delete"))
   
    div.appendChild(span)
    
    taskDiv.appendChild(div)

  });
}

function addDataToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
  let data = window.localStorage.getItem('tasks')
  if(data){
    let tasks = JSON.parse(data)
    addElementsToPageFrom(tasks)
  }
}

function deleteTaskWith(taskId){
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if(arrayOfTasks[i].id == taskId){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true): (arrayOfTasks[i].completed == false)  
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks)

}

