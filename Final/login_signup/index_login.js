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
        avatar: res[id - 1].avatar,
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
          localStorage.setItem("avatar", res[i].avatar);
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

const preview = document.querySelector("#imagepreview");

function previewFile() {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

let email_reg = document.getElementById("email_reg");
let password_reg = document.getElementById("password_reg");
let cfpassword_reg = document.getElementById("cfpassword_reg");
let fullname_reg = document.getElementById("fullname_reg");

function solve_reg() {
  if (
    password_reg.value != cfpassword_reg.value ||
    password_reg.value == "" ||
    cfpassword_reg.value == "" ||
    fullname_reg.value == "" ||
    email_reg.value == ""
  ) {
    alert("Fail");
    email_reg.value = "";
    password_reg.value = "";
    cfpassword_reg.value = "";
    fullname_reg.value = "";
    preview.src = "";
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
          if (preview.src == "")
            preview.src =
              "data:image/png;base64,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";
          add({
            username: email_reg.value,
            password: password_reg.value,
            fullname: fullname_reg.value,
            avatar: preview.src,
            online: 0,
          });
          email_reg.value = "";
          password_reg.value = "";
          cfpassword_reg.value = "";
          fullname_reg.value = "";
          preview.src = "";
        }
      })
      .catch((error) => {
        console.log("Noo");
      });
  }
}
let regbtn = document.getElementById("regbtn");
regbtn.onclick = solve_reg;
