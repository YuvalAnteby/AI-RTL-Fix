function fixRTL() {
    // 1. Fix the AI Output Blocks AND User Messages (Runs on Claude, Gemini, and ChatGPT)
    const outputBlocks = document.querySelectorAll(
        // Claude output
        '.standard-markdown p, .standard-markdown ul, .standard-markdown ol, .standard-markdown li, .standard-markdown h1, .standard-markdown h2, .standard-markdown h3, .standard-markdown h4, .standard-markdown table, ' +
        // Claude User Message
        '[data-testid="user-message"] p, ' + 
        // Gemini output
        '.markdown p, .markdown ul, .markdown ol, .markdown li, .markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown table'
    );
    
    outputBlocks.forEach(block => {
        if (/[\u0590-\u05FF]/.test(block.textContent)) {
            if (block.style.direction !== 'rtl') {
                block.setAttribute('dir', 'rtl');
                block.style.setProperty('direction', 'rtl', 'important');
                block.style.setProperty('text-align', 'right', 'important');
            }
        }
    });

    // 2. Fix the Input Box (Strictly restricted to Claude.ai)
    if (window.location.hostname.includes('claude.ai')) {
        const inputBoxes = document.querySelectorAll('.ProseMirror');
        
        inputBoxes.forEach(box => {
            const textContent = box.textContent || "";
            if (/[\u0590-\u05FF]/.test(textContent)) {
                if (box.style.direction !== 'rtl') {
                    box.setAttribute('dir', 'rtl');
                    box.style.setProperty('direction', 'rtl', 'important');
                    box.style.setProperty('text-align', 'right', 'important');
                }
            } else {
                // Revert to LTR if Hebrew is deleted
                if (box.style.direction === 'rtl') {
                    box.removeAttribute('dir');
                    box.style.removeProperty('direction');
                    box.style.removeProperty('text-align');
                }
            }
        });
    }
}

// Run immediately on load
fixRTL();

// Debounce function to limit how often fixRTL runs
let timeout;
const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    // Wait 100ms after the last DOM change before running
    timeout = setTimeout(fixRTL, 100); 
});

// characterData and subtree are crucial for catching keystrokes
observer.observe(document.body, { childList: true, subtree: true, characterData: true });