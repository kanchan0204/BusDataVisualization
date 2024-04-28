// import stations from './getAllStation.json' assert { type: 'json' };
// import output11 from './output1.json' assert { type: 'json' };
const output = require('./m2.js');

const fs = require('fs');

co = JSON.stringify(output, null, 2); // The second argument adds indentation for readability

// Specify the file path where you want to save the JSON data
const filePath = 'testcase1.json';
console.log(output);
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


