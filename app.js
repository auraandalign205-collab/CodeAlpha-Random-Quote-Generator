const quoteDatabase = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Cybersecurity is not an IT problem, it is a business decision.", author: "Stephane Nappo" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier" },
    { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" }
];

// Tracking buffers to manage navigation sequences
let quoteHistory = [];
let currentHistoryIndex = -1;

const textElement = document.getElementById("quote-text-output");
const authorElement = document.getElementById("quote-author-output");
const randomButton = document.getElementById("trigger-next-quote-btn");
const prevButton = document.getElementById("prev-quote-btn");
const nextButton = document.getElementById("next-quote-btn");

function updateUI(quoteObject) {
    textElement.textContent = `"${quoteObject.text}"`;
    authorElement.textContent = `— ${quoteObject.author}`;
    
    // Toggle active metrics on boundary limitations
    prevButton.disabled = currentHistoryIndex <= 0;
    nextButton.disabled = currentHistoryIndex >= quoteHistory.length - 1;
}

function loadNewRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quoteDatabase.length);
    const selectedQuote = quoteDatabase[randomIndex];
    
    // Clear out forward tracking chains if generating from historical midpoint
    if (currentHistoryIndex < quoteHistory.length - 1) {
        quoteHistory = quoteHistory.slice(0, currentHistoryIndex + 1);
    }
    
    quoteHistory.push(selectedQuote);
    currentHistoryIndex = quoteHistory.length - 1;
    updateUI(selectedQuote);
}

function navigatePrevious() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        updateUI(quoteHistory[currentHistoryIndex]);
    }
}

function navigateNext() {
    if (currentHistoryIndex < quoteHistory.length - 1) {
        currentHistoryIndex++;
        updateUI(quoteHistory[currentHistoryIndex]);
    }
}

// Attach physical interface events
randomButton.addEventListener("click", loadNewRandomQuote);
prevButton.addEventListener("click", navigatePrevious);
nextButton.addEventListener("click", navigateNext);
window.addEventListener("DOMContentLoaded", loadNewRandomQuote);
