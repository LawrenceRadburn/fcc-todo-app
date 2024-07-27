const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = [];
let currentTask = {};

const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
        };

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    }
    else {
        taskData[dataArrIndex] = taskObj;
    }
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
}

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";

    taskData.forEach(({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}"</div>
        <p><strong>Title:</strong>${title}</p>
        <p><strong>Date:</strong>${date}</p>
        <p><strong>Description:</strong>${description}</p>
        <button onclick="editTask(this) type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this) type="button" class="btn">Delete</button>
        <div>`);
        }
    );
};

const deleteTask = (buttonEl) => {
    // The arrow function below uses an implicit return. Therefore, we can omit the curly braces and return since only a single expression exists
    const dataArrIndex = taskData.findIndex((item) => 
        item.id === buttonEl.parentElement.id
    )
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    const currentTask = taskData[dataArrIndex];

    currentTask = taskData[dataArrIndex];
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    addOrUpdateTask.innerText = "Update Task";
    taskForm.classList.toggle("hidden");
}

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {

    };
}

openTaskFormBtn.addEventListener("click", () => 
    taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    confirmCloseDialog.showModal();
    const formInputValuesUpdated = titleInput.value != currentTask.title || dataInput.value != currentTask.date || descriptionInput.value != currentTask.description;
    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showmodal();
    } 
    else {
        reset();
    }
});

cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateTaskContainer();
});