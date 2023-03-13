let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let myProducts = products.filter((i) => i.isMe === "Y");

let userDom2 = document.getElementById("username");
let userEmailDom = document.getElementById("email");
let productsLength = document.querySelector("#productsLength span");

userDom2.innerHTML = localStorage.getItem("username");
userEmailDom.innerHTML = localStorage.getItem("email");
if (myProducts.length != 0) {
  productsLength.innerHTML = myProducts.length;
} else {
  productsLength.innerHTML = "No products yet";
}
