// Initialize quotes from local storage or use a default array if not available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Believe you can and you're halfway there.", category: "Inspiration" }
  ];
  
  // Retrieve the last selected filter from local storage or default to 'all'
  let lastSelectedFilter = localStorage.getItem('lastSelectedFilter') || 'all';
  
  // Function to display a random quote based on the selected category filter
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const categoryFilter = document.getElementById('categoryFilter').value;
  
    // Filter quotes by selected category or display any random quote if "all" is selected
    const filteredQuotes = categoryFilter === 'all' ? quotes : quotes.filter(q => q.category === categoryFilter);
    
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = `<p>No quotes available in this category.</p>`;
    } else {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
    }
  }
  
  // Function to save quotes and the selected filter to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    localStorage.setItem('lastSelectedFilter', lastSelectedFilter);
  }
  
  // Function to add a new quote and update the dropdown if a new category is introduced
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
      alert("Both quote text and category are required!");
      return;
    }
  
    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
    // Save the updated quotes array
    saveQuotes();
  
    // Clear input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    // Update categories if the new category doesn't already exist
    populateCategories();
    
    alert("New quote added successfully!");
  }
  
  // Function to populate the category dropdown dynamically
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Clear existing options except "all"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Extract unique categories from quotes array
    const categories = [...new Set(quotes.map(q => q.category))];
    
    // Populate dropdown with unique categories
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter
    categoryFilter.value = lastSelectedFilter;
  }
  
  // Function to filter quotes based on selected category and update lastSelectedFilter
  function filterQuotes() {
    lastSelectedFilter = document.getElementById('categoryFilter').value;
    showRandomQuote();
    saveQuotes();
  }
  
  // Function to export quotes to a JSON file
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
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
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
  
  // Initialize the application
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  populateCategories();
  showRandomQuote();
  