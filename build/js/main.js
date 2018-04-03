'use strict';

var initMap = function initMap() {
  var mapContainer = document.querySelector("#map");
  var mapOptions = {
    center: {
      lat: 51.5074,
      lng: -0.1278
    },
    zoom: 13,
    mapTypeId: 'terrain',
    styles: mapStyle
  };
  var map = new google.maps.Map(mapContainer, mapOptions);
  geolocateUser(map);
};

var geolocateUser = function geolocateUser(map) {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  var markers = [];
  var userLocation = void 0;
  var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  directionsDisplay.setMap(map);
  if (navigator.geolocation) {
    console.log('geolocation supported');
    navigator.geolocation.getCurrentPosition(function (position, options) {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('user location found: ', userLocation);
      map.setCenter(userLocation);
      activateTransportModeSelection(directionsService, directionsDisplay, userLocation, markers, map);
      activateDestinationSelection(directionsService, directionsDisplay, userLocation, markers, map);
      addCustomMarker(userLocation, markers, map, 'assets/img/user_marker.png', 'User Location');
    }, function () {
      // position callback
      errorCallback(true, map.getCenter());
    });
  } else {
    errorCallback(false, map.getCenter());
  }
};

var errorCallback = function errorCallback(browserGeolocation, pos) {
  browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
};

var activateTransportModeSelection = function activateTransportModeSelection(directionsService, directionsDisplay, startingPoint, markers, map) {

  var transportModes = document.querySelectorAll(".modes button");

  var _loop = function _loop(i) {
    transportModes[i].addEventListener('click', function () {
      var selectedMode = transportModes[i].value.toUpperCase();
      removeActiveState();
      transportModes[i].classList.add("active");
      calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, selectedMode, markers, map);
    });
  };

  for (var i = 0; i < transportModes.length; i++) {
    _loop(i);
  }
};

var activateDestinationSelection = function activateDestinationSelection(directionsService, directionsDisplay, startingPoint, markers, map) {
  var initialMode = 'DRIVING';
  var selectDestination = document.querySelector(".parks-select select");
  var driveButton = document.querySelector("[value='DRIVING']");
  selectDestination.addEventListener('change', function () {
    removeActiveState();
    driveButton.classList.add("active");
    calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, initialMode, markers, map);
  });
};

var addCustomMarker = function addCustomMarker(position, markers, map, icon, title) {
  var infoWindow = new google.maps.InfoWindow({
    content: title
  });
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: title,
    animation: google.maps.Animation.BOUNCE
  });
  setTimeout(function () {
    return marker.setAnimation(null);
  }, 750);
  markers.push(marker);
  marker.setMap(map);
  marker.addListener('click', function () {
    return infoWindow.open(map, marker);
  });
};

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, transportMode, markers, map) {
  removeExistingMarkers(markers);
  var chosenDestination = document.querySelector(".parks-select select").value;
  directionsService.route({
    origin: startingPoint,
    destination: chosenDestination,
    travelMode: google.maps.TravelMode[transportMode]
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var leg = response.routes[0].legs[0];
      addCustomMarker(leg.start_location, markers, map, 'assets/img/user_marker.png', 'User location');
      addCustomMarker(leg.end_location, markers, map, 'assets/img/park_marker.png', chosenDestination);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

var removeActiveState = function removeActiveState() {
  var transportModes = document.querySelectorAll(".modes button");
  for (var i = 0; i < transportModes.length; i++) {
    transportModes[i].classList.remove("active");
  }
};

var removeExistingMarkers = function removeExistingMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

var mapStyle = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#bdbdbd"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#C5E1A5"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#ffffff"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dadada"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
}, {
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#B2EBF2"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}];