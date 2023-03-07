let myLibrary = [];
let categories = [
                    ['author','text','What is the book\'s author?'],
                    ['title','text','What is the title of the book?'],
                    ['pages','number','How many pages does this book have?'], 
                    ['read','checkbox','Check this box if you read this book']
                ];
const booksContainer = document.querySelector('.books-container');
const addNewBookButton = document.querySelector('.new-book');
const formContainer = document.querySelector('.form-container');
const header = document.querySelector('h2.header')
/*
function Book(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}*/

class Book {
    constructor(author, title, pages, read){
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(bookObject){
    myLibrary.push(bookObject);
    designBookshelf();
}

function designBookshelf(){
    booksContainer.innerHTML = '';
    for (let idx in myLibrary){
        book = myLibrary[idx]
        bookDiv = document.createElement('div');
        bookDiv.classList.add('book',idx);
        bookContent = document.createElement('div');
        bookContent.classList.add('book-content');
        if (book.read){
            bookContent.classList.add('read');
        }
        bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = `${book.title}`;
        bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = `${book.author}`;
        bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;
        bookContent.appendChild(bookTitle);
        bookContent.appendChild(bookAuthor);
        bookContent.appendChild(bookPages);
        bookDiv.appendChild(bookContent);

        bookReadDiv = document.createElement('div');
        bookReadDiv.classList.add('book-read');
        bookReadButton = document.createElement('button');
        bookReadButton.textContent = book.read ? 'Mark book as unread' : 'Mark book as read';
        bookReadButton.addEventListener('click',(event)=>changeReadStatus(event,idx));
        bookReadDiv.appendChild(bookReadButton);
        deleteBookButton = document.createElement('button');
        deleteBookButton.textContent = 'Delete book';
        deleteBookButton.addEventListener('click',(event) => deleteBookFromLibrary(event,idx));
        bookReadDiv.appendChild(deleteBookButton);
        bookDiv.appendChild(bookReadDiv);
        booksContainer.appendChild(bookDiv);
    }
}


function deleteBookFromLibrary(event,idx){
    if (confirm(`Are you sure you want to delete ${myLibrary[idx].title}?`)){
        myLibrary.splice(idx,1);
        if (myLibrary.length === 0){
            booksContainer.classList.add('hidden');
        } else {
            designBookshelf();
        }
    }
}

function changeReadStatus(event,idx){
    book = myLibrary[idx]
    if (book.read){
        book.read = false;
    } else {
        book.read = true;
    }
    designBookshelf();
}




function createNewBookForm(){
    formContainer.innerHTML = '';
    formContainer.classList.remove('hidden');
    formContainer.classList.add('open');
    formTitle = document.createElement('h2');
    formTitle.textContent = 'Form to Add Book Into Library';
    formContainer.appendChild(formTitle);
    addNewBookForm = document.createElement('form');
    addNewBookForm.id = 'new-book-form';
    addNewBookForm.addEventListener('submit', stopFormFromRefreshingPage);
    addNewBookForm.addEventListener('submit',submitBookForm);
    for (let category of categories){
        categoryName = category[0];
        categoryType = category[1];
        newFormRow = document.createElement('div');
        newFormRow.classList.add('new-form-row');
        formQuestion = document.createElement('p');
        formQuestion.textContent = category[2];
        newFormLabel = document.createElement('label');
        newFormLabel.htmlFor = categoryName;
        newInputField = document.createElement('input');
        newInputField.id = categoryName;
        newInputField.type = categoryType;
        if (categoryType !== 'checkbox'){
            newInputField.setAttribute('required','');
        }
        newFormRow.appendChild(formQuestion);
        newFormRow.appendChild(newFormLabel);
        newFormRow.appendChild(newInputField);
        addNewBookForm.appendChild(newFormRow);
    }
    submitNewBookButton = document.createElement('button');
    submitNewBookButton.type = 'submit';
    submitNewBookButton.textContent = 'Add book to library!';
    addNewBookForm.appendChild(submitNewBookButton);
    formContainer.appendChild(addNewBookForm);
    header.parentNode.insertBefore(formContainer,header.nextSibling);
    addNewBookButton.classList.add('hidden');
}

function stopFormFromRefreshingPage(clickEvent) {
    clickEvent.preventDefault();
}

function submitBookForm(){
    bookObjectList = [];
    for (category of categories){
        categoryName = category[0];
        document.getElementById(categoryName).type === 'checkbox' ?
            bookObjectList.push(document.getElementById(categoryName).checked) :
            bookObjectList.push(document.getElementById(categoryName).value)
    }
    newBook = new Book(bookObjectList[0],bookObjectList[1],bookObjectList[2],bookObjectList[3]);
    addBookToLibrary(newBook);
    formContainer.classList.add('hidden');
    addNewBookButton.classList.remove('hidden');
    booksContainer.classList.remove('hidden');
}

addNewBookButton.addEventListener('click',createNewBookForm)

const harrypotter = new Book('JK Rowling','Harry Potter', 400, true);
const gamethrones = new Book('Martin','Game Thrnoens', 210, true);