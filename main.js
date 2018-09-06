const addTaskBtn = document.querySelector('.add-btn'),
      searchTaskBtn = document.querySelector('.search-btn'),
      searchInput = document.querySelector('.search-inp'),
      createTaskBtn = document.querySelector('.arrow-btn');

// display Search Task Input

function displSearchInput() {
    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }
}

// get All Tasks

function getAllTasks() {
    let todoArr = [];
    let todosList = localStorage.getItem('todo');
    if (todosList !== null) {
        todoArr = JSON.parse(todosList);
    }
    return todoArr;
}

// load all Tasks

function displayAllTasks(){
    let todoArray = getAllTasks();
    todoArray.forEach(x => showTasks(x));
}

// hide Create/Edit (Textarea Window)

function hideAppTextarea() {
    if (document.querySelector('.app-box').classList.contains("hide-box")) {
        document.querySelector('.app-box').classList.remove("hide-box");
        document.querySelector('.text-box').classList.add("hide-box");
    }
}

window.addEventListener('load', displayAllTasks, hideAppTextarea)

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
        
        todoArray.push(note);

        localStorage.setItem('todo', JSON.stringify(todoArray));
    
        showTasks(todoArray[todoArray.length - 1], todoArray.length - 1);
    
        resetTaskContent();

    }

    hideAppTextarea();
    
}

// Clear Task value (Textarea Window)

function resetTaskContent() {

    document.querySelector('.text-cont').value = "";

}

// Create Visible Tasks

function showTasks(text, index) {

    let zIdx = 1000 - index - index; // growing z-index (becouse of display Submenu)
    index = index + ""; // index to string = id
    
    let listContainer = document.querySelector('.list-container');

    let task = document.createElement("div");
    task.className = "list-item";
    task.setAttribute("id", index); // id to delete/edit tasks
    task.style.zIndex = zIdx; // growing z-index (becouse of display Submenu)

    let taskContent = document.createElement("div");
    taskContent.className = "note-item";
    taskContent.textContent = text;

    let subenuBtn = document.createElement("div");
    subenuBtn.className = "submenu-item";

    let dotsImg = document.createElement("img");
    dotsImg.src = "icons/menu-dots-icon.svg";

    let taskSubmenu = document.createElement("div");
    taskSubmenu.className = "submenu";

    let taskSubmDel = document.createElement("div");
    taskSubmDel.className = "submenu-option delete";

    let taskSubmImg1 = document.createElement("img");
    taskSubmImg1.src = "icons/trash-icon.svg";

    let taskSubmEdit = document.createElement("div");
    taskSubmEdit.className = "submenu-option delete";

    let taskSubmImg2 = document.createElement("img");
    taskSubmImg2.src = "icons/pencil-icon.svg";

    let hr = document.createElement("hr");

    taskSubmDel.appendChild(taskSubmImg1);

    taskSubmEdit.appendChild(taskSubmImg2);

    taskSubmenu.appendChild(taskSubmDel);
    taskSubmenu.appendChild(hr);
    taskSubmenu.appendChild(taskSubmEdit);

    subenuBtn.appendChild(dotsImg);

    task.appendChild(taskContent);
    task.appendChild(subenuBtn);
    task.appendChild(taskSubmenu);

    listContainer.appendChild(task);

    subenuBtn.addEventListener("click", dispSubmenyBtns);
    taskSubmDel.addEventListener("click", removeTask);

    /* to do...
    taskSubmEdit.addEventListener("click", function replaceTask()/editTask() {
        // use "id" to replace oryginal position in local storage
    }
    */

    hideAppTextarea();

}

// show/hide Submenu Buttons

function dispSubmenyBtns() {          
    if (this.parentNode.lastElementChild.style.display === 'none') {
        this.parentNode.lastElementChild.style.display = 'flex';
    } else {
        this.parentNode.lastElementChild.style.display = 'none';
    }    
}

// Remove Task

function removeTask() {

    let item = this.parentNode.parentNode;
    let parent = item.parentNode;

    let itemID = item.id;
    let todoArray = getAllTasks();
    todoArray.splice(itemID, 1);

    localStorage.setItem('todo', JSON.stringify(todoArray));

    getAllTasks();

    parent.removeChild(item);

}

// --- ADD LISTENERST TO BUTTONS ---

searchTaskBtn.addEventListener('click', displSearchInput);
addTaskBtn.addEventListener('click', dispCreateNote);
createTaskBtn.addEventListener('click', getTaskContent);