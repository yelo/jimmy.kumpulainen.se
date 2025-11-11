let artModeActive = false;
let matrixModeActive = false;

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
    createSeapunkVisuals(false);

    // Easter Egg: Type 'art' or 'matrix'
    let artCode = ['a', 'r', 't'];
    let artIndex = 0;
    let matrixCode = ['m', 'a', 't', 'r', 'i', 'x'];
    let matrixIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (artModeActive || matrixModeActive) return;

        // Check for 'art' code
        if (e.key.toLowerCase() === artCode[artIndex]) {
            artIndex++;
            if (artIndex === artCode.length) {
                activateArtMode();
                artIndex = 0;
                artModeActive = true;
            }
        } else {
            artIndex = 0;
        }

        // Check for 'matrix' code
        if (e.key.toLowerCase() === matrixCode[matrixIndex]) {
            matrixIndex++;
            if (matrixIndex === matrixCode.length) {
                activateMatrixMode();
                matrixIndex = 0;
                matrixModeActive = true;
            }
        } else {
            matrixIndex = 0;
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

    // Set seasonal theme
    setSeasonalTheme();
});

function setSeasonalTheme() {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() is 0-indexed
    const day = now.getDate();

    // Disable all seasonal themes initially
    const themeIds = ['xmas-theme', 'spring-theme', 'summer-theme', 'autumn-theme'];
    themeIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.disabled = true;
        } else {
            console.warn(`Theme element with id '${id}' not found.`);
        }
    });

    // Helper to enable a theme by id, returns true if enabled, false otherwise
    function enableThemeById(id) {
        const el = document.getElementById(id);
        if (el) {
            el.disabled = false;
            return true;
        } else {
            console.warn(`Theme element with id '${id}' not found.`);
            return false;
        }
    }

    // Determine the season and enable the correct theme
    let themeEnabled = false;
    if ((month === 12 && day >= 21) || (month === 1) || (month === 2) || (month === 3 && day <= 19)) {
        // Winter (Xmas)
        themeEnabled = enableThemeById('xmas-theme');
    } else if ((month === 3 && day >= 20) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) {
        // Spring
        themeEnabled = enableThemeById('spring-theme');
    } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 23)) {
        // Summer
        themeEnabled = enableThemeById('summer-theme');
    } else if ((month === 9 && day >= 23) || (month === 10) || (month === 11) || (month === 12 && day <= 20)) {
        // Autumn
        themeEnabled = enableThemeById('autumn-theme');
    }

    // Fallback: if no theme was enabled, enable the first available theme
    if (!themeEnabled) {
        for (const id of themeIds) {
            if (enableThemeById(id)) {
                console.warn(`No seasonal theme enabled; falling back to '${id}'.`);
                break;
            }
        }
    }
}

function createSeapunkVisuals(isXmas = false) {
    const visualsContainer = document.getElementById('default-visuals');
    if (!visualsContainer) return;

    const headerDolphins = document.querySelectorAll('.jumping-dolphin');

    if (isXmas) {
        headerDolphins.forEach(dolphin => dolphin.textContent = '🦌');
        const xmasEmojis = ['🎅', '🎄', '🎁', '🌟'];
        for (let i = 0; i < 15; i++) {
            const xmasElement = document.createElement('div');
            xmasElement.className = 'swimming-dolphin'; // Reuse swimming animation
            xmasElement.textContent = xmasEmojis[Math.floor(Math.random() * xmasEmojis.length)];
            xmasElement.style.left = `${Math.random() * 100}vw`;
            xmasElement.style.top = `${Math.random() * 100}vh`;
            xmasElement.style.animationDuration = `${Math.random() * 10 + 10}s`;
            xmasElement.style.animationDelay = `${Math.random() * 5}s`;
            xmasElement.style.fontSize = `${Math.random() * 20 + 30}px`;
            visualsContainer.appendChild(xmasElement);
        }
    } else {
        headerDolphins.forEach(dolphin => dolphin.textContent = '🐬');
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
}

function activateArtMode() {
    // Clear seapunk visuals
    const defaultVisuals = document.getElementById('default-visuals');
    if (defaultVisuals) defaultVisuals.innerHTML = '';
    const backgroundSwirls = document.querySelector('.background-swirls');
    if (backgroundSwirls) backgroundSwirls.style.display = 'none';

    // Add art mode class to body
    document.body.classList.add('art-mode');

    // Create art canvas
    createArtCanvas();
}

function createArtCanvas() {
    const visualsContainer = document.getElementById('easter-egg-visuals');
    visualsContainer.innerHTML = `
        <div id="art-toolbar">
            <button id="color-black" class="color-swatch active" style="background-color: black;"></button>
            <button id="color-red" class="color-swatch" style="background-color: red;"></button>
            <button id="color-green" class="color-swatch" style="background-color: green;"></button>
            <button id="color-blue" class="color-swatch" style="background-color: blue;"></button>
            <input type="color" id="color-picker" value="#FFFF00">
            <input type="range" id="brush-size" min="1" max="50" value="5">
            <button id="eraser">Eraser</button>
            <button id="clear-canvas">Clear</button>
            <button id="rainbow-brush">Rainbow</button>
            <button id="close-art-mode">❌</button>
        </div>
        <canvas id="art-canvas"></canvas>
    `;

    const canvas = document.getElementById('art-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;
    let brushColor = 'black';
    let brushSize = 5;
    let rainbowMode = false;
    let hue = 0;

    function startPosition(e) {
        drawing = true;
        draw(e);
    }

    function endPosition() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;

        if (rainbowMode) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            hue = (hue + 1) % 360;
        } else {
            ctx.strokeStyle = brushColor;
        }

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.getElementById('art-toolbar').addEventListener('click', (e) => {
        if (e.target.id === 'clear-canvas') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (e.target.id === 'eraser') {
            rainbowMode = false;
            ctx.globalCompositeOperation = 'destination-out';
        }
        if (e.target.id === 'rainbow-brush') {
            rainbowMode = !rainbowMode;
            ctx.globalCompositeOperation = 'source-over';
        }
        if (e.target.id === 'close-art-mode') {
            document.body.classList.remove('art-mode');
            visualsContainer.innerHTML = '';
            createSeapunkVisuals();
            artModeActive = false;
            const backgroundSwirls = document.querySelector('.background-swirls');
            if (backgroundSwirls) backgroundSwirls.style.display = 'block';
        }
    });

    document.getElementById('color-picker').addEventListener('input', (e) => {
        rainbowMode = false;
        brushColor = e.target.value;
        ctx.globalCompositeOperation = 'source-over';
    });

    document.getElementById('brush-size').addEventListener('input', (e) => {
        brushSize = e.target.value;
    });

    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            rainbowMode = false;
            brushColor = e.target.style.backgroundColor;
            ctx.globalCompositeOperation = 'source-over';
            colorSwatches.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    createFlyingToasters();
}

function createFlyingToasters() {
    const visualsContainer = document.getElementById('easter-egg-visuals');
    if (!visualsContainer) return;

    for (let i = 0; i < 10; i++) {
        const toaster = document.createElement('div');
        toaster.className = 'flying-toaster';
        toaster.textContent = '🍞';
        toaster.style.left = `${Math.random() * 100}vw`;
        toaster.style.top = `${Math.random() * 100}vh`;
        toaster.style.animationDuration = `${Math.random() * 10 + 5}s`;
        toaster.style.animationDelay = `${Math.random() * 10}s`;
        visualsContainer.appendChild(toaster);
    }
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
        const triggerAnimation = (e) => {
            // Prevent creating particles in art mode
            if (document.body.classList.contains('art-mode')) return;

            // Determine coordinates based on event type
            let clientX, clientY;
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent potential 300ms delay and double-tap zoom
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else { // click event
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const rect = skill.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            for (let i = 0; i < 20; i++) {
                createParticle(rect.left + x, rect.top + y);
            }
        };
        skill.addEventListener('click', triggerAnimation);
        skill.addEventListener('touchstart', triggerAnimation);
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

function addJobInteractivity() {
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        const triggerAnimation = (e) => {
            if (document.body.classList.contains('art-mode')) return;

            // Determine coordinates based on event type
            let clientX, clientY;
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent potential 300ms delay and double-tap zoom
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else { // click event
                clientX = e.clientX;
                clientY = e.clientY;
            }

            // Create the explosion at the cursor's location
            const x = clientX;
            const y = clientY;

            for (let i = 0; i < 30; i++) {
                createCharacterParticle(x, y);
            }
        };
        job.addEventListener('click', triggerAnimation);
        job.addEventListener('touchstart', triggerAnimation);
    });
}

function createCharacterParticle(x, y) {
    const characters = ['🐬', '✨', '💖', '⭐', '🚀'];
    const character = characters[Math.floor(Math.random() * characters.length)];

    const particle = document.createElement('div');
    particle.className = 'character-particle';
    particle.textContent = character;
    document.body.appendChild(particle);

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;
    const rotation = Math.random() * 720 - 360;

    particle.style.setProperty('--x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
    particle.style.setProperty('--r', `${rotation}deg`);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

function createSnowfall() {
    const visualsContainer = document.getElementById('default-visuals');
    if (!visualsContainer) return;

    // Clear existing visuals
    visualsContainer.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        const size = `${Math.random() * 5 + 2}px`;
        snowflake.style.width = size;
        snowflake.style.height = size;
        visualsContainer.appendChild(snowflake);
    }
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

            const defaultVisuals = document.getElementById('default-visuals');
            if (defaultVisuals) {
                defaultVisuals.innerHTML = ''; // Clear visuals
            }

            if (theme === 'xmas') {
                createSnowfall();
                createSeapunkVisuals(true);
            } else {
                createSeapunkVisuals(false);
            }

            // Re-apply art mode if it was active
            if (artModeActive) {
                 document.body.classList.add('art-mode');
            } else if (matrixModeActive) {
                 document.body.classList.add('matrix-mode');
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