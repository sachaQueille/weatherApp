let mymap = L.map('worldmap', {
    center: [48.866667, 2.333333],
    zoom: 4
}
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(mymap);

let customIcon = L.icon({
    iconUrl: './images/leaf-green.png',
    shadowUrl: './images/leaf-shadow.png',
   
    iconSize:   [38, 95],
    shadowSize:  [50, 64],
   
    iconAnchor:  [22, 94],
    shadowAnchor: [4, 62],  
   
    popupAnchor: [-3, -76]
   });

let cityItems = document.getElementsByClassName('list-group-item');
for(let i=0; i<cityItems.length; i++) {
    let latitude = cityItems[i].dataset.lat;
    let longitude = cityItems[i].dataset.lon;
    L.marker([latitude,longitude], {icon: customIcon}).addTo(mymap).bindPopup(cityItems[i].dataset.cityname);
    
}



   
   


