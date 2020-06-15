var todoList = document.getElementById("todo-list");
var todoInput = document.getElementById("todo-input");

function initializeTODOList() {
  var storedList = localStorage.getItem("todoList");
  if (storedList === null) {
    localStorage.setItem("todoList", JSON.stringify([]));
  } else {
    storedList = JSON.parse(storedList);
    for (var i = 0; i < storedList.length; i++) {
      todoList.appendChild(
        createTodoCard(storedList[i].id, storedList[i].message)
      );
    }
  }
}

initializeTODOList();

function createTodoCard(id, enteredText) {
  //   <div class="todo-card dyndropshadow">
  //   <span class="message">Buy Pencils</span>
  //   <i class="fas fa-trash-alt"></i>
  // </div>

  var mainCard = document.createElement("div");
  mainCard.classList.add("todo-card", "dyndropshadow");
  mainCard.id = id;

  var todoMessage = document.createElement("span");
  todoMessage.classList.add("message");
  var todoText = document.createTextNode(enteredText);
  todoMessage.appendChild(todoText);

  var deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt");
  deleteIcon.addEventListener("click", function () {
    var selectedCard = document.getElementById(mainCard.id);
    var storedList = JSON.parse(localStorage.getItem("todoList"));
    var removeAtPos = -1;
    for (var i = 0; i < storedList.length; i++) {
      if (storedList[i].id === mainCard.id) {
        removeAtPos = i;
        break;
      }
    }
    storedList.splice(removeAtPos, 1); //removing from array
    localStorage.setItem("todoList", JSON.stringify(storedList)); //updating local storage
    selectedCard.remove();
  });

  mainCard.appendChild(todoMessage);
  mainCard.appendChild(deleteIcon);

  return mainCard;
}

todoInput.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    if (todoInput.value !== null && todoInput.value !== "") {
      var todoCard = createTodoCard(
        "todo" + new Date().getTime(),
        todoInput.value
      );
      todoList.appendChild(todoCard);
      var todoData = {
        id: todoCard.id,
        message: todoInput.value,
      };
      console.log(todoData);
      var storedList = JSON.parse(localStorage.getItem("todoList")); //parsing the stored array
      storedList.push(todoData); //Adding new object to the stored array
      // console.log(storedList);

      localStorage.setItem("todoList", JSON.stringify(storedList));
      todoInput.value = "";
    } else {
      alert("Please enter a valid TODO item!!");
    }
  }
});
