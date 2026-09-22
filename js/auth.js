function isLoggedIn() {
  return sessionStorage.getItem("loggedIn") === "true";
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}