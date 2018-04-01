const initMap = () => {
    const mapContainer = document.querySelector("#map");
    let mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain',
    }
    const map = new google.maps.Map(mapContainer, mapOptions);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: false});
    const geocoder = new google.maps.Geocoder;
}

const geolocateUser = () => {
    
}