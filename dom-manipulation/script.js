// Array to store quote objects, each with `text` and `category`
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Believe you can and you're halfway there.", category: "Inspiration" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Update the display with the new quote
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
  }
  
  // Function to add a new quote from user input
  function addQuote() {
    // Get the input values
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Validate the inputs
    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
      alert("Both quote text and category are required!");
      return;
    }
    
    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    
    // Clear input fields after submission
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
    
    alert("New quote added successfully!");
  }
  
  // Event listener for 'Show New Quote' button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  