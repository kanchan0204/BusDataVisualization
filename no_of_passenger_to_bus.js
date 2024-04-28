

import stations from './getAllStation.json' assert { type: 'json' };
import output from './sample_passenger_to_bus_count.json' assert { type: 'json' };


//adding coordinates
var starttime, endtime;
var p=0;
var coor = [];
var co=[];
var mx=0,mi=99999; 


//initialising map
function initMap() {

    starttime = document.getElementById("numbstr").value;
    endtime = document.getElementById("numbend").value;
    console.log(starttime);
    var listOfExceededStops = []
    for(let i in output){
        var value = Math.ceil(output[i][0]/output[i][1]);
        if(value>40) listOfExceededStops.push("\nRoute "+i+" has exceeded passenger limit \t passenger count: " + value);
        console.log(value, i);
        output[i][0] = value;
        // console.log(output[i][1]);
        if(value<mi) mi=value;
        if(value>mx) mx=value;
        console.log(value);
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
    alert(listOfExceededStops);
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, 
        zoom: 6
    });
 
    var directionsService = new google.maps.DirectionsService();
 
 
    // Request and render multiple routes
    p=0;
    co.forEach(function(request, index) {
        directionsService.route(request, function(response, status) {
            if (status === 'OK') {
                renderRoute(map, response, getRandomColor()); // Get a random color for each route
            } else {
                alert('Directions request failed: ' + status);
            }
        });
    });
    const paral = document.getElementById("minscale");
    const parar = document.getElementById("maxscale");
    if(paral.hasChildNodes()){
        paral.removeChild(paral.firstChild);
    }
    if(parar.hasChildNodes()){
        parar.removeChild(parar.firstChild);
    }
    const node = document.createTextNode(mi);
    const node2 = document.createTextNode(mx);
    paral.appendChild(node);
    parar.appendChild(node2);
    document.body.appendChild(paral);
    document.body.appendChild(parar);
    // console.log(JSON.stringify(output));
    const jsonString = JSON.stringify(output, null, 3);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], {type: 'application/json'});

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json'; // Set the file name
    link.click();
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
        'rgb(50, 205, 50)',     // Lime Green
        'rgb(0, 255, 0)',       // Lime
        'rgb(173, 255, 47)',    // Yellow-Lime
        'rgb(255, 255, 224)',   // Light Yellow
        'rgb(255, 255, 192)',   // Pale Yellow
        'rgb(255, 255, 0)',     // Yellow
        'rgb(255, 215, 0)',     // Gold
        'rgb(255, 191, 0)',     // Amber
        'rgb(255, 165, 0)',     // Orange-Yellow
        'rgb(255, 140, 0)',     // Orange
        'rgb(255, 69, 0)',      // Red-Orange
        'rgb(255, 99, 71)',     // Deep Orange
        'rgb(255, 0, 0)',       // Red
        'rgb(178, 34, 34)'      // Fire Red
    ];
    mx=40;
    mi=0;
    const step=Math.max((mx-mi)/15,1);
    const color = gradientColors[Math.max(Math.ceil((coor[p].wt/step)-1),0)];
    p+=1;
    
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