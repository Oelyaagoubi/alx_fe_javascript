


document.addEventListener('DOMContentLoaded', function () {
  let quotes =  []  ;

    getQuotes();
    startPeriodicSync();

    function getQuotes() {
        const storedQuotes = localStorage.getItem('quoteData');
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
            loadFromLocalStorage();
        } else {
            loadFromLocalStorage();
        }
        populateCategories();
    }

    function loadFromLocalStorage() {
        quotes.forEach(quote => displayQuotes(quote));
    }

    function startPeriodicSync() {
        setInterval(async () => {
            const serverQuotes = await fetchQuotesFromServer();
            syncWithServer(serverQuotes);
        }, 60000);
    }

    function fetchQuotesFromServer() {
        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .catch(error => console.error('Error fetching server data:', error));
    }

    function syncWithServer(serverQuotes) {
        const storedQuotes = JSON.parse(localStorage.getItem('quoteData')) || [];

        serverQuotes.forEach(serverQuote => {
            const localQuote = storedQuotes.find(quote => quote.text === serverQuote.text);
            if (!localQuote) {
                storedQuotes.push(serverQuote);
                displayQuotes(serverQuote);
            } else if (localQuote.category !== serverQuote.category) {
                const resolvedQuote = resolveConflict(localQuote, serverQuote);
                notifyUser('Conflict detected and resolved.');
                localQuote.category = resolvedQuote.category;
            }
        });

        localStorage.setItem('quoteData', JSON.stringify(storedQuotes));
    }

    function resolveConflict(localQuote, serverQuote) {
        return serverQuote;
    }

    function notifyUser(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 5000);
    }

    function displayQuotes(quote) {
        const quoteDisplay = document.getElementById('quoteDisplay');
        const qouteText = document.createElement('p');
        qouteText.textContent = `quote: ${quote.text}`;
        const qouteCategory = document.createElement('p');
        qouteCategory.textContent = `Category: ${quote.category}`;

        quoteDisplay.appendChild(qouteText);
        quoteDisplay.appendChild(qouteCategory);
    }

    function populateCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

        categoryFilter.innerHTML = '';

        uniqueCategories.map(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
});
