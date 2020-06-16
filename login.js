var loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Username -> ", e.target.username.value);
  console.log("Password -> ", e.target.password.value);

  var data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  var http = new XMLHttpRequest();
  http.open("POST", "https://5ee8d2c0ca595700160294ba.mockapi.io/user", true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(JSON.stringify(data));
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      localStorage.setItem("loginStatus", true);
      alert("Login Successful!!");
      window.location.assign("./index.html");
    }
  };
});
