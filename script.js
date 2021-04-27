class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }
}

class Book {
  constructor(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
  }

  toggleIsRead() {
    this.isRead === 'Read' ? (this.isRead = 'Unread') : (this.isRead = 'Read');
  }
}

class DisplayController {
  constructor() {
    this.library = document.getElementById('library');
    this.overlay = document.getElementById('overlay');
    this.newBook = document.getElementById('new-book-button');
    this.cancel = document.getElementById('cancel');
    this.addBook = document.getElementById('add-book');

    this.formTitle = document.getElementById('title');
    this.formAuthor = document.getElementById('author');
    this.formPageCount = document.getElementById('page-count');
    this.formUnReadRadio = document.getElementById('unread-radio');
    this.formError = document.getElementById('input-error');

    this.newBook.addEventListener('click', this.showOverlay.bind(this));
    this.cancel.addEventListener('click', this.hideOverlay.bind(this));
    this.addBook.addEventListener('click', this.readInput.bind(this));
  }

  updateDisplay() {
    console.log(this.library.hasChildNodes());
    this.resetDisplay();

    // Loop over books and create required elements for each property
    for (const index in myLibrary.books) {
      const book = myLibrary.books[index];
      const container = document.createElement('div');
      container.classList.add('book-container');
      for (const property in book) {
        const paragraph = document.createElement('p');
        paragraph.textContent = book[property];
        container.appendChild(paragraph);
      }

      const toggleReadButton = document.createElement('button');
      toggleReadButton.classList.add('read-button');
      toggleReadButton.textContent = 'Toggle Read';
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-book');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        myLibrary.removeBook(index);
        this.updateDisplay();
      });
      toggleReadButton.addEventListener('click', () => {
        book.toggleIsRead();
        this.updateDisplay();
      });

      container.appendChild(toggleReadButton);
      container.appendChild(removeButton);

      this.library.appendChild(container);
      console.log(this.library.hasChildNodes());
    }
  }

  resetDisplay() {
    if (this.library.hasChildNodes()) {
      this.library.textContent = '';
    }
  }

  showOverlay() {
    this.overlay.style.display = 'block';
  }

  hideOverlay() {
    this.overlay.style.display = 'none';
  }

  validateInput(title, author, pageCount) {
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

  resetForm() {
    this.formTitle.value = '';
    this.formAuthor.value = '';
    this.formPageCount.value = '';
    this.formUnReadRadio.checked = true;
    this.formError.textContent = '';
    this.formError.style.display = 'none';
  }

  readInput() {
    const title = this.formTitle.value;
    const author = this.formAuthor.value;
    const pageCount = parseInt(this.formPageCount.value);
    const isRead = document.querySelector('input[name="read-unread"]:checked')
      .value;

    if (this.validateInput(title, author, pageCount)) {
      myLibrary.addBook(new Book(title, author, pageCount, isRead));
      this.resetForm();
      this.updateDisplay();
    }
  }
}

const myLibrary = new Library();
const displayController = new DisplayController();
const testBook = new Book('Linux Adventure', 'Marvin', 452, 'Unread');
myLibrary.addBook(testBook);
displayController.updateDisplay();
