/**
 * Isaac Ahlfield Portfolio 2.0
 * Native MPA + FLIP Modal Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initCards();
    initMobileNav();
    initSidebar();
});

/**
 * Initialize Sidebar (Collapse/Expand)
 */
function initSidebar() {
    const isProjectPage = document.body.classList.contains('page-project-detail');
    
    // Auto-collapse on project pages for focused viewing
    if (isProjectPage) {
        document.body.classList.add('sidebar-collapsed');
    }

    // Load preference from localStorage if not a project page
    if (!isProjectPage) {
        const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (collapsed) document.body.classList.add('sidebar-collapsed');
    }
}

function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
    
    // Save preference (only if not on a project-specific auto-collapsed page)
    if (!document.body.classList.contains('page-project-detail')) {
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('sidebar-collapsed', isCollapsed);
    }
}

/**
 * Initialize Card Expansion with Clone & Grow logic
 */
function initCards() {
    const cards = document.querySelectorAll('.card');
    const backdrop = document.querySelector('.overlay-backdrop');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.modal-close')) return;
            expandCard(card);
        });
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeActiveModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeActiveModal();
    });
}

let activeGhost = null;
let activeSourceCard = null;

function expandCard(card) {
    if (activeGhost) return;

    activeSourceCard = card;
    const first = card.getBoundingClientRect();
    
    // 1. Prepare Ghost
    const ghost = document.createElement('div');
    ghost.className = 'modal-ghost';
    ghost.innerHTML = card.innerHTML; // Clone content
    
    // Position ghost exactly over original card
    ghost.style.top = `${first.top}px`;
    ghost.style.left = `${first.left}px`;
    ghost.style.width = `${first.width}px`;
    ghost.style.height = `${first.height}px`;
    
    document.body.appendChild(ghost);
    activeGhost = ghost;

    // 2. Dim source card (keep in grid)
    card.classList.add('is-active-source');
    document.body.classList.add('modal-open');

    // 3. Calculate destination
    const sidebarW = document.body.classList.contains('sidebar-collapsed') ? 80 : 360;
    const destW = Math.min(800, window.innerWidth * 0.8);
    const destH = Math.min(600, window.innerHeight * 0.7);
    const destTop = (window.innerHeight - destH) / 2;
    const destLeft = sidebarW + (window.innerWidth - sidebarW - destW) / 2;

    // 4. Animate Grow
    ghost.animate([
        {
            top: `${first.top}px`,
            left: `${first.left}px`,
            width: `${first.width}px`,
            height: `${first.height}px`
        },
        {
            top: `${destTop}px`,
            left: `${destLeft}px`,
            width: `${destW}px`,
            height: `${destH}px`
        }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
        fill: 'forwards'
    }).onfinish = () => {
        ghost.classList.add('is-revealed');
        ghost.style.overflowY = 'auto';
        setupFocusTrap(ghost);
        
        // Re-attach close listener to ghost's close button
        const closeBtn = ghost.querySelector('.modal-close');
        if (closeBtn) closeBtn.onclick = closeActiveModal;
    };
}

function closeActiveModal() {
    if (!activeGhost || !activeSourceCard) return;

    const first = activeSourceCard.getBoundingClientRect();
    const ghost = activeGhost;
    
    ghost.classList.remove('is-revealed');
    
    ghost.animate([
        {
            opacity: 1,
            transform: 'scale(1)'
        },
        {
            opacity: 0,
            transform: 'scale(0.95)'
        }
    ], {
        duration: 200,
        easing: 'ease-in',
        fill: 'forwards'
    }).onfinish = () => {
        ghost.remove();
        activeSourceCard.classList.remove('is-active-source');
        document.body.classList.remove('modal-open');
        activeGhost = null;
        activeSourceCard.focus(); // Restore focus
        activeSourceCard = null;
    };
}

/**
 * Accessibility: Focus Trap
 */
function setupFocusTrap(element) {
    const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    first.focus();

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    // Already handled by inline onclick in HTML for simplicity, 
    // but can be extended here if needed.
}
