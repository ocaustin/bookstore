// Prevent the default form submission behavior and handle the book form submission
document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const reviews = document.getElementById("reviews").value;
    const year = document.getElementById("year").value;

    // Create a book object with form input values
    const book = { title, author, genre, reviews, year };

    // Retrieve books from session storage or initialize an empty array
    let books = JSON.parse(sessionStorage.getItem("books")) || [];

    // Add the new book to the array of books
    books.push(book);

    // Store the updated book list in session storage
    sessionStorage.setItem("books", JSON.stringify(books));

    // Display the updated book catalog
    displayBooks();

    // Reset the form after submission
    document.getElementById("bookForm").reset();
  });

// Function to display books in the catalog
function displayBooks() {
  // Retrieve books from session storage or initialize an empty array if no books are stored
  const books = JSON.parse(sessionStorage.getItem("books")) || [];

  // Get the table body element where book entries will be displayed
  const tableBody = document
    .getElementById("bookTable")
    .getElementsByTagName("tbody")[0];

  // Clear the table body before inserting new entries
  tableBody.innerHTML = "";

  // Loop through each book and add it to the table
  books.forEach(function (book, index) {
    const row = tableBody.insertRow(); // Insert a new row for each book

    // Insert book details into the row cells
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.reviews}</td>
          <td>${book.year}</td>
          <td>
              <button class="edit" onclick="editBook(${index})">Edit</button> <!-- "Edit" button with edit class -->
              <button class="delete" onclick="deleteBook(${index})">Delete</button> <!-- "Delete" button with delete class -->
          </td>
      `;
  });
}

// Function to delete a book entry
function deleteBook(index) {
  let books = JSON.parse(sessionStorage.getItem("books")) || []; // Retrieve books from session storage

  // Remove the book at the specified index
  books.splice(index, 1);

  // Update session storage with the modified book list
  sessionStorage.setItem("books", JSON.stringify(books));

  // Refresh the book catalog display
  displayBooks();
}

// Function to edit a book entry
function editBook(index) {
  let books = JSON.parse(sessionStorage.getItem("books")) || []; // Retrieve books from session storage
  const book = books[index]; // Get the book at the specified index

  // Populate the add book form with the details of the selected book for editing
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("genre").value = book.genre;
  document.getElementById("reviews").value = book.reviews;
  document.getElementById("year").value = book.year;

  // Remove the book from the list temporarily for editing
  books.splice(index, 1);

  // Update session storage with the modified book list
  sessionStorage.setItem("books", JSON.stringify(books));

  // Refresh the book catalog display
  displayBooks();
}

// Display existing books on page load
displayBooks();
