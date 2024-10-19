const quotes = [
    {
      text: "Java is to JavaScript what car is to Carpet.",
      category: "Humor"
    },
    {
      text: "Any application that can be written in JavaScript, will eventually be written in JavaScript.",
      category: "Insight"
    },
    {
      text: "JavaScript is the duct tape of the Internet.",
      category: "Metaphor"
    },
    {
      text: "With JavaScript, you can create amazing things on the web.",
      category: "Inspiration"
    },
    {
      text: "Always bet on JavaScript.",
      category: "Confidence"
    },
    {
      text: "The best way to learn JavaScript is by writing it.",
      category: "Advice"
    },
    {
      text: "JavaScript is the world’s most misunderstood programming language.",
      category: "Criticism"
    },
    {
      text: "JavaScript is the lingua franca of the web.",
      category: "Fact"
    },
    {
      text: "JavaScript is everywhere, and it’s here to stay.",
      category: "Observation"
    },
    {
      text: "Don't fear the semicolon; embrace it!",
      category: "Humor"
    }
  ];

  const showQuoteButton = document.getElementById('newQuote');

  showQuoteButton.addEventListener('click' ,showRandomQuote);

  function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    console.log(`qoute : ${randomQuote.text} , category : ${randomQuote.category}`);
    const quoteDisplay = document.getElementById('quoteDisplay');
    const qouteText = document.createElement('p');
    qouteText.textContent = `quote : ${randomQuote.text}` ;
    const qouteCategory = document.createElement('p');
    qouteCategory.textContent =` Category : ${randomQuote.category}`;

    quoteDisplay.appendChild(qouteText);
    quoteDisplay.appendChild(qouteCategory);
    createAddQuoteForm();


  }
  
  function createAddQuoteForm (){
    const formHtml =  `<div>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  </div>`;

   document.body.innerHTML += formHtml ;
  }