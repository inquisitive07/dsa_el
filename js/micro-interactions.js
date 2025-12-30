// ============================================
// PREMIUM MICRO-INTERACTIONS
// Production-Ready Animation System
// ============================================

class MicroInteractions {
  constructor() {
    this.audio = document.getElementById('audio');
    this.cover = document.querySelector('.cover');
    this.coverImg = document.querySelector('.cover img');
    this.playBtn = document.getElementById('play-btn');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.deleteBtn = document.getElementById('delete-btn');
    this.progressBar = document.getElementById('progress-bar');
    this.progressWrapper = document.querySelector('.progress-wrapper');
    this.playlist = document.getElementById('playlist');
    this.dllNodes = document.getElementById('dll-nodes');
    
    this.currentRotation = 0;
    this.isPlaying = false;
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    this.setupAlbumArt();
    this.setupPlayButton();
    this.setupPlaylistInteractions();
    this.setupProgressBar();
    this.setupButtonEffects();
    this.setupScrollAnimations();
    this.setupImageLoading();
    this.setupDLLAnimations();
  }

  // ========== ALBUM ART - VINYL RECORD WITH SMOOTH ROTATION ========== 
  setupAlbumArt() {
    if (!this.cover || !this.audio) return;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.cover.classList.remove('paused');
      this.cover.classList.add('playing');
      this.startRotation();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.cover.classList.remove('playing');
      this.smoothStopRotation();
    });

    // Prevent drag on album art
    if (this.coverImg) {
      this.coverImg.addEventListener('dragstart', (e) => e.preventDefault());
    }
  }

  startRotation() {
    if (this.animationFrame) return;
    
    const rotate = () => {
      if (!this.isPlaying) return;
      
      this.currentRotation = (this.currentRotation + 0.5) % 360;
      if (this.coverImg) {
        this.coverImg.style.transform = `rotate(${this.currentRotation}deg)`;
      }
      
      this.animationFrame = requestAnimationFrame(rotate);
    };
    
    rotate();
  }

  smoothStopRotation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    // Calculate stop position (round to nearest 90 degrees)
    const targetRotation = Math.round(this.currentRotation / 90) * 90;
    
    if (this.coverImg) {
      this.coverImg.style.setProperty('--stop-angle', `${targetRotation}deg`);
      this.cover.classList.add('paused');
      
      setTimeout(() => {
        this.currentRotation = targetRotation;
      }, 1200);
    }
  }

  // ========== PLAY BUTTON - MORPHING & BREATHING ========== 
  setupPlayButton() {
    if (!this.playBtn || !this.audio) return;

    this.audio.addEventListener('play', () => {
      this.playBtn.classList.add('playing');
      this.playBtn.innerHTML = '<span style="font-size: 24px;">⏸</span>';
      this.triggerSuccess(this.playBtn);
    });

    this.audio.addEventListener('pause', () => {
      this.playBtn.classList.remove('playing');
      this.playBtn.innerHTML = '<span style="font-size: 24px;">▶</span>';
    });
  }

  // ========== PLAYLIST - RIPPLE & ANIMATIONS ========== 
  setupPlaylistInteractions() {
    if (!this.playlist) return;

    // Delegate click events
    this.playlist.addEventListener('click', (e) => {
      const item = e.target.closest('li');
      if (!item) return;

      this.createRipple(e, item);
      this.animateSelection(item);
    });

    // Observe for new items
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'LI') {
            this.animateNewItem(node);
          }
        });
      });
    });

    observer.observe(this.playlist, { childList: true });
  }

  createRipple(event, element) {
    element.classList.add('ripple');
    setTimeout(() => element.classList.remove('ripple'), 600);
  }

  animateSelection(item) {
    // Remove selecting class from all items
    const items = this.playlist.querySelectorAll('li');
    items.forEach(i => i.classList.remove('selecting'));
    
    // Add selecting animation
    item.classList.add('selecting');
    setTimeout(() => item.classList.remove('selecting'), 400);
  }

  animateNewItem(item) {
    item.classList.add('new-item');
    setTimeout(() => item.classList.remove('new-item'), 400);
  }

  animateRemoveItem(item, callback) {
    item.classList.add('removing');
    setTimeout(() => {
      if (callback) callback();
    }, 400);
  }

  // ========== PROGRESS BAR - TOOLTIP & SEEKING ========== 
  setupProgressBar() {
    if (!this.progressBar || !this.progressWrapper) return;

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'progress-tooltip';
    tooltip.textContent = '0:00';
    this.progressWrapper.appendChild(tooltip);

    this.progressBar.addEventListener('mousemove', (e) => {
      this.updateProgressTooltip(e, tooltip);
    });

    this.progressBar.addEventListener('mousedown', () => {
      this.progressBar.classList.add('seeking');
    });

    this.progressBar.addEventListener('mouseup', () => {
      this.progressBar.classList.remove('seeking');
    });

    // Buffering simulation
    if (this.audio) {
      this.audio.addEventListener('waiting', () => {
        this.progressBar.classList.add('buffering');
      });

      this.audio.addEventListener('canplay', () => {
        this.progressBar.classList.remove('buffering');
      });
    }
  }

  updateProgressTooltip(event, tooltip) {
    if (!this.audio || !this.audio.duration) return;

    const rect = this.progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const time = percent * this.audio.duration;
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    tooltip.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    tooltip.style.left = `${percent * 100}%`;
  }

  // ========== BUTTON EFFECTS - PRESS, ROTATION, FEEDBACK ========== 
  setupButtonEffects() {
    // Shuffle button rotation
    if (this.shuffleBtn) {
      this.shuffleBtn.addEventListener('click', () => {
        this.shuffleBtn.classList.toggle('active');
      });
    }

    // Add ripple to all buttons
    const buttons = document.querySelectorAll('.controls button, .action-btn, .danger-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => this.createButtonRipple(e));
    });
  }

  createButtonRipple(event) {
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
      animation: rippleEffect 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 10;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Success/Error feedback
  triggerSuccess(element) {
    element.classList.add('success');
    setTimeout(() => element.classList.remove('success'), 500);
  }

  triggerError(element) {
    element.classList.add('error');
    setTimeout(() => element.classList.remove('error'), 400);
  }

  // ========== SCROLL ANIMATIONS - INTERSECTION OBSERVER ========== 
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe DLL visualization
    if (this.dllNodes) {
      this.dllNodes.parentElement.classList.add('scroll-reveal');
      observer.observe(this.dllNodes.parentElement);
    }
  }

  // ========== IMAGE LOADING STATES ========== 
  setupImageLoading() {
    if (!this.coverImg) return;

    this.coverImg.addEventListener('loadstart', () => {
      this.coverImg.classList.add('loading');
    });

    this.coverImg.addEventListener('load', () => {
      this.coverImg.classList.remove('loading');
    });

    this.coverImg.addEventListener('error', () => {
      this.coverImg.classList.remove('loading');
      this.coverImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect fill="%23ddd" width="240" height="240"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="20">No Image</text></svg>';
    });
  }

  // ========== DLL VISUALIZATION ANIMATIONS ========== 
  setupDLLAnimations() {
    if (!this.dllNodes) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('dll-node')) {
            this.animateDLLNode(node, 'add');
          }
        });
      });
    });

    observer.observe(this.dllNodes, { childList: true });
  }

  animateDLLNode(node, action) {
    if (action === 'add') {
      node.classList.add('new');
      setTimeout(() => node.classList.remove('new'), 500);
    }
  }

  animateArrow(arrow) {
    arrow.classList.add('active');
    setTimeout(() => arrow.classList.remove('active'), 600);
  }

  animatePointerTraversal(fromNode, toNode) {
    // Highlight path between nodes
    const arrows = this.dllNodes.querySelectorAll('.arrow');
    arrows.forEach((arrow, index) => {
      setTimeout(() => this.animateArrow(arrow), index * 100);
    });
  }

  // ========== PARTICLE EFFECTS (SIMPLE) ========== 
  createParticles(x, y, count = 8) {
    const colors = ['#ff6b35', '#f7931e', '#fbb03b', '#e63946'];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  }

  // ========== EMPTY STATE ========== 
  showEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎵</div>
        <h3>No Songs Yet</h3>
        <p>Add some songs to get started!</p>
      </div>
    `;
  }

  // ========== SMOOTH SCROLL ========== 
  scrollToElement(element, offset = 0) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  scrollToActive() {
    const activeItem = document.querySelector('#playlist li.active');
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// ========== STAGGER ANIMATION UTILITY ========== 
function staggerAnimation(elements, className, delay = 50) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(className);
    }, index * delay);
  });
}

// ========== GLOBAL INITIALIZATION ========== 
let microInteractions;

function initMicroInteractions() {
  microInteractions = new MicroInteractions();
  
  // Add ripple effect keyframe
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
  
  console.log('✨ Premium micro-interactions initialized');
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMicroInteractions);
} else {
  initMicroInteractions();
}

// Export for use in other modules
window.microInteractions = {
  getInstance: () => microInteractions,
  staggerAnimation,
  createParticles: (x, y, count) => microInteractions?.createParticles(x, y, count),
  triggerSuccess: (el) => microInteractions?.triggerSuccess(el),
  triggerError: (el) => microInteractions?.triggerError(el),
  animateRemoveItem: (item, cb) => microInteractions?.animateRemoveItem(item, cb),
  scrollToActive: () => microInteractions?.scrollToActive()
};
