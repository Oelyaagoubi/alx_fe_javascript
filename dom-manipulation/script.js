
document.addEventListener('DOMContentLoaded', function() {


let quotes =  [
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
  ]  ;
  getQoutes()

 function getQoutes(){
  const storedQuotes = localStorage.getItem('quoteData');
  if(storedQuotes){
    quotes = JSON.parse(storedQuotes);
    LouadFromLocalStorage()
  }else{
    LouadFromLocalStorage()
 }}



  function LouadFromLocalStorage(){
    
    quotes.forEach(quote => {
      desplayQuotes(quote)
    })
  }
  



  const showQuoteButton = document.getElementById('newQuote');
  showQuoteButton.addEventListener('click' ,showRandomQuote);


  function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    const qouteText = document.createElement('p');
    qouteText.textContent = `quote : ${randomQuote.text}` ;
    const qouteCategory = document.createElement('p');
    qouteCategory.textContent =` Category : ${randomQuote.category}`;

    quoteDisplay.appendChild(qouteText);
    quoteDisplay.appendChild(qouteCategory);
    
  }

  function desplayQuotes(qoutes){

    const quoteDisplay = document.getElementById('quoteDisplay');
    const qouteText = document.createElement('p');
    qouteText.textContent = `quote : ${qoutes.text}` ;
    const qouteCategory = document.createElement('p');
    qouteCategory.textContent =` Category : ${qoutes.category}`;

    quoteDisplay.appendChild(qouteText);
    quoteDisplay.appendChild(qouteCategory);
  }
  // createAddQuoteForm();
  
  // function createAddQuoteForm (){
  //   const formHtml =  `<div>
  //   <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
  //   <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
  //   <button onclick="addQuote()">Add Quote</button>
  // </div>`;

  //  document.body.innerHTML += formHtml ;

  // };

  function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const NewObj = {
      text : newQuoteText.value.trim(),
      category : newQuoteCategory.value.trim()
    }

    quotes.push(NewObj);
    SaveQuotes();
    desplayQuotes(NewObj);

  }

  function SaveQuotes(){
    const strigfyQuotes = JSON.stringify(quotes);
    localStorage.setItem('quoteData' , strigfyQuotes);
    console.log(JSON.parse(localStorage.getItem('quoteData')));
  }
 
 
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
  
    // Append the link to the body and click to start download
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
    // Remove the link after download
    document.body.removeChild(downloadLink);
  }
  
  // Add the export button to the HTML
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes as JSON';
  exportButton.onclick = exportQuotes;
  document.body.appendChild(exportButton);
 
  const inputchange = document.getElementById('importFile');
  inputchange.addEventListener('change', importFromJsonFile);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            
            // Ensure imported data is an array
            if (Array.isArray(importedQuotes)) {
                quotes = importedQuotes; // Update the quotes array
                SaveQuotes(); // Save to local storage
                // Clear the display and load the imported quotes
                document.getElementById('quoteDisplay').innerHTML = '';
                LouadFromLocalStorage();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format: Expected an array of quotes.');
            }
        } catch (error) {
            alert('Error importing quotes: ' + error.message);
        }
    };
    
    fileReader.readAsText(event.target.files[0]);
}



});
 