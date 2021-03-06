const addTaskBtn = document.querySelector('.add-btn'),
      searchTaskBtn = document.querySelector('.search-btn'),
      searchInput = document.querySelector('.search-inp'),
      createTaskBtn = document.querySelector('.arrow-btn');

// get All Tasks

function getAllTasks() {
    let todoArr = [];
    let todosList = localStorage.getItem('todo');
    if (todosList !== null) {
        todoArr = JSON.parse(todosList);
    }
    return todoArr;
}

// hide Create/Edit (Textarea Window)

function hideAppTextarea() {
    if (document.querySelector('.app-box').classList.contains("hide-box")) {
        document.querySelector('.app-box').classList.remove("hide-box");
        document.querySelector('.text-box').classList.add("hide-box");
    }
}

window.addEventListener('load', showTasks, hideAppTextarea);

// open page of Create/Edit (Textarea Window) and take Content of Task

function dispCreateNote() {
    getTaskContent();
    displayTaskInput();
}

// open/close page of Create/Edit (Textarea Window)

function displayTaskInput() {

    const appContainer = document.querySelector('.app-box');
    const noteContainer = document.querySelector('.text-box');

    if (noteContainer.classList.contains('hide-box')) {
        noteContainer.classList.remove('hide-box');
        appContainer.classList.add('hide-box');
        document.querySelector(".text-cont").focus();
        
    } else {
        noteContainer.classList.add('hide-box');
        appContainer.classList.remove('hide-box');
    }
    
}

// get Content of Task

function getTaskContent() {    
    
    let note = document.querySelector('.text-cont').value;
    let todoArray = getAllTasks();

    if (note !== "") {
        
        todoArray.unshift(note);

        localStorage.setItem('todo', JSON.stringify(todoArray));
    
        showTasks();    
        resetTaskContent();

    }

    hideAppTextarea();
    
}

// Clear Task value (Textarea Window)

function resetTaskContent() {

    document.querySelector('.text-cont').value = "";

}

// Create Visible Tasks
function showTasks() {

    let listContainer = document.querySelector('.list-container');
    let todoArray = getAllTasks();

    let html = `<div>`;

    for (let i = 0; i < todoArray.length; i++) {
        let taskFromArr;
        let truncatLen = 0;

        if (window.innerWidth > 700) {
            truncatLen = 150;
        }   else {
            truncatLen = 50;
        }

        if (todoArray[i].length > truncatLen) {
            let lastIdx = todoArray[i].substr(0, truncatLen).lastIndexOf(" ");
            taskFromArr = todoArray[i].substr(0, lastIdx) + "...";
        } else {
            taskFromArr = todoArray[i];
        }

        zInd = 1000 - 2*i;
        html +=

        `<div id='${i}' class="list-item" style="z-index: ${zInd}">
            <div class="note-item">${taskFromArr}
            </div>
            <div class="submenu-item">
                <img src="icons/menu-dots-icon.svg">
            </div>
            <div class="submenu">
                <div class="submenu-option edit">
                    <img src="icons/pencil-icon.svg">
                </div>
                <hr>
                <div class="submenu-option delete">
                    <img src="icons/trash-icon.svg">
                </div>
            </div>
        </div>`
    }
    html += `</div>`;

    listContainer.innerHTML = html;

    addSubmenuListeners();
    hideAppTextarea();
}

// add listeners to Submenu Buttons

function addSubmenuListeners() {
    let subenuBtn = document.querySelectorAll(".submenu-item");
    let taskSubmDel = document.querySelectorAll(".delete");
    let taskSubmEdit = document.querySelectorAll(".edit");
    subenuBtn.forEach(x => x.addEventListener("click", dispSubmenuBtns));
    taskSubmDel.forEach(y => y.addEventListener("click", removeTask));
    taskSubmEdit.forEach(z => z.addEventListener("click", changeArrowListener));
}

// change Task Input and choice Add/Replace Task

function changeArrowListener() {

    createTaskBtn.addEventListener('click', getTaskContent);
    let evTarg = this;

    if (evTarg.classList.contains("edit")) {

        let task = evTarg.parentNode.parentNode;

        editTaskContent(task);

    } else {   
        dispCreateNote();        
    }
}

// take Text to Task Input and Replace Task

function editTaskContent(e) {

    let todoArray = getAllTasks();  
    let id = e.id;
    document.querySelector('.text-cont').value = todoArray[id];

    todoArray.splice(id, 1);

    localStorage.setItem('todo', JSON.stringify(todoArray));

    displayTaskInput();

}

// show/hide Submenu Buttons

function dispSubmenuBtns() {          
    if (this.parentNode.lastElementChild.style.display === 'none') {
        this.parentNode.lastElementChild.style.display = 'flex';
    } else {
        this.parentNode.lastElementChild.style.display = 'none';
    }    
}

// Remove Task

function removeTask() {

    let item = this.parentNode.parentNode;
    let itemID = item.id;
    let todoArray = getAllTasks();

    todoArray.splice(itemID, 1);

    localStorage.setItem('todo', JSON.stringify(todoArray));

    showTasks();

}

// display Search Task Input

function displSearchInput() {

    if (!searchInput.classList.contains("show-inp")) {
        searchInput.classList.add("show-inp");
        searchInput.focus();
    } else {
        searchInput.classList.remove("show-inp");
        searchInput.value = "";
        
        let taskArray = document.querySelectorAll(".list-item");        
        taskArray.forEach(x => x.style.display = "flex");
                
    }
}

function findTask() {

    let inputValue = searchInput.value.toUpperCase();
    let taskArray = document.querySelectorAll(".list-item");   
        
    taskArray.forEach(x => {
            
        let txtCont = x.querySelector(".note-item").innerHTML.toUpperCase();
    
        if (txtCont.indexOf(inputValue) == -1) {
            x.style.display = "none";
        } else {
            x.style.display = "flex";
        }

    })        

}

// --- ADD LISTENERST TO BUTTONS ---

searchTaskBtn.addEventListener('click', displSearchInput);
addTaskBtn.addEventListener('click', changeArrowListener);
searchInput.addEventListener('keyup', findTask);