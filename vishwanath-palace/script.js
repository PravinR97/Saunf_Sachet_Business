// Copy Prompt Functionality for Review Booster
function copyPrompt(elementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const reviewText = textElement.innerText;

    navigator.clipboard.writeText(reviewText).then(() => {
        alert("Review text copied! Now select Google Maps or Zomato below and paste it in your review.");
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
