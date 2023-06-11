const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector('.popup-box'),
    closeIcon = popupBox.querySelector('header i'),
    addBtn = popupBox.querySelector("button"),
    titleText = popupBox.querySelector("#title-book"),
    authorText = popupBox.querySelector("#author-book"),
    pagesText = popupBox.querySelector("#page-book"),
    statusText = popupBox.querySelector("#read-status");


let myLibrary = JSON.parse(localStorage.getItem("books") || "[]");
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


function showBooks(){
    document.querySelectorAll(".card").forEach(card => card.remove());
    myLibrary.forEach((book, index) => {
        let status = (book.readStatus==true)?'checked':'';
        
                let tag = `<li class="card">
                <div class="details">
                    <p>Book: ${book.title}</p>
                    <p>Author ${book.author}</p>
                    <p>Pages: ${book.pages}</p>
                    <div>
                        <input type="checkbox" id="status_book"  ${status}>
                        <label for="">Read?</label>
                    </div>
                </div>
                <div class="bottom-content">
                    <p></p>
                    <div class="settings">
                        <i class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li><i class="uil uil-pen"></i>Edit</li>
                            <li><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`;
            addBox.insertAdjacentHTML("afterend", tag);
    });
}
showBooks(); //when DOM loads, it loads all books

function addBookToLibrary() {
    let bookTitle = titleText.value,
        bookAuthor = authorText.value,
        bookPages = pagesText.value,
        bookStatus = statusText.checked;
    if (bookTitle && bookAuthor && bookPages) {
        let book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
        myLibrary.push(book);
        localStorage.setItem("books", JSON.stringify(myLibrary));
    }
}

function cleanTexts(){
    titleText.value = '';
    authorText.value = '';
    pagesText.value = '';
    statusText.checked = false;
}
//////////////////// - EVENT LISTENERS - ///////////

addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show");
    cleanTexts();
})

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    showBooks();
    closeIcon.click();
});
