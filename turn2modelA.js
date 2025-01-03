const DEVICE_COUNT = 10000;
const READINGS_PER_MINUTE = 12; // 60 seconds / 5 seconds per reading
const READING_HISTORY_LENGTH = READINGS_PER_MINUTE;

// Default thresholds (can be configured per device)
const DEFAULT_THRESHOLD = 20; // Threshold for detection (in kW)

const deviceReadings = Array.from({ length: DEVICE_COUNT }, () => {
    return Array(READING_HISTORY_LENGTH).fill(null);
});

const deviceThresholds = Array.from({ length: DEVICE_COUNT }, () => {
    return {
        upperThreshold: DEFAULT_THRESHOLD,
        lowerThreshold: -DEFAULT_THRESHOLD // Setting negative threshold for drop detection
    };
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

    // Check for anomalies
    checkAnomalies(validReadings, deviceId, newReading, averageDemand);
}

function checkAnomalies(validReadings, deviceId, newReading, averageDemand) {
    const thresholds = deviceThresholds[deviceId];
    const spikeThreshold = averageDemand + thresholds.upperThreshold;
    const dropThreshold = averageDemand + thresholds.lowerThreshold;

    if (newReading > spikeThreshold) {
        console.log(`ALERT: Device ${deviceId} is experiencing a spike: ${newReading.toFixed(2)} kW`);
    } else if (newReading < dropThreshold) {
        console.log(`ALERT: Device ${deviceId} is experiencing a drop: ${newReading.toFixed(2)} kW`);
    }
}

function simulateRealTimeData() {
    setInterval(fetchLatestReadings, 5000);
}

// Start simulation
simulateRealTimeData();
