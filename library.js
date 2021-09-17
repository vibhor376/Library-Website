
//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor

function Display() {

}

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    return true;
}

// Add methods to display prototype 
Display.prototype.add = function (book) {
    // console.log('Adding');
    // console.log(book.name);
    let elm = localStorage.getItem('books');
    if (elm == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(elm);
    }
    let bookLibrary = {
        name: book.name,
        author: book.author,
        type: book.type
    }
    booksObj.push(bookLibrary);
    localStorage.setItem('books', JSON.stringify(booksObj));
}
Display.prototype.showBooks = function (book) {
    let elm = localStorage.getItem('books');
    if (elm == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(elm);
    }
    // console.log(booksObj);
    let element = document.getElementById('rowsToAdd');
    let html="";
    for (let i = 0; i < booksObj.length; i++) {
        html += `<tr class="bookSearch">
            <th scope="row">${i+1}</th>
            <td class="bookName">${booksObj[i].name}</td>
            <td class="bookAuthor">${booksObj[i].author}</td>
            <td class="bookType">${booksObj[i].type}</td>
            <td><button type="submit" class="btn btn-primary deleteBook" onclick="deleteThisRow(this.id)" id=${i}>Delete Book</button></td>
        </tr>
        `;
    }
    if(booksObj.length!=0){
        element.innerHTML=html;
    }else{
    element.innerHTML=``;
    }
}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
let deleteBook=document.getElementsByClassName('deleteBook');
// console.log(deleteBook);
function deleteThisRow(index) {
    let elment = localStorage.getItem('books');
    if (elment == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(elment);
    }
    // console.log(book.name);
    booksObj.splice(index,1);
    localStorage.setItem('books',JSON.stringify(booksObj));
    let dp=new Display(),bk=new Book(name,author,type);
    dp.showBooks(bk);
}
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function (e) {
    console.log('Fire');
    let val = searchText.value.toLowerCase();// converts value of text to be searched into lower case
    let bookSearch=document.getElementsByClassName('bookSearch');
    // console.log(bookSearch);
    Array.from(bookSearch).forEach(function (element) {
        console.log(element);
        let text=element.innerText.toLowerCase();
        if (!text.includes(val) ) {
            element.style.display = "none";
        } 
        // console.log(element.innerText);   
    })
})
Display.prototype.show = function (type, message) {
    let alertMessage = "";
    alertMessage +=`
    <div class="alert alert-dismissible fade show alert-${type}" role="alert">
    <strong>Message: </strong>${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    let element = document.getElementById('alert');
    element.innerHTML = alertMessage;
    setTimeout(function () {
        element.innerHTML = '';
    }, 2000);
}
let dp=new Display(),bk=new Book(name,author,type);
dp.showBooks(bk);
// Add submit event listner to form 
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();//Avoid default behaviour of form which is to reload the webpage
    // console.log('You have submited');
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let type = document.getElementById('type');
    let fantasy = document.getElementById('fantasy');
    let horor = document.getElementById('horor');
    let historicFiction = document.getElementById('historicFiction');
    let romance = document.getElementById('romance');
    let comicBook = document.getElementById('comicBook');
    let scienceFiction = document.getElementById('scienceFiction');
    if (scienceFiction.checked) {
        type = scienceFiction.value;
    } else if (comicBook.checked) {
        type = comicBook.value;
    } else if (romance.checked) {
        type = romance.value;
    } else if (fantasy.checked) {
        type = fantasy.value;
    } else if (historicFiction.checked) {
        type = historicFiction.value;
    } else if (horor.checked) {
        type = horor.value;
    }
    let book = new Book(name, author, type);
    // console.log(name, author, type);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.showBooks(book);
        display.clear();
        index++;
        display.show('success', 'Your book is succesfully added');
    } else {
        display.show('danger', 'Sorry you cannot add this book because you have not filled all the fields');
    }
}

// Features to add:
// 1)Store all the data to local storage 
// 2)Give delete option 
// 3)Add a Scroll bar to the view 