// Fetch JSON data
fetch('assets/data.json')
.then(response => response.json())
.then(data => {
    // Loop through the JSON data and create elements
    data.forEach((element, index) => {
        // Create a new div for each element
        const newTile = document.createElement('button');
        newTile.setAttribute('class', 'tile');
        newTile.setAttribute('onclick', `openModal('image-${index}')`);
        newTile.style.backgroundColor = element.color;
        
        const newImage = document.createElement('div');
        newImage.setAttribute('id', `image-${index}`);
        newImage.setAttribute('class', 'modal');
        newImage.innerHTML = `
            <div class="modal-content">
            <span class="close-button" onclick="closeModal('image-${index}')">&times;</span>
            <img src="${element.image}" alt="IMAGE" height="500">
            <h1>${element.title}</h1>
            <p>${element.caption}</p>
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
    modals.forEach(function(modal) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});