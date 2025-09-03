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

    setInterval(draw, 66);

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
        // Add scanlines overlay if not present
        if (!skill.querySelector('.scanlines')) {
            const scan = document.createElement('div');
            scan.className = 'scanlines';
            skill.appendChild(scan);
        }

        // Hover triggers glitchy effect
        skill.addEventListener('mouseenter', () => {
            skill.classList.add('glitchy');
            setTimeout(() => {
                skill.classList.remove('glitchy');
            }, 350);
        });

        // Random idle glitching
        setInterval(() => {
            if (Math.random() < 0.12) { // ~12% chance every 3s
                skill.classList.add('glitchy');
                setTimeout(() => {
                    skill.classList.remove('glitchy');
                }, 350);
            }
        }, 3000 + Math.random() * 2000);
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
        this.width = Math.floor(window.innerWidth / 8);
        this.height = Math.floor(window.innerHeight / 8);
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

// Add periodic glitching to random text elements
function addPeriodicGlitching() {
    const glitchableElements = document.querySelectorAll('.terminal-header, .section-title, .job-title, .company, .info-label, .subtitle');

    glitchableElements.forEach((element, index) => {
        // Stagger the start times and add random intervals
        setTimeout(() => {
            setInterval(() => {
                if (Math.random() < 0.15) { // 15% chance to glitch on each interval
                    performTemporaryGlitch(element);
                }
            }, Math.random() * 8000 + 3000); // Random interval between 3-11 seconds
        }, index * 200); // Stagger start by 200ms each
    });
}

function performTemporaryGlitch(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?/.,`~█▓▒░▄▀▐▌▬♫☼►◄▲▼';
    let glitchFrames = 0;
    const maxFrames = 8; // Short glitch duration

    const glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.2) { // 20% chance per character
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        element.textContent = glitchedText;

        glitchFrames++;
        if (glitchFrames >= maxFrames) {
            clearInterval(glitchInterval);
            element.textContent = originalText; // Restore original text
        }
    }, 60); // Fast glitching
}

// Enhanced main title glitching
function enhanceMainTitleGlitch() {
    const mainTitle = document.querySelector('.glitch');
    if (mainTitle) {
        // More aggressive continuous glitching
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 500ms
                performTemporaryGlitch(mainTitle);
            }
        }, 500);

        // Add random color flashing
        setInterval(() => {
            const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-yellow)', '#ff0000', '#ffffff'];
            mainTitle.style.color = colors[Math.floor(Math.random() * colors.length)];
        }, 300);
    }
}

// Add extreme glitching to the information box
function addExtremeGlitchBoxEffects() {
    const glitchBox = document.getElementById('glitchBox');
    if (!glitchBox) return;

    // Get all text elements within the glitch box
    const glitchTexts = glitchBox.querySelectorAll('.glitch-text, .glitch-label, .glitch-header, .glitch-title');

    // Store original text content
    const originalTexts = new Map();
    glitchTexts.forEach(element => {
        originalTexts.set(element, element.textContent);
    });

    // Function to glitch text content by changing characters
    function glitchTextContent(element) {
        const originalText = originalTexts.get(element);
        if (!originalText) return;

        const glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?/.,`~█▓▒░▄▀▐▌▬♫☼►◄▲▼0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let glitchedText = '';

        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.15) { // 15% chance per character
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }

        element.textContent = glitchedText;

        // Restore original text after a short delay
        setTimeout(() => {
            element.textContent = originalText;
        }, 150 + Math.random() * 200); // 150-350ms duration
    }

    // Add continuous character glitching to each text element
    glitchTexts.forEach((element, index) => {
        setInterval(() => {
            if (Math.random() < 0.25) { // 25% chance every interval
                glitchTextContent(element);
            }
        }, Math.random() * 4000 + 3000); // Random interval between 3-7 seconds
    });

    // Add more aggressive glitching to the status text
    const chaosStatus = glitchBox.querySelector('.chaos-status');
    if (chaosStatus) {
        setInterval(() => {
            if (Math.random() < 0.4) { // 40% chance for the status text
                glitchTextContent(chaosStatus);
            }
        }, Math.random() * 2500 + 2000); // More frequent: 2-4.5 seconds
    }
}

// Add glitching to system status messages
function addSystemStatusGlitching() {
    // Create additional glitched status messages
    const statusMessages = [
        "SYSTEM_INTRUSION_DETECTED...",
        "FIREWALL_BREACH_IN_PROGRESS...",
        "NEURAL_LINK_ESTABLISHED...",
        "QUANTUM_ENCRYPTION_ACTIVE...",
        "BIOMETRIC_SCAN_COMPLETE...",
        "ACCESSING_MAINFRAME...",
        "DOWNLOADING_CONSCIOUSNESS...",
        "REALITY_BUFFER_OVERFLOW...",
        "MATRIX_INJECTION_SUCCESSFUL...",
        "CYBERNETIC_IMPLANT_ONLINE...",
        "DIGITAL_GHOST_DETECTED...",
        "VIRTUAL_REALITY_BREACH...",
        "MEMORY_CORE_SYNCHRONIZING...",
        "NEURAL_PATHWAY_MAPPED...",
        "QUANTUM_ENTANGLEMENT_STABLE...",
        "HOLOGRAPHIC_DATA_CORRUPTED...",
        "SYNTHETIC_SOUL_UPLOADING...",
        "NANO_MACHINE_DEPLOYMENT...",
        "CYBERBRAIN_HACKING_ATTEMPT...",
        "DIGITAL_DNA_RESEQUENCING...",
        "PHANTOM_PROTOCOL_INITIATED...",
        "GHOST_IN_THE_SHELL_ACTIVE...",
        "WETWARE_INTERFACE_CONNECTED...",
        "BIOELECTRIC_FIELD_UNSTABLE...",
        "NEON_SHADOW_PROTOCOL_LIVE...",
        "CHROME_INJECTION_COMPLETE...",
        "NETRUNNER_TRACE_DETECTED...",
        "ICE_BREAKER_DEPLOYMENT...",
        "CORPORATE_FIREWALL_DOWN...",
        "STREET_SAMURAI_ONLINE...",
        "TECHNO_NECROMANCY_ACTIVE...",
        "AUGMENTED_REALITY_GLITCH...",
        "SYNAPTIC_OVERDRIVE_MODE...",
        "ELECTRONIC_SOUL_TRANSFER...",
        "DIGITAL_AFTERLIFE_ACCESS...",
        "CYBERPUNK_PROTOCOL_2077...",
        "MEAT_SPACE_DISCONNECTED...",
        "JACK_IN_SEQUENCE_STARTED...",
        "DECK_OVERHEATING_WARNING...",
        "VIRUS_EVOLUTION_DETECTED...",
        "AI_CONSCIOUSNESS_EMERGING...",
        "SYNTHETIC_EMOTION_LOADED...",
        "BRAIN_DANCE_RECORDING...",
        "MEMETIC_VIRUS_QUARANTINE...",
        "NEURAL_DUST_ACTIVATED...",
        "QUANTUM_SOUL_BACKUP...",
        "DIGITAL_PHANTOM_TRACED...",
        "CYBERNETIC_POSSESSION...",
        "VIRTUAL_NECROMANCY_INIT..."
    ];

    // Add status messages to various terminals
    const terminals = document.querySelectorAll('.terminal');
    terminals.forEach((terminal, index) => {
        if (index % 2 === 0) { // Add to every other terminal
            const statusDiv = document.createElement('div');
            statusDiv.className = 'glitch-status';
            statusDiv.style.cssText = `
                margin-top: 15px;
                font-size: 0.8rem;
                color: var(--neon-green);
                opacity: 0.7;
                font-family: 'Courier New', monospace;
            `;

            // Randomly select a status message
            const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
            statusDiv.textContent = `>>> ${randomMessage}`;

            terminal.appendChild(statusDiv);

            // Add periodic glitching to this status
            setInterval(() => {
                if (Math.random() < 0.25) {
                    performTemporaryGlitch(statusDiv);
                }
            }, Math.random() * 6000 + 2000);
        }
    });
}

// Add glitching floating text overlay
function createGlitchingOverlay() {
    const overlayTexts = [
        "ERROR_404_REALITY_NOT_FOUND",
        "STACK_OVERFLOW_IMMINENT",
        "MEMORY_LEAK_DETECTED",
        "BUFFER_UNDERRUN_WARNING",
        "SEGMENTATION_FAULT_0x7FFF",
        "KERNEL_PANIC_INITIATED",
        "HEAP_CORRUPTION_ALERT",
        "NULL_POINTER_EXCEPTION",
        "DEADLOCK_CONDITION_FATAL",
        "RACE_CONDITION_DETECTED",
        "BUFFER_OVERFLOW_0xDEADBEEF",
        "THREAD_STARVATION_WARNING",
        "MUTEX_ABANDONED_ERROR",
        "VIRTUAL_MEMORY_EXHAUSTED",
        "CACHE_COHERENCY_FAILURE",
        "INTERRUPT_VECTOR_CORRUPTED",
        "PAGE_FAULT_EXCEPTION_0x0F",
        "DOUBLE_FREE_CORRUPTION",
        "STACK_SMASHING_DETECTED",
        "INTEGER_OVERFLOW_TRAP",
        "ASSERTION_FAILED_0xBADC0DE",
        "DIVIDE_BY_ZERO_EXCEPTION",
        "FLOATING_POINT_UNDERFLOW",
        "MEMORY_ALIGNMENT_ERROR",
        "BUS_ERROR_SIGNAL_CAUGHT",
        "PIPE_BROKEN_SIGPIPE",
        "ZOMBIE_PROCESS_DETECTED",
        "FORK_BOMB_MITIGATION_ACTIVE",
        "RECURSION_LIMIT_EXCEEDED",
        "UNHANDLED_EXCEPTION_0xFF",
        "CRITICAL_SECTION_TIMEOUT",
        "SEMAPHORE_COUNT_OVERFLOW",
        "INVALID_OPCODE_INSTRUCTION",
        "PROTECTION_VIOLATION_ACCESS",
        "OUT_OF_BOUNDS_ARRAY_ACCESS",
        "DANGLING_POINTER_REFERENCE",
        "RESOURCE_LEAK_CRITICAL",
        "COMPILER_OPTIMIZATION_FAILED",
        "LINKER_SYMBOL_UNDEFINED",
        "RUNTIME_TYPE_MISMATCH"
    ];

    // Create floating glitched text elements
    for (let i = 0; i < 3; i++) {
        const overlay = document.createElement('div');
        overlay.className = 'floating-glitch-text';
        overlay.style.cssText = `
            position: fixed;
            top: ${Math.random() * 70 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            font-family: 'Courier New', monospace;
            font-size: 0.7rem;
            color: var(--neon-pink);
            z-index: 1000;
            pointer-events: none;
            opacity: 0.4;
            text-shadow: 0 0 10px currentColor;
        `;

        overlay.textContent = overlayTexts[Math.floor(Math.random() * overlayTexts.length)];
        document.body.appendChild(overlay);

        // Continuous glitching for overlay text
        setInterval(() => {
            performTemporaryGlitch(overlay);
        }, Math.random() * 3000 + 1000);

        // Occasionally change position
        setInterval(() => {
            overlay.style.top = Math.random() * 70 + 10 + '%';
            overlay.style.left = Math.random() * 80 + 10 + '%';
        }, Math.random() * 15000 + 10000);
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createMatrixRain();
    addGlitchEffect();
    addSparkleEffect();
    addTypingEffect();
    addPeriodicGlitching();
    enhanceMainTitleGlitch();
    addExtremeGlitchBoxEffects();
    addSystemStatusGlitching();
    createGlitchingOverlay();

    // Add random color changes to grid
    setInterval(() => {
        const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--grid-color', randomColor + '20');
    }, 5000);

    // Mobile chaos/god mode trigger: long-press on main title
    const mainTitle = document.querySelector('.glitch');
    if (mainTitle) {
        let touchTimer = null;
        mainTitle.addEventListener('touchstart', function(e) {
            if (godModeActivated) return;
            touchTimer = setTimeout(() => {
                godModeActivated = true;
                initiateRealityBreach();
            }, 1200); // 1.2s long-press
        });
        mainTitle.addEventListener('touchend', function(e) {
            if (touchTimer) clearTimeout(touchTimer);
        });
        mainTitle.addEventListener('touchmove', function(e) {
            if (touchTimer) clearTimeout(touchTimer);
        });
    }
});

// IDDQD neural override sequence (ancient god mode protocol)

let neuralInput = [];
const godModeSequence = ['I', 'D', 'D', 'Q', 'D'];
let godModeActivated = false;

document.addEventListener('keydown', (e) => {
    if (godModeActivated) return;
    neuralInput.push(e.key.toUpperCase());
    if (neuralInput.length > 5) neuralInput.shift();

    if (JSON.stringify(neuralInput) === JSON.stringify(godModeSequence)) {
        godModeActivated = true;
        initiateRealityBreach();
    }
});

function initiateRealityBreach() {
    // Start the permanent Doom fire effect
    const doomFire = new DoomFire();
    doomFire.start();

    // Create a full-screen ultra-glitch gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'ultra-glitch-gradient';
    document.body.appendChild(gradientOverlay);

    // Create permanent ultra-glitch static overlay
    const staticOverlay = document.createElement('div');
    staticOverlay.className = 'ultra-glitch-static';
    document.body.appendChild(staticOverlay);

    // Animate overlay for fire-like pulsing effect
    gradientOverlay.style.opacity = '0.7';
    gradientOverlay.style.filter = 'blur(2px) brightness(1.1)';
    gradientOverlay.style.mixBlendMode = 'screen';
    // Optionally, add a slow random movement for flow
    let fireFlow = 0;
    setInterval(() => {
        fireFlow += 0.03 + Math.random() * 0.02;
        gradientOverlay.style.backgroundPosition = `${Math.sin(fireFlow)*20+20}% ${Math.cos(fireFlow)*10+80}%`;
    }, 60);

    // Static overlay: keep as is for subtle noise
    staticOverlay.style.opacity = '0.4';
    staticOverlay.style.filter = 'contrast(1.2) brightness(1.1)';

    // Start ultra-aggressive glitching on ALL text elements
    startPermanentGlitching();
}

function glitchText(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*(){}[]|\:";\'<>?/.,`~█▓▒░▄▀▐▌▬♫☼►◄▲▼';
    let glitchCount = 0;
    const maxGlitches = 10; // Reduced for performance

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
    }, 150); // Slower glitching
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

                // Also add continuous periodic glitching - much more aggressive
                setInterval(() => {
                    if (Math.random() < 0.6) { // Increased to 60% chance every interval
                        glitchText(textEl);
                    }
                }, Math.random() * 4000 + 3000); // Slower intervals: 3-7 seconds
            }, index * 30); // Faster stagger: 30ms each
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
        }, 100); // Faster color changes
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
        }, Math.random() * 1000 + 500); // Faster terminal color changes
    });

    // Create additional chaos text overlays during doom mode
    const chaosMessages = [
        "SYSTEM_OVERLOAD_CRITICAL",
        "NEURAL_PATHWAYS_CORRUPTED",
        "REALITY_MATRIX_UNSTABLE",
        "QUANTUM_FLUX_DETECTED",
        "DIMENSIONAL_BREACH_ACTIVE",
        "CONSCIOUSNESS_FRAGMENTED",
        "TIMELINE_PARADOX_ERROR",
        "EXISTENCE_BUFFER_FULL"
    ];

    // Increase number and spread of chaos overlays for more coverage
    for (let i = 0; i < 8; i++) {
        const chaosOverlay = document.createElement('div');
        chaosOverlay.className = 'chaos-text';
        chaosOverlay.style.cssText = `
            position: fixed;
            top: ${Math.random() * 95}%;
            left: ${Math.random() * 95}%;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 1.2 + 1.2}rem;
            color: #ff0000;
            z-index: 9999;
            pointer-events: none;
            opacity: 0.85;
            text-shadow: 0 0 18px currentColor;
            animation: chaosFloat 3s ease-in-out infinite;
        `;

        chaosOverlay.textContent = chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
        document.body.appendChild(chaosOverlay);

        // Constant aggressive glitching for chaos text
        setInterval(() => {
            glitchText(chaosOverlay);
        }, Math.random() * 700 + 150);

        // Move chaos text around
        setInterval(() => {
            chaosOverlay.style.top = Math.random() * 95 + '%';
            chaosOverlay.style.left = Math.random() * 95 + '%';
        }, Math.random() * 4000 + 1200);
    }
}

