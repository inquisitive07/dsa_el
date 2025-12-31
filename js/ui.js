// ===============================
// UI ELEMENT REFERENCES
// ===============================
const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

// Lyrics elements
const lyricsContainer = document.getElementById("lyrics-container");

// Pointer boxes (HEAD / CURRENT / TAIL)
const pointerBoxes = document.querySelectorAll(".pointer-box");

// ===============================
// STATE TRACKING FOR HEAD/TAIL
// Track which songs HEAD and TAIL point to
// Only update labels when these change
// ===============================
let lastHeadSongTitle = null;
let lastTailSongTitle = null;

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
    
    // Update lyrics for new song
    renderLyrics(node.song);
  }, 250);
}

// ===============================
// LYRICS RENDERING
// ===============================
function renderLyrics(song) {
  lyricsContainer.innerHTML = "";
  
  // Check if lyrics exist
  if (!song.lyrics || song.lyrics.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.className = "lyrics-placeholder";
    placeholder.textContent = "Lyrics not available";
    lyricsContainer.appendChild(placeholder);
    return;
  }
  
  // Render each lyric line
  song.lyrics.forEach((lyric, index) => {
    const line = document.createElement("div");
    line.className = "lyric-line";
    line.textContent = lyric.text;
    line.dataset.time = lyric.time;
    line.dataset.index = index;
    lyricsContainer.appendChild(line);
  });
  
  // Reset scroll position and active index tracker
  lyricsContainer.scrollTop = 0;
  
  // Reset the active lyric tracker when song changes
  if (typeof resetLyricsState === 'function') {
    resetLyricsState();
  }
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

  if (!dll.head) {
    // Hide labels when list is empty
    updateHeadTailLabels(null, null);
    return;
  }

  let node = dll.head;
  let index = 0;
  let headNode = null;
  let tailNode = null;

  do {
    // Node box with staggered animation
    const box = document.createElement("div");
    box.className = "dll-node";
    box.textContent = node.song.title;
    box.style.animationDelay = `${index * 0.05}s`;
    
    // Mark HEAD node (first node)
    if (node === dll.head) {
      box.setAttribute('data-is-head', 'true');
      headNode = box;
    }
    
    // Mark TAIL node (last node)
    if (node === dll.tail) {
      box.setAttribute('data-is-tail', 'true');
      tailNode = box;
    }

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
  
  // CRITICAL: Always update HEAD and TAIL labels when renderDLL is called
  // Reason: renderDLL clears and recreates ALL DOM elements (innerHTML = "")
  // Even if dll.head/dll.tail point to the same songs, the DOM elements are NEW
  // We must reattach labels to the new DOM elements to avoid stale references
  // Track song titles to detect structural changes (used elsewhere for optimization)
  lastHeadSongTitle = dll.head ? dll.head.song.title : null;
  lastTailSongTitle = dll.tail ? dll.tail.song.title : null;
  
  // Always update labels because DOM was recreated
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateHeadTailLabels(headNode, tailNode);
    });
  });

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
// UPDATE HEAD AND TAIL LABELS
// Position labels above their respective nodes
// Handles both multi-node and single-node cases
// ===============================
function updateHeadTailLabels(headNodeEl, tailNodeEl) {
  const headLabel = document.getElementById('head-label');
  const tailLabel = document.getElementById('tail-label');
  
  if (!headLabel || !tailLabel) return;
  
  // Hide labels if nodes don't exist
  if (!headNodeEl || !tailNodeEl) {
    headLabel.classList.remove('visible');
    tailLabel.classList.remove('visible');
    return;
  }
  
  // Get the dll-nodes container for positioning reference
  const container = dllNodesEl;
  const containerRect = container.getBoundingClientRect();
  
  // Get node rectangles
  const headRect = headNodeEl.getBoundingClientRect();
  const tailRect = tailNodeEl.getBoundingClientRect();
  
  // Check if HEAD and TAIL are the same node (single node in list)
  const isSingleNode = (headNodeEl === tailNodeEl);
  
  if (isSingleNode) {
    // SINGLE NODE: Position HEAD above-left and TAIL above-right to avoid overlap
    const nodeCenter = headRect.left - containerRect.left + container.scrollLeft + (headRect.width / 2);
    const labelSpacing = 8; // Gap between labels
    
    // Reset any custom positioning from multi-node mode
    headLabel.style.top = '-45px';
    tailLabel.style.top = '-45px';
    
    // Position HEAD label to the left of center
    const headLabelLeft = nodeCenter - headLabel.offsetWidth - labelSpacing;
    headLabel.style.left = `${headLabelLeft}px`;
    headLabel.classList.add('visible');
    
    // Position TAIL label to the right of center
    const tailLabelLeft = nodeCenter + labelSpacing;
    tailLabel.style.left = `${tailLabelLeft}px`;
    tailLabel.classList.add('visible');
    
  } else {
    // MULTIPLE NODES: Position each label centered above its respective node
    
    // Reset any custom positioning
    headLabel.style.top = '-45px';
    tailLabel.style.top = '-45px';
    
    // Position HEAD label centered above head node
    const headLabelLeft = headRect.left - containerRect.left + container.scrollLeft + (headRect.width / 2) - (headLabel.offsetWidth / 2);
    headLabel.style.left = `${headLabelLeft}px`;
    headLabel.classList.add('visible');
    
    // Position TAIL label centered above tail node
    const tailLabelLeft = tailRect.left - containerRect.left + container.scrollLeft + (tailRect.width / 2) - (tailLabel.offsetWidth / 2);
    tailLabel.style.left = `${tailLabelLeft}px`;
    tailLabel.classList.add('visible');
  }
}

// Make updateHeadTailLabels globally accessible for use in app.js toggle handler
window.updateHeadTailLabels = updateHeadTailLabels;

// ===============================
// FORCE UPDATE DLL LABELS
// Forces HEAD/TAIL label repositioning regardless of state
// Used when visualization is first shown or after manual changes
// ===============================
function forceUpdateDLLLabels() {
  const headNode = dllNodesEl.querySelector('[data-is-head="true"]');
  const tailNode = dllNodesEl.querySelector('[data-is-tail="true"]');
  
  if (headNode && tailNode) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateHeadTailLabels(headNode, tailNode);
      });
    });
  }
}

// Make forceUpdateDLLLabels globally accessible
window.forceUpdateDLLLabels = forceUpdateDLLLabels;

// ===============================
// UPDATE ACTIVE NODE (TRAVERSAL ONLY)
// Updates which node is highlighted as current without re-rendering the DLL
// Used during next/prev navigation to avoid moving HEAD/TAIL labels
// ===============================
function updateActiveNode(dll, current) {
  // Update active class on DLL nodes without re-rendering
  const allDllNodes = dllNodesEl.querySelectorAll('.dll-node');
  
  if (!dll.head || !current) return;
  
  // Find which index the current node is at
  let targetIndex = 0;
  let node = dll.head;
  let found = false;
  
  do {
    if (node === current) {
      found = true;
      break;
    }
    targetIndex++;
    node = node.next;
  } while (node !== dll.head);
  
  // Update active class on corresponding DOM element
  if (found && allDllNodes[targetIndex]) {
    // Remove active from all nodes
    allDllNodes.forEach(el => {
      el.classList.remove('active');
      el.style.transform = 'scale(1)';
    });
    
    // Add active to current node
    allDllNodes[targetIndex].classList.add('active');
    allDllNodes[targetIndex].style.transform = 'scale(1.15)';
    
    // Auto-scroll to active node
    setTimeout(() => {
      const activeNode = allDllNodes[targetIndex];
      if (activeNode) {
        const containerRect = dllNodesEl.getBoundingClientRect();
        const nodeRect = activeNode.getBoundingClientRect();
        
        if (nodeRect.left < containerRect.left || nodeRect.right > containerRect.right) {
          activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }, 50);
  }
}

// ===============================
// MAIN UI UPDATE FUNCTIONS
// Separated into structural changes vs traversal changes
// ===============================

// UPDATE UI - STRUCTURAL CHANGES (add/delete/shuffle)
// Re-renders entire DLL and updates HEAD/TAIL labels
function updateUIStructure(dll, current) {
  renderPlaylist(dll, current);
  renderDLL(dll, current);  // Full re-render, updates HEAD/TAIL
  updatePointers(dll, current);
  updateNowPlaying(current);
}

// UPDATE UI - TRAVERSAL ONLY (next/prev navigation)
// Updates active highlight without moving HEAD/TAIL labels
function updateUITraversal(dll, current) {
  renderPlaylist(dll, current);
  updateActiveNode(dll, current);  // Only update active class, HEAD/TAIL stay fixed
  updatePointers(dll, current);
  updateNowPlaying(current);
}

// Legacy function for backward compatibility
// By default, use structure update (safest)
function updateUI(dll, current) {
  updateUIStructure(dll, current);
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
// ===============================
// SCROLL EVENT LISTENER FOR LABELS
// Update label positions when scrolling DLL visualization
// ===============================
if (dllNodesEl) {
  dllNodesEl.addEventListener('scroll', () => {
    const headNode = dllNodesEl.querySelector('[data-is-head="true"]');
    const tailNode = dllNodesEl.querySelector('[data-is-tail="true"]');
    
    if (headNode && tailNode) {
      updateHeadTailLabels(headNode, tailNode);
    }
  });
  
  // Also update labels on window resize to handle layout changes
  window.addEventListener('resize', () => {
    const headNode = dllNodesEl.querySelector('[data-is-head="true"]');
    const tailNode = dllNodesEl.querySelector('[data-is-tail="true"]');
    
    if (headNode && tailNode) {
      // Use requestAnimationFrame to wait for layout to settle
      requestAnimationFrame(() => {
        updateHeadTailLabels(headNode, tailNode);
      });
    }
  });
}