let gameStart = false;

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var input_close = document.getElementById("input-close");
// When the page loads, show the modal
window.onload = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

span.onclick = function () {
    modal.style.display = "none";
    gameStart = true;
}

input_close.onclick = function () {
    modal.style.display = "none";
    gameStart = true;
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
