const addBtn = document.querySelector('.add-btn'),
      magnBtn = document.querySelector('.search-btn'),
      searchInput = document.querySelector('.search-inp'),
      arrowBtn = document.querySelector('.arrow-btn'),
      submenuBtn = document.querySelectorAll('.submenu-btn');

// --- MAIN PAGE CODE ---

// display SEARCH INPUT

function displSearching() {

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }

}

// --- EDIT PAGE CODE ---

// open page of CREATE/EDIT NOTE and take CONTENT of note

function createNote() {
    
    getCont();
    dispCreateNote();

}

// open/close page of CREATE/EDIT NOTE

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

// get CONTENT from local storage

function getNotes() {

    let listStorage = localStorage.getItem('todo');

    let list = JSON.parse(listStorage);

    return list;

}

// get CONTENT of NOTE

function getCont() {    
    
    let note = document.querySelector('.text-cont').value;

    if (note === "") {
        return false;
    }

    // let list = getNotes();

    // list.push(note);

    // localStorage.setItem('todo', JSON.stringify(note));

    createVisual(note);

    resetCont();

   // showList();
    
}

// create NOTE design

function createVisual(text) {
    
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

}

// CLEAR NOTE value

function resetCont() {

    document.querySelector('.text-cont').value = "";

}
// open SUBMENU buttons of MAIN PAGE (delete or edit note)

function displSubmenu() {

    const submenu = document.querySelector('.submenu');

        if (sumbenu === this) {

        if (submenu.style.display === 'none') {
            submenu.style.display = 'flex';
        } else {
            submenu.style.display = 'none';
        }

    }

}

// --- ADD LISTENERST TO BUTTONS ---

magnBtn.addEventListener('click', displSearching);
addBtn.addEventListener('click', dispCreateNote);
arrowBtn.addEventListener('click', createNote);

for (var i = 0; i < submenuBtn.length; i++) {

    submenuBtn.addEventListener('click', displSubmenu);

}

