const { parentPort, workerData } = require("worker_threads")
const garageService = require('./api/garage/garage.service');

processWorkerData(workerData.repairDetails, workerData.gGarage)

async function processWorkerData(repairDetails) {
  try {
    const updatedvehicle = await garageService.update(repairDetails);
    parentPort.postMessage(updatedvehicle)
  }
  catch (error) {
    console.error('An error occurred with worker:', error);
    throw error
  }
}
