// import stations from './getAllStation.json' assert { type: 'json' };
// import output from './output.json' assert { type: 'json' };
const fs = require('fs');
const stations = require('./getAllStation.json');
const output = require('./output.json');
var coor = [];
var co=[];
var mx=0,mi=99999;
for(let i in output){
    let value = output[i][0];
    output[i][1]=1;
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

co = JSON.stringify(co, null, 2); // The second argument adds indentation for readability

// Specify the file path where you want to save the JSON data
const filePath = 'co.json';

// Write the JSON string to the file
fs.writeFile(filePath, co, (err) => {
  if (err) {
    console.error('Error writing to JSON file:', err);
  } else {
    console.log('Data has been written to the JSON file:', filePath);
  }
});

coor = JSON.stringify(coor, null, 2); // The second argument adds indentation for readability

// Specify the file path where you want to save the JSON data
const filePath1 = 'coor.json';

// Write the JSON string to the file
fs.writeFile(filePath1, coor, (err) => {
  if (err) {
    console.error('Error writing to JSON file:', err);
  } else {
    console.log('Data has been written to the JSON file:', filePath1);
  }
});


