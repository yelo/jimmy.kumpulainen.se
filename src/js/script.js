(function () {
    // Modeline elements
    var clockEl = document.getElementById("modeline-clock");
    var positionEl = document.getElementById("modeline-position");
    var percentageEl = document.getElementById("modeline-percentage");
    var bufferEl = document.querySelector(".buffer");

    // Time formatting
    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    function updateClock() {
        if (!clockEl) return;
        var now = new Date();
        clockEl.textContent = pad(now.getHours()) + ":" +
            pad(now.getMinutes()) + ":" +
            pad(now.getSeconds());
    }

    // Position tracking (simulated based on scroll)
    function updatePosition() {
        if (!positionEl || !bufferEl) return;

        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        // Simulate line number based on scroll position
        var contentHeight = bufferEl.scrollHeight;
        var approximateLine = Math.max(1, Math.ceil((scrollTop / contentHeight) * 100));

        positionEl.textContent = "L" + approximateLine + " C1";

        // Update percentage display
        if (scrollPercent === 0) {
            percentageEl.textContent = "Top";
        } else if (scrollPercent >= 100) {
            percentageEl.textContent = "All";
        } else {
            percentageEl.textContent = scrollPercent + "%";
        }
    }

    // Folding behavior
    function initFolding() {
        var foldButtons = document.querySelectorAll(".org-fold-button");

        foldButtons.forEach(function (button) {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                var section = button.closest(".org-section");
                if (section) {
                    section.classList.toggle("folded");
                    // Update aria-expanded for accessibility
                    var isOpen = !section.classList.contains("folded");
                    button.setAttribute("aria-expanded", isOpen);
                }
            });

            // Tab key handling for folding
            button.addEventListener("keydown", function (e) {
                if (e.key === "Tab") {
                    // Allow default tab behavior but highlight the button
                    var section = button.closest(".org-section");
                    if (section) {
                        button.focus();
                    }
                }
            });
        });

        // Keyboard shortcuts for org-mode navigation
        document.addEventListener("keydown", function (e) {
            // Tab on heading to fold/unfold
            if (e.key === "Tab" && e.target.classList.contains("org-fold-button")) {
                e.preventDefault();
                e.target.click();
            }
        });
    }

    // Initialize on page load
    function init() {
        updateClock();
        updatePosition();
        initFolding();

        setInterval(updateClock, 1000);
        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
