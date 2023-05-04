const myLibrary = [];
const NEW_BOOK_BTN = document.querySelector('.new-book-btn');
const SUBMIT_BTN = document.querySelector('.submit');
const CANCEL_BTN = document.querySelector('.cancel');
const FORM_CONTAINER = document.getElementById('form-container');
const FORM = document.querySelector('form');
const INPUTS = FORM.querySelectorAll('input');
const BOOK_DISPLAY = document.querySelector('.book-display');

// Book constructor
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
  addBookToDisplay();
};

// Take form data and store in myLibrary
function addBookToLibrary() {
  const title = FORM.title.value;
  const author = FORM.author.value;
  const pages = FORM.pages.value;
  const read = FORM.read.checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  FORM_CONTAINER.classList.toggle('hide-display');
}

function addBookToDisplay() {
  BOOK_DISPLAY.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card', 'my-5');
    bookCard.innerHTML = `<div class="card-header">${book.title}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${book.author}</li>
        <li class="list-group-item">${book.pages}</li>
        <li class="list-group-item">${book.read ? 'Read' : 'Not read'}</li>
      </ul>
      <div class="card-footer text-center">
        <button type="button" class="btn toggle-read-btn" data-index="${index}">${book.read ? 'Mark as not read' : 'Mark as read'}</button>
        <button type="button" class="btn delete-btn" data-index="${index}">Remove</button>
      </div>`;
    BOOK_DISPLAY.appendChild(bookCard);

    const toggleReadButton = bookCard.querySelector('.toggle-read-btn');
    toggleReadButton.addEventListener('click', () => {
      book.toggleRead();
    });

    const deleteButton = bookCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      BOOK_DISPLAY.removeChild(bookCard);
      myLibrary.splice(index, 1);
    });
  });
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  addBookToDisplay();
});

function hideForm() {
  FORM_CONTAINER.classList.toggle('hide-display');
  FORM.reset();
}

NEW_BOOK_BTN.addEventListener('click', () => {
  hideForm();
});

CANCEL_BTN.addEventListener('click', () => {
  hideForm();
});

// Disable autocomplete
INPUTS.forEach((input) => input.setAttribute('autocomplete', 'off'));
