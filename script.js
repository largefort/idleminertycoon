// Game variables
let mineLevel = 1;
let gold = 0;
let workerCount = 0;
let mineRate = 1; // Gold per mine click
let workerRate = 1; // Gold per second per worker

// DOM elements
const mineLevelElement = document.getElementById("mine-level");
const goldElement = document.getElementById("gold");
const mineButton = document.getElementById("mine-button");
const upgradeMineButton = document.getElementById("upgrade-mine");
const upgradeCostElement = document.getElementById("upgrade-cost");
const workersElement = document.getElementById("workers");
const workerCountElement = document.getElementById("worker-count");
const hireWorkerButton = document.getElementById("hire-worker");
const workerCostElement = document.getElementById("worker-cost");
const goldPerSecondElement = document.getElementById("gold-per-second");

// Function to mine gold
function mineGold() {
    gold += mineRate;
    updateUI();
}

// Function to upgrade the mine
function upgradeMine() {
    const upgradeCost = mineLevel * 10;
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        mineLevel++;
        mineRate = mineLevel * 2; // Increase mining rate with each upgrade
        updateUI();
    }
}

// Function to hire a worker
function hireWorker() {
    const workerCost = (workerCount + 1) * 50;
    if (gold >= workerCost) {
        gold -= workerCost;
        workerCount++;
        workerRate = workerCount * 1; // Increase worker rate with each hire
        updateUI();
    }
}

// Function to calculate and update Gold Per Second
function updateGoldPerSecond() {
    const gps = workerCount * workerRate;
    goldPerSecondElement.textContent = gps;
}

// Function to save the game data
function savetek() {
    const gameData = {
        mineLevel: mineLevel,
        gold: gold,
        workerCount: workerCount,
        mineRate: mineRate,
        workerRate: workerRate
    };

    // Convert gameData to a JSON string
    const gameDataJSON = JSON.stringify(gameData);

    // Store the gameData in localStorage
    localStorage.setItem("gameData", gameDataJSON);
}

// Function to load the saved game data
function loadtek() {
    const gameDataJSON = localStorage.getItem("gameData");

    if (gameDataJSON) {
        const gameData = JSON.parse(gameDataJSON);

        mineLevel = gameData.mineLevel;
        gold = gameData.gold;
        workerCount = gameData.workerCount;
        mineRate = gameData.mineRate;
        workerRate = gameData.workerRate;

        updateUI();
    }
}

// Call loadtek() to load the saved game data when the game starts
loadtek();

// Call savetek() to save the game data periodically (e.g., every 30 seconds)
setInterval(savetek, 30000); // 30,000 milliseconds (30 seconds)

// Event listeners
mineButton.addEventListener("click", mineGold);
upgradeMineButton.addEventListener("click", upgradeMine);
hireWorkerButton.addEventListener("click", hireWorker);

// Function to update the game's user interface
function updateUI() {
    mineLevelElement.textContent = mineLevel;
    goldElement.textContent = gold;
    upgradeCostElement.textContent = mineLevel * 10;
    workerCountElement.textContent = workerCount;
    workerCostElement.textContent = (workerCount + 1) * 50;
    updateGoldPerSecond();
}

// Function to start the worker timer
function startWorkerTimer() {
    setInterval(function () {
        gold += workerCount * workerRate;
        updateUI();
    }, 1000);
}

// Initialize the UI, worker timer, and Gold Per Second
updateUI();
startWorkerTimer();
