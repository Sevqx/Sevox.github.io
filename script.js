const addButton = document.getElementById("add-btn");
const input = document.getElementById("my-input");
const container = document.getElementById("container");

addButton.addEventListener("click", addTodoItemToList);
container.addEventListener("click", finishTodoItem);

let items = localStorage.getItem("items") || "";

if (items.split(",").length > 0) {
  items.split(",").forEach(itemValue => {
    if (itemValue === "") {
      return;
    }
    container.innerHTML = generateTodoItem(itemValue) + container.innerHTML;
  });
}

function addTodoItemToList() {
  container.innerHTML = container.innerHTML + generateTodoItem(input.value);
  items = items + "," + input.value;
  localStorage.setItem("items", items);
  input.value = "";
}

function finishTodoItem(event) {
  if (event.target.classList.contains("todo-item")) {
    toggleTodoItemDone(event);
    return false;
  }
  if (event.target.classList.contains("delete-button")) {
    handleDeleteTodoItem(event);
    return false;
  }
}

function handleDeleteTodoItem(event) {
  container.removeChild(event.target.parentElement);

  const deletedItem = event.target.parentElement.querySelector(".title")
    .innerHTML;
  removeFromLocalStorage(deletedItem);
}

function toggleTodoItemDone(event) {
  if (event.target.classList.contains("todo-item--done")) {
    event.target.classList.remove("todo-item--done");
  } else {
    event.target.classList.add("todo-item--done");
  }
}

function removeFromLocalStorage(item) {
  items = items.replace(item, "");
  items = items.replace(",,", ",");
  items = items.replace(/(^,)|(,$)/g, "");

  localStorage.setItem("items", items);
}

// Generate HTML blocks

function generateTodoItem(text) {
  return `<div class="todo-item">
    <div class="title">${text}</div>
    <button class="delete-button">Delete</button>
  </div>`;
}
