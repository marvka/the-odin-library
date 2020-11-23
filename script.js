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

// Add books from library to library container
function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    for (const key in book) {
      if (book.hasOwnProperty(key)) {
        bookContainer.appendChild(book.createHTMLElement(key));
      }
    }

    libraryContainer.appendChild(bookContainer);
  });
}

function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function initializeEventListeners() {
  // "New Book" button
  document
    .getElementById('new-book-button')
    .addEventListener('click', showOverlay);

  // "Cancel" button
  document.getElementById('cancel').addEventListener('click', hideOverlay);

  // Esc key
  window.addEventListener('keydown', (e) => {
    if (/(Escape)/.test(e.key)) {
      hideOverlay();
    }
  });
}

function validateInput(title, author, pageCount) {
  const errorElement = document.getElementById('input-error');
  if (!title) {
    errorElement.textContent = 'Please enter a title!';
    errorElement.style.display = 'block';
    return false;
  } else if (!author) {
    errorElement.textContent = 'Please enter an author!';
    errorElement.style.display = 'block';
    return false;
  } else if (!pageCount) {
    errorElement.textContent = 'Please enter the number of pages!';
    errorElement.style.display = 'block';
    return false;
  }
  return true;
}
initializeEventListeners();
displayBooks();
