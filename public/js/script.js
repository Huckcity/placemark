function switchActiveTab(e) {
  const activeTab = document.getElementsByClassName("is-active");
  activeTab[0].classList.remove("is-active");
  e.classList.add("is-active");
}

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

function clearNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "none";
}

function verifyDelete() {
  // eslint-disable-next-line no-restricted-globals
  if (confirm("Are you sure you want to delete?")) {
    return true;
  }
  return false;
}

function verifyToggleUserActive() {
  // eslint-disable-next-line no-restricted-globals
  if (confirm("Are you sure you want to toggle this users access?")) {
    return true;
  }
  return false;
}
