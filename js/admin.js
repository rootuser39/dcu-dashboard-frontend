
// Submit event listener
document.getElementById('addRoomForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    var roomData = {
        roomName: document.getElementById('roomName').value,
        capacity: document.getElementById('capacity').value,
        airQuality: document.getElementById('airQuality').value,
        noiseLevel: document.getElementById('noiseLevel').value,
        building: document.getElementById('building').value
    };


    // Use Fetch API to submit form data to the server
fetch('/api/rooms', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(roomData)
})
.then(response => response.json())
.then(room => {
    console.log('Room saved:', room);
})
.catch(error => console.error('Error:', error));
});