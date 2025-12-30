// ===============================
// UI ELEMENT REFERENCES
// ===============================
const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

// Pointer boxes (HEAD / CURRENT / TAIL)
const pointerBoxes = document.querySelectorAll(".pointer-box");

// ===============================
// PLAYLIST RENDERING (LEFT PANEL)
// ===============================
function renderPlaylist(dll, current) {
  playlistEl.innerHTML = "";

  if (!dll.head) return;

  let node = dll.head;
  let first = true;

  do {
    const li = document.createElement("li");
    li.textContent = node.song.title;

    if (node === current) {
      li.classList.add("active");
      li.prepend(document.createTextNode("▶ "));
      
      // Animate active item if animations are available
      if (window.musicPlayerAnimations) {
        window.musicPlayerAnimations.animatePlaylistItem(li);
      }
    }

    li.onclick = () => selectNode(node);

    playlistEl.appendChild(li);

    node = node.next;
    first = false;
  } while (node !== dll.head);
  
  // Scroll to active song if animations are available
  if (window.musicPlayerAnimations) {
    setTimeout(() => {
      window.musicPlayerAnimations.scrollToActiveSong();
    }, 100);
  }
}

// ===============================
// NOW PLAYING SECTION (CENTER)
// ===============================
function updateNowPlaying(node) {
  // Smooth image transition with fade-out class
  coverImg.classList.add('fade-out');

  setTimeout(() => {
    coverImg.src = node.song.cover;
    titleEl.textContent = node.song.title;
    artistEl.textContent = node.song.artist;
    
    // Trigger fade-in after image loads
    coverImg.classList.remove('fade-out');
    coverImg.classList.add('fade-in');
  }, 250);
}

// ===============================
// POINTER BOXES (HEAD / CURRENT / TAIL)
// ===============================
function updatePointers(dll, current) {
  if (!pointerBoxes || pointerBoxes.length < 3) return;

  pointerBoxes[0].textContent = `HEAD → ${dll.head.song.title}`;
  pointerBoxes[1].textContent = `CURRENT → ${current.song.title}`;
  pointerBoxes[2].textContent = `TAIL → ${dll.tail.song.title}`;
}

// ===============================
// CIRCULAR DLL VISUALIZATION
// ===============================
function renderDLL(dll, current) {
  dllNodesEl.innerHTML = "";

  if (!dll.head) return;

  let node = dll.head;

  do {
    // Node box
    const box = document.createElement("div");
    box.className = "dll-node";
    box.textContent = node.song.title;

    if (node === current) {
      box.classList.add("active");
    }

    dllNodesEl.appendChild(box);

    // Bidirectional arrow
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "⇄";
    dllNodesEl.appendChild(arrow);

    node = node.next;
  } while (node !== dll.head);

  // Circular loop indicator
  const loopInfo = document.createElement("div");
  loopInfo.className = "circular-arrow";
  loopInfo.textContent = "↺ Circular Link: Tail ⇄ Head";
  dllNodesEl.appendChild(loopInfo);
}

// ===============================
// MAIN UI UPDATE FUNCTION
// ===============================
function updateUI(dll, current) {
  renderPlaylist(dll, current);
  renderDLL(dll, current);
  updatePointers(dll, current);
  updateNowPlaying(current);
}

// ===============================
// ADD SONG MODAL
// ===============================
function showAddSongModal(availableSongs) {
  const modal = document.getElementById("add-song-modal");
  const poolList = document.getElementById("song-pool-list");
  
  // Clear previous content
  poolList.innerHTML = "";
  
  // Create song buttons
  availableSongs.forEach(song => {
    const songBtn = document.createElement("button");
    songBtn.className = "action-btn";
    songBtn.style.width = "100%";
    songBtn.style.marginBottom = "8px";
    songBtn.textContent = `${song.title} - ${song.artist}`;
    
    songBtn.onclick = () => {
      addSelectedSong(song);
      modal.classList.add("hidden");
    };
    
    poolList.appendChild(songBtn);
  });
  
  // Show modal
  modal.classList.remove("hidden");
}

// ===============================
// SHUFFLE BUTTON STATE UPDATE
// ===============================
function updateShuffleButton(isOn) {
  const shuffleBtn = document.getElementById("shuffle-btn");
  if (!shuffleBtn) return;
  
  if (isOn) {
    shuffleBtn.style.opacity = "1";
    shuffleBtn.style.transform = "scale(1.1)";
    shuffleBtn.title = "Shuffle ON - Click to turn off";
  } else {
    shuffleBtn.style.opacity = "0.6";
    shuffleBtn.style.transform = "scale(1)";
    shuffleBtn.title = "Shuffle OFF - Click to shuffle";
  }
}
