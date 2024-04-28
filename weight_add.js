
const fs = require('fs');
const bus = require('./bus_data.json');
const busdata = require('./data1.json');
var output=require('./output.json');
for(let i=0;i<bus.rows.length;i++){
    var a=bus.rows[i].route_name;
    if(a==='C-1'){
        var temp=require('./Routes/5492.json');
    }
    else if(a==='C-3'){
        var temp=require('./Routes/5488.json');
    }
    else if(a==='M-11'){
        var temp=require('./Routes/5471.json');
    }
    else if(a==='M-17'){
        var temp=require('./Routes/5537.json');
    }
    else if(a==='M-23'){
        var temp=require('./Routes/5546.json');
    }
    else if(a==='E-3'){
        var temp=require('./Routes/5585.json');
    }
    else if(a==='M-29'){
        var temp=require('./Routes/5551.json');
    }
    else if(a==='E-4'){
        var temp=require('./Routes/5581.json');
    }
    else continue;
    var start=bus.rows[i].fromstopname,end=bus.rows[i].tostopname;
    var startid,endid;
    for(let k=0;k<busdata.features.length;k++){
        if(start===busdata.features[k].properties.name){
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
    let j=0;
    for(;j<temp.length;j++){
        if(startid===temp[j].stationid) break;
    }
    while(j<(temp.length-1)&&endid!=temp[j+1].stationid){
        var st=temp[j].stationname+' to '+temp[j+1].stationname;
        output[st]+=parseInt(bus.rows[i].passengers);
        j++;
    }
    j++;
    if(j<(temp.length-1)){
        var st=temp[j].stationname+' to '+temp[j+1].stationname;
        output[st]+=parseInt(bus.rows[i].passengers);
    }
}
output=JSON.stringify(output,null,2);
const filePath = 'output.json';

// Write the JSON string to the file
fs.writeFile(filePath, output, (err) => {
  if (err) {
    console.error('Error writing to JSON file:', err);
  } else {
    console.log('Data has been written to the JSON file:', filePath);
  }
});
//c1 c3 m17 m11