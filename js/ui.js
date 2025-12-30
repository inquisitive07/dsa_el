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
    const currentSongNode = node; // Capture in closure
    li.textContent = currentSongNode.song.title;

    if (currentSongNode === current) {
      li.classList.add("active");
      li.prepend(document.createTextNode("▶ "));
      
      // Animate active item if animations are available
      if (window.musicPlayerAnimations) {
        window.musicPlayerAnimations.animatePlaylistItem(li);
      }
    }

    li.onclick = () => {
      if (window.selectNode && typeof window.selectNode === 'function') {
        window.selectNode(currentSongNode);
      }
    };

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
  // Store current scroll position
  const scrollPos = dllNodesEl.scrollLeft;
  
  dllNodesEl.innerHTML = "";

  if (!dll.head) return;

  let node = dll.head;
  let index = 0;

  do {
    // Node box with staggered animation
    const box = document.createElement("div");
    box.className = "dll-node";
    box.textContent = node.song.title;
    box.style.animationDelay = `${index * 0.05}s`;

    if (node === current) {
      box.classList.add("active");
    }

    // Add click handler for node selection
    box.onclick = () => {
      if (window.selectNode && typeof window.selectNode === 'function') {
        window.selectNode(node);
      }
    };

    // Hover effects with micro-interactions
    box.addEventListener('mouseenter', () => {
      box.style.transform = node === current ? 'translateY(-8px) scale(1.15)' : 'translateY(-8px) scale(1.05)';
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = node === current ? 'scale(1.15)' : 'scale(1)';
    });

    dllNodesEl.appendChild(box);

    // Bidirectional arrow with staggered animation
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "⇄";
    arrow.style.animationDelay = `${index * 0.05 + 0.15}s`;
    arrow.title = "Bidirectional link";
    dllNodesEl.appendChild(arrow);

    node = node.next;
    index++;
  } while (node !== dll.head);

  // Circular loop indicator with enhanced styling
  const loopInfo = document.createElement("div");
  loopInfo.className = "circular-arrow";
  loopInfo.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
      <path d="M17 1L21 5L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 11V9C3 6.79 4.79 5 7 5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 23L3 19L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 13V15C21 17.21 19.21 19 17 19H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span style="font-weight: 600; color: var(--accent-primary);">Circular Doubly Linked List</span>
    <br>
    <span style="font-size: 13px; opacity: 0.8;">Tail ⇄ Head connection forms the loop</span>
  `;
  dllNodesEl.appendChild(loopInfo);

  // Restore scroll position smoothly
  setTimeout(() => {
    dllNodesEl.scrollLeft = scrollPos;
  }, 50);

  // Auto-scroll to active node if it's out of view
  setTimeout(() => {
    const activeNode = dllNodesEl.querySelector('.dll-node.active');
    if (activeNode) {
      const containerRect = dllNodesEl.getBoundingClientRect();
      const nodeRect = activeNode.getBoundingClientRect();
      
      // Check if node is outside visible area
      if (nodeRect.left < containerRect.left || nodeRect.right > containerRect.right) {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, 100);
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
