/* eslint-disable */

// ----------------------------------------------
// Get locations from HTML
// ----------------------------------------------

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

// ----------------------------------------------
// Create the map and attach it to the #map
// ----------------------------------------------

const map = L.map('map', { zoomControl: false });

// ----------------------------------------------
// Add a tile layer to add to our map
// ----------------------------------------------

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ----------------------------------------------
// Create icon using the image provided by Jonas
// ----------------------------------------------

var greenIcon = L.icon({
  iconUrl: '/img/pin.jpg',
  iconSize: [32, 40], // size of the icon
  iconAnchor: [16, 45], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
});

// ----------------------------------------------
// Add locations to the map
// ----------------------------------------------

const points = [];
points.push([locations.coordinates[1], locations.coordinates[0]]);

// Add markers
L.marker([locations.coordinates[1], locations.coordinates[0]], {
  icon: greenIcon,
}).addTo(map);

// ----------------------------------------------
// Set map bounds to include current location
// ----------------------------------------------

const bounds = L.latLngBounds(points).pad(0.5);
map.fitBounds(bounds);

// Disable scroll on map
map.scrollWheelZoom.disable();
