


document.addEventListener('DOMContentLoaded', function () {
  let quotes = [
      {
          text: "Java is to JavaScript what car is to Carpet.",
          category: "Humor"
      },
      // Other quotes...
  ];

  getQuotes();
  startPeriodicSync();

  async function postQuoteToServer(newQuote) {
      try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newQuote)
          });

          const postedQuote = await response.json();
          console.log('Quote posted to server:', postedQuote);
          return postedQuote;
      } catch (error) {
          console.error('Error posting quote to server:', error);
      }
  }

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

  function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value.trim();
      const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
      const newQuote = {
          text: newQuoteText,
          category: newQuoteCategory
      };

      // Push the new quote to the local array and save locally
      quotes.push(newQuote);
      saveQuotes();
      displayQuotes(newQuote);

      // Post the new quote to the server
      postQuoteToServer(newQuote);
  }

  function saveQuotes() {
      const stringifyQuotes = JSON.stringify(quotes);
      localStorage.setItem('quoteData', stringifyQuotes);
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

  // Button to add a new quote
  const addQuoteButton = document.getElementById('addQuoteButton');
  addQuoteButton.addEventListener('click', addQuote);
});
