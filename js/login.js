/* Login Form validation */
function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var uppercaseRegex = /[A-Z]/; // Regular expression to match uppercase letters
    var numberRegex = /[0-9]/; // Regular expression to match numbers
  
    if (username.trim() === '') {
        alert('Please enter your username.');
        return false;
    }
  
    if (password.trim() === '') {
        alert('Please enter your password.');
        return false;
    }
  
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
  
    if (!uppercaseRegex.test(password)) {
        alert('Password must contain at least one uppercase letter and one number.');
        return false;
    }
  
    if (!numberRegex.test(password)) {
        alert('Password must contain at least one uppercase letter and one number.');
        return false;S
    }
  
    // Add current form data to the array
    formDataArray.push({ username: username, password: password });
  
    if (valid) {
      document.getElementById('loginForm').submit(); // Make sure to provide the correct ID of your login form
    }
    return valid; // 'valid' should be a boolean value determined by your validation logic
  }