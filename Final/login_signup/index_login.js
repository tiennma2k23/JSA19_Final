const UrlApi = "https://62d4116c5112e98e484a08f4.mockapi.io/api/users";
const updateById = async (id, newData) => {
  const res = await fetch(UrlApi + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  console.log(await res.json());
};
function reset() {
  let id = Number(localStorage.getItem("id"));
  fetch(UrlApi)
    .then((result) => result.json())
    .then((res) => {
      updateById(id, {
        username: res[id - 1].username,
        password: res[id - 1].password,
        fullname: res[id - 1].fullname,
        online: 0,
      });
    });
  localStorage.removeItem("fullname");
  localStorage.removeItem("id");
}
reset();
const forms = document.querySelector(".forms"),
  links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

const forgotlink = document.querySelectorAll(".forgot_pass");

forgotlink.forEach((forgot_pass) => {
  forgot_pass.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    window.open("index_forgot.html");
    window.close("index_login.html");
  });
});

let email = document.getElementById("email"),
  password = document.getElementById("password");
function solve_login() {
  fetch(UrlApi)
    .then((result) => result.json())
    .then((res) => {
      let ok = false;
      for (let i = 0; i < res.length; i++) {
        if (
          res[i].username == email.value &&
          res[i].password == password.value
        ) {
          localStorage.setItem("fullname", res[i].fullname);
          localStorage.setItem("id", res[i].id);
          updateById(res[i].id, {
            username: res[i].username,
            password: res[i].password,
            fullname: res[i].fullname,
            online: 1,
          });
          ok = true;
          break;
        }
      }
      if (ok) {
        alert("AC");
        email.value = "";
        password.value = "";
        window.open("../home/index.html");
        window.close("index_login.html");
      } else {
        alert("Fail");
        email.value = "";
        password.value = "";
      }
    })
    .catch((error) => {
      console.log("Noo");
    });
}

let loginbtn = document.getElementById("loginbtn");
loginbtn.onclick = solve_login;

const add = async (data) => {
  const res = await fetch(UrlApi, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  // console.log(await res.json());
};
let email_reg = document.getElementById("email_reg");
let password_reg = document.getElementById("password_reg");
let cfpassword_reg = document.getElementById("cfpassword_reg");
let fullname_reg = document.getElementById("fullname_reg");
function solve_reg() {
  if (password_reg.value != cfpassword_reg.value) {
    alert("Fail");
    email_reg.value = "";
    password_reg.value = "";
    cfpassword_reg.value = "";
    fullname_reg.value = "";
  } else {
    fetch(UrlApi)
      .then((result) => result.json())
      .then((res) => {
        let ok = false;
        for (let i = 0; i < res.length; i++) {
          console.log(i, res[i].username, email_reg.value);
          if (res[i].username == email_reg.value) {
            ok = true;
            break;
          }
        }
        if (ok) {
          alert("Email đã tồn tại");
          email_reg.value = "";
          password_reg.value = "";
          cfpassword_reg.value = "";
          fullname_reg.value = "";
        } else {
          alert("AC");
          add({
            username: email_reg.value,
            password: password_reg.value,
            fullname: fullname_reg.value,
            online: 0,
          });
          email_reg.value = "";
          password_reg.value = "";
          cfpassword_reg.value = "";
          fullname_reg.value = "";
        }
      })
      .catch((error) => {
        console.log("Noo");
      });
  }
}
let regbtn = document.getElementById("regbtn");
regbtn.onclick = solve_reg;
