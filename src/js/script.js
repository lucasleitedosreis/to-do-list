"use strict";
const inputContainer = document.querySelector(".input__container");
const input = document.querySelector(".input__add--task");
const btnAdd = document.querySelector(".btn__add--task");
const taskContainer = document.querySelector(".task__container");

// ?? Operador de coalescência nulo
const getData = () => JSON.parse(localStorage.getItem("tasks")) ?? [];
const dataBaseStorage = getData();
const setData = (dataBaseStorage) => localStorage.setItem("tasks", JSON.stringify(dataBaseStorage));

// validação input / caso não tenha erro remove a classe error
const handleChangeInput = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    input.classList.remove("error__input");
    inputContainer.classList.remove("error");
  }
};

//está função é chamada através do handleChange e do addTask, ela verifica se o input está vazio
const validateInput = () => {
  return input.value.trim().length > 0;
};

input.addEventListener("change", () => handleChangeInput());

//função para adicionar a tarefa ao dataBaseStorage
const addTask = () => {
  const inputIsValid = validateInput();
  //verifica se o input está vazio
  if (!inputIsValid) {
    input.classList.add("error__input");
    inputContainer.classList.add("error");
  } else {
    //insere os dados no dataBaseStorage
    dataBaseStorage.push({ tarefa: input.value, status: "" });
    setData(dataBaseStorage);
    refreshScreen();
    input.value = "";
    input.focus();
  }
};
btnAdd.addEventListener("click", addTask);

//remove o item  do database através do index
const clearItem = (index) => {
  dataBaseStorage.splice(index, 1);
  setData(dataBaseStorage);
  refreshScreen();
};

//Define se a task está ou não checked
const updateItem = (index) => {
  dataBaseStorage[index].status = dataBaseStorage[index].status === "" ? "checked" : "";
  setData(dataBaseStorage);
  refreshScreen();
};

//localiza o item a ser removido e chama a função para remover o item
const handleClickItem = (event) => {
  const element = event.target;
  if (element.classList.contains("delete")) {
    const index = element.dataset.index;
    clearItem(index);
  } else if (element.classList.contains("check")) {
    const index = element.dataset.index;
    updateItem(index);
  }
};
taskContainer.addEventListener("click", handleClickItem);

// Cria a estrutura html e adiciona as tarefas
const createTask = (text, status, index) => {
  const taskContent = document.createElement("div");
  taskContent.classList.add("task__content");
  taskContent.innerHTML = `
                            <p class="task ${status}">${text}</p>
                              <span class="icons__container">
                              <span class="material-symbols-outlined check" data-index=${index}>check</span>
                              <span class="material-symbols-outlined delete" data-index=${index}>delete</span>
                            </span>
                          `;
  // <span class="material-symbols-outlined edit" data-index=${index}>edit</span>

  taskContainer.appendChild(taskContent);
};

//limpa a tela para que não ocorra duplicação de tarefas
const clearScreen = () => {
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.lastChild);
  }
};

//atualiza os elementos da tela
const refreshScreen = () => {
  clearScreen();
  dataBaseStorage.forEach((task, index) => {
    createTask(task.tarefa, task.status, index);
  });
};

refreshScreen();
