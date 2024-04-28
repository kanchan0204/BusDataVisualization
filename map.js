// const fs = require('fs');

import stations from './getAllStation.json' assert { type: 'json' };
import output from './output.json' assert { type: 'json' };


//adding coordinates
var coor = [];
var co=[];
var mx=0,mi=99999;
for(let i in output){
    let value = output[i];
    if(value<mi) mi=value;
    if(value>mx) mx=value;
    if(value>0){
        const myArray = i.split(" to ");
        var obj = {},obj1={};
        for(let j = 0;j<stations.length;j++){
            if(myArray[0]===stations[j].StationName){
                var o = {};
                o['lat']=parseFloat(stations[j].Lat1);
                o['lng']=parseFloat(stations[j].Long1);
                obj['origin']=o;
                obj1['origin']=o;
            }
            if(myArray[1]===stations[j].StationName){
                var o1 = {};
                o1['lat']=parseFloat(stations[j].Lat1);
                o1['lng']=parseFloat(stations[j].Long1);
                obj['destination']=o1;
                obj1['destination']=o1;
            }
        }
        obj1['travelMode']= 'DRIVING';
        co.push(obj1);
        obj['wt']=value;
        coor.push(obj);
        
    }
}

//initialising map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, 
        zoom: 6
    });

    var directionsService = new google.maps.DirectionsService();


    // Request and render multiple routes
    co.forEach(function(request, index) {
        directionsService.route(request, function(response, status) {
            if (status === 'OK') {
                renderRoute(map, response, getRandomColor()); // Get a random color for each route
            } else {
                alert('Directions request failed: ' + status);
            }
        });
    });
}

function renderRoute(map, response, color) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { 
            strokeColor: color ,
            strokeWeight: 6,
        },
        suppressMarkers: true, 
    });

    directionsRenderer.setDirections(response);
}

var i=0;
function getRandomColor() {
    
    const gradientColors = [
        'rgb(0, 128, 0)',       // Green
        'rgb(50, 205, 50)',     // Yellow-Green
        'rgb(127, 255, 0)',     // Chartreuse
        'rgb(0, 255, 0)',       // Lime
        'rgb(50, 205, 50)',     // Lime Green
        'rgb(173, 255, 47)',    // Yellow-Lime
        'rgb(255, 255, 224)',   // Light Yellow
        'rgb(255, 255, 192)',   // Pale Yellow
        'rgb(255, 255, 0)',     // Canary Yellow
        'rgb(255, 255, 0)',     // Yellow
        'rgb(255, 215, 0)',     // Gold
        'rgb(255, 191, 0)',     // Amber
        'rgb(255, 165, 0)',     // Orange-Yellow
        'rgb(255, 140, 0)',     // Orange
        'rgb(255, 69, 0)',      // Dark Orange
        'rgb(255, 99, 71)',     // Deep Orange
        'rgb(255, 69, 0)',      // Red-Orange
        'rgb(255, 99, 71)',     // Tomato Red
        'rgb(178, 34, 34)',     // Fire Red
        'rgb(255, 0, 0)' // Red
    ];
    const step=(mx-mi)/20;
    const color = gradientColors[Math.ceil(coor[i].wt/step)];
    i+=1;
    return color;
}



// console.log(co);
// window.getRandomColor=getRandomColor;
// window.renderRoute=renderRoute;
window.initMap = initMap;


function docReady() {
        initMap();

    // Call the function to load the API
}
window.addEventListener("load", docReady);

