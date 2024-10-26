const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Initialize quotes from local storage or use a default array if not available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { id: 1, text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { id: 2, text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
  { id: 3, text: "Believe you can and you're halfway there.", category: "Inspiration" }
];

// Retrieve the last selected filter from local storage or default to 'all'
let selectedCategory = localStorage.getItem('lastSelectedFilter') || 'all';

// Display a random quote based on the selected category filter
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const categoryFilter = document.getElementById('categoryFilter').value;

  const filteredQuotes = categoryFilter === 'all' ? quotes : quotes.filter(q => q.category === categoryFilter);
  
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes available in this category.</p>`;
  } else {
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
  }
}

// Save quotes and selected category filter to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
  localStorage.setItem('lastSelectedFilter', selectedCategory);
}

// Add a new quote and sync it to the server
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
    alert("Both quote text and category are required!");
    return;
  }

  const newQuote = { id: Date.now(), text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  syncQuotes();  // Sync local quotes with server
  saveQuotes();
  populateCategories();

  document.getElementById('newQuoteText').value = "";
  document.getElementById('newQuoteCategory').value = "";
  alert("New quote added successfully!");
}

// Populate the category dropdown dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = selectedCategory;
}

// Filter quotes based on selected category
function filterQuotes() {
  selectedCategory = document.getElementById('categoryFilter').value;
  showRandomQuote();
  saveQuotes();
}

// Central sync function to fetch and resolve conflicts with server data
function syncQuotes() {
  fetchQuotesFromServer();
}

// Fetch quotes from the "server"
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    resolveConflicts(serverQuotes);
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Sync a new local quote to the server
async function syncLocalToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });
    console.log('Quote synced to server:', quote);
  } catch (error) {
    console.error('Error syncing quote to server:', error);
  }
}

// Resolve conflicts between local and server data
function resolveConflicts(serverQuotes) {
  let isConflict = false;

  serverQuotes.forEach(serverQuote => {
    const localQuote = quotes.find(q => q.id === serverQuote.id);

    if (localQuote && localQuote.text !== serverQuote.text) {
      Object.assign(localQuote, serverQuote); // Overwrite with server data
      isConflict = true;
    } else if (!localQuote) {
      quotes.push(serverQuote); // Add missing server quote locally
    }
  });

  if (isConflict) {
    notifyUser('Conflicts resolved with server data.');
    saveQuotes();
    populateCategories();
  }
}

// Display notification messages
function notifyUser(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => document.body.removeChild(notification), 5000);
}

// Export quotes to a JSON file
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

// Import quotes from a JSON file
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
setInterval(syncQuotes, 30000); // Sync with server every 30 seconds
