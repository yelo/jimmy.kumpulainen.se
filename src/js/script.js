(function () {
    var sessionStart = new Date();

    var clockEl = document.getElementById("status-clock");
    var uptimeEl = document.getElementById("status-uptime");

    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    function updateStatus() {
        if (clockEl) {
            var now = new Date();
            clockEl.textContent = now.getUTCFullYear() + "-" +
                pad(now.getUTCMonth() + 1) + "-" +
                pad(now.getUTCDate()) + " " +
                pad(now.getUTCHours()) + ":" +
                pad(now.getUTCMinutes()) + ":" +
                pad(now.getUTCSeconds()) + " UTC";
        }
        if (uptimeEl) {
            var diff = Math.floor((new Date() - sessionStart) / 1000);
            var h = Math.floor(diff / 3600);
            var m = Math.floor((diff % 3600) / 60);
            var s = diff % 60;
            uptimeEl.textContent = "uptime " + h + "h " + m + "m " + s + "s";
        }
    }

    updateStatus();
    setInterval(updateStatus, 1000);

    var cmdBuffer = "";
    var cmdTimeout = null;
    var consoleEl = document.getElementById("easter-egg-console");

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            cmdBuffer = "";
            if (cmdTimeout) clearTimeout(cmdTimeout);
            return;
        }

        if (e.key.length === 1) {
            cmdBuffer += e.key;
            if (cmdTimeout) clearTimeout(cmdTimeout);
            cmdTimeout = setTimeout(function () { cmdBuffer = ""; }, 2000);

            if (cmdBuffer === ":wq") {
                cmdBuffer = "";
                flashConsole("\":wq\" -- file saved, quitting...");
            }

            if (cmdBuffer === "help") {
                cmdBuffer = "";
                flashConsole("no manual entry for help");
            }
        }
    });

    function flashConsole(msg) {
        if (!consoleEl) return;
        consoleEl.textContent = msg;
        consoleEl.classList.add("show");
        setTimeout(function () {
            consoleEl.classList.remove("show");
        }, 2500);
    }
})();
