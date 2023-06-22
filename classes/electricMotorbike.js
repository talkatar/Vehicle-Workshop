const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')



class ElectricMotorbike extends Vehicle {
  numOfWheels = 2
  constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl, maxBatteryLife, currBatteryLife, licenseType, engineCapacity) {
    super(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl)
    this.currBatteryLife = currBatteryLife
    this.maxBatteryLife = maxBatteryLife
    this.licenseType = licenseType
    this.engineCapacity = engineCapacity
    this.remainTreats = remainTreats
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 3, 20))

  }
  charging(quantity) {
    try {
      if (!isNaN(quantity) && this.currBatteryLife + quantity <= this.maxBatteryLife && quantity > 0) {
        this.currBatteryLife += quantity;
      } else {
        throw new Error('Invalid charge quantity was provided');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ElectricMotorbike
