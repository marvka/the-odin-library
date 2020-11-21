const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pageCount, haveRead) {
  myLibrary.push(new Book(title, author, pageCount, haveRead));
}
