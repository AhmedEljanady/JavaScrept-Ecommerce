// Variables
let userInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changeEmail");
let editForm = document.getElementById("edit-profile-form");

// Setting Values of Input
userInput.value = localStorage.getItem("username");
userEmailInput.value = localStorage.getItem("email");

// Events
editForm.addEventListener("submit", editProfileData);

function editProfileData(e) {
  e.preventDefault();

  localStorage.setItem("username", userInput.value);
  localStorage.setItem("email", userEmailInput.value);

  setTimeout(() => {
    window.location = "profile.html";
  }, 500);
}
