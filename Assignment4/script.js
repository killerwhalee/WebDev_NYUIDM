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


const editButton = document.getElementById('btn-edit');

editButton.addEventListener('click', () => {
    alert("Don't try to edit me!");
})