"use strict";

var initMap = function initMap() {
    var mapContainer = document.querySelector("#map");
    var mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain'
        // styles: mapStyle
    };
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var map = new google.maps.Map(mapContainer, mapOptions);
    directionsDisplay.setMap(map);

    var transportModes = document.querySelectorAll(".modes button");

    var _loop = function _loop(i) {
        transportModes[i].addEventListener('click', function () {
            var selectedMode = transportModes[i].value.toUpperCase();
            calculateAndDisplayRoute(directionsService, directionsDisplay, selectedMode);
        });
    };

    for (var i = 0; i < transportModes.length; i++) {
        _loop(i);
    }
};

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay, transportMode) {
    console.log('calculateAndDisplayRoute called');
    directionsService.route({
        origin: {
            lat: 51.444928,
            lng: -0.276938
        },
        destination: {
            lat: 51.479081,
            lng: -0.156230
        },
        travelMode: google.maps.TravelMode[transportMode]
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};