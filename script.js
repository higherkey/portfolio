const slider = document.getElementById('slider');

// Structure of #5 for movement (scroll exactly one card + gap)
function scrollSlider(direction, evt) {
    if(evt) evt.stopPropagation();
    const col = document.querySelector('.col');
    const style = globalThis.getComputedStyle(slider);
    const gap = Number.parseFloat(style.gap) || 0;
    const scrollAmt = col.clientWidth + gap;
    
    slider.scrollBy({ left: direction * scrollAmt, behavior: 'smooth' });
}

// Click to Focus logic
globalThis.focusCol = function(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}

// Wheel proxy to horizontal scroll
let isWheeling = false;
slider.addEventListener('wheel', (evt) => {
    if (evt.deltaY !== 0) {
        evt.preventDefault();
        if (isWheeling) return;
        isWheeling = true;
        const direction = evt.deltaY > 0 ? 1 : -1;
        scrollSlider(direction, null);
        setTimeout(() => isWheeling = false, 500);
    }
}, { passive: false });

// Initialize column listeners
document.querySelectorAll('.col').forEach(col => {
    col.addEventListener('click', () => focusCol(col));
    
    // Accessibility: make sure links don't trigger column focus if clicked directly
    col.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => e.stopPropagation());
    });
});

// Toggle navigation arrows based on scroll position
function updateArrows() {
    const leftArrow = document.querySelector('.hit-area.left');
    const rightArrow = document.querySelector('.hit-area.right');
    
    if (!leftArrow || !rightArrow) return;

    // Allow a small 5px buffer for precise rounding issues
    if (slider.scrollLeft <= 5) {
        leftArrow.classList.add('hidden');
    } else {
        leftArrow.classList.remove('hidden');
    }
    
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 5) {
        rightArrow.classList.add('hidden');
    } else {
        rightArrow.classList.remove('hidden');
    }
}

slider.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
// Initial check right after fonts/layout load
setTimeout(updateArrows, 100);
