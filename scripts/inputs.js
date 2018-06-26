var locations = [];
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myBtn").click();
    }
});

function addLoc(){
  var location = document.getElementById("myInput").value;
  locations.push(location);
  document.getElementById("addresses").innerHTML = locations;
  document.getElementById("myInput").value = '';
  console.log(locations);
}
