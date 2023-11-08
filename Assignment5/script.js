
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


/* Button Module */
// Attach an event listener to the button
document.getElementById('load-button').addEventListener('click', () => {
    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Access the text property from the JSON data
        const messages = data.messages;
        
        // Pick a random message from the list
        const randomIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomIndex];
        var message = document.createTextNode(randomMessage);
        
        // Create new message box
        var messageBox = document.createElement('div');
        messageBox.className = 'message';
        messageBox.appendChild(message)

        // Append message to chatbox
        var chatBox = document.getElementById("chat-box")
        chatBox.appendChild(messageBox)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
