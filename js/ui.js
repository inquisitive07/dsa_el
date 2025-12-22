/* ======================================
   UI Rendering & Visualization
====================================== */

const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

/* -------- Render Playlist List -------- */
function renderPlaylist(dll, currentNode) {
  playlistEl.innerHTML = "";

  let node = dll.head;
  while (node) {
    const li = document.createElement("li");

    li.textContent = `${node.song.title} – ${node.song.artist}`;

    if (node === currentNode) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      setCurrentNode(node);
    });

    playlistEl.appendChild(li);
    node = node.next;
  }
}

/* -------- Render DLL Visualization -------- */
function renderDLLVisualization(dll, currentNode) {
  dllNodesEl.innerHTML = "";

  let node = dll.head;
  while (node) {
    const nodeDiv = document.createElement("div");
    nodeDiv.classList.add("dll-node");

    if (node === currentNode) {
      nodeDiv.classList.add("active");
    }

    nodeDiv.innerHTML = `
      <div class="node-content">
        <strong>${node.song.title}</strong>
        <small>${node.song.artist}</small>
      </div>
    `;

    dllNodesEl.appendChild(nodeDiv);

    if (node.next) {
      const arrow = document.createElement("span");
      arrow.classList.add("arrow");
      arrow.textContent = "→";
      dllNodesEl.appendChild(arrow);
    }

    node = node.next;
  }
}

/* -------- Update Now Playing Info -------- */
function updateNowPlaying(node) {
  if (!node) return;

  titleEl.textContent = node.song.title;
  artistEl.textContent = node.song.artist;
  coverImg.src = node.song.cover;
}

/* -------- Central UI Update -------- */
function updateUI(dll, currentNode) {
  renderPlaylist(dll, currentNode);
  renderDLLVisualization(dll, currentNode);
  updateNowPlaying(currentNode);
}
