const initMap = () => {
  const mapContainer = document.querySelector("#map");
  const mapOptions = {
    center: {
      lat: 51.5074,
      lng: -0.1278
    },
    zoom: 13,
    mapTypeId: 'terrain',
    styles: mapStyle
  };
  const map = new google.maps.Map(mapContainer, mapOptions);
  geolocateUser(map);
}

const geolocateUser = (map) => {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  const markers = [];
  let userLocation;
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  directionsDisplay.setMap(map);
  if (navigator.geolocation) {
    console.log('geolocation supported');
    navigator.geolocation.getCurrentPosition((position, options) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      console.log('user location found: ', userLocation);
      map.setCenter(userLocation);
      activateTransportModeSelection(directionsService, directionsDisplay, userLocation, markers, map);
      activateDestinationSelection(directionsService, directionsDisplay, userLocation, markers, map);
      addCustomMarker(userLocation, markers, map, 'assets/img/user_marker.png', 'User Location');
    }, () => {
      // position callback
      errorCallback(true, map.getCenter());
    });
  } else {
    errorCallback(false, map.getCenter());
  }
}

const errorCallback = (browserGeolocation, pos) => {
  browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
}

const activateTransportModeSelection = (directionsService, directionsDisplay, startingPoint, markers, map) => {

  const transportModes = document.querySelectorAll(".modes button");
  for (let i = 0; i < transportModes.length; i++) {
    transportModes[i].addEventListener('click', () => {
      let selectedMode = transportModes[i].value.toUpperCase();
      removeActiveState();
      transportModes[i].classList.add("active");
      calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, selectedMode, markers, map);
    });
  }
}

const activateDestinationSelection = (directionsService, directionsDisplay, startingPoint, markers, map) => {
  let initialMode = 'DRIVING';
  const selectDestination = document.querySelector(".parks-select select");
  const driveButton = document.querySelector("[value='DRIVING']");
  selectDestination.addEventListener('change', () => {
    removeActiveState();
    driveButton.classList.add("active");
    calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, initialMode, markers, map);
  });
}

const addCustomMarker = (position, markers, map, icon, title) => {
  let infoWindow = new google.maps.InfoWindow({
    content: title
  });
  let marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: title,
    animation: google.maps.Animation.BOUNCE,
  });
  setTimeout(() => marker.setAnimation(null), 750);
  markers.push(marker);
  marker.setMap(map);
  marker.addListener('click', () => infoWindow.open(map, marker));
}

const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint, transportMode, markers, map) => {
  removeExistingMarkers(markers);
  const chosenDestination = document.querySelector(".parks-select select").value;
  directionsService.route({
    origin: startingPoint,
    destination: chosenDestination,
    travelMode: google.maps.TravelMode[transportMode],
  }, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      const leg = response.routes[0].legs[0];
      addCustomMarker(leg.start_location, markers, map, 'assets/img/user_marker.png', 'User location');
      addCustomMarker(leg.end_location, markers, map, 'assets/img/park_marker.png', chosenDestination);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

const removeActiveState = () => {
  const transportModes = document.querySelectorAll(".modes button");
  for (let i = 0; i < transportModes.length; i++) {
    transportModes[i].classList.remove("active");
  }
}

const removeExistingMarkers = (markers) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

const mapStyle = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#bdbdbd"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#C5E1A5"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#dadada"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#B2EBF2"
    }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  }
]