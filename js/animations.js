// ============================================
// MODERN MUSIC PLAYER - INTERACTIVE ANIMATIONS
// ============================================

// DOM elements
const coverElement = document.querySelector('.cover');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressWrapper = document.querySelector('.progress-wrapper');
const playlistItems = document.querySelectorAll('#playlist li');

// ========== PRIORITY 1: ALBUM ART ROTATION ========== 
function startAlbumRotation() {
  if (coverElement) {
    coverElement.classList.add('playing');
  }
}

function stopAlbumRotation() {
  if (coverElement) {
    coverElement.classList.remove('playing');
  }
}

// ========== PRIORITY 2: PLAY BUTTON ANIMATION ========== 
function updatePlayButtonState() {
  const audio = document.getElementById('audio');
  if (audio.paused) {
    playBtn.classList.add('paused');
    stopAlbumRotation();
  } else {
    playBtn.classList.remove('paused');
    startAlbumRotation();
  }
}

// ========== PRIORITY 3: RIPPLE EFFECT FOR BUTTONS ========== 
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    top: ${y}px;
    left: ${x}px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
  `;

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== PRIORITY 4: PROGRESS BAR TOOLTIP ========== 
function createProgressTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = 'progress-tooltip';
  tooltip.textContent = '0:00';
  progressWrapper.appendChild(tooltip);
  return tooltip;
}

function updateProgressTooltip(event, tooltip) {
  const audio = document.getElementById('audio');
  if (!audio.duration) return;

  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const time = percent * audio.duration;
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  tooltip.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const tooltipX = Math.max(0, Math.min(100, percent * 100));
  tooltip.style.left = `${tooltipX}%`;
}

// ========== PRIORITY 5: PLAYLIST ITEM ANIMATION ========== 
function animatePlaylistItem(item) {
  // Add pulse effect to active item
  item.style.animation = 'none';
  setTimeout(() => {
    item.style.animation = 'itemPulse 0.4s ease-out';
  }, 10);
}

// Add playlist animation CSS
const playlistStyle = document.createElement('style');
playlistStyle.textContent = `
  @keyframes itemPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1.02); }
  }
`;
document.head.appendChild(playlistStyle);

// ========== PRIORITY 6: IMAGE LOADING STATES ========== 
function setupImageLoading() {
  const coverImg = document.querySelector('.cover img');
  if (!coverImg) return;

  // Add loading class initially
  coverImg.classList.add('loading');

  // Remove loading class when image loads
  coverImg.addEventListener('load', () => {
    coverImg.classList.remove('loading');
  });

  // Also remove on error
  coverImg.addEventListener('error', () => {
    coverImg.classList.remove('loading');
  });
}

// ========== PRIORITY 7: SMOOTH SCROLL FOR ACTIVE SONG ========== 
function scrollToActiveSong() {
  const activeItem = document.querySelector('#playlist li.active');
  const playlistContainer = document.querySelector('#playlist');
  
  if (activeItem && playlistContainer) {
    const itemTop = activeItem.offsetTop;
    const containerHeight = playlistContainer.clientHeight;
    const scrollPosition = itemTop - (containerHeight / 2) + (activeItem.clientHeight / 2);
    
    playlistContainer.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
}

// ========== PRIORITY 8: VOLUME CONTROL (OPTIONAL) ========== 
function createVolumeControl() {
  const controls = document.querySelector('.controls');
  const audio = document.getElementById('audio');
  
  // Create volume container
  const volumeContainer = document.createElement('div');
  volumeContainer.className = 'volume-control';
  volumeContainer.innerHTML = `
    <button id="volume-btn" class="volume-btn" title="Volume">
      <span class="material-icons">🔊</span>
    </button>
    <input type="range" id="volume-slider" min="0" max="100" value="100" class="volume-slider">
  `;
  
  // Insert after controls
  controls.parentNode.insertBefore(volumeContainer, controls.nextSibling);
  
  const volumeBtn = document.getElementById('volume-btn');
  const volumeSlider = document.getElementById('volume-slider');
  
  // Volume control styling
  const volumeStyle = document.createElement('style');
  volumeStyle.textContent = `
    .volume-control {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px 0;
      gap: 12px;
    }
    
    .volume-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: var(--blue-accent);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: all 0.3s ease;
    }
    
    .volume-btn:hover {
      background: var(--accent-primary);
      transform: scale(1.1);
    }
    
    .volume-slider {
      width: 120px;
      height: 4px;
      -webkit-appearance: none;
      appearance: none;
      background: #E5D9C6;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
    }
    
    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-primary);
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(240, 107, 4, 0.3);
      transition: all 0.2s ease;
    }
    
    .volume-slider::-webkit-slider-thumb:hover {
      transform: scale(1.3);
      box-shadow: 0 3px 8px rgba(240, 107, 4, 0.5);
    }
    
    .volume-slider::-moz-range-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-primary);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(240, 107, 4, 0.3);
    }
  `;
  document.head.appendChild(volumeStyle);
  
  // Volume functionality
  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    updateVolumeIcon(audio.volume);
  });
  
  volumeBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
      audio.dataset.prevVolume = audio.volume;
      audio.volume = 0;
      volumeSlider.value = 0;
    } else {
      audio.volume = audio.dataset.prevVolume || 1;
      volumeSlider.value = audio.volume * 100;
    }
    updateVolumeIcon(audio.volume);
  });
  
  function updateVolumeIcon(volume) {
    if (volume === 0) {
      volumeBtn.innerHTML = '<span>🔇</span>';
    } else if (volume < 0.5) {
      volumeBtn.innerHTML = '<span>🔉</span>';
    } else {
      volumeBtn.innerHTML = '<span>🔊</span>';
    }
  }
}

// ========== PRIORITY 9: SEARCH FUNCTIONALITY (OPTIONAL) ========== 
function createSearchBox() {
  const sidebar = document.querySelector('.playlist-sidebar');
  const addSongBtn = document.getElementById('add-song-btn');
  
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <input type="text" id="search-input" placeholder="🔍 Search songs..." class="search-input">
  `;
  
  // Insert after add-song button
  addSongBtn.parentNode.insertBefore(searchContainer, addSongBtn.nextSibling);
  
  // Search styling
  const searchStyle = document.createElement('style');
  searchStyle.textContent = `
    .search-container {
      margin-bottom: 16px;
    }
    
    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #E5D9C6;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      outline: none;
      transition: all 0.3s ease;
      background: white;
    }
    
    .search-input:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(240, 107, 4, 0.1);
    }
    
    .search-input::placeholder {
      color: #999;
    }
  `;
  document.head.appendChild(searchStyle);
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const playlistItems = document.querySelectorAll('#playlist li');
    
    playlistItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.3s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
  
  // Fade in animation
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(fadeStyle);
}

// ========== INITIALIZATION ========== 
function initializeAnimations() {
  // Setup image loading states
  setupImageLoading();
  
  // Create progress tooltip
  const tooltip = createProgressTooltip();
  
  // Progress bar tooltip events
  progressBar.addEventListener('mousemove', (e) => updateProgressTooltip(e, tooltip));
  progressBar.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
  progressBar.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  
  // Play button state tracking
  const audio = document.getElementById('audio');
  audio.addEventListener('play', updatePlayButtonState);
  audio.addEventListener('pause', updatePlayButtonState);
  
  // Add ripple to all buttons
  document.querySelectorAll('.controls button, .action-btn, .danger-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });
  
  // Optional: Create volume control
  // Uncomment to enable:
  // createVolumeControl();
  
  // Optional: Create search box
  // Uncomment to enable:
  // createSearchBox();
  
  console.log('✨ Modern animations initialized!');
}

// ========== EXPORT FUNCTIONS FOR USE IN OTHER MODULES ========== 
window.musicPlayerAnimations = {
  startAlbumRotation,
  stopAlbumRotation,
  updatePlayButtonState,
  animatePlaylistItem,
  scrollToActiveSong,
  createVolumeControl,
  createSearchBox
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
  initializeAnimations();
}
