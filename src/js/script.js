const taskAddContainer = document.querySelector(".task__add--container");
const btnAdd = document.querySelector(".btn__add--task");
const taskContainer = document.querySelector(".task__container");
const input = document.querySelector(".input__add--task");

//verifica se o input está vazio
const validateInput = () => input.value.trim().length > 0;

const handleAddTask = () => {
  // validação input / caso  tenha erro adiciona a classe error
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    input.classList.add("error__input");
    taskAddContainer.classList.add("error");
  } else {
    // Cria a estrutura html e adiciona a tarefa
    const taskContent = document.createElement("div");
    taskContent.classList.add("task__content");
    taskContainer.appendChild(taskContent);

    const task = document.createElement("p");
    task.classList.add("task");
    task.innerText = input.value;
    taskContent.appendChild(task);

    const iconsContainer = document.createElement("span");
    iconsContainer.classList.add("icons__container");
    taskContent.appendChild(iconsContainer);

    const iconCheck = document.createElement("span");
    iconCheck.innerHTML = '<span class="material-symbols-outlined check">check</span>';
    iconsContainer.appendChild(iconCheck);

    const iconEdit = document.createElement("span");
    iconEdit.innerHTML = ' <span class="material-symbols-outlined edit">edit</span>';
    iconsContainer.appendChild(iconEdit);

    const iconDelete = document.createElement("span");
    iconDelete.innerHTML = '<span class="material-symbols-outlined delete">delete</span>';
    iconsContainer.appendChild(iconDelete);

    input.value = "";
    input.focus();
  }
};

// validação input / caso não tenha erro remove a classe error
const handleChangeInput = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    input.classList.remove("error__input");
    taskAddContainer.classList.remove("error");
  }
};

btnAdd.addEventListener("click", () => handleAddTask());
input.addEventListener("change", () => handleChangeInput());

//remove a task selecionada
document.addEventListener("click", (e) => {
  const targetElement = e.target;
  const parentElement = targetElement.closest("section div");

  if (targetElement.classList.contains("delete")) {
    if (confirm("Deseja apagar essa tarefa?")) {
      parentElement.remove();
    }
  }
  if (targetElement.classList.contains("check")) {
    const children = parentElement.children[0];
    children.classList.toggle("checked");
  }
});
