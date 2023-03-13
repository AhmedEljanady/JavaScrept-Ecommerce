const countdownEl = document.querySelector(".counterDown");
const secEl = document.querySelector(".sec");
const minEl = document.querySelector(".min");
const hoursEl = document.querySelector(".hours");
const daysEl = document.querySelector(".days");

let saleEndDateMiliSec = new Date("Tue Jan 17 2023 22:49:25").getTime();
let dateNow = new Date().getTime();
let countdown = saleEndDateMiliSec - dateNow;

const updateCountdown = () => {
  const days = Math.floor(countdown / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (countdown % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((countdown % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((countdown % (60 * 1000)) / 1000);

  daysEl.innerHTML = days.toString().padStart(2, "0");
  hoursEl.innerHTML = hours.toString().padStart(2, "0");
  minEl.innerHTML = minutes.toString().padStart(2, "0");
  secEl.innerHTML = seconds.toString().padStart(2, "0");

  countdown -= 1000;

  if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
    // countdownEl.innerHTML = "";
    countdownEl.remove();
  }
};

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
