
const fs = require('fs');
const data = require('./GetRoutes.json');
var jsonData={};
for (let i = 0; i < data.length; i++) {
    var path = './Routes/'+data[i].RouteId+'.json';
    if (fs.existsSync(path)) {
        var temp=require(path);
        for(let j=0;j<temp.length-1;j++){
            var st=temp[j].stationname+' to ' + temp[j+1].stationname;
            jsonData[st]=[0,1];
        }
    }
}
const jsonDataf = JSON.stringify(jsonData, null, 2); // The second argument adds indentation for readability

// Specify the file path where you want to save the JSON data
const filePath = 'output.json';

// Write the JSON string to the file
fs.writeFile(filePath, jsonDataf, (err) => {
  if (err) {
    console.error('Error writing to JSON file:', err);
  } else {
    console.log('Data has been written to the JSON file:', filePath);
  }
});


