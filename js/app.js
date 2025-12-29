const playlistDLL = new DoublyLinkedList();
let currentNode = null;

/* Central state change function */
function selectNode(node, autoPlay = true) {
  if (!node) return;

  currentNode = node;

  audio.src = node.song.src;
  audio.load();

  if (autoPlay) {
    audio.play();
    playBtn.textContent = "⏸";
  }

  updateUI(playlistDLL, currentNode);
}

/* Initialize */
function initializePlaylist() {
  sampleSongs.forEach(song => playlistDLL.addToEnd(song));
  selectNode(playlistDLL.head, false);
}

initializePlaylist();

/* Toggle buttons */
document.getElementById("toggle-dll").onclick = () => {
  document.querySelector(".dll-visualization").classList.toggle("hidden");
};

document.getElementById("toggle-theory").onclick = () => {
  document.getElementById("theory-panel").classList.toggle("hidden");
};
