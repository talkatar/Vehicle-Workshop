const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

class Motorbike extends Vehicle {
  numOfWheels = 2
  constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainRepairs,imgUrl, fuelType, tankCapacity, currFuelQuantity,licenseType, engineCapacity) {
    super(company, model, licenseNum, energyPerc, repairStatus, repairPrice,remainRepairs,imgUrl)
    this.fuelType = fuelType
    this.currFuelQuantity = currFuelQuantity
    this.tankCapacity = tankCapacity
    this.engineCapacity = engineCapacity
    this.licenseType = licenseType
    this.remainRepairs = remainRepairs
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 2, 25))
  }

}

module.exports = Motorbike
