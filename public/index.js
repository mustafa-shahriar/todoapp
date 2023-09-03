let tasks = JSON.parse(localStorage.getItem("tasksArray")) || [];



function updateLocalStorage(){
  localStorage.setItem(
    "tasksArray",
    JSON.stringify(tasks)
  );
}

function remove(index) {
  console.log(index);
  tasks.splice(index, 1);
  updateLocalStorage();
  render();
}

function taskCompleted(bool, index) {
  console.log("com");
  tasks[index].completed = bool;
  updateLocalStorage();
}

const inputField = document.querySelector("#todoInputField");

inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    inputReceived();
    updateLocalStorage();
  }
});

document.querySelector("#addBtn").addEventListener("click", inputReceived);

function inputReceived() {
  if (inputField.value !== "") {
    tasks.push({ title: inputField.value, completed: false });
    inputField.value = "";
    render();
  }
  updateLocalStorage();
}

const tasksview = document.querySelector("#alltasks");

function render() {
  let html = ``;

  tasks.forEach((element, i) => {
    html += `
            <div class="bg-secondary-subtle p-2 d-flex align-items-center justify-content-between">
                <span>
                <input class="form-check-input" type="checkbox" id="defaultCheck1" onchange="taskCompleted(this.checked , ${i})" ${
      element.completed ? "checked" : ""
    }>
                <span class="text_decoration_line_through">${
                  element.title
                }</span>
                </span>
                <button class="btn btn-light" onclick="remove(${i});">
                <img src="./public/delet.svg" alt="">
                </button>
            </div>
               `;
  });

  tasksview.innerHTML = html;
}

render();
