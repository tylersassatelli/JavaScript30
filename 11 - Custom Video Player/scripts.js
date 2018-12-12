/* Get our elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build out functions */

// toggle playing or pausing video
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // The simple method below works fine as well
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

// toggle play and paused button
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

// add function to skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// add function to playbackRate and volume sliders
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// add function to progressBar to update where you're at in the video
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`;
}

// add the ability to scrub video based on clicking on progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */

// add togglePlay() to video, add updateButton() when video is played or paused
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// listen for timeupdate to run handleProgress()
video.addEventListener('timeupdate', handleProgress);

// add togglePlay() to play/pause button
toggle.addEventListener('click', togglePlay);

// add skip() to either skip button
skipButtons.forEach(button => button.addEventListener('click', skip));

// add handleRangeUpdate() to sliders for playbackRate and volume
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// listen for mousemove, check if mousedown = true, and if it does run scrub(e) 
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);