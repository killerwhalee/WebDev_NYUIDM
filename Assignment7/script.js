setInterval(() => {
	const rainbowElement = document.getElementById('rainbow-element');
	const hue = (Math.random() * 360).toFixed(); // Random hue value between 0 and 360
	const saturation = '100%';
	const lightness = '50%';
	
	const newColor = `hsl(${hue}, ${saturation}, ${lightness})`;
	
	rainbowElement.style.color = newColor;
}, 1000);

document.getElementById('card-board').addEventListener('click', function(event) {
	if (event.target.classList.contains('card-button')) {
		var card = event.target.closest('.card');
		if (card) {
			let button = card.childNodes[3];
			let content = card.childNodes[1];
			if (button.textContent == "Show Contents") {
				button.textContent = "Hide Contents"
				content.style.display = "block";
			} else {
				button.textContent = "Show Contents"
				content.style.display = "none";
			}
		}
	}
});


/* Time Stamp Module */
var timestamp = document.getElementById("timestamp")
var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

function updatetimestamp() {
    const timestamp = document.getElementById('timestamp');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    timestamp.textContent = dateTimeString;
}

// Update the timestamp every second
setInterval(updatetimestamp, 1000);

// Update the timestamp immediately on page load
updatetimestamp();