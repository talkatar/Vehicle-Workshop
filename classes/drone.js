const Vehicle = require('./vehicle.js')

class Drone extends Vehicle {
    constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, remainTreats, imgUrl, maxBatteryLife, currBatteryLife, numOfEngines, controlInterface) {
        super(company, model, licenseNum, energyPerc, treatStatus, treatPrice, remainTreats, imgUrl)
        this.currBatteryLife = currBatteryLife
        this.maxBatteryLife = maxBatteryLife
        this.controlInterface = controlInterface
        this.numOfEngines = numOfEngines
        this.remainTreats = remainTreats
        this.imgUrl = imgUrl
    }
}

module.exports = Drone
