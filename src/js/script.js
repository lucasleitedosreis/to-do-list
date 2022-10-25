"use strict";
const taskAddContainer = document.querySelector(".task__add--container");
const btnAdd = document.querySelector(".btn__add--task");
const taskContainer = document.querySelector(".task__container");
const input = document.querySelector(".input__add--task");

// validação input / caso não tenha erro remove a classe error
const handleChangeInput = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    input.classList.remove("error__input");
    taskAddContainer.classList.remove("error");
  }
};
//verifica se o input está vazio
const validateInput = () => {
  return input.value.trim().length > 0;
};

input.addEventListener("change", () => handleChangeInput());

const AddTask = (taskValue) => {
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
    task.innerText = taskValue;
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
btnAdd.addEventListener("click", () => handleAddTask());

document.addEventListener("click", (e) => {
  const targetElement = e.target;
  const parentElement = targetElement.closest("section div");
  //verifica se existe a classe selecionada, e se existir remove a task selecionada
  if (targetElement.classList.contains("delete")) {
    if (confirm("Deseja apagar essa tarefa?")) {
      parentElement.remove();
    }
  }
  //verifica se existe a classe selecionada, e se existir marca a task como concluída
  else if (targetElement.classList.contains("check")) {
    const children = parentElement.children[0];
    children.classList.toggle("checked");
  }
});
