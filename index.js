var todoList = document.getElementById("todo-list");
var todoInput = document.getElementById("todo-input");
var todoInputWrapper = document.getElementById("todo-input-wrapper");
var btnLogin = document.getElementById("btn-login");

function initializeTODOList() {
  // var storedList = localStorage.getItem("todoList");
  // if (storedList === null) {
  //   localStorage.setItem("todoList", JSON.stringify([]));
  // } else {
  //   storedList = JSON.parse(storedList);
  //   for (var i = 0; i < storedList.length; i++) {
  //     todoList.appendChild(
  //       createTodoCard(storedList[i].id, storedList[i].message)
  //     );
  //   }
  // }

  var http = new XMLHttpRequest();
  http.open("GET", "https://5ee8d2c0ca595700160294ba.mockapi.io/todo", true);
  http.send();
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      var response = JSON.parse(http.responseText);
      for (var i = 0; i < response.length; i++) {
        todoList.appendChild(
          createTodoCard(response[i].id, response[i].message)
        );
      }
    }
  };

  if (
    localStorage.getItem("loginStatus") === null ||
    localStorage.getItem("loginStatus") === "false"
  ) {
    todoInputWrapper.style.display = "none";
  } else {
    btnLogin.style.display = "none";
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
  if (
    localStorage.getItem("loginStatus") === null ||
    localStorage.getItem("loginStatus") === "false"
  ) {
    deleteIcon.classList.add("hidden-delete-icon");
  }
  deleteIcon.addEventListener("click", function () {
    var selectedCard = document.getElementById(mainCard.id);
    // var storedList = JSON.parse(localStorage.getItem("todoList"));
    // var removeAtPos = -1;
    // for (var i = 0; i < storedList.length; i++) {
    //   if (storedList[i].id === mainCard.id) {
    //     removeAtPos = i;
    //     break;
    //   }
    // }
    // storedList.splice(removeAtPos, 1); //removing from array
    // localStorage.setItem("todoList", JSON.stringify(storedList)); //updating local storage

    var http = new XMLHttpRequest();
    http.open(
      "DELETE",
      "https://5ee8d2c0ca595700160294ba.mockapi.io/todo/" + mainCard.id,
      true
    );
    http.send();
    http.onreadystatechange = function () {
      if (http.readyState === 4) {
        selectedCard.remove();
      }
    };
  });

  mainCard.appendChild(todoMessage);
  mainCard.appendChild(deleteIcon);

  return mainCard;
}

todoInput.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    if (todoInput.value !== null && todoInput.value !== "") {
      var todoData = {
        message: todoInput.value,
      };
      console.log(todoData);

      var http = new XMLHttpRequest();
      http.open(
        "POST",
        "https://5ee8d2c0ca595700160294ba.mockapi.io/todo",
        true
      ); //HTTP Method, API Endpoint and Async
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.send(JSON.stringify(todoData));
      http.onreadystatechange = function () {
        if (http.readyState === 4) {
          var response = JSON.parse(http.responseText);
          var todoCard = createTodoCard(response.id, response.message);
          todoList.appendChild(todoCard);
        }
      };

      // var storedList = JSON.parse(localStorage.getItem("todoList")); //parsing the stored array
      // storedList.push(todoData); //Adding new object to the stored array
      // // console.log(storedList);

      // localStorage.setItem("todoList", JSON.stringify(storedList));
      todoInput.value = "";
    } else {
      alert("Please enter a valid TODO item!!");
    }
  }
});
