// Typing effect
const phrases = ["Full-Stack Developer","Problem Solver", "Tech Lover"];
let currentPhrase = 0;
let currentLetter = 0;
let typingText = document.getElementById('typing-text');
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const fullText = phrases[currentPhrase];
    
    if (isDeleting) {
        typingText.textContent = fullText.substring(0, currentLetter - 1);
        currentLetter--;
        typingSpeed = 50;
    } else {
        typingText.textContent = fullText.substring(0, currentLetter + 1);
        currentLetter++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentLetter === fullText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && currentLetter === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start typing effect
setTimeout(typeWriter, 1000);

// Custom cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover class to cursor when hovering interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .nav-link, .btn-primary, .btn-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Simple particle effect for hero section
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});