const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')



class ElecetircCar extends Vehicle {
  numOfWheels = 4

  constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainTreats,imgUrl, maxBatteryLife, currBatteryLife, color, numOfDoors) {
    super(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainTreats,imgUrl)
    this.currBatteryLife = currBatteryLife
    this.maxBatteryLife = maxBatteryLife
    this.color = color
    this.numOfDoors = numOfDoors
    this.remainTreats = remainTreats
     this.imgUrl = imgUrl

    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 17, 30))

  }
  charging(quantity) {
    this.repairPrice+=quantity*10
    setTimeout(() => {
      this.currBatteryLife += quantity;
    }, quantity * 10000);
  }
}

module.exports = ElecetircCar
