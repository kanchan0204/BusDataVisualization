

import stations from './getAllStation.json' assert { type: 'json' };
import output from './output.json' assert { type: 'json' };
import bus from './bus_data.json' assert { type: 'json' };
import busdata from './data1.json' assert { type: 'json' };
import temp1 from './Routes/5492.json' assert { type: 'json' }; //C1
import temp2 from './Routes/5488.json' assert { type: 'json' }; //C3
import temp3 from './Routes/5471.json' assert { type: 'json' }; //M-11
import temp4 from './Routes/5537.json' assert { type: 'json' }; //M17
import temp5 from './Routes/5463.json' assert { type: 'json' }; //M6
// import temp6 from './Routes/5460.json' assert { type: 'json' };
import temp7 from './Routes/5457.json' assert { type: 'json' }; //R5
// import temp8 from './Routes/5481.json' assert { type: 'json' };
import temp9 from './Routes/5499.json' assert { type: 'json' }; //M-34
import temp10 from './Routes/5479.json' assert { type: 'json' }; //R9
import temp11 from './Routes/5446.json' assert { type: 'json' }; //M4
import temp12 from './Routes/5497.json' assert { type: 'json' }; //C2
import temp13 from './Routes/5609.json' assert { type: 'json' }; //M36
import temp14 from './Routes/5455.json' assert { type: 'json' }; //R4
import temp17 from './Routes/5597.json' assert { type: 'json' }; //M37
import temp18 from './Routes/5589.json' assert { type: 'json' }; //E5
import temp19 from './Routes/5581.json' assert { type: 'json' }; //E4
import temp20 from './Routes/5555.json' assert { type: 'json' }; //M35
import temp21 from './Routes/5544.json' assert { type: 'json' }; //M27
import temp22 from './Routes/5468.json' assert { type: 'json' }; //M12
import temp23 from './Routes/5474.json' assert { type: 'json' }; //M15
import temp24 from './Routes/5472.json' assert { type: 'json' }; //R-17
import temp25 from './Routes/5587.json' assert { type: 'json' }; //M18
import temp26 from './Routes/5539.json' assert { type: 'json' }; //M19
import temp27 from './Routes/5543.json' assert { type: 'json' }; //M26A
// import temp28 from './Routes/5472.json' assert { type: 'json' }; //R17
import temp29 from './Routes/5805.json' assert { type: 'json' }; //N13
import temp30 from './Routes/5800.json' assert { type: 'json' }; //M22A
import temp31 from './Routes/5548.json' assert { type: 'json' }; //M25
import temp32 from './Routes/5764.json' assert { type: 'json' }; //M20
import temp33 from './Routes/5583.json' assert { type: 'json' }; //E1
import temp34 from './Routes/5551.json' assert { type: 'json' }; //M29
import temp35 from './Routes/5490.json' assert { type: 'json' }; //M7
import temp36 from './Routes/5493.json' assert { type: 'json' }; //R7
import temp37 from './Routes/5496.json' assert { type: 'json' }; //C2
import temp38 from './Routes/5498.json' assert { type: 'json' }; //M34





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
    co=[];
    coor=[];
    for(let i in output){
        output[i][0] = 0;
    }
    starttime = document.getElementById("numbstr").value;
    endtime = document.getElementById("numbend").value;
    console.log(starttime);
    for (let j = 0; j < bus.rows.length; j++) {
        const t = new Date(bus.rows[j].ticket_time);
        
        const currentHour = t.getHours();
        const currentMinute = t.getMinutes();
        const formattedTime = formatTimeWithLeadingZeros(currentHour, currentMinute);
    
        // console.log(formattedTime);
        // GOT ROUTE NAME
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
            else if(a==='M-6'){
                temp=temp5;
            }
            else if(a==='R-5'){
                temp=temp7;
            }
            else if(a==='M-34'){
                temp=temp9;
            }
            else if(a==='R-9'){
                temp=temp10;
            }
            else if(a==='C-2'){
                temp=temp12;
            }
            else if(a==='M-4'){
                temp=temp11;
            }
            else if(a==='M-36'){
                temp=temp13;
            }
            else if(a==='R-4'){
                temp=temp14;
            }
            else if(a==='M-37'){
                temp=temp17;
            }
            else if(a==='E-5'){
                temp=temp18;
            }
            else if(a==='E-4'){
                temp=temp19;
            }
            else if(a==='M-35'){
                temp=temp20;
            }
            else if(a==='M-27'){
                temp=temp21;
            }
            else if(a==='M-12'){
                temp=temp22;
            }
            else if(a==='M-15'){
                temp=temp23;
            }
            else if(a==='R-17'){
                temp=temp24;
            }
            else if(a==='M-18'){
                temp=temp25;
            }
            else if(a==='M-19'){
                temp=temp26;
            }
            else if(a==='M-26A'){
                temp=temp27;
            }
            else if(a==='N-13'){
                temp=temp29;
            }
            else if(a==='M-22A'){
                temp=temp30;
            }
            else if(a==='M-25'){
                temp=temp31;
            }
            else if(a==='M-20'){
                temp=temp32;
            }
            else if(a==='E-1'){
                temp=temp33;
            }
            else if(a==='E-1'){
                temp=temp33;
            }
            else if(a==='M-29'){
                temp=temp34;
            }
            else if(a==='M-7'){
                temp=temp35;
            }
            else if(a==='R-7'){
                temp=temp36;
            }
            else if(a==='C-2'){
                temp=temp37;
            }
            else if(a==='M-34'){
                temp=temp38;
            }
            else continue;
      
            var start=bus.rows[j].fromstopname,end=bus.rows[j].tostopname;
            // console.log(start);
            var startid,endid;
            // GOT STARTING POINT ID
            for(let k=0;k<busdata.features.length;k++){
                if(start===busdata.features[k].properties.name){
                    startid=busdata.features[k].properties.stationid;
                    break;
                } 
            }
            // GOT ENT POINT ID
            for(let k=0;k<busdata.features.length;k++){
                if(end===busdata.features[k].properties.name) {
                    endid=busdata.features[k].properties.stationid;
                    break;
                }
            }
            let l=0;
            // NOW ITERATING IN THE ROUTE'S STOPS LIST
            if(typeof(startid)==="Object"){
                for(;l<temp.length;l++){
                    console.log(startid);
                    // if(startid.includes(temp[l].stationid)) break;
                    if(startid[0]===temp[l].stationid) break;
                    if(startid[1]===temp[l].stationid) break;
                }
                
            }
            else{
                for(;l<temp.length;l++){
                    if(startid===temp[l].stationid) break;
                }
            }
            if(typeof(endid)==="Object"){
                while(l<(temp.length-1)&&(!endid[0]===(temp[l+1].stationid) && !endid[1]===(temp[l+1].stationid))){
                    // console.log(1);
                    var st=temp[l].stationname+' to '+temp[l+1].stationname;
                    output[st][0]+=parseInt(bus.rows[j].passengers);
                    l++;
                }
            }
            else{
                while(l<(temp.length-1)&&endid!=temp[l+1].stationid){
                    // console.log(1);
                    var st=temp[l].stationname+' to '+temp[l+1].stationname;
                    output[st][0]+=parseInt(bus.rows[j].passengers);
                    l++;
                }
                
            }
            l++;
            if(l<(temp.length-1)){
                var st=temp[l].stationname+' to '+temp[l+1].stationname;
                output[st][0]+=parseInt(bus.rows[j].passengers);
            }
        }
    }
   
    for(let i in output){
        let value = output[i][0];
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
                renderRoute(map, response); // Get a color for each route
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
    
    const jsonString = JSON.stringify(output, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], {type: 'application/json'});

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'passenger_count_data.json'; // Set the file name
    link.click();
}


function renderRoute(map, response) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { 
            strokeColor:  getRandomColor(),
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
    const value1 = Math.abs(Math.ceil((coor[p].wt/step)-1));
    console.log(mx, mi);
    const color = gradientColors[Math.max(value1,0)];
    console.log(p);
    // var color;
    // if(coor[p].wt < step) color = 'rgb(0, 128, 0)';
    // else if(coor[p].wt >= step && coor[p].wt < step*2) color = 'rgb(255, 255, 0)';
    // else if(coor[p].wt >= step*2 && coor[p].wt < step*3) color = 'rgb(255, 140, 0)';
    // else color = 'rgb(255, 0, 0)';
    p+=1;
    
    return color;
}

window.initMap = initMap;


function docReady() {
        initMap();

    // Call the function to load the API
}
window.addEventListener("load", docReady);