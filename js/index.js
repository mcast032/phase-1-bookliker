document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

// Function to fetch books
function fetchBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            renderBookList(books);
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Function to render the book list
function renderBookList(books) {
    const list = document.getElementById('list');
    list.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book.title;
        li.addEventListener('click', () => {
            showBookDetails(book);
        });
        list.appendChild(li);
    });
}

// Function to show book details
function showBookDetails(book) {
    const showPanel = document.getElementById('show-panel');
    showPanel.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = book.title;

    const thumbnail = document.createElement('img');
    thumbnail.src = book.img_url;

    const description = document.createElement('p');
    description.textContent = book.description;

    const userList = document.createElement('ul');
    book.users.forEach(user => {
        const userLi = document.createElement('li');
        userLi.textContent = user.username;
        userList.appendChild(userLi);
    });

    const likeButton = document.createElement('button');
    likeButton.textContent = book.users.some(user => user.id === 1) ? 'Unlike' : 'Like';
    likeButton.addEventListener('click', () => {
        likeBook(book);
    });

    showPanel.appendChild(title);
    showPanel.appendChild(thumbnail);
    showPanel.appendChild(description);
    showPanel.appendChild(userList);
    showPanel.appendChild(likeButton);
}

// Function to like or unlike a book
function likeBook(book) {
    const currentUser = { id: 1, username: 'Mario' };

    const userIndex = book.users.findIndex(user => user.id === currentUser.id);

    if (userIndex === -1) {
        book.users.push(currentUser);
    } else {
        book.users.splice(userIndex, 1);
    }

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: book.users })
    })
    .then(response => response.json())
    .then(updatedBook => {
        showBookDetails(updatedBook);
    })
    .catch(error => console.error('Error liking/un-liking book:', error));
}
