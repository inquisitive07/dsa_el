const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadAndPlay() {
  audio.src = currentNode.song.src;
  audio.play();
  playBtn.textContent = "⏸";
}

function togglePlay() {
  if (!audio.src) loadAndPlay();
  else if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function playNext() {
  if (currentNode.next) {
    currentNode = currentNode.next;
    loadAndPlay();
    updateUI(playlistDLL, currentNode);
  }
}

function playPrev() {
  if (currentNode.prev) {
    currentNode = currentNode.prev;
    loadAndPlay();
    updateUI(playlistDLL, currentNode);
  }
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = format(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = format(audio.currentTime);
});

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};

playBtn.onclick = togglePlay;
nextBtn.onclick = playNext;
prevBtn.onclick = playPrev;

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
