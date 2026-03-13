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

    // If exactly at the top, hide top indicator and show bottom
    if (mainContent.scrollTop <= 1) {
        topIndicator.classList.add('hidden');
        topIndicator.classList.remove('fade-pulse-top');
        bottomIndicator.classList.remove('hidden');
    } 
    // If exactly at the bottom, show top indicator and hide bottom
    else if (mainContent.scrollTop >= mainContent.scrollHeight - mainContent.clientHeight - 1) {
        topIndicator.classList.remove('hidden');
        bottomIndicator.classList.add('hidden');
        bottomIndicator.classList.remove('fade-pulse-bottom');
    }
    // If scrolling anywhere in between, hide BOTH instantly
    else {
        topIndicator.classList.add('hidden');
        topIndicator.classList.remove('fade-pulse-top');
        bottomIndicator.classList.add('hidden');
        bottomIndicator.classList.remove('fade-pulse-bottom');
    }
}

if (mainContent) {
    mainContent.addEventListener('scroll', updateVerticalArrows);
    window.addEventListener('resize', updateVerticalArrows);
    setTimeout(() => {
        updateVerticalArrows();
        const topIndicator = document.querySelector('.page-indicator.top');
        const bottomIndicator = document.querySelector('.page-indicator.bottom');
        if (topIndicator && !topIndicator.classList.contains('hidden')) {
            topIndicator.classList.add('fade-pulse-top');
        }
        if (bottomIndicator && !bottomIndicator.classList.contains('hidden')) {
            bottomIndicator.classList.add('fade-pulse-bottom');
        }
    }, 50);
}
