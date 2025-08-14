// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const font_size = 10;
    const columns = canvas.width / font_size;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = font_size + 'px courier';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Recalculate columns and reset drops array
        const newColumns = canvas.width / font_size;
        drops.length = newColumns;
        for (let x = 0; x < newColumns; x++) {
            if (drops[x] === undefined) drops[x] = 1;
        }
    });
}

// Glitch effect for skills
function addGlitchEffect() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => {
                skill.style.animation = '';
            }, 300);
        });
    });
}

// Sparkle effect for job items
function addSparkleEffect() {
    const jobs = document.querySelectorAll('.job');

    jobs.forEach(job => {
        job.addEventListener('mouseenter', (e) => {
            createSparkles(e.currentTarget);
        });
    });
}

function createSparkles(element) {
    const sparkleCount = 8;
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Random position within the element
        const x = Math.random() * (rect.width - 20) + 10;
        const y = Math.random() * (rect.height - 20) + 10;

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';

        // Random color variations
        const colors = ['var(--neon-yellow)', 'var(--neon-cyan)', 'var(--neon-pink)', '#ffffff'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.boxShadow = `0 0 6px ${sparkle.style.background}`;

        // Random delay for more natural effect
        sparkle.style.animationDelay = Math.random() * 0.3 + 's';

        element.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1100);
    }
}

// Terminal typing effect
function addTypingEffect() {
    const terminalHeaders = document.querySelectorAll('.terminal-header');
    terminalHeaders.forEach((header, index) => {
        const originalText = header.textContent;
        header.textContent = '';

        setTimeout(() => {
            let i = 0;
            const typing = setInterval(() => {
                header.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typing);
                }
            }, 50);
        }, index * 500);
    });
}

// Doom Fire Effect
class DoomFire {
    constructor() {
        this.width = Math.floor(window.innerWidth / 4);
        this.height = Math.floor(window.innerHeight / 4);
        this.firePixels = new Array(this.width * this.height).fill(0);
        this.canvas = null;
        this.ctx = null;
        this.imageData = null;
        this.animationId = null;

        // Doom fire color palette (37 colors from black to bright yellow)
        this.palette = [
            [7, 7, 7], [31, 7, 7], [47, 15, 7], [71, 15, 7], [87, 23, 7], [103, 31, 7],
            [119, 31, 7], [143, 39, 7], [159, 47, 7], [175, 63, 7], [191, 71, 7], [199, 71, 7],
            [223, 79, 7], [223, 87, 7], [223, 87, 7], [215, 95, 7], [215, 95, 7], [215, 103, 15],
            [207, 111, 15], [207, 119, 15], [207, 127, 15], [207, 135, 23], [199, 135, 23], [199, 143, 23],
            [199, 151, 31], [191, 159, 31], [191, 159, 31], [191, 167, 39], [191, 167, 39], [191, 175, 47],
            [183, 175, 47], [183, 183, 47], [183, 183, 55], [207, 207, 111], [223, 223, 159], [239, 239, 199], [255, 255, 255]
        ];
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9998;
            pointer-events: none;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;

        this.ctx = this.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData(this.width, this.height);

        // Initialize bottom row to maximum fire intensity
        for (let x = 0; x < this.width; x++) {
            this.firePixels[(this.height - 1) * this.width + x] = 36;
        }

        document.body.appendChild(this.canvas);
    }

    spreadFire(src) {
        const pixel = this.firePixels[src];
        if (pixel === 0) {
            this.firePixels[src - this.width] = 0;
        } else {
            const randIdx = Math.round(Math.random() * 3.0) & 3;
            const dst = src - randIdx + 1;
            this.firePixels[dst - this.width] = pixel - (randIdx & 1);
        }
    }

    doFire() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 1; y < this.height; y++) {
                this.spreadFire(y * this.width + x);
            }
        }
    }

    render() {
        this.doFire();

        // Convert fire pixels to RGBA
        for (let i = 0; i < this.firePixels.length; i++) {
            const fireIntensity = this.firePixels[i];
            const color = this.palette[fireIntensity];
            const pixelIndex = i * 4;

            this.imageData.data[pixelIndex] = color[0];     // Red
            this.imageData.data[pixelIndex + 1] = color[1]; // Green
            this.imageData.data[pixelIndex + 2] = color[2]; // Blue
            this.imageData.data[pixelIndex + 3] = fireIntensity > 0 ? 255 : 0; // Alpha
        }

        this.ctx.putImageData(this.imageData, 0, 0);
        this.animationId = requestAnimationFrame(() => this.render());
    }

    start() {
        this.createCanvas();
        this.render();
        // Fire burns forever - no automatic extinguishing
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    extinguish() {
        // Gradually reduce fire intensity at the bottom
        const extinguishDuration = 2000; // 2 seconds
        const startTime = Date.now();

        const extinguishAnimation = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / extinguishDuration, 1);

            // Reduce bottom row intensity
            for (let x = 0; x < this.width; x++) {
                const bottomIndex = (this.height - 1) * this.width + x;
                this.firePixels[bottomIndex] = Math.floor(36 * (1 - progress));
            }

            if (progress < 1) {
                requestAnimationFrame(extinguishAnimation);
            } else {
                setTimeout(() => this.stop(), 500);
            }
        };

        extinguishAnimation();
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createMatrixRain();
    addGlitchEffect();
    addSparkleEffect();
    addTypingEffect();

    // Add random color changes to grid
    setInterval(() => {
        const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--grid-color', randomColor + '20');
    }, 5000);
});

// IDDQD cheat code easter egg (Doom god mode cheat)
let cheatCode = [];
const iddqdSequence = ['I', 'D', 'D', 'Q', 'D'];

document.addEventListener('keydown', (e) => {
    cheatCode.push(e.key.toUpperCase());
    if (cheatCode.length > 5) cheatCode.shift();

    if (JSON.stringify(cheatCode) === JSON.stringify(iddqdSequence)) {
        triggerDoomChaosMode();
    }
});

function triggerDoomChaosMode() {
    // Start the permanent Doom fire effect
    const doomFire = new DoomFire();
    doomFire.start();

    // Create a full-screen gradient overlay that covers everything
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9997;
        animation: screenShatter 8s ease-in-out infinite;
    `;
    document.body.appendChild(gradientOverlay);

    // Create permanent static noise overlay
    const staticOverlay = document.createElement('div');
    staticOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background:
            radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%),
            radial-gradient(circle at 80% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%),
            radial-gradient(circle at 40% 80%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%);
        background-size: 50px 50px, 60px 60px, 40px 40px;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
        animation: staticNoise 2s ease-in-out infinite;
    `;
    document.body.appendChild(staticOverlay);

    // Start aggressive glitching on ALL text elements
    startPermanentGlitching();
}

function glitchText(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?/.,`~█▓▒░▄▀▐▌▬♫☼►◄▲▼';
    let glitchCount = 0;
    const maxGlitches = 20; // Increased for more intense glitching

    const glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.25) { // Increased probability for more glitching
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        element.textContent = glitchedText;

        glitchCount++;
        if (glitchCount >= maxGlitches) {
            clearInterval(glitchInterval);
            // Don't restore original text - keep it glitched!
            let finalGlitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.15) {
                    finalGlitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    finalGlitchedText += originalText[i];
                }
            }
            element.textContent = finalGlitchedText;
        }
    }, 100); // Faster glitching
}

function startPermanentGlitching() {
    // Get ALL text elements on the page
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, a, li, td, th, label, button');

    // Start glitching all text elements with staggered timing
    allTextElements.forEach((textEl, index) => {
        if (textEl.textContent && textEl.textContent.trim() !== '') {
            // Stagger the start of glitching
            setTimeout(() => {
                glitchText(textEl);

                // Also add continuous periodic glitching
                setInterval(() => {
                    if (Math.random() < 0.3) { // 30% chance every interval
                        glitchText(textEl);
                    }
                }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
            }, index * 50); // Stagger by 50ms each
        }
    });

    // Add aggressive glitching to the main title
    const mainTitle = document.querySelector('.glitch');
    if (mainTitle) {
        setInterval(() => {
            const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-yellow)', '#ff0000', '#ffffff'];
            mainTitle.style.color = colors[Math.floor(Math.random() * colors.length)];

            // Randomly change text shadow intensity
            const intensity = Math.random() * 30 + 10;
            mainTitle.style.textShadow = `
                0 0 ${intensity}px currentColor,
                0 0 ${intensity * 2}px currentColor,
                0 0 ${intensity * 3}px currentColor,
                0 0 ${intensity * 4}px currentColor
            `;
        }, 200);
    }

    // Add random color changes to all terminals
    const terminals = document.querySelectorAll('.terminal');
    terminals.forEach(terminal => {
        setInterval(() => {
            const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-yellow)', '#ff0000'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            terminal.style.borderColor = randomColor;
            terminal.style.boxShadow = `
                0 0 20px ${randomColor}33,
                inset 0 0 20px ${randomColor}11
            `;
        }, Math.random() * 2000 + 1000);
    });
}

