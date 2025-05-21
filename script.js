// Theme toggle
const toggle = document.getElementById('toggleTheme');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
  renderBooks();
  renderResearch();
});

function addBook() {
  const title = document.getElementById('bookInput').value;
  const file = document.getElementById('bookFile').files[0];
  if (!title || !file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    books.push({ title, fileName: file.name, fileData: e.target.result });
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  };
  reader.readAsDataURL(file);
  document.getElementById('bookInput').value = '';
  document.getElementById('bookFile').value = '';
}

function addResearch() {
  const topic = document.getElementById('researchInput').value;
  const file = document.getElementById('researchFile').files[0];
  if (!topic || !file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const research = JSON.parse(localStorage.getItem('research') || '[]');
    research.push({ topic, fileName: file.name, fileData: e.target.result });
    localStorage.setItem('research', JSON.stringify(research));
    renderResearch();
  };
  reader.readAsDataURL(file);
  document.getElementById('researchInput').value = '';
  document.getElementById('researchFile').value = '';
}

function renderBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  books.forEach((book, index) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = book.fileData;
    link.download = book.fileName;
    link.target = '_blank';
    link.textContent = `${book.title} (${book.fileName})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
    };

    li.appendChild(link);
    li.appendChild(delBtn);
    bookList.appendChild(li);
  });
}

function renderResearch() {
  const researchList = document.getElementById('researchList');
  researchList.innerHTML = '';
  const research = JSON.parse(localStorage.getItem('research') || '[]');
  research.forEach((item, index) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.fileData;
    link.download = item.fileName;
    link.target = '_blank';
    link.textContent = `${item.topic} (${item.fileName})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => {
      research.splice(index, 1);
      localStorage.setItem('research', JSON.stringify(research));
      renderResearch();
    };

    li.appendChild(link);
    li.appendChild(delBtn);
    researchList.appendChild(li);
  });
}
