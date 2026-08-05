(function () {
    var clockEl = document.getElementById("status-clock");

    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    function updateClock() {
        if (!clockEl) return;
        var now = new Date();
        clockEl.textContent = now.getUTCFullYear() + "-" +
            pad(now.getUTCMonth() + 1) + "-" +
            pad(now.getUTCDate()) + " " +
            pad(now.getUTCHours()) + ":" +
            pad(now.getUTCMinutes()) + ":" +
            pad(now.getUTCSeconds()) + " UTC";
    }

    updateClock();
    setInterval(updateClock, 1000);
})();
