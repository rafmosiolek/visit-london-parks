const initMap = () => {
    const mapContainer = document.querySelector("#map");
    let mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain',
        styles: mapStyle
    }
    const map = new google.maps.Map(mapContainer, mapOptions);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: false});
    geolocateUser(map, directionsService, directionsDisplay);
    
}
const geolocateUser = (map, directionsService, directionsDisplay) => {
    let userLocation;
    let geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    if (navigator.geolocation) {
        console.log('geolocation in process...');
        // userLocation = {
        //     lat: 51.444928,
        //     lng: -0.276938
        // }
        // addCustomMarker(userLocation, map, 'assets/img/userMarker.png', 'User Location');
        navigator.geolocation.getCurrentPosition((position, options) => {
            console.log('user geolocation found');
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            console.log(userLocation);
            enableUI(directionsService, directionsDisplay, userLocation, map);
            map.setCenter(userLocation);
            addCustomMarker(userLocation, map, 'assets/img/userMarker.png', 'User Location');

        }, () => {
            // position callback
            errorCallback(true, map.getCenter());
        });      
    } else {
        errorCallback(false, map.getCenter());
    }
    const errorCallback = (browserGeolocation, pos) => {
        browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
    }
    
}

const enableUI = (directionsService, directionsDisplay, userLocation, map) => {
    const transportModes = document.querySelectorAll("#modes button");
    for (let i = 0; i < transportModes.length; i++) {
        transportModes[i].addEventListener('click', () => {
            let selectedMode = transportModes[i].value.toUpperCase();
            console.log(selectedMode);
            calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation, selectedMode, map);
        })
    }
}


const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint, selectedMode, map) => {
    console.log('calculateRoute called');
    let destination = {
        // SIR JOHN SOANE'S MUSUEM
        lat: 51.517058, 
        lng: -0.117470
    }
    map.setCenter(destination);
    directionsService.route(
        {
            origin: startingPoint,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true,
        }, (response, status) => {
                if (status === "OK") {
                    directionsDisplay.setDirections(response);
                    const leg = response.routes[0].legs[0];
                    addCustomMarker(leg.start_location, map, 'assets/img/userMarker.png', 'User location');
                    addCustomMarker(leg.end_location, map, 'assets/img/userMarker.png', 'Sir John Soane\'s Museum');
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

const addCustomMarker = (position, map, icon, title) => {
    console.log('addCustomMarker called');
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP,
    });
}



const mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#edf1fe"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e0e2fe"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#abf2cc"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a79deb"
            }
        ]
    }
]