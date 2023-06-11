const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector('.popup-box'),
closeIcon = popupBox.querySelector('header i'),
addBtn = popupBox.querySelector("button"),
titleText = popupBox.querySelector("#title-book"),
authorText = popupBox.querySelector("#author-book"),
pagesText = popupBox.querySelector("#page-book"),
statusText = popupBox.querySelector("#read-status");



addBox.addEventListener('click', ()=>{
    popupBox.classList.add('show');
})

closeIcon.addEventListener("click", () =>{
    popupBox.classList.remove("show");
})

addBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    let bookTitle = titleText.value,
    bookAuthor = authorText.value,
    bookPages = pagesText.value,
    bookStatus = statusText.checked;
     
});


let myLibrary = [];

function Book(title, author, pages) {
    this.title = `Book: ${title}`;
    this.author = `Author: ${author}`;
    this.pages = `Pages: ${pages}`;
}

function addBookToLibrary(title, author, pages) {
    let b = new Book(title, author, pages);
    myLibrary.push(b);
    showBooks();
}
