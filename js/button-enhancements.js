/**
 * Premium Button Enhancements
 * Adds ripple effects, feedback animations, and enhanced interactions
 */

// Add ripple effect to all control buttons
document.addEventListener('DOMContentLoaded', () => {
  const controlButtons = document.querySelectorAll('.controls button');
  
  // Add click ripple effect
  controlButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      // Calculate ripple position
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Shuffle button toggle
  const shuffleBtn = document.getElementById('shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      
      // Add success feedback when activated
      if (this.classList.contains('active')) {
        setTimeout(() => {
          this.classList.add('success');
          setTimeout(() => this.classList.remove('success'), 600);
        }, 100);
      }
    });
  }
  
  // Delete button confirmation feedback
  const deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn) {
    let deleteClickCount = 0;
    let deleteTimeout;
    
    deleteBtn.addEventListener('click', function(e) {
      deleteClickCount++;
      
      if (deleteClickCount === 1) {
        // First click - show warning
        this.classList.add('warning');
        this.setAttribute('title', 'Click again to confirm delete');
        
        // Reset after 2 seconds
        deleteTimeout = setTimeout(() => {
          deleteClickCount = 0;
          deleteBtn.classList.remove('warning');
          deleteBtn.setAttribute('title', 'Delete Song');
        }, 2000);
      } else if (deleteClickCount === 2) {
        // Second click - actually delete
        clearTimeout(deleteTimeout);
        deleteClickCount = 0;
        this.classList.remove('warning');
        this.setAttribute('title', 'Delete Song');
        // The actual delete functionality is handled in ui.js
      }
    });
  }
  
  // Add tactile feedback for all buttons
  controlButtons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.setProperty('--press-scale', '0.95');
    });
    
    button.addEventListener('mouseup', function() {
      this.style.setProperty('--press-scale', '1');
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.setProperty('--press-scale', '1');
    });
  });
  
  // Keyboard accessibility enhancements
  controlButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
        
        // Visual feedback for keyboard activation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 100);
      }
    });
  });
  
  // Add loading state example for async operations
  window.setButtonLoading = (buttonId, isLoading) => {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  };
  
  // Add success feedback helper
  window.showButtonSuccess = (buttonId) => {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.classList.add('success');
    setTimeout(() => button.classList.remove('success'), 600);
  };
  
  // Add error feedback helper
  window.showButtonError = (buttonId) => {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.classList.add('error');
    setTimeout(() => button.classList.remove('error'), 500);
  };
});

// Additional CSS for ripple effect (injected dynamically)
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  #delete-btn.warning {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%) !important;
    animation: pulse-warning 0.5s ease-in-out 3;
  }
  
  @keyframes pulse-warning {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
    }
    50% { 
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(255, 152, 0, 0.6);
    }
  }
`;
document.head.appendChild(style);
