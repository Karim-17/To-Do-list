// ============================
// البيانات
// ============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ============================
// العناصر
// ============================
const tasksContainer = document.querySelector(".tasks");
const addBtn = document.getElementById("add-task-btn");

// ============================
// إضافة مهمة
// ============================
addBtn.addEventListener("click", () => {
    let title = prompt("اكتب اسم المهمة");
    if (!title) return;

    
    tasks.push({
        title: title,
        
        completed: false
    });

    saveTasks();
    renderTasks();
});

// ============================
// رسم المهام
// ============================
function renderTasks() {
    tasksContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";
        if (task.completed) taskDiv.classList.add("completed");

        taskDiv.innerHTML = `
            <div>
                <h2>${task.title}</h2>
                
            </div>

            <div class="btn">
                <button class="circular D">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="circular C">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="circular E">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </div>
        `;

        // حذف
        taskDiv.querySelector(".D").addEventListener("click", () => {
            deleteTask(index);
        });

        // إكمال
        taskDiv.querySelector(".C").addEventListener("click", () => {
            toggleComplete(index);
        });

        // تعديل
        taskDiv.querySelector(".E").addEventListener("click", () => {
            editTask(index);
        });

        tasksContainer.appendChild(taskDiv);
    });
}

// ============================
// حذف
// ============================
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// ============================
// إكمال (أخضر)
// ============================
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// ============================
// تعديل
// ============================
function editTask(index) {
    let newTitle = prompt("عدل اسم المهمة", tasks[index].title);
    if (!newTitle) return;

    tasks[index].title = newTitle;
    saveTasks();
    renderTasks();
}

// ============================
// حفظ
// ============================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ============================
// تشغيل أول مرة
// ============================
renderTasks();

// زرار Dark Mode
const darkBtn = document.getElementById("dark-mode-btn");

// شغل الدارك مود لو محفوظ في localStorage
if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
}

// حدث الضغط على الزر
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark") ? "on" : "off"
    );
});