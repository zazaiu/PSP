const API_URL = 'http://localhost:3000/books';

const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');

async function loadBooks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Ошибка загрузки');

    const books = await response.json();
    bookList.innerHTML = '';

    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'border rounded p-3 mb-2';

      bookDiv.innerHTML = `
        <strong>${book.title}</strong><br>
        <em>${book.author}</em><br>
        <button class="btn btn-sm btn-danger mt-2 me-2" data-id="${book.id}" data-action="delete">Удалить</button>
        <button class="btn btn-sm btn-secondary mt-2" data-id="${book.id}" data-action="edit">Редактировать</button>
      `;

      bookList.appendChild(bookDiv);
    });
  } catch (err) {
    bookList.innerHTML = `<p class="text-danger">${err.message}</p>`;
  }
}

addBookForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBook = {
    title: bookTitleInput.value.trim(),
    author: bookAuthorInput.value.trim()
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });

    if (!response.ok) throw new Error('Ошибка при добавлении');
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    loadBooks();
  } catch (err) {
    alert(err.message);
  }
});

bookList?.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;

  if (action === 'delete') {
    if (confirm('Удалить эту книгу?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Не удалось удалить');
        loadBooks();
      } catch (err) {
        alert(err.message);
      }
    }
  }

  if (action === 'edit') {
    const bookDiv = e.target.closest('div');
    const currentTitle = bookDiv.querySelector('strong').innerText;
    const currentAuthor = bookDiv.querySelector('em').innerText;

    const newTitle = prompt('Новое название:', currentTitle);
    const newAuthor = prompt('Новый автор:', currentAuthor);

    if (newTitle && newAuthor) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle, author: newAuthor })
        });
        if (!response.ok) throw new Error('Ошибка при редактировании');
        loadBooks();
      } catch (err) {
        alert(err.message);
      }
    }
  }
});

loadBooks();
