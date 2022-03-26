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

function toggleFavourite(userId, placeId) {
  const url = `/api/places/${placeId}/favourite`;
  const method = "POST";
  const data = { userId, placeId };
  const callback = (response) => {
    if (response.status === 200) {
      const favourite = document.getElementById(`favourite-${placeId}`);
      favourite.classList.toggle("is-favourite");
    }
  };
  sendRequest(url, method, data, callback);
}

function sendRequest(url, method, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr);
    }
  };
  xhr.send(JSON.stringify(data));
}
