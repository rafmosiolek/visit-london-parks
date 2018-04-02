let map, directionsService, directionsDisplay, userLocation;
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
    map = new google.maps.Map(mapContainer, mapOptions);
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    geolocateUser(map);
    
}
const geolocateUser = (map) => {
    
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
    const transportModes = document.querySelectorAll(".modes button");
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
        // lat: 51.517058, 
        // lng: -0.117470
        // BATTERSEA PARK
        lat: 51.479081,
        lng:  -0.156230
    }
    const selctedDestination = document.querySelector(".parks-select select").value;
    console.log(selctedDestination);
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



// 
