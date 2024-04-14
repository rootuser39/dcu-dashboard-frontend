function openNav() {
    document.querySelector('nav').classList.add('open');
}

function closeNav() {
    document.querySelector('nav').classList.remove('open');
}

// Listen for a click event on the window
window.addEventListener('click', function(event) {
    var nav = document.querySelector('nav');
    // Check if the clicked element is not the navigation or a child of the navigation
    if (event.target !== nav && !nav.contains(event.target)) {
        closeNav(); // Close the navigation
    }
});

// Prevent the event listener on the window from closing the nav when clicking the toggle button
document.querySelector('.menu-toggle').addEventListener('click', function(event) {
    event.stopPropagation();
});

//User info bar
function updateUserInfo(user) {
    document.getElementById('userFullName').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('userRole').textContent = user.role;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in and update info
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            updateUserInfo(data.user);
        }
    })
    .catch(error => console.error('Error fetching user data:', error));
});