var arrowBtn = document.querySelector('.arrow-btn');

function createLS() {

    var itemCont = document.getElementsByClassName('text-cont').value;

    var savedItem = localStorage.setItem('todo', JSON.stringify(itemCont));

}

arrowBtn.addEventListener('click', createLS)