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

Book.prototype.read = function () {

};

// Take form data and store in myLibrary
function addBookToLibrary() {
  const title = FORM.title.value;
  const author = FORM.author.value;
  const pages = FORM.pages.value;
  const read = FORM.read.checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  hideForm();
}

function addBookToDisplay() {
  BOOK_DISPLAY.innerHTML = '';
  myLibrary.map((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card', 'my-5');
    bookCard.innerHTML = `<div class="card-header">${book.title}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${book.author}</li>
        <li class="list-group-item">${book.pages}</li>
        <li class="list-group-item">
          <div class="mb-3 form-check mt-4">
				    <label class="form-check-label" for="read">Read:</label>
				    <input type="checkbox" class="form-check-input" id="read" 
            name="read" ${book.read ? 'checked' : ''}>
			    </div>
        </li>
      </ul>
      <div class="card-footer text-center">
        <button type="button" class="btn delete-btn" data-index="${index}">Remove</button>
      </div>`;
    BOOK_DISPLAY.appendChild(bookCard);
    const deleteButton = bookCard.querySelector('[data-index]');
    deleteButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      bookCard.innerHTML = '';
      bookCard.classList.remove('card', 'my-5');
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
