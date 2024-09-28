// Tasks Array
let tasks = [
  // {
  //   title: "قراءة كتاب",
  //   done: false,
  // },
  // {
  //   title: "إنهاء المشروع",
  //   done: false,
  // },
  // {
  //   title: "المهمة التالية",
  //   done: false,
  // },
  // {
  //   title: "حل التحدي",
  //   done: false,
  // },
];
getLocalStorage();

// reload elements from tasks array
let taskList = document.getElementById("tasks");
function reloadTasks() {
  // debugger;
  taskList.innerHTML = "";

  if (tasks.length == 0) {
    taskList.innerHTML = `
      <div class="task" style="justify-content:center; text-align:center;">
        <h3>هنا تظهر المهمات ... اضف مهمتك الأولي لتظهر هنا 😊</h3>
      </div>`;
  } else {
    for (let task = 0; task < tasks.length; task++) {
      taskList.innerHTML += `
        <div class="task ${tasks[task].done ? "done" : ""}">
        <h3 class="task-name">${tasks[task].title}</h3>
        <div class="edit-icons">
        <i class="fa-solid fa-pen edit" id="${task}" title="تعديل المهمة"></i>
        <i class="fa-solid ${
          tasks[task].done ? "fa-xmark done" : "fa-check"
        } check" id="${task}" title="${
        tasks[task].done ? "التراجع عن الإنجاز" : "إنجاز المهمة"
      }"></i>
        <i class="fa-solid fa-trash delete" id="${task}" title="حذف المهمة"></i>
        </div>
        </div>`;
    }
  }
}

reloadTasks();

// Add task
const addBtn = document.getElementById("add-task");
addBtn.addEventListener("click", function () {
  const { value: text } = Swal.fire({
    input: "textarea",
    inputLabel: "إضافة مهمة",
    inputPlaceholder: "برجاء ادخال المهمة الجديدة ...",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
    cancelButtonColor: "crimson",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "royalblue",
    confirmButtonText: "إضافة مهمة",
  }).then((result) => {
    if (result.value != "" && result.value != undefined) {
      let newTask = {
        title: result.value,
        done: false,
      };
      tasks.push(newTask);
      reloadLocalStorage();
      reloadTasks();
    }
  });
});

// Delete task
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    Swal.fire({
      title: `هل أنت متأكد من حذف<br> "${tasks[e.target.id].title}"`,
      text: "لا يمكنك التراجع عن الحذف",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "crimson",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "royalblue",
      confirmButtonText: "تأكيد الحذف !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف !",
          text: "لقد تم حذف المهمة بنجاح.",
          icon: "success",
          confirmButtonText: "تم",
          confirmButtonColor: "royalblue",
        });
        let currentIndex = e.target.id;
        tasks.splice(currentIndex, 1);
        reloadLocalStorage();
        reloadTasks();
      }
    });
  }
});

// Edit task
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const { value: text } = Swal.fire({
      input: "textarea",
      inputLabel: `تعديل مهمة`,
      inputPlaceholder: "الرجاء كتابة التعديل ...",
      inputValue: tasks[e.target.id].title,
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      cancelButtonColor: "crimson",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "royalblue",
      confirmButtonText: "حفظ التعديل",
    }).then((result) => {
      if (text) {
        Swal.fire(text);
      }
      if (result.value != "" && result.value != undefined) {
        Swal.fire({
          title: "تم التعديل !",
          text: "لقد تم تعديل محتوي المهمة بنجاح.",
          icon: "success",
          confirmButtonText: "تم",
          confirmButtonColor: "royalblue",
        });
        tasks[e.target.id].title = result.value;
        reloadLocalStorage();
        reloadTasks();
      }
    });
  }
});

// Check task
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("check")) {
    tasks[e.target.id].done = !tasks[e.target.id].done;
    reloadLocalStorage();
    reloadTasks();
  }
});

// ================ STORAGE FUNCTIONS ================

// Reload the local storage
function reloadLocalStorage() {
  let stringTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringTasks);
}

// update tasks from local storage
function getLocalStorage() {
  retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedTasks ?? [];
}
