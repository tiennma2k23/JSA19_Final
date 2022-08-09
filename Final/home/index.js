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

var Name = document.getElementById("Name");
Name.innerHTML = localStorage.getItem("fullname");

const UrlApi = "https://62d4116c5112e98e484a08f4.mockapi.io/api/contents";
const UrlApiUser = "https://62d4116c5112e98e484a08f4.mockapi.io/api/users";

const updateById = async (id, newData) => {
  const res = await fetch(UrlApi + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  console.log(await res.json());
};
const updateById2 = async (id, newData) => {
  const res = await fetch(UrlApiUser + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  console.log(await res.json());
};
//inactive

//active
function active() {
  let id = Number(localStorage.id);
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      updateById2(id, {
        fullname: data[id - 1].fullname,
        username: data[id - 1].username,
        online: 1,
        password: data[id - 1].password,
      });
    });
}

let idp = 0;

function refresh() {
  let main = document.getElementById("post_in_socialbook");
  // main.innerHTML = "";
  fetch(UrlApi)
    .then((result) => result.json())
    .then((data) => {
      let dem = 3;
      for (let i = idp; i < data.length; i++) {
        dem--;
        idp++;
        var name = data[i].fullname;
        var poster = data[i].content;
        var cnt_like = data[i].cnt_like;
        var npost = document.createElement("div");
        var post_row1 = document.createElement("div");
        post_row1.setAttribute("class", "post_row");
        var user_profile = document.createElement("div");
        user_profile.setAttribute("class", "user_profile");
        var img_user = document.createElement("img");
        img_user.src = "images/userimg.png";
        var name_user = document.createElement("div");
        var name_p = document.createElement("p");
        name_p.innerHTML = name;
        var timee =
          String(data[i].hour) +
          ":" +
          String(data[i].minute) +
          ":" +
          String(data[i].second) +
          " ngày " +
          String(data[i].ngay) +
          "-" +
          String(data[i].thang) +
          "-" +
          String(data[i].nam);
        var name_t = document.createElement("span");
        name_t.setAttribute("class", "time");
        name_t.innerHTML = timee;
        name_user.append(name_p);
        name_user.append(name_t);
        user_profile.append(img_user);
        user_profile.append(name_user);
        var post_row_a = document.createElement("a");
        var post_row_a_i = document.createElement("i");
        post_row_a_i.setAttribute("class", "fas fa-ellipsis-v");
        post_row_a.append(post_row_a_i);
        post_row1.append(user_profile);
        post_row1.append(post_row_a);
        npost.append(post_row1);

        var post_text = document.createElement("p");
        post_text.setAttribute("class", " post_text");
        post_text.append(poster);
        npost.append(post_text);

        var post_row2 = document.createElement("div");
        post_row2.setAttribute("class", "post_row");
        var activity_icon = document.createElement("div");
        activity_icon.setAttribute("class", "activity_icon");
        var like_div = document.createElement("div");
        var like = document.createElement("button");
        like.setAttribute("class", "like");
        like.setAttribute("id", String(data[i].id));
        // console.log(i, data[i].id);
        var imglike = document.createElement("img");
        imglike.src = "images/like-blue.png";
        imglike.setAttribute("id", String(data[i].id));
        like.append(imglike);
        like_div.append(like);
        var countlike = document.createElement("span");
        var str = "countlike" + String(data[i].id);
        countlike.setAttribute("id", str);

        countlike.innerHTML = cnt_like;
        like_div.append(countlike);
        activity_icon.append(like_div);

        like.addEventListener("click", (e) => {
          // console.log(e.target);
          var id_s = String(e.target.id),
            id_n = Number(e.target.id);
          var str = "countlike" + id_s;
          var countlike = document.getElementById(str);
          var cnt_like = Number(countlike.innerHTML);
          cnt_like++;
          countlike.innerHTML = cnt_like;
          updateById(id_n, {
            fullname: data[id_n - 1].fullname,
            content: data[id_n - 1].content,
            cnt_like: cnt_like,
            hour: data[id_n - 1].hour,
            minute: data[id_n - 1].minute,
            second: data[id_n - 1].second,
            ngay: data[id_n - 1].ngay,
            thang: data[id_n - 1].thang,
            nam: data[id_n - 1].nam,
          });
        });
        // like.onclick = function (e) {
        //   cnt_like++;
        //   console.log(e.target);
        //   // updateById(id, {
        //   //   fullname: data[id - 1].fullname,
        //   //   content: data[id - 1].content,
        //   //   cnt_like: cnt_like,
        //   //   hour: data[id - 1].hour,
        //   //   minute: data[id - 1].minute,
        //   //   second: data[id - 1].second,
        //   //   ngay: data[id - 1].ngay,
        //   //   thang: data[id - 1].thang,
        //   //   nam: data[id - 1].nam,
        //   // });
        //   // countlike.innerHTML = cnt_like;
        //   // like_div.append(countlike);
        // };

        var cmt_div = document.createElement("div");
        var cmt = document.createElement("button");
        cmt.setAttribute("class", "cmt");
        var imgcmt = document.createElement("img");
        imgcmt.src = "images/comments.png";
        cmt.append(imgcmt);
        cmt_div.append(cmt);
        var countcmt = document.createElement("span");
        countcmt.setAttribute("id", "countcmt");
        countcmt.innerHTML = "100";
        cmt_div.append(countcmt);
        activity_icon.append(cmt_div);

        var share_div = document.createElement("div");
        var share = document.createElement("button");
        share.setAttribute("class", "share");
        var imgshare = document.createElement("img");
        imgshare.src = "images/share.png";
        share.append(imgshare);
        share_div.append(share);
        var countshare = document.createElement("span");
        countshare.setAttribute("id", "countshare");
        countshare.innerHTML = "100";
        share_div.append(countshare);
        activity_icon.append(share_div);

        post_row2.append(activity_icon);

        npost.append(post_row2);

        let newDiv = document.createElement("div");
        newDiv.className = "post_container";
        let newpost = document.createElement("div");
        newpost.append(npost);

        newDiv.append(newpost);
        main.append(newDiv);
        if (dem == 0 || idp == data.length) break;
      }
    });
}
// refresh();
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
  // refresh();
};

var _post = document.querySelector("._post");
_post.onclick = function () {
  post_menu.classList.toggle("post_menu_height");
  var content = document.getElementById("content");
  var ndate = new Date();
  add({
    fullname: localStorage.fullname,
    content: content.value,
    hour: Number(ndate.getHours()),
    minute: Number(ndate.getMinutes()),
    second: Number(ndate.getSeconds()),
    ngay: Number(ndate.getDate()),
    thang: Number(ndate.getMonth()) + 1,
    nam: Number(ndate.getFullYear()),
    cnt_like: 0,
  });
};

active();
let POSTT = setInterval(refresh, 2000);

function listOnlineUser() {
  let online_user = document.getElementById("online_user");
  online_user.innerHTML = "";
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      let useronline = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].online > 0) {
          useronline.push(i);
        }
      }
      let dem = 0;
      let ok = [];
      for (let i = 0; i < data.length; i++) ok.push(0);
      while (true) {
        let index = Math.floor(Math.random() * useronline.length);
        if (ok[index] == 0) {
          dem++;
          online_user.innerHTML += `<div class="online_list">
        <div class="online">
            <img src="images/userimg.png" alt="">
        </div>
        <p>${data[useronline[index]].fullname}</p>
    </div>`;
        }
        ok[index] = 1;
        if (dem == 3) break;
      }
      // console.log(useronline);
    });
}
let getdataOnlineUser = setInterval(listOnlineUser, 3000);
let idd = Number(localStorage.id);
function inactive() {
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      updateById2(idd, {
        fullname: data[idd - 1].fullname,
        username: data[idd - 1].username,
        online: 0,
        password: data[idd - 1].password,
      });
    });
}
// inactive();
// window.addEventListener("beforeunload", inactive);
