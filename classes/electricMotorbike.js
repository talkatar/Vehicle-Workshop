const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

class ElectricMotorbike extends Vehicle {
  numOfWheels = 2
  constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainRepairs,imgUrl, maxBatteryLife, currBatteryLife, licenseType, engineCapacity) {
    super(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainRepairs,imgUrl)
    this.currBatteryLife = currBatteryLife
    this.maxBatteryLife = maxBatteryLife
    this.licenseType = licenseType
    this.engineCapacity = engineCapacity
    this.remainRepairs = remainRepairs
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 3, 20))

  }
}

module.exports = ElectricMotorbike
