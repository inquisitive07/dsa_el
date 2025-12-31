const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.add('playing');
    // Add success feedback
    playBtn.classList.add('success');
    setTimeout(() => playBtn.classList.remove('success'), 600);
  } else {
    audio.pause();
    playBtn.classList.remove('playing');
  }
};

nextBtn.onclick = () => {
  if (currentNode && currentNode.next) {
    if (window.selectNode && typeof window.selectNode === 'function') {
      window.selectNode(currentNode.next);
    }
  }
};

prevBtn.onclick = () => {
  if (currentNode && currentNode.prev) {
    if (window.selectNode && typeof window.selectNode === 'function') {
      window.selectNode(currentNode.prev);
    }
  }
};

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = format(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = format(audio.currentTime);
  
  // Sync lyrics with current time
  syncLyrics(audio.currentTime);
});

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ===============================
// AUTO-PLAY NEXT SONG
// ===============================
audio.addEventListener("ended", () => {
  // When song finishes, play next song (circular behavior)
  if (currentNode && currentNode.next) {
    if (window.selectNode && typeof window.selectNode === 'function') {
      window.selectNode(currentNode.next);
    }
  }
});

// ===============================
// LYRICS SYNC FUNCTIONALITY
// ===============================
function syncLyrics(currentTime) {
  const lyricLines = document.querySelectorAll('.lyric-line');
  if (lyricLines.length === 0) return;
  
  let activeIndex = -1;
  
  // Find the active lyric line based on current time
  lyricLines.forEach((line, index) => {
    const lineTime = parseFloat(line.dataset.time);
    const nextLine = lyricLines[index + 1];
    const nextTime = nextLine ? parseFloat(nextLine.dataset.time) : Infinity;
    
    // Current time is between this line and the next
    if (currentTime >= lineTime && currentTime < nextTime) {
      activeIndex = index;
    }
  });
  
  // Update active class
  lyricLines.forEach((line, index) => {
    if (index === activeIndex) {
      line.classList.add('active');
      
      // Auto-scroll to keep active line centered
      const container = document.getElementById('lyrics-container');
      if (container) {
        // Use scrollIntoView for more reliable scrolling
        requestAnimationFrame(() => {
          line.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        });
      }
    } else {
      line.classList.remove('active');
    }
  });
}
