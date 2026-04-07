function fixRTL() {
    const blocks = document.querySelectorAll(
        '.standard-markdown p, .standard-markdown ul, .standard-markdown ol, .standard-markdown li, .standard-markdown h1, .standard-markdown h2, .standard-markdown h3, .standard-markdown h4, .standard-markdown table, .markdown p, .markdown ul, .markdown ol, .markdown li, .markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown table'
    );
    
    blocks.forEach(block => {
        if (block.style.direction === 'rtl') return;

        if (/[\u0590-\u05FF]/.test(block.textContent)) {
            block.setAttribute('dir', 'rtl');
            block.style.setProperty('direction', 'rtl', 'important');
            block.style.setProperty('text-align', 'right', 'important');
        }
    });
}

// Run immediately on load
fixRTL();

// Debounce function to limit how often fixRTL runs
let timeout;
const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    // Wait 100ms after the last DOM change before running the heavy function
    timeout = setTimeout(fixRTL, 100); 
});

observer.observe(document.body, { childList: true, subtree: true });
