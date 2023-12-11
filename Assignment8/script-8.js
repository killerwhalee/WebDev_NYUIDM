/* 
* Image Modal Module
*/

// Fetch JSON data
fetch('assets/data.json')
.then(response => response.json())
.then(data => {
    // Loop through the JSON data and create elements
    data = data.sort(() => Math.random() - 0.5);
    data.forEach((element, index) => {
        // Create a new div for each element
        const newTile = document.createElement('button');
        newTile.setAttribute('class', 'tile');
        newTile.setAttribute('id', `tile-${index}`);
        newTile.setAttribute('onclick', `openModal('image-${index}')`);
        newTile.style.backgroundColor = element.color;
        
        const newImage = document.createElement('div');
        newImage.setAttribute('id', `image-${index}`);
        newImage.setAttribute('class', 'modal');
        newImage.innerHTML = `
        <div class="modal-content">
        <div class="close-button" onclick="closeModal('image-${index}')">&times;</div>
        <img src="${element.image}" alt="IMAGE" height="500">
        <h1>${element.title}</h1>
        <h6>${element.caption}</h6>
        </div>
        `
        
        // Append the new div to the target div
        document.getElementById('tile-container').appendChild(newTile);
        document.getElementById('tile-container').appendChild(newImage);
    });
});

// Get references to the modal and close button
const modal = document.getElementById('myModal');
const closeButton = document.querySelector('.close-button');

// Modal Function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    
    void modal.offsetWidth;
    modal.style.opacity = '1';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
}

window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 1000);
        }
    });
});


/* 
* Filter Module
*/
const filter = document.getElementById('filter-select');

filter.addEventListener('change', () => {
    console.log(filter.value);
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        
    });
})


/*
* Transition Module
*/

window.transitionToPage = function(href) {
    document.querySelector('section').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('section').style.opacity = 1
})