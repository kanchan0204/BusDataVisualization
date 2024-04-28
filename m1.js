// const fs = require('fs');

import stations from './getAllStation.json' assert { type: 'json' };
import output from './output.json' assert { type: 'json' };
import bus from './bus_data.json' assert { type: 'json' };
import busdata from './data1.json' assert { type: 'json' };
import temp1 from './Routes/5492.json' assert { type: 'json' };
import temp2 from './Routes/5488.json' assert { type: 'json' };
import temp3 from './Routes/5471.json' assert { type: 'json' };
import temp4 from './Routes/5537.json' assert { type: 'json' };
// import temp5 from './Routes/5546.json' assert { type: 'json' };
// import temp6 from './Routes/5585.json' assert { type: 'json' };
// import temp7 from './Routes/5551.json' assert { type: 'json' };
// import temp8 from './Routes/5581.json' assert { type: 'json' };

function formatTimeWithLeadingZeros(hours, minutes) {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
var starttime, endtime;
var mx=0,mi=99999;
var p=0;
//filling the weights

var coor = [];
    var co=[];
//initialising map
function initMap() {    
    
    starttime = document.getElementById("numbstr").value;
    endtime = document.getElementById("numbend").value;
    console.log(starttime);
    for (let j = 0; j < bus.rows.length; j++) {
        const t = new Date(bus.rows[j].ticket_time);
        
        const currentHour = t.getHours();
        const currentMinute = t.getMinutes();
        const formattedTime = formatTimeWithLeadingZeros(currentHour, currentMinute);
    
        // console.log(formattedTime);
        if(formattedTime>=starttime&&formattedTime<=endtime){
            var temp;
            var a=bus.rows[j].route_name;
            if(a==='C-1'){
                temp=temp1;
            }
            else if(a==='C-3'){
                temp=temp2;
            }
            else if(a==='M-11'){
                temp=temp3;
            }
            else if(a==='M-17'){
                temp=temp4;
            }
            else continue;
            // else if(a==='M-23'){
            //     temp=temp5;
            // }
            // else if(a==='E-3'){
            //     temp=temp6;
            // }
            // else if(a==='M-29'){
            //     temp=temp7;
            // }
            // else if(a==='E-4'){
            //     temp=temp8;
            // }
            
            var start=bus.rows[j].fromstopname,end=bus.rows[j].tostopname;
            // console.log(start);
            var startid,endid;
            for(let k=0;k<busdata.features.length;k++){
                if(start===busdata.features[k].properties.name){
                    // console.log(1);
                    startid=busdata.features[k].properties.stationid;
                    break;
                } 
            }
            for(let k=0;k<busdata.features.length;k++){
                if(end===busdata.features[k].properties.name) {
                    endid=busdata.features[k].properties.stationid;
                    break;
                }
            }
            let l=0;
            for(;l<temp.length;l++){
                if(startid===temp[l].stationid) break;
            }
            while(l<(temp.length-1)&&endid!=temp[l+1].stationid){
                // console.log(1);
                var st=temp[l].stationname+' to '+temp[l+1].stationname;
                output[st]+=parseInt(bus.rows[j].passengers);
                l++;
            }
            l++;
            if(l<(temp.length-1)){
                var st=temp[l].stationname+' to '+temp[l+1].stationname;
                output[st]+=parseInt(bus.rows[j].passengers);
            }
        }
    }
    
    console.log(output);
    //adding coordinates
    
    
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
    console.log(coor);
    // var textNode = document.createTextNode("Min = "+ mi + ", Max = "+mx);
    // document.getElementById('minmax').appendChild(textNode);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, 
        zoom: 6
    });

    var directionsService = new google.maps.DirectionsService();

    p=0;
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
    const color = gradientColors[Math.ceil(coor[p].wt/step)];
    p+=1;
    return color;
}



// console.log(co);
// window.getRandomColor=getRandomColor;
// window.renderRoute=renderRoute;
window.initMap = initMap;
window.getTime = getTime;

// function docReady() {
//     initMap();
// }
// window.addEventListener("load", docReady);


