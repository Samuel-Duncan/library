const myLibrary = [];
const NEW_BOOK_BTN = document.querySelector('.new-book-btn');
const CANCEL_BTN = document.querySelector('.cancel');
const FORM_CONTAINER = document.getElementById('form-container');
const FORM = document.querySelector('form');
const INPUTS = FORM.querySelectorAll('input');
const BOOK_DISPLAY = document.querySelector('.book-display');

// Book constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
  addBookToDisplay();
};

// Take form data and store in myLibrary
function addBookToLibrary() {
  const {
    title, author, pages, read,
  } = FORM;
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);

  FORM_CONTAINER.classList.toggle('hide-display');
}

function addBookToDisplay() {
  BOOK_DISPLAY.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card', 'my-5');
    bookCard.innerHTML = `<div class="card-header">Title: ${book.title}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: ${book.author}</li>
        <li class="list-group-item">Pages: ${book.pages}</li>
        <li class="list-group-item">Read: ${book.read ? 'Yes' : 'No'}</li>
      </ul>
      <div class="card-footer text-center">
        <button type="button" class="btn toggle-read-btn" data-index="${index}">${book.read ? 'Mark as unread' : 'Mark as read'}</button>
        <button type="button" class="btn delete-btn" data-index="${index}">Remove</button>
      </div>`;
    BOOK_DISPLAY.appendChild(bookCard);

    const toggleReadButton = bookCard.querySelector('.toggle-read-btn');
    toggleReadButton.addEventListener('click', () => {
      book.toggleRead();
    });

    const deleteButton = bookCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      bookCard.remove();
      myLibrary.splice(myLibrary.indexOf(book), 1);
    });
  });
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  addBookToDisplay();
});

// Hide/reset form
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
