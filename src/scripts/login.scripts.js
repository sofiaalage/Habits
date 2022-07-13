import Login from "../controller/login.controller.js";

class entrar {
	static logIn() {
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		const data = {
			email: email,
			password: password,
		};

		Login.requestLogin(data);
	}

  static logout() {
    localStorage.clear();
  }
}

const btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener("click", function (event) {
	event.preventDefault();
	entrar.logIn();
});
