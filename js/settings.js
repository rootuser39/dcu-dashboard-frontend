// Dynamically update user information based on form ID
function updateUserInformation(formId) {
    const formData = new FormData(document.getElementById(formId));
    const endpoint = formId.replace('Form', '').toLowerCase(); // Converts form ID to endpoint

    fetch(`/api/users/${endpoint}`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert(`${endpoint} updated successfully!`);
            fetchUserDetails(); // Refresh user details
        } else {
            alert(`Failed to update ${endpoint}.`);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Fetch user details on page load
function fetchUserDetails() {
    fetch('/api/users/details') // Make sure to replace this with your actual API endpoint
    .then(response => response.json())
    .then(user => {
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        document.getElementById('street').value = user.address.street;
        document.getElementById('city').value = user.address.city;
        document.getElementById('country').value = user.address.country;
        document.getElementById('postal_code').value = user.address.postalCode;
        document.getElementById('role_title').textContent = user.role.title;
    })
    .catch(error => console.error('Error:', error));
}

// Call fetchUserDetails on page load to populate data
document.addEventListener('DOMContentLoaded', function() {
fetchUserDetails();
});