document.addEventListener('DOMContentLoaded', function () {
  let quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      category: "Inspiration"
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      category: "Motivation"
    },
    {
      text: "Don’t let yesterday take up too much of today.",
      category: "Advice"
    },
    {
      text: "If you set your goals ridiculously high and it’s a failure, you will fail above everyone else’s success.",
      category: "Aspiration"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      category: "Dreams"
    },
    {
      text: "You only live once, but if you do it right, once is enough.",
      category: "Life"
    },
    {
      text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
      category: "Action"
    }
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
    } catch (error) {
      console.error('Error posting quote to server:', error);
    }
  }
  function FilterQuotes(param){
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = '';
    const quotesByCategory = quotes.filter(quote => quote.category === param);
    quotesByCategory.forEach(quote =>displayQuotes(quote) );
    
    localStorage.setItem('storedCategory' , JSON.stringify(quotesByCategory));
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

  function startPeriodicSync() {
      setInterval(async () => {
          const serverQuotes = await fetchQuotesFromServer();
          syncQuotes(serverQuotes);
      }, 60000);
  }

  function fetchQuotesFromServer() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .catch(error => console.error('Error fetching server data:', error));
  }

  function syncQuotes(serverQuotes) {
      const storedQuotes = JSON.parse(localStorage.getItem('quoteData')) || [];

      serverQuotes.forEach(serverQuote => {
          const localQuote = storedQuotes.find(quote => quote.text === serverQuote.text);
          if (!localQuote) {
            alert('Quotes synced with server!');
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
      return serverQuote; // Server data takes precedence
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

  // Function to add new quotes
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (newQuoteText && newQuoteCategory) {
      const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
      };
      
      // Add to local array and display
      quotes.push(newQuote);
      displayQuotes(newQuote);
      localStorage.setItem('quoteData', JSON.stringify(quotes));

      // Post the new quote to the server
      postQuoteToServer(newQuote);
    }
  }
  function filtedQoute(param){
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = '';
    const quotesByCategory = quotes.filter(quote => quote.category === param);
    quotesByCategory.forEach(quote =>displayQuotes(quote) );
    
    localStorage.setItem('storedCategory' , JSON.stringify(quotesByCategory));
  }
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.addEventListener('change', function(event){
    const selectedCategory = event.target.value ; 
    displayByCategory(selectedCategory);


  // function filterQuote(){
  //   const index = Math.floor(Math.random * quotes.length);
  //   let filtedQoutes = quotes[index] ;
  //   quotes = filtedQoutes ;
  // }

  // Add event listener for the addQuote function
  const addQuoteButton = document.getElementById('addQuoteButton');
  addQuoteButton.addEventListener('click', addQuote);

});
