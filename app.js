

let addTaskBtn = document.getElementById("addTaskBtn");
let filterCategory = document.getElementById("filterCategory");
let filterStatus = document.getElementById("filterStatus");
let taskname = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDeadline = document.getElementById("taskDeadline");
let taskStatus = document.getElementById("taskStatus");
let taskLists = document.getElementById("taskList");

let tasks = [];

addTaskBtn.addEventListener("click", () => {

  const name = taskname.value.trim();
  const category = taskCategory.value.trim();
  const deadline = taskDeadline.value;
  const status = taskStatus.value;

  let errors = [];

  if (!name || !category || !deadline)
 {

   // Custom validation
   if (name.length < 3) {
     errors.push("Task name must be at least 3 characters.");
    }
   if (category.length < 2) {
     errors.push("Category must be at least 2 characters.");
   }
    if (!deadline) {
    errors.push("Please select a deadline.");
   } else {
    alert("Please fill all fields.");
    return;  
   }
   if (errors.length > 0) {
    alert(errors.join("\n"));
   // return;
   }    
  }
  addTask();
});

filterCategory.addEventListener("change", () => {
  displayTasks();
});

filterStatus.addEventListener("change", () => {
  displayTasks();
});

function addTask()
 {
  const name = taskname.value.trim();
  const category = taskCategory.value.trim();
  const deadline = taskDeadline.value;
  const status = taskStatus.value;

  if (!name || !category || !deadline)
 {
    alert("Please fill all fields.");
    return;
  }    
  
 const task = { name, category, deadline, status };
  tasks.push(task);
  updateCategoryFilter();
  displayTasks();
  
  document.getElementById("taskName").value = "";
  document.getElementById("taskCategory").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("taskStatus").value = "In Progress";

 }


 function updateCategoryFilter() {

  const filter = document.getElementById("filterCategory");
  // dynamically updates a dropdown
  const categories = Array.from(new Set(tasks.map(t => t.category)));  

  filter.innerHTML = `<option value="All">All Categories</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");
}


function checkOverdueTasks() 
{
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach(task =>
 {
    if (task.status !== "Completed" && task.deadline < today) 
      
    {
      task.status = "Overdue";
    }
  });
}

function displayTasks()

{
  checkOverdueTasks();

  const taskListdisplay = taskLists;
  taskListdisplay.innerHTML = "";

  const categoryFilter = filterCategory.value;
  const statusFilter = filterStatus.value;

  tasks.forEach((task, index) => {

    const categoryMatch = categoryFilter === "All" || task.category === categoryFilter;
    const statusMatch = statusFilter === "All" || task.status === statusFilter;

    if (categoryMatch && statusMatch)
     {
      const li = document.createElement("li");
      li.className = "task-item" + (task.status === "Overdue" ? " task-overdue" : "");

      const select = document.createElement("select");
      ["In Progress", "Completed"].forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        option.selected = task.status === opt;
        select.appendChild(option);
      });

      select.addEventListener("change", () => {
        task.status = select.value;
        displayTasks();
      });

      li.innerHTML = `<strong>${task.name}</strong> | ${task.category} | ${task.deadline} `;
      li.appendChild(select);

      const statusSpan = document.createElement("span");
      statusSpan.style.float = "right";
      statusSpan.textContent = `Status: ${task.status}`;
      li.appendChild(statusSpan);

      taskListdisplay.appendChild(li);
    }
  });
}