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

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) konamiCode.shift();

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        triggerPageDestructionAndRebuild();
    }
});

function triggerPageDestructionAndRebuild() {
    // Get all terminal elements and other major components
    const terminals = document.querySelectorAll('.terminal');
    const header = document.querySelector('.header');
    const allElements = [header, ...terminals];

    // Create deep clones of all elements to restore later
    const elementClones = new Map();
    allElements.forEach(element => {
        if (element) {
            elementClones.set(element, element.cloneNode(true));
        }
    });

    // Add screen shatter effect to body
    document.body.style.animation = 'screenShatter 6s ease-in-out';

    // Create static noise overlay
    const staticOverlay = document.createElement('div');
    staticOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%),
            radial-gradient(circle at 80% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%),
            radial-gradient(circle at 40% 80%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 25%, transparent 26%);
        background-size: 50px 50px, 60px 60px, 40px 40px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: staticNoise 6s ease-in-out;
    `;
    document.body.appendChild(staticOverlay);

    // Make elements fall apart
    allElements.forEach((element, index) => {
        if (element) {
            const delay = index * 200; // Stagger the destruction

            setTimeout(() => {
                // Set random fall variables
                const fallX = (Math.random() - 0.5) * 800;
                const fallY = (Math.random() - 0.5) * 600;
                const fallRotation = (Math.random() - 0.5) * 720;

                element.style.setProperty('--fall-x', fallX + 'px');
                element.style.setProperty('--fall-y', fallY + 'px');
                element.style.setProperty('--fall-rotation', fallRotation + 'deg');

                element.style.animation = 'fallApart 6s ease-in-out';

                // Add glitch effect to text content
                const textElements = element.querySelectorAll('h1, h2, h3, p, div');
                textElements.forEach((textEl, textIndex) => {
                    setTimeout(() => {
                        if (textEl.textContent) {
                            glitchText(textEl);
                        }
                    }, textIndex * 100);
                });

            }, delay);
        }
    });

    // Clean up after animation
    setTimeout(() => {
        // Restore body
        document.body.style.animation = '';
        staticOverlay.remove();

        // Completely replace each element with its original clone
        allElements.forEach(element => {
            if (element && element.parentNode) {
                const clone = elementClones.get(element);
                if (clone) {
                    // Replace the modified element with the pristine clone
                    element.parentNode.replaceChild(clone, element);
                }
            }
        });

        // Re-initialize the interactive effects on the restored elements
        setTimeout(() => {
            addGlitchEffect();
            addSparkleEffect();
        }, 100);

        // Trigger a "system reboot" message
        showRebootMessage();
    }, 6000);
}

function glitchText(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?/.,`~';
    let glitchCount = 0;
    const maxGlitches = 8;

    const glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        element.textContent = glitchedText;

        glitchCount++;
        if (glitchCount >= maxGlitches) {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }
    }, 150);
}

function showRebootMessage() {
    const rebootDiv = document.createElement('div');
    rebootDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid var(--neon-green);
        padding: 30px;
        border-radius: 10px;
        color: var(--neon-green);
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
    `;

    rebootDiv.innerHTML = `
        <div>SYSTEM REBOOT COMPLETE</div>
        <div style="margin-top: 10px; color: var(--neon-cyan);">>>> PORTFOLIO.EXE RESTORED <<<</div>
        <div style="margin-top: 10px; font-size: 0.9rem; color: var(--neon-yellow);">Konami Code Detected ✓</div>
    `;

    document.body.appendChild(rebootDiv);

    setTimeout(() => {
        rebootDiv.remove();
    }, 3000);
}
