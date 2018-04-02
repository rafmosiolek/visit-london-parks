const initMap = () => {
    const mapContainer = document.querySelector("#map");
    const mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain',
        // styles: mapStyle
    };
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService;
    const map = new google.maps.Map(mapContainer, mapOptions);
    directionsDisplay.setMap(map);

    const transportModes = document.querySelectorAll(".modes button");
    for (let i = 0; i < transportModes.length; i++) {
        transportModes[i].addEventListener('click', () => {
            let selectedMode = transportModes[i].value.toUpperCase();
            calculateAndDisplayRoute(directionsService, directionsDisplay, selectedMode);
            
        })
    }
}

const calculateAndDisplayRoute = (directionsService, directionsDisplay, transportMode) => {
    console.log('calculateAndDisplayRoute called');
    directionsService.route({
        origin: {
            lat: 51.444928,
            lng: -0.276938
        },
        destination: {
            lat: 51.479081,
            lng:  -0.156230
        },
        travelMode: google.maps.TravelMode[transportMode],
    }, (response, status) => {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}