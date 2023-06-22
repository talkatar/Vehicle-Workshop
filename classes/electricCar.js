const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')



class ElecetircCar extends Vehicle {
  numOfWheels = 4

  constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl, maxBatteryLife, currBatteryLife, color, numOfDoors) {
    super(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl)
    this.currBatteryLife = currBatteryLife
    this.maxBatteryLife = maxBatteryLife
    this.color = color
    this.numOfDoors = numOfDoors
    this.remainTreats = remainTreats
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 17, 30))

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

module.exports = ElecetircCar
