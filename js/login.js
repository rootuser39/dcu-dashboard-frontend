/* Login Form validation */
// function validateLoginForm() {
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;
//     var uppercaseRegex = /[A-Z]/; // Regular expression to match uppercase letters
//     var numberRegex = /[0-9]/; // Regular expression to match numbers
  
//     if (username.trim() === '') {
//         alert('Please enter your username.');
//         return false;
//     }
  
//     if (password.trim() === '') {
//         alert('Please enter your password.');
//         return false;
//     }
  
//     if (password.length < 8) {
//         alert('Password must be at least 8 characters long.');
//         return false;
//     }
  
//     if (!uppercaseRegex.test(password)) {
//         alert('Password must contain at least one uppercase letter and one number.');
//         return false;
//     }
  
//     if (!numberRegex.test(password)) {
//         alert('Password must contain at least one uppercase letter and one number.');
//         return false;S
//     }
  
//     // Add current form data to the array
//     formDataArray.push({ username: username, password: password });
  
//     if (valid) {
//       document.getElementById('loginForm').submit(); // Make sure to provide the correct ID of your login form
//     }
//     return valid; // 'valid' should be a boolean value determined by your validation logic
//   }

function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var valid = true; // Assume form is valid initially

    // Perform local validation as before, assuming you still want client-side password checks
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter and one number.');
        valid = false;
    }

    // If local validation passes, proceed with AJAX call
    if (valid) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateUserInfo(data.user); // Assume API returns user data on successful login
                alert('Login successful!');
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed due to technical issues.');
        });
        return false; // Prevent form submission as AJAX handles the login
    }
    return false; // Prevent form submission in case of validation failure
}
