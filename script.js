const firebaseConfig = {

apiKey: "AIzaSyADFWLXTQZ1WF2i-X5zojRFCvk-fw9wZa0",
authDomain: "YOUR_AUTH_DOMAIN",
databaseURL: "YOUR_DATABASE_URL",
projectId: "YOUR_PROJECT_ID"

};

firebase.initializeApp(firebaseConfig);

let map;
let marker;

function initMap(){

let start={lat:11.0168,lng:76.9558};

map=new google.maps.Map(document.getElementById("map"),{
zoom:14,
center:start
});

marker=new google.maps.Marker({
position:start,
map:map,
title:"Bus Location"
});

listenBusLocation();

}

function listenBusLocation(){

firebase.database().ref("bus_data/bus1").on("value",function(snapshot){

let data=snapshot.val();

let busLocation={
lat:data.lat,
lng:data.lng
};

marker.setPosition(busLocation);
map.panTo(busLocation);

document.getElementById("location").innerHTML=
data.lat + " , " + d…
[3:29 pm, 15/03/2026] Nirmal: let selectedStop;

map.addListener("click", function(event){

selectedStop = {
lat: event.latLng.lat(),
lng: event.latLng.lng()
};

new google.maps.Marker({
position:selectedStop,
map:map,
icon:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
});

document.getElementById("from").value =
selectedStop.lat.toFixed(5) + ", " + selectedStop.lng.toFixed(5);

});

document.getElementById("ticketForm").addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value;
let from=document.getElementById("from").value;
let to=document.getElementById("to").value;
let seats=document.getElementById("seats").value;

let ticketData =
"Passenger: "+name+
"\nFrom: "+from+
"\nTo: "+to+
"\nSeats: "+seats;

document.getElementById("bookingMessage").innerHTML=
"Ticket Booked Successfully";

document.getElementById("qrcode").innerHTML="";

QRCode.toCanvas(document.getElementById("qrcode"), ticketData);

});

function initMap(){

let startLocation = {lat:11.0168,lng:76.9558};

map = new google.maps.Map(document.getElementById("map"),{
zoom:14,
center:startLocation
});

marker = new google.maps.Marker({
position:startLocation,
map:map
});

}

function initMap(){

let startLocation = {lat:11.0168,lng:76.9558};

map = new google.maps.Map(document.getElementById("map"),{
zoom:14,
center:startLocation
});

marker = new google.maps.Marker({
position:startLocation,
map:map
});

}