// ===============================
// GLOBAL STATE
// ===============================
const dll = new DoublyLinkedList();
let currentNode = null;

// ===============================
// INITIALIZE PLAYLIST
// ===============================
function initializePlaylist() {
  // Add songs to DLL
  sampleSongs.forEach(song => dll.add(song));

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
// DLL VIEW TOGGLE
// ===============================
document.getElementById("toggle-dll").onclick = () => {
  document
    .querySelector(".dll-visualization")
    .classList.toggle("hidden");
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
});

// ===============================
// START APP
// ===============================
initializePlaylist();
