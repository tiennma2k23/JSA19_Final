if (localStorage.getItem("fullname") == null) {
  setTimeout(() => {
    window.close("index.html");
  }, 0);
  window.open("login_signup/index_login.html");
} else {
  setTimeout(() => {
    window.close("index.html");
  }, 0);
  window.open("home/index.html");
}
