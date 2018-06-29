var locations = [];
var input = document.getElementById("myInput");
var listAddress = [];

$(".fa-times").click(function() {
  var p = $(this).parents(".list-group-item");
  p.fadeOut(500, function() {
    $(this).css({
      "visibility": "hidden",
      display: 'block'
    }).slideUp();
  });
});



input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("myBtn").click();
  }
});

function addLoc() {
  var location = document.getElementById("myInput").value;
  locations.push(location);
	addAddressItem("Bob", location);
  //document.getElementById("addresses").innerHTML = locations;

  document.getElementById("myInput").value = '';

  /*get latitude longitude*/
  var geocoder = new google.maps.Geocoder();
  console.log(locations[locations.length - 1]);
  var address = locations[locations.length - 1];

  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      listAddress.push({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      });
      initMap();
    }
  });
}

function addAddressItem(name, address) {
  var itemHTML = `
	<div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
	<div class="d-flex w-100 justify-content-between">
		<h5 class="mb-1">` + name + `</h5>
		<a href = "#"><i class="fa fa-times" aria-hidden="true"></i></a>
	</div>
	<p class="mb-1">`+ address + `</p>
	<small>`+ new Date().toJSON().slice(0,10).replace(/-/g,'/') + `</small>
</div>`;
console.log(itemHTML);
$( "#itemAddress" ).append( $(itemHTML) );
}

function initMap() {
  /*initial list example*/
  var cent = {
    lat: 38.907192,
    lng: -77.036871
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: cent
  });
  text = "<ul>";

  for (i = 0; i < listAddress.length; i++) {
    var marker = new google.maps.Marker({
      position: listAddress[i],
      map: map
    });
    text += "<li>" + listAddress[i] + "</li>";
  }
  text += "</ul>";
  document.getElementById("demo").innerHTML = text;

	addressItem("zach", "123 Main St.")
  /*active search bar part*/
  var input = document.getElementById('myInput');
  var searchBox = new google.maps.places.SearchBox(input);
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
  });

  /*drawing manager implementeds*/
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
}
