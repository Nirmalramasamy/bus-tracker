// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyADFWLXTQZ1WF2i-X5zojRFCvk-fw9wZa0",
authDomain: "bus-tracking-system-36943.firebaseapp.com",
databaseURL: "https://bus-tracking-system-36943-default-rtdb.firebaseio.com",
projectId: "bus-tracking-system-36943",
storageBucket: "bus-tracking-system-36943.firebasestorage.app",
messagingSenderId: "985917120436",
appId: "1:985917120436:web:70f24dc6a741e8ea3adce1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let map;
let marker;

// Initialize Google Map
function initMap(){

let startLocation = {lat:11.0168,lng:76.9558};

map = new google.maps.Map(document.getElementById("map"),{
zoom:14,
center:startLocation
});

marker = new google.maps.Marker({
position:startLocation,
map:map,
title:"Bus Location"
});

// Start listening for Firebase updates
listenBusLocation();

}

// Read GPS location from Firebase
function listenBusLocation(){

firebase.database().ref("bus1").on("value",function(snapshot){

let data = snapshot.val();

if(data){

let latitude = parseFloat(data.lat);
let longitude = parseFloat(data.lng);

let busLocation = {
lat: latitude,
lng: longitude
};

// Move bus marker
marker.setPosition(busLocation);

// Move map center
map.panTo(busLocation);

// Update UI
document.getElementById("status").innerHTML="Running";

document.getElementById("location").innerHTML =
latitude + " , " + longitude;

}

});

}