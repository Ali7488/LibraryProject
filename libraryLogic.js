const myLibrary = [];

class Book {
  #bookId;
  #title;
  #author;
  #pages;
  #isRead;

  constructor(title, author, pages, read) {
    this.#bookId = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
  }

  get bookId() {
    return this.#bookId;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get isRead() {
    return this.#read;
  }

  // Check Parameters are of correct datatype in setters
  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("title must be a non-empty string");
    }

    this.#title = value.trim();
  }

  set author(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new TypeError("author must be a non-empty string");
    }

    this.#author = value.trim();
  }

  set pages(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new TypeError("pages must be a positive integer");
    }

    this.#pages = value;
  }

  set isRead(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("read must be a boolean");
    }

    this.#read = value;
  }
}

// Buttons
const addBookBtn = document.getElementById("newBook");
const cancelBtn = document.getElementById("cancelBookBtn");

// Form Values
const bookForm = document.getElementById("bookForm");
const bookDialog = document.querySelector("#bookDialog");

const titleInput = document.querySelector("#bookTitleInput");
const authorInput = document.querySelector("#bookAuthorInput");
const pagesInput = document.querySelector("#bookPagesInput");
const readInput = document.querySelector("#bookReadInput");

// Main Section content and template
const bookCardTemplate = document.getElementById("bookCardTemplate");
const bookGrid = document.getElementById("bookCardGrid");
const noBookScreen = document.querySelector(".noBooks");

addBookBtn.addEventListener("click", (event) => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  bookDialog.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const isRead = readInput.checked;

  addBookToLibrary(title, author, pages, isRead);
  renderLibrary();
  bookForm.reset();
  bookDialog.close();
});

bookGrid.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const card = event.target.closest(".card");
  const bookId = card.dataset.bookId;

  //find index within the array and then delete it and re-render the library
  const bookIndex = myLibrary.findIndex((book) => book.bookId === bookId);

  if (bookIndex === -1) return;

  myLibrary.splice(bookIndex, 1);
  renderLibrary();
});

bookGrid.addEventListener("click", (event) => {
  if (!event.target.classList.contains("mark-btn")) {
    return;
  }

  const card = event.target.closest(".card");
  const bookId = card.dataset.bookId;

  //find the book, then flip the isRead value
  const book = myLibrary.find((book) => book.bookId === bookId);
  if (!book) return;

  book.isRead = !book.isRead;
  renderLibrary();
});

// Library Functions
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
}

// Creates a book Card and adds it to the bookGrid
function createBookCard(book) {
  const cardClone = bookCardTemplate.content.cloneNode(true);

  const card = cardClone.querySelector(".card");
  const title = cardClone.querySelector(".bookTitle");
  const author = cardClone.querySelector(".bookAuthor span");
  const pages = cardClone.querySelector(".bookPages span");
  const status = cardClone.querySelector(".bookRead span");
  const markButton = cardClone.querySelector(".mark-btn");

  card.dataset.bookId = book.bookId;

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  status.textContent = book.isRead ? "Already Read" : "Not Read Yet";

  markButton.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";

  bookGrid.appendChild(cardClone);
}

// Iterates through the myLibrary Array and creates a book for each one
function renderLibrary() {
  bookGrid.textContent = ""; // reset to avoid duplicates

  if (myLibrary.length === 0) {
    noBookScreen.classList.remove("hidden");
    bookGrid.classList.add("hidden");
    return;
  }

  noBookScreen.classList.add("hidden");
  bookGrid.classList.remove("hidden");

  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}
