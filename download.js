

const https = require('https');
const fs = require('fs');
const data = require('./GetRoutes.json');
const { dirname } = require('path');
// Define the URL of the JSON file you want to download
console.log(dirname);

// Specify the destination file path where you want to save the JSON data


// Function to download and save the JSON data to a local file
function downloadJSONFile(url, destinationFilePath) {
  const file = fs.createWriteStream(destinationFilePath);
  
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`HTTP Error: ${response.statusCode} - ${response.statusMessage}`);
      return;
    }

    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log(`JSON data downloaded and saved to ${destinationFilePath}`);
      });
    });
  }).on('error', (error) => {
    fs.unlink(destinationFilePath, () => {}); // Delete the file if an error occurs
    console.error('Error:', error);
  });
}

for (let i = 0; i < data.length; i++) {
// Call the function to download the JSON file
var url = 'https://aictslportal.infinium.management/ListofRoutes/GetRoutesDetails?RouteId='+data[i].RouteId;
var destinationFilePath = 'Routes/'+data[i].RouteId+'.json';
downloadJSONFile(url, destinationFilePath);
}
