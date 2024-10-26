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
  
  // Function to dynamically create the form for adding new quotes
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    // Create input for new quote text
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
    formContainer.appendChild(quoteInput);
  
    // Create input for new quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    formContainer.appendChild(categoryInput);
  
    // Create button to add the new quote
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    formContainer.appendChild(addButton);
  
    // Append the form container to the body or any specific element
    document.body.appendChild(formContainer);
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
  
  // Call createAddQuoteForm to initialize the form on page load
  createAddQuoteForm();
  