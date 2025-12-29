const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

/* Render Playlist */
function renderPlaylist(dll, currentNode) {
  playlistEl.innerHTML = "";
  let node = dll.head;

  while (node) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${node === currentNode ? "▶" : ""}</span>
      <span>${node.song.title}</span>
    `;

    if (node === currentNode) li.classList.add("active");

    li.onclick = () => setCurrentNode(node);
    playlistEl.appendChild(li);
    node = node.next;
  }
}

/* Render DLL Visualization */
function renderDLLVisualization(dll, currentNode) {
  dllNodesEl.innerHTML = "";
  let node = dll.head;

  while (node) {
    const box = document.createElement("div");
    box.className = "dll-node";
    if (node === currentNode) box.classList.add("active");

    box.textContent = node.song.title;
    dllNodesEl.appendChild(box);

    if (node.next) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "⇄";
      dllNodesEl.appendChild(arrow);
    }

    node = node.next;
  }
}

function updateNowPlaying(node) {
  coverImg.src = node.song.cover;
  titleEl.textContent = node.song.title;
  artistEl.textContent = node.song.artist;
}

function updateUI(dll, currentNode) {
  renderPlaylist(dll, currentNode);
  renderDLLVisualization(dll, currentNode);
  updateNowPlaying(currentNode);
}
