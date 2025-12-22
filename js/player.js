/* ======================================
   Audio Player Logic
====================================== */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");

let isPlaying = false;

/* -------- Play Current Song -------- */
function playCurrentSong() {
  if (!currentNode) return;

  audio.src = currentNode.song.src;
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

/* -------- Toggle Play / Pause -------- */
function togglePlay() {
  if (!currentNode) return;

  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }

  isPlaying = !isPlaying;
}

/* -------- Play Next Song -------- */
function playNext() {
  if (!currentNode || !currentNode.next) return;

  currentNode = currentNode.next;
  playCurrentSong();
  updateUI(playlistDLL, currentNode);
}

/* -------- Play Previous Song -------- */
function playPrevious() {
  if (!currentNode || !currentNode.prev) return;

  currentNode = currentNode.prev;
  playCurrentSong();
  updateUI(playlistDLL, currentNode);
}

/* -------- Update Progress Bar -------- */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

/* -------- Seek Audio -------- */
progressBar.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* -------- Auto Play Next on End -------- */
audio.addEventListener("ended", () => {
  if (currentNode && currentNode.next) {
    playNext();
  } else {
    isPlaying = false;
    playBtn.textContent = "▶";
  }
});

/* -------- Button Event Listeners -------- */
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrevious);
