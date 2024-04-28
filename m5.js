

import stations from './getAllStation.json' assert { type: 'json' };
import output from './sample_passenger_to_bus_count.json' assert { type: 'json' };
import bus from './bus_data.json' assert { type: 'json' };
import busdata from './data1.json' assert { type: 'json' };
import temp1 from './Routes/5492.json' assert { type: 'json' };
import temp2 from './Routes/5488.json' assert { type: 'json' };
import temp3 from './Routes/5471.json' assert { type: 'json' };
import temp4 from './Routes/5537.json' assert { type: 'json' };




// Sample object with arrays as values

  console.log(typeof(output));
  
  // Convert the object into an array of key-value pairs
  const entries = Object.entries(output);
  
  // Sort the array based on the first element of the array (value[0])
  entries.sort((a, b) => a[1][0] - b[1][0]);
  
  // Convert the sorted array back to an object
  const sortedObj = Object.fromEntries(entries);
  
  console.log(sortedObj);
  const jsonString = JSON.stringify(sortedObj, null, 3);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], {type: 'application/json'});

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sorted_busdata.json'; // Set the file name
    link.click();
