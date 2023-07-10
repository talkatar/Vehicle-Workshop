
const garageService = require('../api/garage/garage.service.js')
const { Worker } = require('worker_threads')
// const Semaphore = require('semaphore-async-await');
const { Mutex } = require('async-mutex');
const { log } = require('console');


class Garage {
  vehicles = []
  blackList = []
  constructor(numOfWorkers, numOfFuelStations, numOfInflationStations, numOfChargingStations) {
    this.numOfWorkers = +numOfWorkers
    this.numOfFuelStations = +numOfFuelStations
    this.numOfInflationStations = +numOfInflationStations
    this.numOfChargingStations = +numOfChargingStations
  }

  async checkingAvailability(repairDetails) {

    const release = await new Mutex().acquire()
    try {
      const { updatedBatteryLife, updatedFuelQuantity, updatedAirQuantity } = repairDetails
      if (!this.numOfChargingStations && !this.numOfFuelStations && !this.numOfInflationStations || !this.numOfWorkers) {
        setTimeout(() => this.checkingAvailability(repairDetails),2500)
        release()
      }

      if (updatedAirQuantity && this.numOfInflationStations) {
        this.numOfWorkers--
        release()
      }

      else if (updatedBatteryLife && this.numOfChargingStations) {
        this.numOfWorkers--
        release()
      }

      else if (updatedFuelQuantity && this.numOfFuelStations) {
        release()
        this.numOfWorkers--
      }

      else {
        setTimeout(() => this.checkingAvailability(repairDetails),2500)
        release()
      }}

    catch {
      throw new Error('Failed to checking availability');
    }

  }

  async assignWorker(repairDetails) {
    console.log('assignWorker');
    return new Promise((resolve, reject) => {
      const worker = new Worker('./worker.js', { workerData: { repairDetails } })
      worker.on('message', (updatedvehicle) => {
        resolve(updatedvehicle)
      })
      worker.on('error', (error) => {
        reject(error)
      })
    })
  }
}

module.exports = Garage;
