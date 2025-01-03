const DEVICE_COUNT = 10000;
const READINGS_PER_MINUTE = 12;
const READING_HISTORY_LENGTH = READINGS_PER_MINUTE;
const ANOMALY_DETECTION_WINDOW = 3; // Number of readings to consider for anomaly detection

const deviceReadings = Array.from({ length: DEVICE_COUNT }, () => {
    return Array(READING_HISTORY_LENGTH).fill(null);
});

const deviceThresholds = Array(DEVICE_COUNT).fill({
    min: 0,
    max: 100
});

function generateRandomReading() {
    return Math.random() * 100;
}

function fetchLatestReadings() {
    for (let deviceId = 0; deviceId < DEVICE_COUNT; deviceId++) {
        const newReading = generateRandomReading();

        deviceReadings[deviceId].unshift(newReading);
        deviceReadings[deviceId].pop();
        updateDemandForecast(deviceId);
        detectAnomaly(deviceId);
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

function detectAnomaly(deviceId) {
    const readings = deviceReadings[deviceId];
    const validReadings = readings.filter(Boolean).slice(-ANOMALY_DETECTION_WINDOW);

    if (validReadings.length < ANOMALY_DETECTION_WINDOW) {
        console.log(`Device ${deviceId}: Not enough readings for anomaly detection.`);
        return;
    }

    const latestReading = validReadings[0];
    const averageRecentReadings = validReadings.slice(1).reduce((acc, reading) => acc + reading, 0) / (validReadings.length - 1);

    if (latestReading < deviceThresholds[deviceId].min || latestReading > deviceThresholds[deviceId].max) {
        console.log(`Device ${deviceId}: Anomaly detected!`);
        console.log(`Latest Reading: ${latestReading.toFixed(2)} kW`);
        console.log(`Average of Recent Readings: ${averageRecentReadings.toFixed(2)} kW`);
        console.log(`Thresholds: Min=${deviceThresholds[deviceId].min.toFixed(2)} kW, Max=${deviceThresholds[deviceId].max.toFixed(2)} kW`);
    }
}
function simulateRealTimeData() {
    setInterval(fetchLatestReadings, 5000);
}

simulateRealTimeData();
