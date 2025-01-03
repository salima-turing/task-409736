// Constants
const NUMBER_OF_DEVICES = 10000;
const READ_INTERVAL = 5000; // 5 seconds

// Array to hold the current readings from devices
let deviceReadings = new Array(NUMBER_OF_DEVICES).fill(0);
// Array to hone historical data (for simplicity, we will keep only the last 10 readings)
let historicalReadings = [];

// Function to simulate reading data from smart meters
function simulateDeviceReadings() {
    for (let i = 0; i < NUMBER_OF_DEVICES; i++) {
        // Here, we're simulating reading a random value
        deviceReadings[i] = Math.random() * 100; // Simulating readings from 0 to 100
    }

    // Process readings: e.g., calculating the average
    processReadings();
}

// Function to process the device readings
function processReadings() {
    let total = 0;

    for (let i = 0; i < NUMBER_OF_DEVICES; i++) {
        total += deviceReadings[i];
    }

    const averageDemand = total / NUMBER_OF_DEVICES;

    // Store average for historical reference
    historicalReadings.push(averageDemand);

    if (historicalReadings.length > 10) {
        // Keep only the last 10 readings
        historicalReadings.shift();
    }

    console.log("Average Demand: ", averageDemand);
}

// Start reading data every 5 seconds
setInterval(simulateDeviceReadings, READ_INTERVAL);
