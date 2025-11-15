const slider = document.getElementById('slider');
const bar = document.querySelector('.bar');
const result = document.getElementById('result');
const calculate = document.getElementById('calculate');
const toggleNumbers = document.getElementById('toggle-numbers');
const numbers = document.querySelector('.numbers');
const imgSin = document.getElementById('img-sin');
const imgLeve = document.getElementById('img-leve');
const imgModerado = document.getElementById('img-moderado');
const imgSevero = document.getElementById('img-severo');
const imgInsoportable = document.getElementById('img-insoportable');
const painImages = [imgSin, imgLeve, imgModerado, imgSevero, imgInsoportable];

let isDragging = false;
let currentValue = 0;

function mixColor(c1, c2, t) {
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    return `rgb(${r}, ${g}, ${b})`;
}

function gradientColorAt(percent) {
    const green = [0, 128, 0];
    const yellow = [255, 255, 0];
    const red = [255, 0, 0];
    if (percent <= 0.5) {
        const t = percent / 0.5;
        return mixColor(green, yellow, t);
    } else {
        const t = (percent - 0.5) / 0.5;
        return mixColor(yellow, red, t);
    }
}

function rangeIndex(value) {
    const v = typeof value === 'number' ? value : parseFloat(value);
    if (v >= 0 && v < 2.0) return 0;
    if (v >= 2.0 && v < 4.0) return 1;
    if (v >= 4.0 && v < 6.0) return 2;
    if (v >= 6.0 && v < 8.0) return 3;
    return 4;
}

function updateNumberPositions() {
    const numberSpans = numbers.querySelectorAll('span');
    const barWidth = bar.offsetWidth;

    numberSpans.forEach((span) => {
        const value = parseInt(span.textContent, 10);
        const percent = value / 10;
        let position = percent * barWidth;

        span.style.left = `${position}px`;

        if (value === 0) {
            span.style.transform = 'translateX(0)';
        } else if (value === 10) {
            span.style.transform = 'translateX(-100%)';
        } else {
            span.style.transform = 'translateX(-50%)';
        }
    });
}

function updateHighlight(percent, value) {
    const idx = rangeIndex(value);
    const color = gradientColorAt(percent);
    for (let i = 0; i < painImages.length; i++) {
        painImages[i].style.boxShadow = i === idx ? `0 0 0 4px ${color}` : '0 0 0 0 transparent';
    }
}

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
});

slider.addEventListener('touchstart', (e) => {
    isDragging = true;
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

document.addEventListener('touchend', (e) => {
    isDragging = false;
});

function updateSliderPosition(x) {
    const rect = bar.getBoundingClientRect();
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = x / rect.width;
    currentValue = (percent * 10).toFixed(1);
    slider.style.left = `${percent * 100}%`;
    updateHighlight(percent, currentValue);
}

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = bar.getBoundingClientRect();
        let x = e.clientX - rect.left;
        updateSliderPosition(x);
    }
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        e.preventDefault();
        const rect = bar.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        updateSliderPosition(x);
    }
});

bar.addEventListener('click', (e) => {
    const rect = bar.getBoundingClientRect();
    let x = e.clientX - rect.left;
    updateSliderPosition(x);
});

bar.addEventListener('touchstart', (e) => {
    const rect = bar.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    updateSliderPosition(x);
});

calculate.addEventListener('click', () => {
    result.textContent = `${currentValue} cm`;
});

toggleNumbers.addEventListener('click', () => {
    const computedStyle = window.getComputedStyle(numbers);
    const isHidden = computedStyle.display === 'none';
    numbers.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
        updateNumberPositions();
    }
});

window.addEventListener('resize', updateNumberPositions);

(function init() {
    updateSliderPosition(0);
    result.textContent = `${(0).toFixed(1)} cm`;
    updateNumberPositions();
})();
