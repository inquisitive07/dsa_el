const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

function updateUI(dll, current) {
  playlistEl.innerHTML = "";
  let node = dll.head;

  while (node) {
    const li = document.createElement("li");
    li.textContent = node.song.title;
    if (node === current) li.classList.add("active");
    li.onclick = () => selectNode(node);
    playlistEl.appendChild(li);
    node = node.next;
  }

  // Now playing
  coverImg.style.opacity = 0;
  setTimeout(() => {
    coverImg.src = current.song.cover;
    coverImg.style.opacity = 1;
  }, 200);

  titleEl.textContent = current.song.title;
  artistEl.textContent = current.song.artist;

  // DLL visualization
  dllNodesEl.innerHTML = "";
  node = dll.head;
  while (node) {
    const box = document.createElement("div");
    box.className = "dll-node";
    if (node === current) box.classList.add("active");
    box.innerHTML = `<strong>${node.song.title}</strong>`;
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
