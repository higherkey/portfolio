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
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

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

// Toggle vertical page indicators based on scroll position
const mainContent = document.querySelector('.main-content');
function updateVerticalArrows() {
    const topIndicator = document.querySelector('.page-indicator.top');
    const bottomIndicator = document.querySelector('.page-indicator.bottom');
    if (!mainContent || !topIndicator || !bottomIndicator) return;

    // Allow a small 5px buffer
    if (mainContent.scrollTop <= 5) {
        topIndicator.classList.add('hidden');
    } else {
        topIndicator.classList.remove('hidden');
    }
    
    if (mainContent.scrollTop >= mainContent.scrollHeight - mainContent.clientHeight - 5) {
        bottomIndicator.classList.add('hidden');
    } else {
        bottomIndicator.classList.remove('hidden');
    }
}

if (mainContent) {
    mainContent.addEventListener('scroll', updateVerticalArrows);
    window.addEventListener('resize', updateVerticalArrows);
    setTimeout(updateVerticalArrows, 100);
}
