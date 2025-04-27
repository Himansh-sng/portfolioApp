// Additional animations beyond AOS

// Animate project cards on hover with mouse movement
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    // Calculate mouse position within the card
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation values based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20; // Adjust the divisor to control the rotation amount
    const rotateY = (centerX - x) / 20;
    
    // Apply subtle 3D rotation effect
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  // Reset transform on mouse leave
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      card.style.transform = '';
    }, 200);
  });
});

// Animate skill tags with staggered delay
const skillTags = document.querySelectorAll('.skill-tags span');

skillTags.forEach((tag, index) => {
  tag.style.transitionDelay = `${index * 0.05}s`;
});

// Add particle effect to hero section background
const createParticleEffect = () => {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.classList.add('particles-canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  
  heroSection.appendChild(canvas);
  
  // Set canvas size
  const setCanvasSize = () => {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  };
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // Create particles
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 180 + 75)}, ${Math.random() * 0.3 + 0.1})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    // Draw connections between particles
    connectParticles();
    
    requestAnimationFrame(animate);
  };
  
  // Connect particles with lines
  const connectParticles = () => {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(67, 97, 238, ${(maxDistance - distance) / maxDistance * 0.2})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };
  
  animate();
};

// Initialize particle effect only on desktop
if (window.innerWidth > 768) {
  createParticleEffect();
}

// Add typing effect to hero section
const typeWriter = (element, text, speed = 50, delay = 1000) => {
  let i = 0;
  
  setTimeout(() => {
    const typing = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
  }, delay);
};

// Apply typing effect to the tagline
window.addEventListener('load', () => {
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const originalText = tagline.innerText;
    tagline.innerText = '';
    typeWriter(tagline, originalText, 50, 1000);
  }
});

// Add animation to the download CV button
const downloadBtn = document.querySelector('.btn-download');
if (downloadBtn) {
  downloadBtn.addEventListener('mouseenter', () => {
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download My CV';
    downloadBtn.style.transform = 'translateY(-5px)';
  });
  
  downloadBtn.addEventListener('mouseleave', () => {
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
    downloadBtn.style.transform = '';
  });
}