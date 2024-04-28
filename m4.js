// this file gives passerger to bus count as output

import stations from './getAllStation.json' assert { type: 'json' };
import output from './sample for bus data.json' assert { type: 'json' }; // output of m2 i.e passenger count
import bus from './bus_data.json' assert { type: 'json' };
import busdata from './data1.json' assert { type: 'json' };
import temp1 from './Routes/5492.json' assert { type: 'json' };
import temp2 from './Routes/5488.json' assert { type: 'json' };
import temp3 from './Routes/5471.json' assert { type: 'json' };
import temp4 from './Routes/5537.json' assert { type: 'json' };
import temp5 from './Routes/5463.json' assert { type: 'json' }; //M6
// import temp6 from './Routes/5460.json' assert { type: 'json' };
import temp7 from './Routes/5457.json' assert { type: 'json' }; //R5
// import temp8 from './Routes/5481.json' assert { type: 'json' };
import temp9 from './Routes/5499.json' assert { type: 'json' }; //M-34
import temp10 from './Routes/5479.json' assert { type: 'json' }; //R-9
import temp12 from './Routes/5497.json' assert { type: 'json' }; //C2
import temp11 from './Routes/5446.json' assert { type: 'json' }; //M-4
import temp13 from './Routes/5609.json' assert { type: 'json' }; //M-36
import temp14 from './Routes/5455.json' assert { type: 'json' }; //R-4
import temp17 from './Routes/5597.json' assert { type: 'json' }; //M-37
import temp18 from './Routes/5589.json' assert { type: 'json' }; //E-5
import temp19 from './Routes/5581.json' assert { type: 'json' }; //E-4
import temp20 from './Routes/5555.json' assert { type: 'json' }; //M-35
import temp21 from './Routes/5544.json' assert { type: 'json' }; //M-27
import temp22 from './Routes/5468.json' assert { type: 'json' }; //M-12
import temp23 from './Routes/5474.json' assert { type: 'json' }; //M-15
import temp24 from './Routes/5472.json' assert { type: 'json' }; //R-17
import temp25 from './Routes/5587.json' assert { type: 'json' }; //M-18
import temp26 from './Routes/5539.json' assert { type: 'json' }; //M-19
import temp27 from './Routes/5543.json' assert { type: 'json' }; //M-26A
// import temp28 from './Routes/5472.json' assert { type: 'json' }; //R17
import temp29 from './Routes/5805.json' assert { type: 'json' }; //N-13
import temp30 from './Routes/5800.json' assert { type: 'json' }; //M-22A
import temp31 from './Routes/5548.json' assert { type: 'json' }; //M-25
import temp32 from './Routes/5764.json' assert { type: 'json' }; //M-20
import temp33 from './Routes/5583.json' assert { type: 'json' }; //E-1
import temp34 from './Routes/5551.json' assert { type: 'json' }; //M-29
import temp35 from './Routes/5490.json' assert { type: 'json' }; //M-7
import temp36 from './Routes/5493.json' assert { type: 'json' }; //R-7
import temp37 from './Routes/5496.json' assert { type: 'json' }; //C-2
import temp38 from './Routes/5498.json' assert { type: 'json' }; //M-34



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
    var set5492 = new Set();
    var set5488 = new Set();
    var set5471 = new Set();
    var set5537 = new Set();
    var set5463 = new Set();
    var set5457 = new Set();
    var set5499 = new Set();
    var set5479 = new Set();
    var set5446 = new Set();
    var set5497 = new Set();
    var set5609 = new Set();

    var set5455 = new Set();
    var set5597 = new Set();
    var set5589 = new Set();
    var set5581 = new Set();
    var set5555 = new Set();
    var set5544 = new Set();
    var set5468 = new Set();
    var set5474 = new Set();
    var set5472 = new Set();
    var set5587 = new Set();
    var set5539 = new Set();
    var set5543 = new Set();

    var set5805 = new Set();
    var set5800 = new Set();
    var set5548 = new Set();
    var set5764 = new Set();
    var set5583 = new Set();
    var set5551 = new Set();
    var set5490 = new Set();
    var set5493 = new Set();
    var set5496 = new Set();
    var set5498 = new Set();
    

    starttime = document.getElementById("numbstr").value;
    endtime = document.getElementById("numbend").value;
    console.log(starttime);
    for (let j = 0; j < bus.rows.length; j++) {
        const t = new Date(bus.rows[j].ticket_time);
        
        const currentHour = t.getHours();
        const currentMinute = t.getMinutes();
        const formattedTime = formatTimeWithLeadingZeros(currentHour, currentMinute);
       
    
    
        if(formattedTime>=starttime&&formattedTime<=endtime&&(bus.rows[j].trip_no%2)==0){
            
            var str = bus.rows[j].bus_number + bus.rows[j].trip_no;
            
            if(bus.rows[j].route_name==='C-1'){
                set5492.add(str);
            }
            else if(bus.rows[j].route_name==='C-3'){
                set5488.add(str);
            }
            else if(bus.rows[j].route_name==='M-11'){
                set5471.add(str);
            }
            else if(bus.rows[j].route_name==='M-17'){
                set5537.add(str);
            }
            else if(bus.rows[j].route_name==='M-6'){
                set5463.add(str);
            }
            else if(bus.rows[j].route_name==='R-5'){
                set5457.add(str);
            }
            else if(bus.rows[j].route_name==='M-34'){
                set5499.add(str);
            }
            else if(bus.rows[j].route_name==='R-9'){
                set5479.add(str);
            }
            else if(bus.rows[j].route_name==='M-4'){
                set5446.add(str);
            }
            else if(bus.rows[j].route_name==='C-2'){
                set5497.add(str);
            }
            else if(bus.rows[j].route_name==='M-36'){
                set5609.add(str);
            }

            else if(bus.rows[j].route_name==='R-4'){
                set5455.add(str);
            }
            else if(bus.rows[j].route_name==='M-37'){
                set5597.add(str);
            }
            else if(bus.rows[j].route_name==='E-5'){
                set5589.add(str);
            }
            else if(bus.rows[j].route_name==='E-4'){
                set5581.add(str);
            }
            else if(bus.rows[j].route_name==='M-35'){
                set5555.add(str);
            }
            else if(bus.rows[j].route_name==='M-27'){
                set5544.add(str);
            }
            else if(bus.rows[j].route_name==='M-12'){
                set5468.add(str);
            }
            else if(bus.rows[j].route_name==='M-15'){
                set5474.add(str);
            }
            else if(bus.rows[j].route_name==='R-17'){
                set5472.add(str);
            }
            else if(bus.rows[j].route_name==='M-18'){
                set5587.add(str);
            }
            else if(bus.rows[j].route_name==='M-19'){
                set5539.add(str);
            }
            else if(bus.rows[j].route_name==='M-26A'){
                set5543.add(str);
            }

            else if(bus.rows[j].route_name==='N-13'){
                set5805.add(str);
            }
            else if(bus.rows[j].route_name==='M-22A'){
                set5800.add(str);
            }
            else if(bus.rows[j].route_name==='M-25'){
                set5548.add(str);
            }
            else if(bus.rows[j].route_name==='M-20'){
                set5764.add(str);
            }
            else if(bus.rows[j].route_name==='E-1'){
                set5583.add(str);
            }
            else if(bus.rows[j].route_name==='M-29'){
                set5551.add(str);
            }
            else if(bus.rows[j].route_name==='M-7'){
                set5490.add(str);
            }
            else if(bus.rows[j].route_name==='R-7'){
                set5493.add(str);
            }
            else if(bus.rows[j].route_name==='C-2'){
                set5496.add(str);
            }
            else if(bus.rows[j].route_name==='M-34'){
                set5498.add(str);
            }
            else continue;
        }
 
    }
    // Have different busses count


    for(var i=0;i<temp1.length-1;i++){

        var str = temp1[i].stationname + ' to '+temp1[i+1].stationname;
        output[str][1]+=parseInt(set5492.size);
    }
    for(var i=0;i<temp2.length-1;i++){
        var str = temp2[i].stationname + ' to '+temp2[i+1].stationname;
        output[str][1]+=parseInt(set5488.size);
    }
    for(var i=0;i<temp3.length-1;i++){
        var str = temp3[i].stationname + ' to '+temp3[i+1].stationname;
        output[str][1]+=parseInt(set5471.size);
    }
    for(var i=0;i<temp4.length-1;i++){
        var str = temp4[i].stationname + ' to '+temp4[i+1].stationname;
        output[str][1]+=parseInt(set5537.size);
    }
    for(var i=0;i<temp5.length-1;i++){
        var str = temp5[i].stationname + ' to '+temp5[i+1].stationname;
        output[str][1]+=parseInt(set5463.size);
    }
    for(var i=0;i<temp7.length-1;i++){
        var str = temp7[i].stationname + ' to '+temp7[i+1].stationname;
        output[str][1]+=parseInt(set5457.size);
    }
    for(var i=0;i<temp9.length-1;i++){
        var str = temp9[i].stationname + ' to '+temp9[i+1].stationname;
        output[str][1]+=parseInt(set5499.size);
    }
    for(var i=0;i<temp10.length-1;i++){
        var str = temp10[i].stationname + ' to '+temp10[i+1].stationname;
        output[str][1]+=parseInt(set5479.size);
    }
    for(var i=0;i<temp11.length-1;i++){
        var str = temp11[i].stationname + ' to '+temp11[i+1].stationname;
        output[str][1]+=parseInt(set5446.size);
    }
    for(var i=0;i<temp12.length-1;i++){
        var str = temp12[i].stationname + ' to '+temp12[i+1].stationname;
        output[str][1]+=parseInt(set5497.size);
    }
    for(var i=0;i<temp13.length-1;i++){
        var str = temp13[i].stationname + ' to '+temp13[i+1].stationname;
        output[str][1]+=parseInt(set5463.size);
    }
    
    for(var i=0;i<temp14.length-1;i++){
        var str = temp14[i].stationname + ' to '+temp14[i+1].stationname;
        output[str][1]+=parseInt(set5455.size);
    }
    for(var i=0;i<temp17.length-1;i++){
        var str = temp17[i].stationname + ' to '+temp17[i+1].stationname;
        output[str][1]+=parseInt(set5597.size)
    }
    for(var i=0;i<temp18.length-1;i++){
        var str = temp18[i].stationname + ' to '+temp18[i+1].stationname;
        output[str][1]+=parseInt(set5589.size);
    }
    for(var i=0;i<temp19.length-1;i++){
        var str = temp19[i].stationname + ' to '+temp19[i+1].stationname;
        output[str][1]+=parseInt(set5581.size);
    }
    for(var i=0;i<temp20.length-1;i++){
        var str = temp20[i].stationname + ' to '+temp20[i+1].stationname;
        output[str][1]+=parseInt(set5555.size);
    }
    for(var i=0;i<temp21.length-1;i++){
        var str = temp21[i].stationname + ' to '+temp21[i+1].stationname;
        output[str][1]+=parseInt(set5544.size);
    }
    for(var i=0;i<temp22.length-1;i++){
        var str = temp22[i].stationname + ' to '+temp22[i+1].stationname;
        output[str][1]+=parseInt(set5468.size);
    }
    for(var i=0;i<temp23.length-1;i++){
        var str = temp23[i].stationname + ' to '+temp23[i+1].stationname;
        output[str][1]+=parseInt(set5474.size);
    }
    for(var i=0;i<temp24.length-1;i++){
        var str = temp24[i].stationname + ' to '+temp24[i+1].stationname;
        output[str][1]+=parseInt(set5472.size);
    }
    for(var i=0;i<temp25.length-1;i++){
        var str = temp25[i].stationname + ' to '+temp25[i+1].stationname;
        output[str][1]+=parseInt(set5587.size);
    }
    for(var i=0;i<temp26.length-1;i++){
        var str = temp26[i].stationname + ' to '+temp26[i+1].stationname;
        output[str][1]+=parseInt(set5539.size);
    }
    for(var i=0;i<temp27.length-1;i++){
        var str = temp27[i].stationname + ' to '+temp27[i+1].stationname;
        output[str][1]+=parseInt(set5543.size);
    }

    for(var i=0;i<temp29.length-1;i++){
        var str = temp29[i].stationname + ' to '+temp29[i+1].stationname;
        output[str][1]+=parseInt(set5589.size);
    }
    for(var i=0;i<temp30.length-1;i++){
        var str = temp30[i].stationname + ' to '+temp30[i+1].stationname;
        output[str][1]+=parseInt(set5581.size);
    }
    for(var i=0;i<temp31.length-1;i++){
        var str = temp31[i].stationname + ' to '+temp31[i+1].stationname;
        output[str][1]+=parseInt(set5555.size);
    }
    for(var i=0;i<temp32.length-1;i++){
        var str = temp32[i].stationname + ' to '+temp32[i+1].stationname;
        output[str][1]+=parseInt(set5544.size);
    }
    for(var i=0;i<temp33.length-1;i++){
        var str = temp33[i].stationname + ' to '+temp33[i+1].stationname;
        output[str][1]+=parseInt(set5468.size);
    }
    for(var i=0;i<temp34.length-1;i++){
        var str = temp34[i].stationname + ' to '+temp34[i+1].stationname;
        output[str][1]+=parseInt(set5474.size);
    }
    for(var i=0;i<temp35.length-1;i++){
        var str = temp35[i].stationname + ' to '+temp35[i+1].stationname;
        output[str][1]+=parseInt(set5472.size);
    }
    for(var i=0;i<temp36.length-1;i++){
        var str = temp36[i].stationname + ' to '+temp36[i+1].stationname;
        output[str][1]+=parseInt(set5587.size);
    }
    for(var i=0;i<temp37.length-1;i++){
        var str = temp37[i].stationname + ' to '+temp37[i+1].stationname;
        output[str][1]+=parseInt(set5539.size);
    }
    for(var i=0;i<temp38.length-1;i++){
        var str = temp38[i].stationname + ' to '+temp38[i+1].stationname;
        output[str][1]+=parseInt(set5543.size);
    }


    for(let i in output){
        let value = output[i][1];
        if(value<mi) mi=value;
        if(value>mx) mx=value;
        console.log(value, i);
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
    link.download = 'bus_to_passenger_data.json'; // Set the file name
    link.click();
    URL.revokeObjectURL(url);
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