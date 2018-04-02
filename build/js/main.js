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
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  var markers = [];
  var userLocation = void 0;
  directionsDisplay.setMap(map);
  if (navigator.geolocation) {
    console.log('geolocation...');
    navigator.geolocation.getCurrentPosition(function (position, options) {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('user location found: ', userLocation);
      map.setCenter(userLocation);
      chooseTransportMode(directionsService, directionsDisplay, userLocation, markers);
      // addCustomMarker(userLocation, map, 'assets/img/user_marker.png', 'User Location');
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

var chooseTransportMode = function chooseTransportMode(directionsService, directionsDisplay, startingPoint, markers) {
  removeExistingMarkers(markers);
  var transportModes = document.querySelectorAll(".modes button");

  var _loop = function _loop(i) {
    transportModes[i].addEventListener('click', function () {
      var selectedMode = transportModes[i].value.toUpperCase();
      calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, selectedMode);
    });
  };

  for (var i = 0; i < transportModes.length; i++) {
    _loop(i);
  }
};

// const addCustomMarker = (markers, position, map, icon, title) => {
//     removeExistingMarkers(markers)
//     console.log('addCustomMarker called');
//     new google.maps.Marker({
//         position: position,
//         map: map,
//         icon: icon,
//         title: title,
//         animation: google.maps.Animation.DROP,
//     });
// }

var removeExistingMarkers = function removeExistingMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, transportMode) {
  console.log('calculateAndDisplayRoute called');
  var chosenDestination = document.querySelector(".parks-select select").value;
  console.log(chosenDestination);
  console.log(startingPoint);
  directionsService.route({
    origin: startingPoint,
    destination: chosenDestination,
    travelMode: google.maps.TravelMode[transportMode]
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
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