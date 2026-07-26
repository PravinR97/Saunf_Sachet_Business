// Copy Prompt Functionality for Review Booster
function copyPrompt(elementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const reviewText = textElement.innerText;

    navigator.clipboard.writeText(reviewText).then(() => {
        // Updated alert text to match the deep link workflow
        alert("Review text copied! Now select a platform below. Don't forget to paste the text and add your favorite dish at the end!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

// Input Sanitation Utility (XSS Prevention)
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe.replace(/[&<>"']/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[match];
    });
}
