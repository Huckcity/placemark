function showLogin(e) {
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  login.style.display = "block";
  register.style.display = "none";
  switchActiveTab(e);
}

function showRegister(e) {
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  login.style.display = "none";
  register.style.display = "block";
  switchActiveTab(e);
}

function switchActiveTab(e) {
  const activeTab = document.getElementsByClassName("is-active");
  activeTab[0].classList.remove("is-active");
  e.classList.add("is-active");
}

function clearNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "none";
}

function verifyDelete() {
  if (confirm("Are you sure you want to delete this place?")) {
    return true;
  } else {
    return false;
  }
}
