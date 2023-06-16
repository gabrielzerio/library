const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector('.popup-box'),
    popupTitle = popupBox.querySelector(".content header p"),
    closeIcon = popupBox.querySelector('header i'),
    addBtn = popupBox.querySelector("button"),
    titleText = popupBox.querySelector("#title-book"),
    authorText = popupBox.querySelector("#author-book"),
    pagesText = popupBox.querySelector("#page-book"),
    statusText = popupBox.querySelector("#read-status");


const indexA = () => {
    let indexArray;
    const setIndexArray = (x) => {
        indexArray = x;
    }
    const getIndexArray = () => indexArray;
    return { setIndexArray, getIndexArray };
}

const indexArray = indexA(); 

let myLibrary = JSON.parse(localStorage.getItem("books") || "[]");
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


function showBooks() {
    document.querySelectorAll(".card").forEach(card => card.remove());
    myLibrary.forEach((book, index) => {
        let status = (book.readStatus == true) ? 'read' : '';
        let statusP = (book.readStatus == true) ? 'READ' : 'NOT<br>READ';

        let tag = `<li class="card">
                <div class="details">
                    <p>Book: ${book.title}</p>
                    <p>Author ${book.author}</p>
                    <p>Pages: ${book.pages}</p>
                    <p class="book-status ${status}">${statusP}</p>
                </div>
                <div class="bottom-content">
                    <p></p>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li onclick="editBook(${index}, '${book.title}', '${book.author}', '${book.pages}', ${book.readStatus})" ><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteBook(${index})" ><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`;
        addBox.insertAdjacentHTML("afterend", tag);
    });
}
showBooks(); //when DOM loads, it loads all books

function addBookToLibrary(option) {
    let bookTitle = titleText.value,
        bookAuthor = authorText.value,
        bookPages = pagesText.value,
        bookStatus = statusText.checked;
    if (option == 'new') {
        if (bookTitle && bookAuthor && bookPages) {
            let book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
            myLibrary.push(book);
            localStorage.setItem("books", JSON.stringify(myLibrary));
        }
    } else {
        if (bookTitle && bookAuthor && bookPages) {
            myLibrary[indexArray.getIndexArray()].title = titleText.value;
            myLibrary[indexArray.getIndexArray()].author = authorText.value;
            myLibrary[indexArray.getIndexArray()].pages = pagesText.value;
            myLibrary[indexArray.getIndexArray()].readStatus = statusText.checked;
            localStorage.setItem("books", JSON.stringify(myLibrary));
        }
    }
}

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    localStorage.setItem("books", JSON.stringify(myLibrary));
    showBooks();
}

function editBook(index, title, author, pages, status) {
    addBox.click();
    indexArray.setIndexArray(index);
    //console.log(index, title, author, pages, status);
    titleText.value = title;
    authorText.value = author;
    pagesText.value = pages;
    statusText.checked = status;
    addBtn.innerText = "Update Book";
    popupTitle.innerText = "Edit the Book";
}

function showMenu(element) {
    element.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if (e.target.tagName != "I" || e.target != element) {
            element.parentElement.classList.remove('show');
        }
    })
}
function cleanTexts() {
    titleText.value = '';
    authorText.value = '';
    pagesText.value = '';
    statusText.checked = false;
}
function insertBook(option) {
    addBookToLibrary(option);
    showBooks();
    closeIcon.click();
}
//////////////////// - EVENT LISTENERS - ///////////

addBox.addEventListener('click', () => {
    titleText.focus();
    popupBox.classList.add('show');
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show");
    popupTitle.innerText = 'Add a new Book';
    addBtn.innerText = 'Add Book';
    cleanTexts();
})

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let option = 'new';
    if (popupTitle.textContent.includes('Edit')) {
        option = 'edit'
    }
    insertBook(option);
});
