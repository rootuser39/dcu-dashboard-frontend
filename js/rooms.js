// Fetch the rooms from the database and add to their respective list (info taken from JSON file for testing)
function loadRooms() {
    fetch('assets/rooms.json')
        .then(response => response.json())
        .then(data => {
            const groupedByBuilding = groupRoomsByBuilding(data);
            renderRooms(groupedByBuilding);
        })
        .catch(error => console.error('Error loading rooms:', error));
}

// Function to group rooms by their building
function groupRoomsByBuilding(rooms) {
    return rooms.reduce((acc, room) => {
        // If the building doesn't exist yet, add it
        if (!acc[room.building]) {
            acc[room.building] = [];
        }
        acc[room.building].push(room);
        return acc;
    }, {});
}

// Function to render rooms grouped by buildings
function renderRooms(groupedByBuilding) {
    const mainContent = document.querySelector('.main-content');
    Object.entries(groupedByBuilding).forEach(([building, rooms]) => {
        // Create a section for each building
        const section = document.createElement('section');
        section.className = 'building-section';
        
        // Create and append the building header
        const header = document.createElement('h2');
        header.textContent = building;
        section.appendChild(header);
        
        // Create and append the list of rooms for this building
        const list = document.createElement('ul');
        rooms.forEach(room => {
            const listItem = document.createElement('li');
            listItem.textContent = room.name; // Display the room name
            listItem.classList.add('room-item'); // Add class for styling and identification
            listItem.addEventListener('click', () => showRoomDetails(room)); // Attach click event listener
            list.appendChild(listItem);
        });
        section.appendChild(list);
        
        // Append the section to the main content
        mainContent.appendChild(section);
    });
}

function showRoomDetails(room) {
    // Create the popup element for room
    let popup = document.querySelector('.room-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'room-popup';
        document.body.appendChild(popup);
    }

    // Calculate bar colors based on values
    const noiseColor = calculateColor(room.noise_level, 140); // 140dB is the max for good noise level index
    const airColor = calculateColor(room.air_quality, 500); // 500 is the max for good air quality index

    // Populate the popup with room details, visual bars, and actual values
    popup.innerHTML = `
        <h3>${room.name}</h3>
        <p><b>Capacity:</b> ${room.capacity}</p>
        <p><b>Air Quality:</b> ${room.air_quality} <div class="value-bar-container"><div class="value-bar" style="width: ${room.air_quality/5}% ; background-color: ${airColor};"></div></div>0 to 500</p>
        <p><b>Noise Level:</b> ${room.noise_level} dB <div class="value-bar-container"><div class="value-bar" style="width: ${(room.noise_level / 140) * 100}% ; background-color: ${noiseColor};"></div></div>0 to 140 dB</p>
        <p><b>Building:</b> ${room.building}</p>
        <button onclick="closePopup()">Close</button>
    `;

    // Show the popup
    popup.style.display = 'block';
}

// Function to calculate bar colour from green to red
function calculateColor(value, max) {
    const greenToRed = value / max;
    const red = Math.floor(greenToRed * 255);
    const green = Math.floor((1 - greenToRed) * 255);
    return `rgb(${red}, ${green}, 0)`;
}




function closePopup() {
    const popup = document.querySelector('.room-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    loadRooms();
});
