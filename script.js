    "use strict";

    let totalFare = 0;

    // Base Fare per measurement
    let baseFare = 65;
    let perMeterFare = 13.5;
    let perMinuteFare = 2;

    // Measurement while meter running
    let totalDistance = 0;
    let totalDistanceKm = 0;
    let durationMinute = 0;
    let durationSeconds = 0;
    let speedMeter = 0;

    // Status
    let isHired = false;
    let isPaused = false;
    let isTampered = false;

    // Declaring Text
    let timerMin = document.querySelector(`#timer-minute`);
    let timerSecs = document.querySelector(`#timer-seconds`);

    let meterDistance = document.querySelector("#meter-distance");
    let textFare = document.querySelector("#meter-fare");

    let speedometerText = document.querySelector(`#speedometer`);
    // Declaring Buttons
    let vacantBtn = document.querySelector("#vacant");
    let hiredBtn = document.querySelector("#hired");
    let stopBtn = document.querySelector("#stop");
    let printBtn = document.querySelector("#print");
    let speedUpBtn = document.querySelector("#speedUp");
    let speedDownBtn = document.querySelector("#speedDown");
    let settingsBtn = document.querySelector("#settings");

    // Main Functions

    // Starts the Meter
    function initializeFare() {
    if (isHired) {
        console.log("Meter already running!");
    } else {
        isHired = true;
        isPaused = false;
        totalFare += baseFare;
        countMeter();
        updateFareText();
        vacantBtn.disabled = true;
        hiredBtn.disabled = true;
        stopBtn.disabled = false;
        speedUpBtn.disabled = false;
        speedDownBtn.disabled = false;
    }
    }

    // Counts the Meter every second
    function countMeter() {
    if (isHired && !isPaused) {
        // Count Timer
        setTimeout(() => {
        countTimer();
        countDistance();
        countMeter();
        }, 1000);
    }
    updateFareText();
    }

    // Calculates the timer
    function countTimer() {
    if (durationSeconds >= 59 && isHired && !isPaused) {
        durationSeconds = 0;
        durationMinute++;
        countFareDuration();
    } else if (isHired && !isPaused){
        durationSeconds++;
    }
    updateTimerText();
    }

    // Increases fare by 2 pesos per minute
    function countFareDuration() {
    totalFare += perMinuteFare;
    }

    // Increases fare per KM
    function countFareDistance() {
    totalFare += perMeterFare;
    }

    // Calculates the Distance
    function countDistance() {
    totalDistance += speedMeter * 0.000277778;
    totalDistanceKm += speedMeter * 0.000277778;
    if (totalDistanceKm >= 1) {
        totalDistanceKm -= 1;
        countFareDistance();
    }
    updateDistanceText();
    }

    // Initialize Vacant
    function initizalizeVacant() {
    if (speedMeter == 0 && isHired && isPaused) {
        totalFare = 0;
        totalDistance = 0;
        totalDistanceKm = 0;
        durationMinute = 0;
        durationSeconds = 0;
        updateFareText();
        updateTimerText();
        updateDistanceText();
        isHired = false;
        isPaused = false;
        vacantBtn.disabled = true;
        hiredBtn.disabled = false;
        stopBtn.disabled = true;
        speedUpBtn.disabled = true;
        speedDownBtn.disabled = true;
        printBtn.disabled = true;
    } else {
        alert("Your Taxi is running!")
    }
    }

    // Text Functions
    function updateTimerText() {
    if (durationSeconds >= 10) {
        timerSecs.textContent = `${durationSeconds}`;
    } else {
        timerSecs.textContent = `0${durationSeconds}`;
    }

    if (durationMinute >= 10) {
        timerMin.textContent = `${durationMinute}`;
    } else {
        timerMin.textContent = `0${durationMinute}`;
    }
    }

    function updateDistanceText() {
    meterDistance.textContent = `${totalDistance.toFixed(1)}`;
    }

    function updateFareText() {
    textFare.textContent = `${totalFare}`;
    }

    // Button Functions
    vacantBtn.onclick = function () {
    console.log("Vacant!");
    initizalizeVacant();
    };

    hiredBtn.onclick = function () {
    console.log("Hired!");
    initializeFare();
    };

    stopBtn.onclick = function () {
    console.log("Stop!");
    if (!isPaused) {
        isPaused = true;
        vacantBtn.disabled = false;
    } else {
        isPaused = false;
        vacantBtn.disabled = true;
        countMeter()
    }
    };

    printBtn.onclick = function () {
    console.log("Print!");
    };

    speedUpBtn.onclick = function () {
    console.log("Speed Up!");
    if (speedMeter >= 0 && isHired) {
        speedMeter++;
        speedometerText.textContent = `${speedMeter}`;
    }
    };

    speedDownBtn.onclick = function () {
    console.log("Speed Down!");
    if (speedMeter > 0 && isHired) {
        speedMeter--;
        speedometerText.textContent = `${speedMeter}`;
    }
    };

    settingsBtn.onclick = function () {
    console.log("Settings...");
    alert("Coming Soon!\nUpcoming Settings are Historical Fare, Batingting Mode, Speed Limiter, and more!")
    };

    // Popup Settings