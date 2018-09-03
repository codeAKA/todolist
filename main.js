const addTaskBtn = document.querySelector('.add-btn'),
      searchTaskBtn = document.querySelector('.search-btn'),
      searchInput = document.querySelector('.search-inp'),
      createTaskBtn = document.querySelector('.arrow-btn');

/*
let todoArr = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];

localStorage.setItem('todo', JSON.stringify(todoArr));
const data = JSON.parse(localStorage.getItem('todo'));

*/

// get All Tasks

function getAllTasks() {
    let todoArr = [];
    let todosList = localStorage.getItem('todo');
    if (todosList !== null) {
        todoArr = JSON.parse(todosList);
    }
    return todoArr;
}




// --- MAIN PAGE CODE ---

// display SEARCH INPUT

function displSearchInput() {

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }

}

// --- EDIT PAGE CODE ---

// open page of CREATE/EDIT NOTE and take CONTENT of note

function dispCreateNote() {
    
    getTaskContent();
    displayTaskInput();

}

// open/close page of CREATE/EDIT NOTE

function displayTaskInput() {

    const appContainer = document.querySelector('.app-box');
    const noteContainer = document.querySelector('.text-box');

    if (noteContainer.classList.contains('hide-box')) {
        noteContainer.classList.remove('hide-box');
        appContainer.classList.add('hide-box');
        
    } else {
        noteContainer.classList.add('hide-box');
        appContainer.classList.remove('hide-box');
    }
    
}

// get CONTENT from local storage

function getList() {

    let listStorage = localStorage.getItem('todo');

    let list = JSON.parse(listStorage);

    return list;

}

// get CONTENT of NOTE

function getTaskContent() {    
    
    let note = document.querySelector('.text-cont').value;
    let todoArr = getAllTasks();

    if (note !== "") {
        
        todoArr.push(note);

        localStorage.setItem('todo', JSON.stringify(todoArr));
    
        showTask(note);
    
        resetTaskContent();

    }
    
}

function showTask(text) {
    
    let listContainer = document.querySelector('.list-container');

    
    listContainer.innerHTML += `<div class="list-item">
    <div class="note-item">${text}
    </div>
    <div class="submenu-item">
        <img src="icons/menu-dots-icon.svg">
    </div>
    <div class="submenu">
        <div class="submenu-option delete">
            <img src="icons/trash-icon.svg">
        </div>
        <hr>
        <div class="submenu-option edit">
            <img src="icons/pencil-icon.svg">
        </div>
    </div>
    </div>`;

    addSubmenuBtnListener();

    displayTaskInput();


}

// Clear Note value

function resetTaskContent() {

    document.querySelector('.text-cont').value = "";

}

// create NOTE design


function addSubmenuBtnListener() {

    submenuBtn = document.querySelectorAll('.submenu-btn');

    for (var i = 0; i < submenuBtn.length; i++) {

        submenuBtn[i].addEventListener('click', displSubmenu);

    }

}


// open Submenu buttons of Main Page (delete or edit note)

function displSubmenu() {

    const submenu = document.querySelectorAll('.submenu');

    if (sumbenu === this) {

        if (submenu.style.display === 'none') {
             submenu.style.display = 'flex';
        } else {
            submenu.style.display = 'none';
        }
    }

}

// --- ADD LISTENERST TO BUTTONS ---

searchTaskBtn.addEventListener('click', displSearchInput);
addTaskBtn.addEventListener('click', dispCreateNote);
createTaskBtn.addEventListener('click', getTaskContent);


