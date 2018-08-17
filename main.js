const arrowBtn = document.querySelector('.arrow-btn');
const magnifi = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-inp');

function displSearching() {

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }

    // console.log('i\'m ready')
}

magnifi.addEventListener('click', displSearching)

function getCont() {    
    
    let noteCon = document.querySelector('.text-cont').value;

    let savedNote = localStorage.setItem('todo', JSON.stringify(noteCon));
    
    // console.log(itemContent);
}

arrowBtn.addEventListener('click', getCont)