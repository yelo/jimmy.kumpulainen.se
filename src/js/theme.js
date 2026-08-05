(function () {
    const THEME_STORAGE_KEY = "theme-preference";
    const DARK_THEME = "dark";
    const LIGHT_THEME = "light";

    const themeSwitcher = document.getElementById("theme-switcher");
    const htmlElement = document.documentElement;

    const themeIcons = {
        dark: "🌙",
        light: "☀️"
    };

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_THEME : LIGHT_THEME;
    }

    function getSavedTheme() {
        return localStorage.getItem(THEME_STORAGE_KEY);
    }

    function getEffectiveTheme() {
        const saved = getSavedTheme();
        if (saved) {
            return saved;
        }
        return getSystemTheme();
    }

    function setTheme(theme) {
        if (theme === LIGHT_THEME) {
            htmlElement.setAttribute("data-theme", LIGHT_THEME);
        } else {
            htmlElement.removeAttribute("data-theme");
        }
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        updateThemeSwitcher(theme);
    }

    function updateThemeSwitcher(theme) {
        if (!themeSwitcher) return;

        if (theme === LIGHT_THEME) {
            themeSwitcher.innerHTML = `${themeIcons.dark}`;
            themeSwitcher.textContent = "Dark";
        } else {
            themeSwitcher.innerHTML = `${themeIcons.light}`;
            themeSwitcher.textContent = "Light";
        }
    }

    function toggleTheme() {
        const currentTheme = getEffectiveTheme();
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
    }

    function init() {
        const effectiveTheme = getEffectiveTheme();
        setTheme(effectiveTheme);

        if (themeSwitcher) {
            themeSwitcher.addEventListener("click", toggleTheme);
        }

        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        darkModeQuery.addEventListener("change", (e) => {
            if (!getSavedTheme()) {
                const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
                setTheme(newTheme);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
