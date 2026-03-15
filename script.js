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

var firebaseConfig = {

apiKey:"AIzaSyCAba2mzcjzBdv4syUXxOzOAdIcRge_TgQ",

databaseURL:"https://bus-tracking-system-36943-default-rtdb.firebaseio.com/"

};

firebase.initializeApp(firebaseConfig);

var map;
var marker;
var lastPosition=null;

function initMap(){

map = new google.maps.Map(document.getElementById("map"),{

zoom:15,

center:{lat:11.0758,lng:76.9883}

});

marker = new google.maps.Marker({

position:{lat:11.0758,lng:76.9883},

map:map,

icon:{
url:"https://maps.google.com/mapfiles/kml/shapes/bus.png",
scaledSize:new google.maps.Size(40,40)
}

});

listenBusLocation();

}

function listenBusLocation(){

firebase.database().ref("bus_data/bus1").on("value",function(snapshot){

var data=snapshot.val();

var lat=data.lat;
var lng=data.lng;

var newPosition={lat:lat,lng:lng};

smoothMove(newPosition);

document.getElementById("location").innerHTML=

"Location : "+lat+" , "+lng;

calculateETA(lat,lng);

});

}

function smoothMove(newPosition){

if(lastPosition==null){

marker.setPosition(newPosition);
lastPosition=newPosition;
return;

}

var steps=20;

var latStep=(newPosition.lat-lastPosition.lat)/steps;
var lngStep=(newPosition.lng-lastPosition.lng)/steps;

var i=0;

var interval=setInterval(function(){

i++;

var lat=lastPosition.lat+(latStep*i);
var lng=lastPosition.lng+(lngStep*i);

marker.setPosition({lat:lat,lng:lng});

if(i>=steps){

clearInterval(interval);
lastPosition=newPosition;

}

},100);

}

function calculateETA(busLat,busLng){

var stopLat=11.0780;
var stopLng=76.9890;

var R=6371;

var dLat=(stopLat-busLat)*Math.PI/180;
var dLng=(stopLng-busLng)*Math.PI/180;

var a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(busLat*Math.PI/180)*
Math.cos(stopLat*Math.PI/180)*
Math.sin(dLng/2)*Math.sin(dLng/2);

var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

var distance=R*c;

var speed=30;

var eta=(distance/speed)*60;

document.getElementById("eta").innerHTML=

"ETA : "+eta.toFixed(1)+" minutes";

}

window.onload=initMap;