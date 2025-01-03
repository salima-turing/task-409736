const DEVICE_COUNT = 10000;
const READINGS_PER_MINUTE = 12; // 60 seconds / 5 seconds per reading
const READING_HISTORY_LENGTH = READINGS_PER_MINUTE;

const deviceReadings = Array.from({ length: DEVICE_COUNT }, () => {
    return Array(READING_HISTORY_LENGTH).fill(null);
});

function generateRandomReading() {
    return Math.random() * 100; // Assuming power demand between 0 and 100 kW
}

function fetchLatestReadings() {
    for (let deviceId = 0; deviceId < DEVICE_COUNT; deviceId++) {
        const newReading = generateRandomReading();

        deviceReadings[deviceId].unshift(newReading);
        deviceReadings[deviceId].pop();

        updateDemandForecast(deviceId);
    }
}

function updateDemandForecast(deviceId) {
    const readings = deviceReadings[deviceId];
    const validReadings = readings.filter(Boolean);

    if (validReadings.length === 0) {
        console.log(`Device ${deviceId}: No recent readings available.`);
        return;
    }

    const sum = validReadings.reduce((acc, reading) => acc + reading, 0);
    const averageDemand = sum / validReadings.length;

    console.log(`Device ${deviceId}: Average demand for the last minute: ${averageDemand.toFixed(2)} kW`);
}
function simulateRealTimeData() {
    setInterval(fetchLatestReadings, 5000);
}

simulateRealTimeData();
