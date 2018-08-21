const addBtn = document.querySelector('.add-btn');
const magnBtn = document.querySelector('.search-btn');
const arrowBtn = document.querySelector('.arrow-btn');
const submenuBtn = document.querySelector('.submenu-item');
const submenu = document.querySelector('.submenu');
const searchInput = document.querySelector('.search-inp');


function createNote() {
    
    getCont();
    dispCreateNote();

}

function dispCreateNote() {

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

function displSearching() {

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }

}

function displSubmenu() {

    if (submenu.style.display === 'none') {
        submenu.style.display = 'flex';
    } else {
        submenu.style.display = 'none';
    }

}

function getCont() {    
    
    let noteCon = document.querySelector('.text-cont').value;

    localStorage.setItem('todo', JSON.stringify(noteCon));

    if (noteCon !== "") {
        noteCon = "";
    }
    
}

magnBtn.addEventListener('click', displSearching);
addBtn.addEventListener('click', dispCreateNote);
arrowBtn.addEventListener('click', createNote);
submenuBtn.addEventListener('click', displSubmenu);