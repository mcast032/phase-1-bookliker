let currentUser = {"id": 11, "username": "Mario" }

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

function renderBookList(books) {
    const list = document.getElementById('list');
    list.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book.title;
        list.appendChild(li);
        li.addEventListener('click', () => {
            showBookDetails(book);
        });
       
    });
}

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
    userList.id = "users"
    book.users.forEach(user => {
        const userLi = document.createElement('li');
        userLi.textContent = user.username;
        userList.appendChild(userLi);
    });
    

    const likeButton = document.createElement('button');

    likeButton.textContent = "LIKE"
    
    showPanel.appendChild(title);
    showPanel.appendChild(thumbnail);
    showPanel.appendChild(description);
    showPanel.appendChild(userList);
    showPanel.appendChild(likeButton);
    likeButton.addEventListener('click', () => {
        console.log(book)
        if(!book.users.find(user => user.username === currentUser.username)){

            const newLikes = [...book.users, currentUser]
            // const updatedBook = {...book, users: newLikes}
    
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ users: newLikes})
            })
            .then(response => response.json())
            .then(updatedBook => {
                
                // showBookDetails(updatedBook);
                const userList = document.querySelector('#users');
                // userList.innerHTML = ""
                // updatedBook.users.forEach(user => {
                    const userLi = document.createElement('li');
                    userLi.textContent = currentUser.username;
                    userList.appendChild(userLi);
                    console.log(userList)
                // });
            })
            // likeBook(updatedBook);
        }
    });

}
   
   

function likeBook(book){

    




    fetch(`http://localhost:3000/books/${book.id}`, {
        method: PATCH,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: book.users })
    })
    .then(response => response.json())
    .then(updatedBook => {
        debugger
        // showBookDetails(updatedBook);
    })

}