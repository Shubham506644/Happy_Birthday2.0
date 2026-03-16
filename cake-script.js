// ==========================================
// BIRTHDAY CAKE PAGE - PREMIUM JAVASCRIPT
// ==========================================

// DOM Elements
const cakeContainer = document.getElementById('cakeContainer');
const candles = document.getElementById('candles');
const knife = document.getElementById('knife');
const knifeWrapper = document.getElementById('knifeWrapper');
const instructions = document.getElementById('instructions');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const musicToggle = document.getElementById('musicToggle');
const confettiContainer = document.getElementById('confettiContainer');
const sparkleBg = document.getElementById('sparkleBg');
const heartsContainer = document.getElementById('heartsContainer');

// State
let cakeIsCut = false;
let musicPlaying = false;

// Audio Context for Happy Birthday
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

// Happy Birthday melody (notes in Hz with duration)
const happyBirthdayMelody = [
    { note: 262, duration: 0.25 },  // C4
    { note: 262, duration: 0.25 },  // C4
    { note: 294, duration: 0.5 },   // D4
    { note: 262, duration: 0.5 },   // C4
    { note: 349, duration: 0.5 },   // F4
    { note: 330, duration: 1 },     // E4
    
    { note: 262, duration: 0.25 },  // C4
    { note: 262, duration: 0.25 },  // C4
    { note: 294, duration: 0.5 },   // D4
    { note: 262, duration: 0.5 },   // C4
    { note: 392, duration: 0.5 },   // G4
    { note: 349, duration: 1 },     // F4
    
    { note: 262, duration: 0.25 },  // C4
    { note: 262, duration: 0.25 },  // C4
    { note: 523, duration: 0.5 },   // C5
    { note: 440, duration: 0.5 },   // A4
    { note: 349, duration: 0.5 },   // F4
    { note: 330, duration: 0.5 },   // E4
    { note: 294, duration: 1 },     // D4
    
    { note: 466, duration: 0.25 },  // Bb4
    { note: 466, duration: 0.25 },  // Bb4
    { note: 440, duration: 0.5 },   // A4
    { note: 349, duration: 0.5 },   // F4
    { note: 392, duration: 0.5 },   // G4
    { note: 349, duration: 1 }      // F4
];

// Initialize sparkle background
function createSparkles() {
    const sparkleCount = 50;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sparkleBg.appendChild(sparkle);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartSymbols = ['💕', '💗', '💖', '💝', '❤️'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 15000);
    }, 2000);
}

// Play Happy Birthday music using Web Audio API
function playHappyBirthday() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    
    let currentTime = audioContext.currentTime;
    
    happyBirthdayMelody.forEach((noteObj, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = noteObj.note;
        
        // Create envelope for smooth sound
        const startTime = currentTime;
        const endTime = currentTime + noteObj.duration;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + noteObj.duration * 0.5);
        gainNode.gain.linearRampToValueAtTime(0, endTime);
        
        oscillator.start(startTime);
        oscillator.stop(endTime);
        
        currentTime += noteObj.duration;
    });
}

// Create confetti explosion
function createConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98', '#dda0dd', '#f0e68c', '#ff7f50'];
    const shapes = ['circle', 'square', 'ribbon'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 12 + 6;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 3;
            
            let borderRadius = '2px';
            if (shape === 'circle') borderRadius = '50%';
            else if (shape === 'ribbon') borderRadius = '1px';
            
            confetti.style.cssText = `
                left: ${startX}px;
                top: -20px;
                width: ${size}px;
                height: ${shape === 'ribbon' ? size * 3 : size}px;
                background: ${color};
                border-radius: ${borderRadius};
                animation-duration: ${duration}s;
            `;
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 20);
    }
}

// Cut the cake
function cutTheCake() {
    if (cakeIsCut) return;
    cakeIsCut = true;
    
    // Animate knife
    knife.classList.add('cutting');
    
    // Hide instructions
    setTimeout(() => {
        instructions.classList.add('hidden');
    }, 300);
    
    // Blow out candles
    setTimeout(() => {
        candles.classList.add('blown');
    }, 600);
    
    // Play music
    setTimeout(() => {
        playHappyBirthday();
        musicPlaying = true;
        musicToggle.classList.add('playing');
    }, 1000);
    
    // Create confetti
    setTimeout(() => {
        createConfetti();
    }, 1200);
    
    // Show celebration
    setTimeout(() => {
        celebrationOverlay.classList.add('show');
    }, 2000);
}

// Knife drag functionality
function setupKnifeDrag() {
    let isDragging = false;
    let startX = 0;
    
    knife.addEventListener('mousedown', startDrag);
    knife.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        if (cakeIsCut) return;
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        knife.style.transition = 'none';
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging || cakeIsCut) return;
        
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        
        knife.style.transform = `translateX(${Math.min(deltaX, 0)}px)`;
        
        if (deltaX < -150) {
            isDragging = false;
            cutTheCake();
        }
        
        e.preventDefault();
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        knife.style.transition = 'transform 0.3s ease';
        knife.style.transform = 'translateX(0)';
    }
}

// Click to cut cake
cakeContainer.addEventListener('click', (e) => {
    if (!cakeIsCut && e.target.closest('.knife') === null) {
        cutTheCake();
    }
});

// Double tap for mobile
let lastTap = 0;
cakeContainer.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0 && !cakeIsCut) {
        cutTheCake();
        e.preventDefault();
    }
    lastTap = currentTime;
});

// Music toggle button
musicToggle.addEventListener('click', () => {
    if (cakeIsCut) {
        if (musicPlaying) {
            musicPlaying = false;
            musicToggle.classList.remove('playing');
            if (audioContext) audioContext.suspend();
        } else {
            playHappyBirthday();
            musicPlaying = true;
            musicToggle.classList.add('playing');
            if (audioContext) audioContext.resume();
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    createFloatingHearts();
    setupKnifeDrag();
    
    console.log('%c🎂 Happy Birthday! 🎂', 
        'color: #c44569; font-size: 24px; font-weight: bold; font-family: cursive;');
    console.log('%cClick or drag to cut the cake!', 
        'color: #b76e79; font-size: 14px;');
});

// Handle page visibility for audio
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioContext) {
        audioContext.suspend();
    } else if (!document.hidden && audioContext && musicPlaying) {
        audioContext.resume();
    }
});