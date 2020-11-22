const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = haveRead;
}

Book.prototype.createHTMLElement = function (key) {
  const element = document.createElement('p');
  switch (key) {
    case 'title':
      element.innerHTML = `<p><strong>${this.title}</strong></p>`;
      break;
    case 'author':
      element.innerHTML = `<p>${this.author}</p>`;
      break;
    case 'pageCount':
      element.innerHTML = `<p>${this.pageCount} Pages</p>`;
      break;
    case 'haveRead':
      const read = this.haveRead ? 'Read' : 'Unread';
      element.innerHTML = `<button id="read-button">${read}</button>`;
      break;
  }
  return element;
};

function addBookToLibrary(title, author, pageCount, haveRead) {
  myLibrary.push(new Book(title, author, pageCount, haveRead));
}
