const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

class Car extends Vehicle {
  numOfWheels = 4
  constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl, fuelType, tankCapacity, color, numOfDoors, currFuelQuantity) {
    super(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl)
    this.fuelType = fuelType
    this.currFuelQuantity = currFuelQuantity
    this.tankCapacity = tankCapacity
    this.color = color
    this.numOfDoors = numOfDoors
    this.remainRepairs = remainRepairs
    this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 15, 30))
  }
}
module.exports = Car
