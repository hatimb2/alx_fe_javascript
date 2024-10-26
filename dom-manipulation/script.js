// Initialize quotes from local storage or use default array if not available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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
    
    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
  }
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to add a new quote from user input
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
      alert("Both quote text and category are required!");
      return;
    }
    
    // Add the new quote to the array and save to local storage
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
    
    alert("New quote added successfully!");
  }
  
  // Function to create the form for adding quotes
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
    formContainer.appendChild(quoteInput);
  
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    formContainer.appendChild(categoryInput);
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Function to export quotes to JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format. Please upload a valid JSON file.');
        }
      } catch (error) {
        alert('Error parsing JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for 'Show New Quote' button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Add JSON import/export buttons and file input
  function createImportExportButtons() {
    const importFileInput = document.createElement("input");
    importFileInput.type = "file";
    importFileInput.id = "importFile";
    importFileInput.accept = ".json";
    importFileInput.onchange = importFromJsonFile;
    
    const importButton = document.createElement("button");
    importButton.textContent = "Import Quotes";
    importButton.onclick = () => importFileInput.click();
    
    const exportButton = document.createElement("button");
    exportButton.textContent = "Export Quotes";
    exportButton.onclick = exportToJsonFile;
    
    document.body.appendChild(importButton);
    document.body.appendChild(exportButton);
    document.body.appendChild(importFileInput);
    importFileInput.style.display = "none";
  }
  
  // Initialize the form, buttons, and load last viewed quote from session storage if available
  createAddQuoteForm();
  createImportExportButtons();
  
  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    document.getElementById('quoteDisplay').innerHTML = `<p><strong>${lastViewedQuote.category}:</strong> "${lastViewedQuote.text}"</p>`;
  }
  