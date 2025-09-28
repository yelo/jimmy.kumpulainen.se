let seapunkModeActive = false; // Moved to global scope

document.addEventListener('DOMContentLoaded', () => {
    // Fake Visitor Counter
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        let count = Math.floor(Math.random() * 10000) + 5000;
        visitorCountElement.textContent = count;
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            visitorCountElement.textContent = count;
        }, 3000);
    }

    // Default Seapunk Visuals
    createSeapunkVisuals();

    // Easter Egg: Type 'seapunk'
    let seapunkCode = ['s', 'e', 'a', 'p', 'u', 'n', 'k'];
    let seapunkIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (seapunkModeActive) return;
        if (e.key.toLowerCase() === seapunkCode[seapunkIndex]) {
            seapunkIndex++;
            if (seapunkIndex === seapunkCode.length) {
                activateSeapunkMode();
                seapunkIndex = 0;
                seapunkModeActive = true;
            }
        } else {
            seapunkIndex = 0;
        }
    });

    // Fun Cursor Trail
    createCursorTrail();

    // Interactive Skills
    addSkillInteractivity();

    // Interactive Jobs
    addJobInteractivity();

    // Theme Switcher
    addThemeSwitcher();

    // Typewriter Effect
    initTypewriter();

    // Bubbly Links
    addBubblyLinks();
});

function createSeapunkVisuals() {
    const visualsContainer = document.getElementById('default-visuals');
    if (!visualsContainer) return;

    // Add swimming dolphins
    for (let i = 0; i < 5; i++) {
        const dolphin = document.createElement('div');
        dolphin.className = 'swimming-dolphin';
        dolphin.textContent = '🐬';
        dolphin.style.left = `${Math.random() * 100}vw`;
        dolphin.style.top = `${Math.random() * 100}vh`;
        dolphin.style.animationDuration = `${Math.random() * 10 + 10}s`;
        dolphin.style.animationDelay = `${Math.random() * 5}s`;
        visualsContainer.appendChild(dolphin);
    }

    // Add rising bubbles
    for (let i = 0; i < 50; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.width = `${Math.random() * 20 + 10}px`;
        bubble.style.height = bubble.style.width;
        visualsContainer.appendChild(bubble);
    }
}

function activateSeapunkMode() {
    // Clear seapunk visuals
    const defaultVisuals = document.getElementById('default-visuals');
    if (defaultVisuals) defaultVisuals.innerHTML = '';
    const backgroundSwirls = document.querySelector('.background-swirls');
    if (backgroundSwirls) backgroundSwirls.style.display = 'none';

    // Add seapunk class to body
    document.body.classList.add('seapunk-mode');

    // Create seapunk rain
    createSeapunkRain();
}

function createSeapunkRain() {
    const visualsContainer = document.getElementById('easter-egg-visuals');
    const canvas = document.createElement('canvas');
    canvas.className = 'seapunk-rain';
    visualsContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const seapunkChars = "🐬🐠🐙🐚🌊💧✨🔱💠";
    const chars = seapunkChars.split("");
    const font_size = 24;
    const columns = canvas.width / font_size;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(127, 255, 212, 0.1)'; // Fainter, more transparent trail
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = font_size + 'px sans-serif';

        // Seapunk color palette
        const colors = ['#ff1493', '#0000ff', '#9400d3', '#7fffd4', '#ffc0cb'];

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Assign a random color from the palette
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            ctx.fillText(text, i * font_size, drops[i] * font_size);

            // Add a random element to reset drops for a more chaotic, bubbly effect
            if (drops[i] * font_size > canvas.height && Math.random() > 0.9) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 80); // Slightly slower for a more graceful flow

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function createCursorTrail() {
    const trailCount = 15;
    const trail = [];
    for (let i = 0; i < trailCount; i++) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.width = `${15 - i}px`;
        div.style.height = `${15 - i}px`;
        div.style.borderRadius = '50%';
        div.style.backgroundColor = `hsl(${i * 20}, 100%, 50%)`;
        div.style.pointerEvents = 'none';
        div.style.zIndex = '10000';
        div.style.transition = 'transform 0.05s linear';
        document.body.appendChild(div);
        trail.push(div);
    }

    document.addEventListener('mousemove', (e) => {
        for (let i = trail.length - 1; i > 0; i--) {
            const leader = trail[i - 1];
            const follower = trail[i];
            follower.style.left = leader.style.left;
            follower.style.top = leader.style.top;
        }
        trail[0].style.left = `${e.clientX - 7}px`;
        trail[0].style.top = `${e.clientY - 7}px`;
    });
}

function addSkillInteractivity() {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.addEventListener('click', (e) => {
            // Prevent creating particles in seapunk mode
            if (document.body.classList.contains('seapunk-mode')) return;

            const rect = skill.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for (let i = 0; i < 20; i++) {
                createParticle(rect.left + x, rect.top + y);
            }
        });
    });
}

function addJobInteractivity() {
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('click', () => {
            // Prevent effect in seapunk mode
            if (document.body.classList.contains('seapunk-mode')) return;

            job.classList.add('job-clicked');
            setTimeout(() => {
                job.classList.remove('job-clicked');
            }, 400); // Timeout should be longer than the transition
        });
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.floor(Math.random() * 10 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * 360;
    const distance = Math.random() * 50 + 50;

    particle.style.setProperty('--x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle * Math.PI / 180) * distance}px`);

    setTimeout(() => {
        particle.remove();
    }, 700);
}

function addThemeSwitcher() {
    const fabContainer = document.querySelector('.theme-fab-container');
    const fabButton = document.querySelector('.theme-fab-button');
    const swatches = document.querySelectorAll('.theme-swatch');

    if (fabButton) {
        fabButton.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
        });
    }

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const theme = swatch.dataset.theme;
            document.body.className = ''; // Clear existing classes
            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }
            // Re-apply seapunk mode if it was active
            if (seapunkModeActive) {
                 document.body.classList.add('seapunk-mode');
            }
            // Hide the panel after selection
            fabContainer.classList.remove('active');
        });
    });
}

function initTypewriter() {
    const targetElement = document.getElementById('profession-text');
    const cursorElement = document.querySelector('#profession-text + .blink');
    const textToType = "Senior Software Engineer";
    let charIndex = 0;

    function typeChar() {
        if (charIndex < textToType.length) {
            targetElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100); // Adjust typing speed here
        } else {
            // Animation finished
            if(cursorElement) cursorElement.style.visibility = 'visible';
        }
    }

    // Start the animation
    if(targetElement) {
        typeChar();
    }
}

function addBubblyLinks() {
    const links = document.querySelectorAll('.contact-links a');
    links.forEach(link => {
        let bubbleInterval;

        link.addEventListener('mouseenter', () => {
            bubbleInterval = setInterval(() => {
                createBubble(link);
            }, 100); // Create a bubble every 100ms
        });

        link.addEventListener('mouseleave', () => {
            clearInterval(bubbleInterval);
        });
    });
}

function createBubble(element) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble-particle';
    document.body.appendChild(bubble);

    const rect = element.getBoundingClientRect();
    const size = Math.random() * 15 + 5; // 5px to 20px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Position bubble randomly along the width of the link
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + rect.height / 2;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    // Remove the bubble from the DOM after animation
    setTimeout(() => {
        bubble.remove();
    }, 1500);
}