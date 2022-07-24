const links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    window.open("index_login.html");
    window.close("index_forgot.html");
  });
});
const UrlApi = "https://62d4116c5112e98e484a08f4.mockapi.io/api/users";
const updateById = async (id, newData) => {
  const res = await fetch(UrlApi + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  console.log(await res.json());
};

let email = document.getElementById("email");
let password = document.getElementById("password");
let cfpassword = document.getElementById("cfpassword");
function solve() {
  if (password.value != cfpassword.value) {
    alert("Mật khẩu và nhắc lại mật khẩu không trùng khớp");
    password.value = "";
    cfpassword.value = "";
    email.value = "";
  } else {
    fetch(UrlApi)
      .then((result) => result.json())
      .then((res) => {
        let ok = false,
          id = 0;
        for (let i = 0; i < res.length; i++) {
          //   console.log(i, res[i].username, email.value);
          if (res[i].username == email.value) {
            ok = true;
            id = i + 1;
            break;
          }
        }
        if (ok == false) {
          alert("Email chưa được đăng kí. Vui lòng đăng kí");
          email.value = "";
          password.value = "";
          cfpassword.value = "";
        } else {
          alert("AC");
          updateById(id, {
            username: email.value,
            password: password.value,
          });
          email.value = "";
          password.value = "";
          cfpassword.value = "";
        }
      })
      .catch((error) => {
        console.log("Noo");
      });
  }
}
let cfbtn = document.getElementById("cfbtn");
cfbtn.onclick = solve;
