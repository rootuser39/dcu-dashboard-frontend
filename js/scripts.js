/* navigation sidebar menu */
// function openNav() {
//     document.querySelector('nav').style.width = '250px';
//   }
  
  /* Set the width of the side navigation to 0 */
  // function closeNav() {
  //   document.querySelector('nav').style.width = '0';
  // }
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
