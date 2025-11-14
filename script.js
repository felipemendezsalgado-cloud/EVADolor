const slider = document.getElementById('slider');
const bar = document.querySelector('.bar');
const result = document.getElementById('result');
const calculate = document.getElementById('calculate');
const toggleNumbers = document.getElementById('toggle-numbers');
const numbers = document.querySelector('.numbers');

let isDragging = false;
let currentValue = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = bar.getBoundingClientRect();
        let x = e.clientX - rect.left;

        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percent = x / rect.width;
        currentValue = (percent * 10).toFixed(1);
        slider.style.left = `${percent * 100}%`;
    }
});

calculate.addEventListener('click', () => {
    result.textContent = `${currentValue} cm`;
});

toggleNumbers.addEventListener('click', () => {
    numbers.style.display = numbers.style.display === 'none' ? 'flex' : 'none';
});
