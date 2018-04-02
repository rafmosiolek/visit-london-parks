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
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const markers = [];
    let userLocation;
    directionsDisplay.setMap(map);
    if (navigator.geolocation) {
        console.log('geolocation...');
        navigator.geolocation.getCurrentPosition((position, options) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            console.log('user location found: ', userLocation);
            map.setCenter(userLocation);
            chooseTransportMode(directionsService, directionsDisplay, userLocation, markers);
            // addCustomMarker(userLocation, map, 'assets/img/user_marker.png', 'User Location');
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

const chooseTransportMode = (directionsService, directionsDisplay, startingPoint, markers) => {
    removeExistingMarkers(markers);
    const transportModes = document.querySelectorAll(".modes button");
    for (let i = 0; i < transportModes.length; i++) {
        transportModes[i].addEventListener('click', () => {
            let selectedMode = transportModes[i].value.toUpperCase();
            calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, selectedMode);
            
        })
    }
}

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

const removeExistingMarkers = (markers) => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint, transportMode) => {
    console.log('calculateAndDisplayRoute called');
    const chosenDestination = document.querySelector(".parks-select select").value;
    console.log(chosenDestination);
    console.log(startingPoint);
    directionsService.route({
        origin: startingPoint,
        destination: chosenDestination,
        travelMode: google.maps.TravelMode[transportMode],
    }, (response, status) => {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#C5E1A5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#B2EBF2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];