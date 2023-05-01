const form = document.getElementById("test");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  const userError = document.getElementById("username-validation");
  const passwordError = document.getElementById("password-validation");

  userError.innerText = "";
  passwordError.innerText = "";

  if (!username) {
    userError.innerText = "A username is required";
    return;
  }
  if (!password) {
    passwordError.innerText = "A Password is required";
    return;
  }

  const data = { username, password };

  // create the post request to the server using fetch
  fetch("http://localhost:3000/api/v1/logon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("exp", data.payload.exp);
    })
    .then(() => updateUI())
    .catch((err) => console.error(err));

  //update the UI accordingly
});

function updateUI() {
  const notification = document.getElementById("notification");
  if (IsUserLogged()) {
    notification.classList.remove("is-invisible");

    const message = document.createElement("p");
    message.innerText = "User is logged!";
    notification.append(message);

    const logoffBtn = document.createElement("button");
    logoffBtn.addEventListener("click", logoff);
    logoffBtn.classList.add("button", "is-warning", "m-2");
    logoffBtn.innerText = "Logoff";
    notification.append(logoffBtn);

    const messageBtn = document.createElement("button");
    messageBtn.addEventListener("click", getMessage);
    messageBtn.classList.add("button", "is-primary", "m-2");
    messageBtn.innerText = "Get message";
    notification.append(messageBtn);
  } else {
    notification.classList.add("is-invisible");
  }
}

function getMessage() {
  const token = localStorage.getItem("token");
  if (!token) {
    return; //TODO: should add some kind of feedback to the user here
  }

  const message = document.getElementById("message");
  fetch("http://localhost:3000/api/v1/hello", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => (message.innerText = data.message))
    .catch((err) => console.error(err));
}

function logoff() {
  localStorage.removeItem("token");
  localStorage.removeItem("exp");

  updateUI();
}

function IsUserLogged() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("exp");

  const timeAsNumericDate = Math.floor(Date.now() / 1000);

  if (token && expiration && timeAsNumericDate < Number(expiration)) {
    return true;
  }
  return false;
}
