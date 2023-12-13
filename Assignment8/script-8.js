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
    var targetColor;
    var preciseness;

    switch (filter.value) {
        case 'cool':
            targetColor = 'rgb(66, 136, 201)';
            preciseness = 100;
            break;
        case 'warm':
            targetColor = 'rgb(194, 69, 47)';
            preciseness = 100;
            break;
        case 'grass':
            targetColor = 'rgb(38, 140, 65)';
            preciseness = 100;
            break;
        case 'bright':
            targetColor = 'rgb(255, 255, 255)';
            preciseness = 200;
            break;
        case 'dark':
            targetColor = 'rgb(0, 0, 0)';
            preciseness = 200;
            break;
        default:
            targetColor = 'rgb(127, 127, 127)';
            preciseness = 255;
    }

    targetColor = rgbStringToRgb(targetColor);
    
    var tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        const tileColor = rgbStringToRgb(tile.style.backgroundColor);

        if (filter.value == 'color' || filter.value == 'black-and-white') {
            const colored = filter.value == 'color' ? true : false;
            const colorSaturation = calculateColorSaturation(tileColor);

            if ((colored && colorSaturation > 0.01) || (!colored && colorSaturation < 0.01)) {
                tile.style.display = 'block';
            } else {
                tile.style.display = 'none';
            }

        } else {
            const colorDistance = calculateColorDistance(tileColor, targetColor);
            
            if (colorDistance < preciseness) {
                tile.style.display = 'block';
            } else {
                tile.style.display = 'none';
            }
        }
    });
})

function rgbStringToRgb(rgbString) {
    // Extract the numbers from the rgb string
    const rgbArray = rgbString.match(/\d+/g);

    // Convert the array of strings to an object with r, g, and b properties
    const [r, g, b] = rgbArray.map(Number);

    return { r, g, b };
}

function calculateColorDistance(rgbColor1, rgbColor2) {
    // Calculate the Euclidean distance
    const distance = Math.sqrt(
        Math.pow(rgbColor2.r - rgbColor1.r, 2) +
        Math.pow(rgbColor2.g - rgbColor1.g, 2) +
        Math.pow(rgbColor2.b - rgbColor1.b, 2)
    );

    return distance;
}

function calculateColorSaturation(rgbColor) {
    // Normalize the RGB values to be in the range [0, 1]
    const normalizedR = rgbColor.r / 255;
    const normalizedG = rgbColor.g / 255;
    const normalizedB = rgbColor.b / 255;

    // Find the maximum and minimum values among the RGB components
    const cMax = Math.max(normalizedR, normalizedG, normalizedB);
    const cMin = Math.min(normalizedR, normalizedG, normalizedB);

    // Calculate the lightness (l)
    const l = (cMax + cMin) / 2;

    // Calculate the saturation (s)
    let s;
    if (cMax === cMin) {
        s = 0;
    } else {
        s = l <= 0.5 ? (cMax - cMin) / (cMax + cMin) : (cMax - cMin) / (2 - cMax - cMin);
    }

    return s;
}