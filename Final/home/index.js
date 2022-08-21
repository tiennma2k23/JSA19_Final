// avatar.src = localStorage.getItem("avatar");
// let Url = String(localStorage.getItem("avatar"));
// console.log(localStorage.getItem("avatar"));
// let Url = localStorage.avatar;

if (localStorage.getItem("fullname") == null) {
  setTimeout(() => {
    window.close("index.html");
  }, 0);
  window.open("../login_signup/index_login.html");
  // window.close("index.html");
}
localStorage.removeItem("chat");
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
  // console.log(await res.json());
};
const updateById2 = async (id, newData) => {
  const res = await fetch(UrlApiUser + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  // console.log(await res.json());
};
function _settime(hour, minute, second, id) {
  let ch;
  if (id == 1) ch = ":";
  else if (id == 2) ch = "-";
  let _h = String(hour);
  if (_h.length == 1) _h = "0" + _h;
  let _m = String(minute);
  if (_m.length == 1) _m = "0" + _m;
  let _s = String(second);
  if (_s.length == 1) _s = "0" + _s;
  let ans = "";
  ans = _h + ch + _m + ch + _s;
  return ans;
}
// get Info
function getInfo() {
  let avatar = document.getElementById("avatar");
  let avatar1 = document.getElementById("avatar1");
  let avatar2 = document.getElementById("avatar2");
  let id = Number(localStorage.id);
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      avatar.src = data[id - 1].avatar;
      avatar1.src = data[id - 1].avatar;
      avatar2.src = data[id - 1].avatar;
    });
}
getInfo();

//active
function active() {
  let id = Number(localStorage.id);
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      updateById2(id, {
        fullname: data[id - 1].fullname,
        avatar: data[id - 1].avatar,
        username: data[id - 1].username,
        online: 1,
        password: data[id - 1].password,
        // imgsrc: data[id - 1].imgsrc,
      });
    });
}
function inactive() {
  let id = Number(localStorage.id);
  fetch(UrlApiUser)
    .then((result) => result.json())
    .then((data) => {
      updateById2(id, {
        fullname: data[id - 1].fullname,
        avatar: data[id - 1].avatar,
        username: data[id - 1].username,
        online: 0,
        password: data[id - 1].password,
        // imgsrc: data[id - 1].imgsrc,
      });
    });
}

let idp = 0;
let pos = [],
  clicked = [],
  check = [];
for (let i = 1; i <= 10000000; i++) pos.push(0), clicked.push(0);
for (let i = 1; i <= 10000; i++) {
  let _tmp = [];
  for (let j = 1; j <= 6000; j++) _tmp.push(0);
  check.push(_tmp);
}
// console.log(check[0][0]);
// console.log(document.getElementById("abc"));
let prev = -1;

if (localStorage.getItem("arr_hide") == null) {
  let hide_arr = [];
  for (let i = 0; i < 1000000; i++) hide_arr.push(0);
  localStorage.setItem("arr_hide", JSON.stringify(hide_arr));
}
let visit = [];
for (let i = 1; i <= 1000000; i++) visit.push(0);
function refresh() {
  // window.addEventListener("click", () => {
  //   console.log(prev);
  //   if (prev != -1) {
  //     let previd = "option" + String(prev);
  //     let optionprev = document.getElementById(previd);
  //     optionprev.innerHTML = "";
  //   }
  // });
  let main = document.getElementById("post_in_mediabook");
  // main.innerHTML = "";
  fetch(UrlApi)
    .then((result) => result.json())
    .then((data) => {
      let dem = 3;
      let hide_arr = JSON.parse(localStorage.getItem("arr_hide"));
      for (let i = data.length - 1; i >= 0; i--) {
        if (visit[data[i].id] > 0) continue;
        visit[data[i].id] = 1;
        if (data[i].fullname == "") continue;
        if (hide_arr[i] > 0) continue;
        dem--;

        var name = data[i].fullname;
        var poster = data[i].content;
        var cnt_like = data[i].cnt_like;
        var npost = document.createElement("div");
        npost.setAttribute("id", "npost" + String(data[i].id));
        var post_row1 = document.createElement("div");
        post_row1.setAttribute("class", "post_row");
        var user_profile = document.createElement("div");
        user_profile.setAttribute("class", "user_profile");
        var img_user = document.createElement("img");
        img_user.src = data[i].avatar;
        var name_user = document.createElement("div");
        var name_p = document.createElement("p");
        name_p.innerHTML = name;
        name_p.style = "cursor:pointer;";
        var timee =
          _settime(data[i].hour, data[i].minute, data[i].second, 1) +
          " ngày " +
          _settime(data[i].ngay, data[i].thang, data[i].nam, 2);
        var name_t = document.createElement("span");
        name_t.setAttribute("class", "time");
        name_t.innerHTML = timee;
        name_user.append(name_p);
        name_user.append(name_t);
        user_profile.append(img_user);
        user_profile.append(name_user);
        var options = document.createElement("div");
        options.setAttribute("id", "options" + String(data[i].id));
        options.setAttribute("class", "options");
        var post_row_a = document.createElement("a");
        var post_row_a_i = document.createElement("i");
        post_row_a_i.setAttribute("class", "fas fa-ellipsis-v");
        post_row_a_i.setAttribute("id", "i" + String(data[i].id));
        post_row_a_i.style = "cursor:pointer;";
        post_row_a_i.addEventListener("click", (e) => {
          console.log(e.target.id);
          let _idd = e.target.id,
            _id_n = 0;
          for (let _i = 1; _i < _idd.length; _i++) {
            if (_idd[_i] >= "0" && _idd[_i] <= "9")
              _id_n = _id_n * 10 + Number(_idd[_i]);
          }
          // console.log(_id_n);
          if (prev != -1) {
            let previd = "option" + String(prev);
            // console.log(document.getElementById(previd));
            let optionprev = document.getElementById(previd);
            if (optionprev != null) {
              optionprev.innerHTML = "";
            }
          }
          // console.log(prev);
          prev = _id_n;
          let option;
          // console.log(_id_n);
          if (document.getElementById("option" + String(_id_n)) == null) {
            option = document.createElement("div");
            option.setAttribute("id", "option" + String(_id_n));
            option.setAttribute("class", "option");
          } else option = document.getElementById("option" + String(_id_n));
          let hide = document.createElement("p");
          hide.style = "cursor:pointer;";
          hide.setAttribute("id", String(_id_n));
          hide.innerHTML = "Ẩn";
          hide.addEventListener("click", (e) => {
            let num = Number(e.target.id);
            let arr = JSON.parse(localStorage.getItem("arr_hide"));
            arr[num - 1] = 1;
            localStorage.setItem("arr_hide", JSON.stringify(arr));
            let div_post = document.getElementById("div_post" + String(num));
            div_post.innerHTML = "";
          });
          let del = document.createElement("p");
          del.innerHTML = "";
          if (localStorage.getItem("fullname") == data[_id_n - 1].fullname) {
            del.style = "cursor:pointer;";
            del.setAttribute("id", String(_id_n));
            del.innerHTML = "Xóa";
            del.addEventListener("click", (e) => {
              // console.log("del", e.target.id);
              let num = Number(e.target.id);
              let id_n = num;
              updateById(id_n, {
                fullname: "",
                avatar: "",
                content: "",
                cnt_like: cnt_like,
                hour: data[id_n - 1].hour,
                minute: data[id_n - 1].minute,
                second: data[id_n - 1].second,
                ngay: data[id_n - 1].ngay,
                thang: data[id_n - 1].thang,
                nam: data[id_n - 1].nam,
                imgsrc: data[id_n - 1].imgsrc,
                comments: [],
              });
              let div_post = document.getElementById("div_post" + String(num));
              div_post.innerHTML = "";
            });
          }
          option.append(hide);
          option.append(del);
          let ops = document.getElementById("options" + String(_id_n));
          ops.append(option);
          // console.log(_id_n);
        });
        post_row_a.append(post_row_a_i);
        options.append(post_row_a);
        post_row1.append(user_profile);
        post_row1.append(options);
        npost.append(post_row1);

        var post_text = document.createElement("p");
        post_text.setAttribute("class", " post_text");
        post_text.append(poster);
        npost.append(post_text);
        if (data[i].imgsrc != "") {
          var post_img = document.createElement("img");
          post_img.setAttribute("class", "post_img");
          post_img.src = data[i].imgsrc;
          npost.append(post_img);
        }

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
        like.style = "cursor:pointer;";
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
            avatar: data[id_n - 1].avatar,
            content: data[id_n - 1].content,
            cnt_like: cnt_like,
            hour: data[id_n - 1].hour,
            minute: data[id_n - 1].minute,
            second: data[id_n - 1].second,
            ngay: data[id_n - 1].ngay,
            thang: data[id_n - 1].thang,
            nam: data[id_n - 1].nam,
            imgsrc: data[id_n - 1].imgsrc,
            comments: data[id_n - 1].comments,
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
        // var cmt_id = "cmt" + id_s;
        cmt.setAttribute("id", String(data[i].id));

        var imgcmt = document.createElement("img");
        imgcmt.src = "images/comments.png";
        imgcmt.setAttribute("id", String(data[i].id));
        cmt.append(imgcmt);
        cmt_div.append(cmt);
        var countcmt = document.createElement("span");
        countcmt.setAttribute("id", "countcmt");
        countcmt.setAttribute("id", "countcmt" + String(data[i].id));
        countcmt.innerHTML = String(data[i].comments.length);
        cmt_div.append(countcmt);
        // let pos = 0;
        cmt.style = "cursor:pointer";
        cmt.addEventListener("click", (e) => {
          let dem = 0;
          let id_s = String(e.target.id);
          let id_n = Number(e.target.id);
          if (clicked[id_n]) return;
          clicked[id_n] = 1;
          let npost_id = "npost" + id_s;
          let npostt = document.getElementById(npost_id);
          let cmt_area = document.createElement("div");
          cmt_area.setAttribute("id", "cmt_area" + id_s);
          cmt_area.setAttribute("class", "cmt_area");
          let content_area = document.createElement("div");
          content_area.setAttribute("class", "content_area");
          content_area.setAttribute("id", "content_area" + id_s);
          while (pos[id_n] < data[id_n - 1].comments.length) {
            if (check[id_n - 1][pos[id_n]] == 0) {
              let cmt_content_area = document.createElement("div");
              cmt_content_area.setAttribute("class", "cmt_content_area");
              let img_user = document.createElement("img");
              img_user.setAttribute("class", "img_user");
              img_user.src = data[id_n - 1].comments[pos[id_n]].avatar;
              let noidung_cmt = document.createElement("div");
              noidung_cmt.setAttribute("class", "noidung_cmt");
              let _cmt = document.createElement("div");
              _cmt.setAttribute("class", "_cmt");
              let username_cmt = document.createElement("div");
              username_cmt.setAttribute("class", "username_cmt");

              username_cmt.innerHTML =
                data[id_n - 1].comments[pos[id_n]].fullname;
              _cmt.innerHTML = data[id_n - 1].comments[pos[id_n]].content;
              noidung_cmt.append(username_cmt);
              noidung_cmt.append(_cmt);

              cmt_content_area.append(img_user);
              cmt_content_area.append(noidung_cmt);
              let cnt_like_area = document.createElement("div");
              cnt_like_area.setAttribute("class", "cnt_like_area");
              let likeimg = document.createElement("img");
              likeimg.setAttribute("class", "likeimg");
              likeimg.setAttribute("id", id_s + "_" + String(pos[id_n]));
              likeimg.src = "./images/like-blue.png";
              cnt_like_area.append(likeimg);
              let countlike = document.createElement("div");
              countlike.setAttribute(
                "id",
                "cntlike" + id_s + "_" + String(pos[id_n])
              );
              countlike.innerHTML = data[id_n - 1].comments[pos[id_n]].like;
              likeimg.style = "cursor:pointer";
              likeimg.addEventListener("click", (e) => {
                // console.log(e.target.id);
                let _id = e.target.id;
                let pid = 0,
                  position = 0,
                  ok = 0;
                for (let _i = 0; _i < _id.length; _i++) {
                  if (ok == 0 && _id[_i] != "_") {
                    pid = pid * 10 + (_id[_i] - "0");
                  } else if (_id[_i] == "_") ok = 1;
                  else if (ok == 1 && _id[_i] != "_") {
                    position = position * 10 + (_id[_i] - "0");
                  }
                }
                let cntlike = document.getElementById(
                  "cntlike" + String(e.target.id)
                );
                let cnt = Number(cntlike.innerHTML);
                cnt++;
                cntlike.innerHTML = cnt;
                let arr_cmt = data[pid - 1].comments;
                arr_cmt[position].like = cnt;
                updateById(pid, {
                  fullname: data[pid - 1].fullname,
                  avatar: data[pid - 1].avatar,
                  content: data[pid - 1].content,
                  cnt_like: data[pid - 1].cnt_like,
                  hour: data[pid - 1].hour,
                  minute: data[pid - 1].minute,
                  second: data[pid - 1].second,
                  ngay: data[pid - 1].ngay,
                  thang: data[pid - 1].thang,
                  nam: data[pid - 1].nam,
                  imgsrc: data[pid - 1].imgsrc,
                  comments: arr_cmt,
                });
                // console.log(pid, position);
              });
              // cmt_content_area.append(cnt_like_area);
              cnt_like_area.append(countlike);
              let _content_area = document.createElement("div");
              _content_area.setAttribute("class", "_content_area");
              _content_area.append(cmt_content_area);
              _content_area.append(cnt_like_area);

              content_area.append(_content_area);

              dem++;
            }
            pos[id_n]++;
            if (dem == 3) {
              dem = 0;
              break;
            }
          }
          let post_cmt = document.createElement("div");
          post_cmt.setAttribute("class", post_cmt);
          let cmt_input_area = document.createElement("div");
          cmt_input_area.setAttribute("class", "cmt_input_area");
          let cmt_input = document.createElement("input");
          cmt_input.type = "text";
          cmt_input_area.append(cmt_input);
          let pbtn = document.createElement("button");
          pbtn.setAttribute("class", "pbtn");
          pbtn.setAttribute("id", id_s);
          pbtn.innerHTML = "post";
          cmt_input_area.append(pbtn);
          pbtn.addEventListener("click", (e) => {
            // console.log(e.target.id);
            let cmt_content_area = document.createElement("div");
            cmt_content_area.setAttribute("class", "cmt_content_area");
            let img_user = document.createElement("img");
            img_user.setAttribute("class", "img_user");
            img_user.src = localStorage.avatar;
            // let noidung_cmt = document.createElement("div");
            // noidung_cmt.setAttribute("class", "noidung_cmt");
            // noidung_cmt.innerHTML = cmt_input.value;
            let noidung_cmt = document.createElement("div");
            noidung_cmt.setAttribute("class", "noidung_cmt");
            let _cmt = document.createElement("div");
            _cmt.setAttribute("class", "_cmt");
            let username_cmt = document.createElement("div");
            username_cmt.setAttribute("class", "username_cmt");

            username_cmt.innerHTML = localStorage.fullname;
            _cmt.innerHTML = cmt_input.value;
            noidung_cmt.append(username_cmt);
            noidung_cmt.append(_cmt);

            cmt_content_area.append(img_user);
            cmt_content_area.append(noidung_cmt);
            let cnt_like_area = document.createElement("div");
            cnt_like_area.setAttribute("class", "cnt_like_area");
            let likeimg = document.createElement("img");
            likeimg.setAttribute("class", "likeimg");
            likeimg.setAttribute(
              "id",
              id_s + "_" + String(data[id_n - 1].comments.length)
            );

            likeimg.src = "./images/like-blue.png";
            cnt_like_area.append(likeimg);
            let countlike = document.createElement("div");
            countlike.setAttribute(
              "id",
              "cntlike" + id_s + "_" + String(data[id_n - 1].comments.length)
            );
            countlike.innerHTML = 0;
            likeimg.addEventListener("click", (e) => {
              // console.log(e.target.id);
              let _id = e.target.id;
              let pid = 0,
                position = 0,
                ok = 0;
              for (let _i = 0; _i < _id.length; _i++) {
                if (ok == 0 && _id[_i] != "_") {
                  pid = pid * 10 + (_id[_i] - "0");
                } else if (_id[_i] == "_") ok = 1;
                else if (ok == 1 && _id[_i] != "_") {
                  position = position * 10 + (_id[_i] - "0");
                }
              }
              let cntlike = document.getElementById(
                "cntlike" + String(e.target.id)
              );
              let cnt = Number(cntlike.innerHTML);
              cnt++;
              cntlike.innerHTML = cnt;
              let arr_cmt = data[pid - 1].comments;
              arr_cmt[position].like = cnt;
              updateById(pid, {
                fullname: data[pid - 1].fullname,
                avatar: data[pid - 1].avatar,
                content: data[pid - 1].content,
                cnt_like: data[pid - 1].cnt_like,
                hour: data[pid - 1].hour,
                minute: data[pid - 1].minute,
                second: data[pid - 1].second,
                ngay: data[pid - 1].ngay,
                thang: data[pid - 1].thang,
                nam: data[pid - 1].nam,
                imgsrc: data[pid - 1].imgsrc,
                comments: arr_cmt,
              });
              // console.log(pid, position);
            });
            // cmt_content_area.append(cnt_like_area);
            cnt_like_area.append(countlike);
            let _content_area = document.createElement("div");
            _content_area.setAttribute("class", "_content_area");
            _content_area.append(cmt_content_area);
            _content_area.append(cnt_like_area);
            let content_area = document.getElementById("content_area" + id_s);
            content_area.append(_content_area);
            check[id_n - 1][data[id_n - 1].comments.length] = 1;
            let _id = Number(e.target.id);
            let data_cmt = {
              fullname: localStorage.getItem("fullname"),
              avatar: localStorage.getItem("avatar"),
              content: cmt_input.value,
              like: 0,
              pid: _id,
            };
            let array_cmt = data[_id - 1].comments;
            array_cmt.push(data_cmt);
            cmt_input.value = "";
            updateById(_id, {
              fullname: data[_id - 1].fullname,
              avatar: data[_id - 1].avatar,
              content: data[_id - 1].content,
              cnt_like: data[_id - 1].cnt_like,
              hour: data[_id - 1].hour,
              minute: data[_id - 1].minute,
              second: data[_id - 1].second,
              ngay: data[_id - 1].ngay,
              thang: data[_id - 1].thang,
              nam: data[_id - 1].nam,
              imgsrc: data[_id - 1].imgsrc,
              comments: array_cmt,
            });
          });
          let loadmore = document.createElement("button");
          loadmore.setAttribute("class", "loadmore");
          loadmore.setAttribute("id", id_s);
          loadmore.innerHTML = "Xem thêm";
          // cmt_area.append(cmt_input_area);
          // cmt_area.append(loadmore);
          npostt.append(cmt_area);
          loadmore.addEventListener("click", (e) => {
            // console.log(e.target.id);
            let id_n = Number(e.target.id);
            let id_s = String(e.target.id);
            while (pos[id_n] < data[id_n - 1].comments.length) {
              if (check[id_n - 1][pos[id_n]] == 0) {
                let cmt_content_area = document.createElement("div");
                cmt_content_area.setAttribute("class", "cmt_content_area");
                let img_user = document.createElement("img");
                img_user.setAttribute("class", "img_user");
                img_user.src = data[id_n - 1].comments[pos[id_n]].avatar;
                // let noidung_cmt = document.createElement("div");
                // noidung_cmt.setAttribute("class", "noidung_cmt");
                // noidung_cmt.innerHTML =
                //   data[id_n - 1].comments[pos[id_n]].content;
                let noidung_cmt = document.createElement("div");
                noidung_cmt.setAttribute("class", "noidung_cmt");
                let _cmt = document.createElement("div");
                _cmt.setAttribute("class", "_cmt");
                let username_cmt = document.createElement("div");
                username_cmt.setAttribute("class", "username_cmt");

                username_cmt.innerHTML =
                  data[id_n - 1].comments[pos[id_n]].fullname;
                _cmt.innerHTML = data[id_n - 1].comments[pos[id_n]].content;
                noidung_cmt.append(username_cmt);
                noidung_cmt.append(_cmt);
                cmt_content_area.append(img_user);
                cmt_content_area.append(noidung_cmt);
                let cnt_like_area = document.createElement("div");
                cnt_like_area.setAttribute("class", "cnt_like_area");
                let likeimg = document.createElement("img");
                likeimg.setAttribute("class", "likeimg");
                likeimg.setAttribute("id", id_s + "_" + String(pos[id_n]));
                likeimg.src = "./images/like-blue.png";
                cnt_like_area.append(likeimg);
                let countlike = document.createElement("div");
                countlike.setAttribute(
                  "id",
                  "cntlike" + id_s + "_" + String(pos[id_n])
                );
                countlike.innerHTML = data[id_n - 1].comments[pos[id_n]].like;
                likeimg.addEventListener("click", (e) => {
                  // console.log(e.target.id);
                  let _id = e.target.id;
                  let pid = 0,
                    position = 0,
                    ok = 0;
                  for (let _i = 0; _i < _id.length; _i++) {
                    if (ok == 0 && _id[_i] != "_") {
                      pid = pid * 10 + (_id[_i] - "0");
                    } else if (_id[_i] == "_") ok = 1;
                    else if (ok == 1 && _id[_i] != "_") {
                      position = position * 10 + (_id[_i] - "0");
                    }
                  }
                  let cntlike = document.getElementById(
                    "cntlike" + String(e.target.id)
                  );
                  let cnt = Number(cntlike.innerHTML);
                  cnt++;
                  cntlike.innerHTML = cnt;
                  let arr_cmt = data[pid - 1].comments;
                  arr_cmt[position].like = cnt;
                  updateById(pid, {
                    fullname: data[pid - 1].fullname,
                    avatar: data[pid - 1].avatar,
                    content: data[pid - 1].content,
                    cnt_like: data[pid - 1].cnt_like,
                    hour: data[pid - 1].hour,
                    minute: data[pid - 1].minute,
                    second: data[pid - 1].second,
                    ngay: data[pid - 1].ngay,
                    thang: data[pid - 1].thang,
                    nam: data[pid - 1].nam,
                    imgsrc: data[pid - 1].imgsrc,
                    comments: arr_cmt,
                  });
                  // console.log(pid, position);
                });
                // cmt_content_area.append(cnt_like_area);
                cnt_like_area.append(countlike);
                let _content_area = document.createElement("div");
                _content_area.setAttribute("class", "_content_area");
                _content_area.append(cmt_content_area);
                _content_area.append(cnt_like_area);
                content_area.append(_content_area);

                dem++;
              }
              pos[id_n]++;
              if (dem == 3) {
                dem = 0;
                break;
              }
            }
            // cmt_area.innerHTML = "";
            // cmt_area.append(cmt_input_area);
            // cmt_area.append(loadmore);
          });
          cmt_area.append(content_area);
          cmt_area.append(loadmore);
          cmt_area.append(cmt_input_area);
          // };
        });

        activity_icon.append(cmt_div);

        var share_div = document.createElement("div");
        var share = document.createElement("button");
        share.setAttribute("class", "share");
        var imgshare = document.createElement("img");
        imgshare.src = "images/share.png";
        share.append(imgshare);
        share_div.append(share);
        share.style = "cursor:pointer;";
        var countshare = document.createElement("span");
        countshare.setAttribute("id", "countshare");
        countshare.innerHTML = "100";
        share_div.append(countshare);
        activity_icon.append(share_div);

        post_row2.append(activity_icon);

        npost.append(post_row2);

        let newDiv = document.createElement("div");
        newDiv.className = "post_container";

        let div_post = document.createElement("div");
        div_post.setAttribute("id", "div_post" + String(data[i].id));
        let newpost = document.createElement("div");
        newpost.append(npost);

        newDiv.append(newpost);
        div_post.append(newDiv);
        main.append(div_post);
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
      if (useronline.length < 3) {
        for (let index = 0; index < useronline.length; index++) {
          dem++;
          online_user.innerHTML += `<div class="online_list" style="cursor:pointer;">
        <div class="online">
            <img src=${data[useronline[index]].avatar} alt="">
        </div>
        <p>${data[useronline[index]].fullname}</p>
    </div>`;
        }
      } else {
        while (true) {
          let index = Math.floor(Math.random() * useronline.length);
          if (ok[index] == 0) {
            dem++;
            online_user.innerHTML += `<div class="online_list">
        <div class="online">
            <img src=${data[useronline[index]].avatar} alt="">
        </div>
        <p>${data[useronline[index]].fullname}</p>
    </div>`;
          }
          ok[index] = 1;
          if (dem == 3) break;
        }
      }
      // console.log(useronline);
    });
}
let getdataOnlineUser = setInterval(listOnlineUser, 3000);

let upphoto = document.getElementById("upphoto");
let img_input = document.createElement("div");
let content_input = document.getElementById("content_input");
let cnt_upimg = 0;
upphoto.onclick = function () {
  // console.log(1);
  if (cnt_upimg == 0) {
    cnt_upimg++;
    img_input.setAttribute("class", "img_input");
    img_input.setAttribute("id", "img_input");
    img_input.innerHTML += `<input type="file" onchange="previewFile() " name="anh" id="file"/>
  <img
      src=""
      class="post_img"
      alt="Image preview"
      id="imagepreview"
  />`;
  }
};
content_input.append(img_input);
function previewFile() {
  const preview = document.querySelector("#imagepreview");
  const file = document.querySelector("input[type=file]").files[0];
  if (file.size > 60 * 1024) {
    alert("File is too big!");
    document.getElementById("file").value = "";
    return;
  }
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

var _post = document.querySelector("._post");
_post.onclick = function () {
  post_menu.classList.toggle("post_menu_height");
  let imgsrc = "";
  if (
    img_input.innerHTML != "" &&
    document.getElementById("file").value != ""
  ) {
    imgsrc = document.querySelector("#imagepreview").src;
    // console.log(imgsrc);
    img_input.innerHTML = "";
  }
  var content = document.getElementById("content");
  var ndate = new Date();
  add({
    fullname: localStorage.fullname,
    avatar: localStorage.avatar,
    content: content.value,
    hour: Number(ndate.getHours()),
    minute: Number(ndate.getMinutes()),
    second: Number(ndate.getSeconds()),
    ngay: Number(ndate.getDate()),
    thang: Number(ndate.getMonth()) + 1,
    nam: Number(ndate.getFullYear()),
    cnt_like: 0,
    imgsrc: imgsrc,
    comments: [],
  });
  content.value = "";
  cnt_upimg = 0;
};
// console.log(1);
// localStorage.removeItem("arr_hide");
