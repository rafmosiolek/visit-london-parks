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
    };
    var map = new google.maps.Map(mapContainer, mapOptions);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: false });
    var geocoder = new google.maps.Geocoder();
};

var geolocateUser = function geolocateUser() {};