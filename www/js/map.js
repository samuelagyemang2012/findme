///**
// * Created by samuel on 11/28/2016.
// */
var loc, map, infowindow;
///*
// * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
// * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
// */
$(document).on("pageinit", "#map-page", function () {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if (navigator.geolocation) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }

        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }

        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 6000
        });
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});

function loadMap() {
    window.location.href = 'map.html';
}

function findmyloc() {
    var lat, long;

    if (navigator.geolocation) {

        function success(pos) {
            lat = pos.coords.latitude;
            long = pos.coords.longitude;

            loc = {lat: lat, lng: long};
            //alert(loc);
        }

        function fail(error) {
            alert("Couldn't find your location.")
        }

        navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 6000
        });
    }
}

function findBanks() {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['bank']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

//var map;
//var infowindow;
//
//function initMap() {
//    var pyrmont = {lat: -33.867, lng: 151.195};
//
//    map = new google.maps.Map(document.getElementById('map'), {
//        center: pyrmont,
//        zoom: 15
//    });
//
//    infowindow = new google.maps.InfoWindow();
//    var service = new google.maps.places.PlacesService(map);
//    service.nearbySearch({
//        location: pyrmont,
//        radius: 500,
//        type: ['bank']
//    }, callback);
//}
//
//function callback(results, status) {
//    if (status === google.maps.places.PlacesServiceStatus.OK) {
//        for (var i = 0; i < results.length; i++) {
//            createMarker(results[i]);
//        }
//    }
//}
//
//function createMarker(place) {
//    var placeLoc = place.geometry.location;
//    var marker = new google.maps.Marker({
//        map: map,
//        position: place.geometry.location
//    });
//
//    google.maps.event.addListener(marker, 'click', function() {
//        infowindow.setContent(place.name);
//        infowindow.open(map, this);
//    });
//}
///