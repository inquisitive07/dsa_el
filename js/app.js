const playlistDLL = new DoublyLinkedList();
let currentNode = null;

/* Initialize Playlist */
function initializePlaylist() {
  const stored = loadPlaylist();
  const songs = stored || sampleSongs;

  songs.forEach(song => playlistDLL.addToEnd(song));
  currentNode = playlistDLL.head;

  updateUI(playlistDLL, currentNode);
}

/* Set Current Node */
function setCurrentNode(node) {
  currentNode = node;
  loadAndPlay();
  updateUI(playlistDLL, currentNode);
}

/* Toggle Views */
document.getElementById("toggle-dll").onclick = () => {
  document.querySelector(".dll-visualization").classList.toggle("hidden");
};

document.getElementById("toggle-theory").onclick = () => {
  document.getElementById("theory-panel").classList.toggle("hidden");
};

initializePlaylist();
