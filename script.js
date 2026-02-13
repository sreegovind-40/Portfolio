// Phase switching
const phaseButtons = document.querySelectorAll('.phase-btn');
const phaseContents = document.querySelectorAll('.phase-content');

phaseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const phase = button.dataset.phase;
        
        // Update buttons
        phaseButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update content
        phaseContents.forEach(content => content.classList.remove('active'));
        document.getElementById(phase).classList.add('active');
        
        // Save current phase
        localStorage.setItem('currentPhase', phase);
    });
});

// Restore last viewed phase
const savedPhase = localStorage.getItem('currentPhase');
if (savedPhase) {
    phaseButtons.forEach(btn => {
        if (btn.dataset.phase === savedPhase) {
            btn.click();
        }
    });
}

// Checklist functionality
const checklistItems = document.querySelectorAll('.checklist li');
const storageKey = 'portfolioChecklist';

// Load saved progress
const savedProgress = JSON.parse(localStorage.getItem(storageKey) || '{}');

checklistItems.forEach((item, index) => {
    const itemId = `item-${index}`;
    
    // Restore checked state
    if (savedProgress[itemId]) {
        item.classList.add('checked');
    }
    
    // Add click handler
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
        
        // Save progress
        savedProgress[itemId] = item.classList.contains('checked');
        localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentBtn = document.querySelector('.phase-btn.active');
        const buttons = Array.from(phaseButtons);
        const currentIndex = buttons.indexOf(currentBtn);
        
        let nextIndex;
        if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % buttons.length;
        } else {
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        
        buttons[nextIndex].click();
    }
});
