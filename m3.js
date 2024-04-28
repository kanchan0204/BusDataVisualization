

import stations from './getAllStation.json' assert { type: 'json' };
import output from './testcase1.json' assert { type: 'json' };
import bus from './bus_data.json' assert { type: 'json' };
import busdata from './data1.json' assert { type: 'json' };
import temp1 from './Routes/5492.json' assert { type: 'json' };
import temp2 from './Routes/5488.json' assert { type: 'json' };
import temp3 from './Routes/5471.json' assert { type: 'json' };
import temp4 from './Routes/5537.json' assert { type: 'json' };

//adding coordinates
var starttime, endtime;
var p=0;
var coor = [];
var co=[];
var mx=0,mi=99999; 
function formatTimeWithLeadingZeros(hours, minutes) {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
//initialising map
function initMap() {
    
   
    for(let i in output){
        let value = output[i];
        if(value<mi) mi=value;
        if(value>mx) mx=value;
        // console.log(value);
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
                renderRoute(map, response, getRandomColor()); // Get a specific color according to density for each route
            } else {
                alert('Directions request failed: ' + status);
            }
        });
    });


    const paral = document.getElementById("minscale");
    const parar = document.getElementById("maxscale");
    const node = document.createTextNode(mi);
    const node2 = document.createTextNode(mx);

    paral.appendChild(node);
    parar.appendChild(node2);
    document.body.appendChild(paral);
    document.body.appendChild(parar);
    const jsonString = JSON.stringify(output, null, 2);

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
