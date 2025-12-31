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
  // Sync lyrics on load
  updateLyrics();
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = format(audio.currentTime);
  
  // Sync lyrics on every time update
  updateLyrics();
});

// Critical: handle seeking/scrubbing
audio.addEventListener("seeked", () => {
  updateLyrics();
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

/**
 * PURE FUNCTION: Calculate active lyric index from current time
 * 
 * WHY THIS IS SEEK-SAFE:
 * - Does NOT store state or increment counters
 * - Recalculates from scratch every call
 * - Works for forward seek, backward seek, and rapid scrubbing
 * 
 * @param {number} currentTime - audio.currentTime in seconds
 * @param {Array} lyrics - array of { time, text } objects
 * @returns {number} index of active lyric, or -1 if none active
 */
function getActiveLyricIndex(currentTime, lyrics) {
  if (!lyrics || lyrics.length === 0) return -1;
  
  let activeIndex = -1;
  
  // Find the LAST lyric whose time <= currentTime
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].time <= currentTime) {
      activeIndex = i;
    } else {
      // Lyrics are sorted by time, so we can stop early
      break;
    }
  }
  
  return activeIndex;
}

// Track last active index to prevent unnecessary scrolling
let lastActiveLyricIndex = -1;

/**
 * Reset lyrics state when song changes
 * Called from ui.js when renderLyrics() is invoked
 */
function resetLyricsState() {
  lastActiveLyricIndex = -1;
}

/**
 * Update lyrics display based on current audio time
 * Called from: timeupdate, seeked, loadedmetadata
 */
function updateLyrics() {
  const lyricLines = document.querySelectorAll('.lyric-line');
  if (lyricLines.length === 0) return;
  
  // Build lyrics array from DOM (with time from data attributes)
  const lyrics = Array.from(lyricLines).map(line => ({
    time: parseFloat(line.dataset.time)
  }));
  
  // Calculate active index from current time (PURE - no state)
  const activeIndex = getActiveLyricIndex(audio.currentTime, lyrics);
  
  // Update DOM: remove all active classes, add to computed index
  lyricLines.forEach((line, index) => {
    if (index === activeIndex) {
      line.classList.add('active');
    } else {
      line.classList.remove('active');
    }
  });
  
  // Scroll ONLY when active lyric chan
    window.lastActiveLyricIndex = activeIndex; // Keep global in syncges (prevents jitter)
  if (activeIndex !== lastActiveLyricIndex) {
    lastActiveLyricIndex = activeIndex;
    
    if (activeIndex >= 0) {
      const activeLine = lyricLines[activeIndex];
      const container = document.getElementById('lyrics-container');
      
      if (container && activeLine) {
        // Use requestAnimationFrame for smooth scrolling
        requestAnimationFrame(() => {
          activeLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        });
      }
    }
  }
}


