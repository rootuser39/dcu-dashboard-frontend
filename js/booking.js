
document.addEventListener('DOMContentLoaded', function() {
    loadRooms();
    
    // Listen for changes in the date input
    document.getElementById('bookingDate').addEventListener('change', function() {
        // If a date has been selected
        if (this.value) {
            const timeContainer = document.getElementById('timeSelectionContainer');
            const timeSelect = document.getElementById('bookingTime');
            
            // Clear previous options and add new time slots
            timeSelect.innerHTML = '';
            for (let hour = 8; hour <= 18; hour++) {
                const option = document.createElement('option');
                option.value = `${hour}:00`;
                option.textContent = `${hour}:00`;
                timeSelect.appendChild(option);
            }
            
            // Show the time selection container after date is chosen
            timeContainer.style.display = 'block';
        }
    });
});



// Function to fileter rooms in the list by name
function filterRooms() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchBox');
    filter = input.value.toUpperCase();
    ul = document.getElementById('roomsList');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// Fetch the rooms from the backend and populate the list
function loadRooms() {
    fetch('assets/rooms.json') // path to JSON file for testing
        .then(response => response.json())
        .then(data => {
            const roomsList = document.getElementById('roomsList');
            // Clear existing list items before loading new ones
            roomsList.innerHTML = '';
            data.forEach(room => {
                const li = document.createElement('li');
                li.classList.add('room-item');
                li.setAttribute('data-room-id', room.id);

                // Create a div for room details to make alignment easier
                const roomDetails = document.createElement('div');
                roomDetails.textContent = `${room.name} -  ${room.building}`;
                roomDetails.classList.add('room-details');

                // Create a "BOOK" button for each room
                const bookButton = document.createElement('button');
                bookButton.textContent = 'BOOK';
                bookButton.classList.add('book-button');
                bookButton.setAttribute('data-room-id', room.id);
                bookButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevents the list item's click event
                    bookRoom(room); // Pass the entire room object for booking
                });

                // Append the room details and BOOK button to the list item
                li.appendChild(roomDetails);
                li.appendChild(bookButton);

                roomsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading rooms:', error)); /* Error Handling */
}



function bookRoom(room) {
    // Populate form data
    document.getElementById('bookingRoomId').value = room.id;

    // Show the popup
    document.getElementById('bookingPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('bookingPopup').style.display = 'none';
}


document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const roomId = document.getElementById('bookingRoomId').value;
    const bookingDate = document.getElementById('bookingDate').value;
    console.log(`Booking room ID ${roomId} for date ${bookingDate}`);
    closePopup(); // Close the popup

    // Need to add logic to communicate with backend to check availability and book the room
});
