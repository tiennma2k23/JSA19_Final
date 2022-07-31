var setting_menu = document.querySelector(".settings_menu");
function setting_menu_toggle() {
  setting_menu.classList.toggle("settings_menu_height");
}

var dark_white_btn = document.getElementById("dark_white_btn");
dark_white_btn.onclick = function () {
  dark_white_btn.classList.toggle("dark_white_btn_on");
  document.body.classList.toggle("dark_mode");

  if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
};

if (localStorage.getItem("theme") == "light") {
  dark_white_btn.classList.remove("dark_white_btn_on");
  document.body.classList.remove("dark_mode");
} else if (localStorage.getItem("theme") == "dark") {
  dark_white_btn.classList.add("dark_white_btn_on");
  document.body.classList.add("dark_mode");
} else {
  localStorage.setItem("theme", "light");
}

var inputbtn = document.querySelector(".inputbtn");
var post_menu = document.querySelector(".post_menu");
inputbtn.onclick = function () {
  post_menu.classList.toggle("post_menu_height");
};

var fullname = document.getElementById("fullname");
fullname.innerHTML = localStorage.getItem("fullname");
