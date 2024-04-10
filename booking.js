
document.addEventListener('DOMContentLoaded', function() {
    loadRooms();
});



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


// Fetch the rooms from the JSON file and populate the list
function loadRooms() {
    fetch('assets/rooms.json') // Ensure the path to your JSON file is correct
        .then(response => response.json())
        .then(data => {
            const roomsList = document.getElementById('roomsList');
            // Clear existing list items before loading new ones
            roomsList.innerHTML = '';
            data.forEach(room => {
                const li = document.createElement('li');
                // Display more details about each room
                li.textContent = `${room.name} - Capacity: ${room.capacity}, Air Quality: ${room.air_quality}, Building: ${room.building}`;
                li.classList.add('room-item');
                li.setAttribute('data-room-id', room.id);
                roomsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading rooms:', error));
}


//// Handle clicking on a room
// function handleRoomClick(room) {
//     console.log('Room clicked:', room);
//     // Instead of getting room availability by room name,
//     // we use the availability data directly from the room object.
//     showAvailability(room.availability);
// }

// function showAvailability(availability) {
//     var calendar = document.querySelector('#availabilityPopup .calendar');
//     calendar.innerHTML = ''; // Clear any existing content

//     // Iterate over the availability data
//     availability.forEach(function(day) {
//         var dayElement = document.createElement('div');
//         dayElement.classList.add('day');
//         // Add 'available' or 'unavailable' class based on the day's availability
//         dayElement.classList.add(day.available ? 'available' : 'unavailable');
//         // Optionally, you could also display the date on each dayElement
//         dayElement.textContent = day.date; // Display the date
//         calendar.appendChild(dayElement);
//     });

//     // Show the popup
//     document.getElementById('availabilityPopup').style.display = 'block';
// }

  
//   function closePopup() {
//     document.getElementById('availabilityPopup').style.display = 'none';
//   }
  
//   function getRoomAvailability(roomName) {
//     // This function would actually retrieve data from your server or data structure
//     // For the purposes of this example, we'll just return a static array of days
//     return [
//       { date: '2024-04-01', available: true },
//       { date: '2024-04-02', available: false },
//       // ... more days
//     ];
//   }

