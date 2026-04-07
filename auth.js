const AUTH_KEY = "fpp_dashboard_authenticated";
const USERNAME = "admin";
const PASSWORD = "fpp123";

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

const path = window.location.pathname;
const isIndexRoute =
  path.endsWith("/index.html") ||
  path.endsWith("/") ||
  path === "" ||
  !path.split("/").pop().includes(".");

if (isIndexRoute) {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  }
}

if (window.location.pathname.endsWith("login.html")) {
  if (isAuthenticated()) {
    window.location.href = "index.html";
  }

  const form = document.getElementById("login-form");
  const error = document.getElementById("login-error");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        window.location.href = "index.html";
      } else {
        error.textContent = "Invalid username or password.";
      }
    });
  }
}
