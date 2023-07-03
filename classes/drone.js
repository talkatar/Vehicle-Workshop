const Vehicle = require('./vehicle.js')

class Drone extends Vehicle {
    constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl, maxBatteryLife, currBatteryLife, numOfEngines, controlInterface) {
        super(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl)
        this.currBatteryLife = currBatteryLife
        this.maxBatteryLife = maxBatteryLife
        this.controlInterface = controlInterface
        this.numOfEngines = numOfEngines
        this.remainRepairs = remainRepairs
        this.imgUrl = imgUrl
    }
}

module.exports = Drone
