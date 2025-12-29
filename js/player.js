const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

/* Play / Pause */
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

/* Next */
nextBtn.onclick = () => {
  if (currentNode.next) {
    selectNode(currentNode.next);
  }
};

/* Previous */
prevBtn.onclick = () => {
  if (currentNode.prev) {
    selectNode(currentNode.prev);
  }
};

/* Duration */
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = format(audio.duration);
});

/* Progress */
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = format(audio.currentTime);
});

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
