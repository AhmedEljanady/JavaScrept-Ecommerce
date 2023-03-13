//Lang Dir
let en = document.getElementById("en_lang");
let ar = document.getElementById("ar_lang");

en.addEventListener("click", () => changeDir("ltr"));
ar.addEventListener("click", () => changeDir("rtl"));

let getLang = localStorage.getItem("langDir");
if (getLang) {
  if (getLang == "rtl") {
    changeDir("rtl");
  } else {
    changeDir("ltr");
  }
}

function changeDir(dir) {
  document.documentElement.setAttribute("dir", dir);
  localStorage.setItem("langDir", dir);
}
