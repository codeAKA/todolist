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

function displayAllTasks(){
    let todoArray = getAllTasks();
    todoArray.forEach(x => showTasks(x));
}

function hideAppTextarea() {
    document.querySelector('.text-box').style.display = "none";
}

window.addEventListener('load', displayAllTasks, hideAppTextarea)



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

// get CONTENT of NOTE

function getTaskContent() {    
    
    let note = document.querySelector('.text-cont').value;
    let todoArray = getAllTasks();

    if (note !== "") {
        
        todoArray.push(note);

        localStorage.setItem('todo', JSON.stringify(todoArray));
    
        showTasks(todoArray[todoArray.length - 1]);
    
        resetTaskContent();

    }
    
}

// Clear Note value

function resetTaskContent() {

    document.querySelector('.text-cont').value = "";

}

function showTasks(text, index) {
    
    let listContainer = document.querySelector('.list-container');

    let task = document.createElement("div");
    task.className = "list-item";
    // task.setAttribute("id", `${index}`); - for reason of delete tasks

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

    subenuBtn.addEventListener("click", function() {
           
        if (this.parentNode.lastElementChild.style.display === 'none') {
            this.parentNode.lastElementChild.style.display = 'flex';
        } else {
            this.parentNode.lastElementChild.style.display = 'none';
        }    
    
    });

    taskSubmDel.addEventListener("click", function() {

        let item = this.parentNode.parentNode;
        let parent = item.parentNode;

        parent.removeChild(item);

    });

    displayTaskInput();

}

// --- ADD LISTENERST TO BUTTONS ---

searchTaskBtn.addEventListener('click', displSearchInput);
addTaskBtn.addEventListener('click', dispCreateNote);
createTaskBtn.addEventListener('click', getTaskContent);


