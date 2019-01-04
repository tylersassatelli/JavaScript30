let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown); // stop any existing timers before starting a new one
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop timer
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        };
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); // Math.floor() will give the minutes variable a whole number and ignore those extra seconds
    const remainderSeconds = seconds % 60; // % gives us the remainder after taking whole minutes out of our seconds variable
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; // this covers the leading zero in the seconds
    document.title = `Countdown Timer - ${display}`; // shows on the tab too
    timerDisplay.textContent = display;
    console.log(seconds);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`; // takes care of the military time that would be displayed if we didn't do that simple math in there
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})