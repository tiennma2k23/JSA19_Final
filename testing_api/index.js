const uploadinput = document.querySelector("#uploadinput");
const uploadBtn = document.querySelector("#uploadBtn");
uploadBtn.addEventListener("click", uploadFile);
const formData = new FormData();
console.log(uploadinput.files[0]);
formData.append("avatar", uploadinput.files[0]);
async function uploadFile() {
  try {
    const response = await fetch(
      "https://62d4116c5112e98e484a08f4.mockapi.io/api/avas",
      {
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        // },
        method: "POST",

        body: formData,
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
