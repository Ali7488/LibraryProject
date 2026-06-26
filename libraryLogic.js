const myLibrary = [];

function Book(title, author, pages, read) {
  //Safety net ensuring we "new" was used when the constructor was called
  if (!new.target) {
    throw new Error("You must use the 'new' operator to call the constructor");
  }

  // Check Parameters are of correct datatype
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("title must be a non-empty string");
  }

  if (typeof author !== "string" || author.trim() === "") {
    throw new Error("author must be a non-empty string");
  }

  if (!Number.isInteger(pages) || pages <= 0) {
    throw new Error("pages must be a positive integer");
  }

  if (typeof read !== "boolean") {
    throw new Error("read must be a boolean");
  }

  // Assign book properties
  this.bookId = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
}

// Book Methods
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "already read." : "not read yet."}`;
};


