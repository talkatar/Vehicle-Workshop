const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')



class ElectricMotorbike extends Vehicle {
  numOfWheels = 2
  constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainTreats,imgUrl, maxBatteryLife, currBatteryLife, licenseType, engineCapacity) {
    super(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainTreats,imgUrl)
    this.currBatteryLife = currBatteryLife
    this.maxBatteryLife = maxBatteryLife
    this.licenseType = licenseType
    this.engineCapacity = engineCapacity
    this.remainTreats = remainTreats
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 3, 20))

  }
  charging(quantity) {
    this.repairPrice+=quantity*10
    setTimeout(() => {
      this.currBatteryLife += quantity;
    }, quantity * 10000);
  }
}

module.exports = ElectricMotorbike
