// ===============================
// GLOBAL STATE
// ===============================
const dll = new DoublyLinkedList();
let currentNode = null;
let isShuffleOn = false; // Shuffle mode state
let originalOrder = []; // Store original order before shuffle

// ===============================
// INITIALIZE PLAYLIST
// ===============================
function initializePlaylist() {
  // Add first 2 songs to DLL initially
  sampleSongs.slice(0, 2).forEach(song => dll.add(song));

  // Set first song as current
  currentNode = dll.head;

  // Load first song (do NOT autoplay)
  audio.src = currentNode.song.src;
  audio.load();

  // Initial UI render
  updateUI(dll, currentNode);
}

// ===============================
// CENTRAL NODE SELECTION FUNCTION
// (single source of truth)
// ===============================
function selectNode(node) {
  if (!node) return;

  currentNode = node;

  audio.src = node.song.src;
  audio.load();
  audio.play();

  playBtn.textContent = "⏸";
  updateUI(dll, currentNode);
}

// ===============================
// NAVIGATION CONTROLS
// ===============================
nextBtn.onclick = () => {
  selectNode(currentNode.next);
};

prevBtn.onclick = () => {
  selectNode(currentNode.prev);
};

// ===============================
// DELETE CURRENT SONG
// ===============================
function deleteSong() {
  if (!currentNode) return;
  
  // Create particles at delete button
  const deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn && window.microInteractions) {
    const rect = deleteBtn.getBoundingClientRect();
    window.microInteractions.createParticles(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      12
    );
  }
  
  // Get the current playlist item for animation
  const activeItem = document.querySelector('#playlist li.active');
  
  // Get safe next node before deletion
  const safeNext = dll.delete(currentNode);
  
  // Update current pointer
  currentNode = safeNext;
  
  // If list is empty, stop audio
  if (!currentNode) {
    audio.pause();
    audio.src = "";
    playBtn.textContent = "▶";
  } else {
    // Load and play the safe next song
    audio.src = currentNode.song.src;
    audio.load();
    audio.play();
    playBtn.textContent = "⏸";
  }
  
  // Animate removal then update UI
  if (activeItem && window.microInteractions) {
    window.microInteractions.animateRemoveItem(activeItem, () => {
      updateUI(dll, currentNode);
    });
  } else {
    updateUI(dll, currentNode);
  }
}

// ===============================
// ADD SONG FROM POOL
// ===============================
function addSongFromPool() {
  // Get currently added songs
  const currentSongs = dll.toArray();
  const currentTitles = currentSongs.map(s => s.title);
  
  // Find songs not yet added
  const availableSongs = sampleSongs.filter(s => !currentTitles.includes(s.title));
  
  if (availableSongs.length === 0) {
    alert("All songs from the pool have been added!");
    return;
  }
  
  // Show selection modal (will create modal in UI)
  showAddSongModal(availableSongs);
}

// Called from UI when a song is selected
function addSelectedSong(song) {
  dll.add(song);
  
  // Trigger success feedback on add button
  const addBtn = document.getElementById('add-song-btn');
  if (addBtn && window.microInteractions) {
    window.microInteractions.triggerSuccess(addBtn);
  }
  
  updateUI(dll, currentNode);
  
  // Scroll to newly added song
  setTimeout(() => {
    if (window.microInteractions) {
      window.microInteractions.scrollToActive();
    }
  }, 100);
}

// ===============================
// SHUFFLE FUNCTIONALITY
// ===============================
function toggleShuffle() {
  isShuffleOn = !isShuffleOn;
  
  if (isShuffleOn) {
    // Save current song to preserve it
    const currentSongTitle = currentNode ? currentNode.song.title : null;
    
    // Save original order
    originalOrder = dll.toArray();
    
    // Convert to array, shuffle, rebuild
    const songs = dll.toArray();
    const shuffled = fisherYatesShuffle(songs);
    dll.fromArray(shuffled);
    
    // Find and set current node to the same song
    if (currentSongTitle) {
      let node = dll.head;
      do {
        if (node.song.title === currentSongTitle) {
          currentNode = node;
          break;
        }
        node = node.next;
      } while (node !== dll.head);
    } else {
      currentNode = dll.head;
    }
  } else {
    // Restore original order
    const currentSongTitle = currentNode ? currentNode.song.title : null;
    
    dll.fromArray(originalOrder);
    
    // Find and set current node
    if (currentSongTitle) {
      let node = dll.head;
      do {
        if (node.song.title === currentSongTitle) {
          currentNode = node;
          break;
        }
        node = node.next;
      } while (node !== dll.head);
    } else {
      currentNode = dll.head;
    }
  }
  
  // Update UI with shuffle state
  updateUI(dll, currentNode);
  updateShuffleButton(isShuffleOn);
}

// Fisher-Yates shuffle algorithm
function fisherYatesShuffle(array) {
  const arr = [...array]; // Create a copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// ===============================
// DLL VIEW TOGGLE
// ===============================
document.getElementById("toggle-dll").onclick = () => {
  const dllSection = document.querySelector(".dll-visualization");
  const toggleBtn = document.getElementById("toggle-dll");
  
  // Toggle visibility
  dllSection.classList.toggle("hidden");
  
  // Toggle active state on button
  toggleBtn.classList.toggle("active");
  
  // Update button text
  if (dllSection.classList.contains("hidden")) {
    toggleBtn.textContent = "Doubly Linked List View";
  } else {
    toggleBtn.textContent = "Hide Doubly Linked List";
  }
};

// ===============================
// THEORY MODAL (SAFE + STABLE)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const theoryBtn = document.getElementById("toggle-theory");
  const theoryModal = document.getElementById("theory-modal");
  const closeTheory = document.getElementById("close-theory");

  // Safety check (prevents crashes)
  if (!theoryBtn || !theoryModal || !closeTheory) {
    console.warn("Theory modal elements not found");
    return;
  }

  // Open modal
  theoryBtn.onclick = () => {
    theoryModal.classList.remove("hidden");
  };

  // Close modal (X button)
  closeTheory.onclick = () => {
    theoryModal.classList.add("hidden");
  };

  // Close modal when clicking outside content
  theoryModal.addEventListener("click", (e) => {
    if (e.target === theoryModal) {
      theoryModal.classList.add("hidden");
    }
  });
  
  // ===============================
  // ADD SONG MODAL HANDLERS
  // ===============================
  const addSongBtn = document.getElementById("add-song-btn");
  const addSongModal = document.getElementById("add-song-modal");
  const closeAddModal = document.getElementById("close-add-modal");
  
  if (addSongBtn) {
    addSongBtn.onclick = () => addSongFromPool();
  }
  
  if (closeAddModal) {
    closeAddModal.onclick = () => {
      addSongModal.classList.add("hidden");
    };
  }
  
  if (addSongModal) {
    addSongModal.addEventListener("click", (e) => {
      if (e.target === addSongModal) {
        addSongModal.classList.add("hidden");
      }
    });
  }
  
  // ===============================
  // SHUFFLE BUTTON HANDLER
  // ===============================
  const shuffleBtn = document.getElementById("shuffle-btn");
  if (shuffleBtn) {
    shuffleBtn.onclick = () => toggleShuffle();
    // Initialize shuffle button state
    updateShuffleButton(false);
  }
  
  // ===============================
  // DELETE BUTTON HANDLER
  // ===============================
  const deleteBtn = document.getElementById("delete-btn");
  const deleteModal = document.getElementById("delete-modal");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const deleteSongName = document.getElementById("delete-song-name");
  
  if (deleteBtn && deleteModal) {
    deleteBtn.onclick = () => {
      // Show modal with current song name
      const songTitle = currentNode ? currentNode.song.title : 'this song';
      deleteSongName.textContent = `Are you sure you want to delete "${songTitle}" from the playlist?`;
      deleteModal.classList.remove("hidden");
    };
    
    // Cancel button
    if (cancelDeleteBtn) {
      cancelDeleteBtn.onclick = () => {
        deleteModal.classList.add("hidden");
      };
    }
    
    // Confirm delete button
    if (confirmDeleteBtn) {
      confirmDeleteBtn.onclick = () => {
        const songTitle = currentNode ? currentNode.song.title : 'Song';
        deleteSong();
        deleteModal.classList.add("hidden");
        // Show "Song Deleted" popup notification
        showDeletedNotification(songTitle);
      };
    }
  }
});

// ===============================
// SONG DELETED NOTIFICATION
// ===============================
function showDeletedNotification(songTitle) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'deleted-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">✓</span>
      <span class="notification-text">Song Deleted</span>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after 2.5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// ===============================
// START APP
// ===============================
initializePlaylist();
