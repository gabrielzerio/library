const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const btn_add = document.querySelector(".btn-add");
const cards = document.querySelector('.cards');


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

function showBooks(){
    cards.innerText = '';
    let i=0;
    myLibrary.forEach(element => {
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index',i);

        let p = document.createElement('p');
        p.textContent = element.title;

        let p1 = document.createElement('p');
        p1.textContent = element.author;

        let p2 = document.createElement('p');
        p2.textContent = element.pages;

        card.appendChild(p);
        card.appendChild(p1);
        card.appendChild(p2);

        const btnDel = document.createElement('button');
        btnDel.className = 'delete';
        btnDel.textContent = 'Remove';
        btnDel.addEventListener('click', (e) => {
            removeCard(e);
        });
        
        card.appendChild(btnDel);
        cards.appendChild(card); 
        i++;
    }); 
}


function removeCard(e) {
    let index = e.target.parentNode.dataset.index;
    myLibrary.splice(index,1);
    showBooks();    
}

btn_add.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputTitle.value == '' || inputAuthor.value == '' || inputPages.value == '') {
        alert('Algum dos campos está vazio!');
        return;
    }
    addBookToLibrary(title.value, author.value, pages.value);
}, false);


