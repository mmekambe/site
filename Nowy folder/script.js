const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(); // Reinitialize particles on resize
});

let particlesArray = [];

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = (Math.random() * 2) - 1;
    let directionY = (Math.random() * 2) - 1;
    let color = 'rgba(255, 255, 255, 0.8)';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
  });
}

canvas.addEventListener('mousemove', function(event) {
  let mouseX = event.x;
  let mouseY = event.y;

  particlesArray.forEach(particle => {
    let dx = mouseX - particle.x;
    let dy = mouseY - particle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      particle.directionX += dx / 100;
      particle.directionY += dy / 100;
    }
  });
});

initParticles();
animateParticles();
