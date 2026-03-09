const body = document.body;
const hourHand = document.querySelector('.hand-hour');
const minuteHand = document.querySelector('.hand-minute');
const secondHand = document.querySelector('.hand-second');
const modeSwitch = document.querySelector('.mode-switch');

const digitalTimeEl = document.querySelector('#digital-time');
const digitalDateEl = document.querySelector('#digital-date');
const themeButtons = document.querySelectorAll('.theme-btn');

let totalSeconds = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();

// Disable transitions on first load
secondHand.classList.add('no-transition');
minuteHand.classList.add('no-transition');
hourHand.classList.add('no-transition');

const setTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    themeButtons.forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.theme === theme);
    });
};
setTheme(localStorage.getItem('theme') || 'ocean');

themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
    });
});

if (localStorage.getItem('theme') === 'Dark Mode') {
    body.classList.add('dark');
    modeSwitch.textContent = 'Light Mode';
}

const toggleDarkMode = () => {
    const isDarkMode = body.classList.toggle('dark');
    modeSwitch.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('mode', isDarkMode ? 'Dark Mode' : 'Light Mode');
};

modeSwitch.addEventListener('click', toggleDarkMode);

modeSwitch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDarkMode();
    }
});

const updateClock = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours() % 12;

    totalSeconds++;

    const secToDeg = totalSeconds * 6;
    const minToDeg = (totalSeconds % 3600) / 60 * 6;
    const hrToDeg = (totalSeconds % 43200) / 3600 * 30;

    // Remove no-transition class after first update
    if (totalSeconds === 1) {
        secondHand.classList.remove('no-transition');
        minuteHand.classList.remove('no-transition');
        hourHand.classList.remove('no-transition');
    }

    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minToDeg}deg)`;
    hourHand.style.transform = `rotate(${hrToDeg}deg)`;

    if (digitalTimeEl) {
        digitalTimeEl.textContent = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);

        if (digitalDateEl) {
            digitalDateEl.textContent = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                weekday: 'short',
            }).format(date);
        }   
    };
};

setInterval(updateClock, 1000);
updateClock();