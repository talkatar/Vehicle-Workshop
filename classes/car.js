const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

class Car extends Vehicle {
  numOfWheels = 4
  constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, remainTreats, imgUrl, fuelType, tankCapacity, color, numOfDoors, currFuelQuantity) {
    super(company, model, licenseNum, energyPerc, treatStatus, treatPrice, remainTreats, imgUrl)
    this.fuelType = fuelType
    this.currFuelQuantity = currFuelQuantity
    this.tankCapacity = tankCapacity
    this.color = color
    this.numOfDoors = numOfDoors
    this.remainTreats = remainTreats
    this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 15, 30))

  }

  addFuel(quantity) {
    try {
      if (!isNaN(quantity) && this.currFuelQuantity + quantity <= this.maxFuelQuantity && quantity > 0) {
        this.currFuelQuantity += quantity
        this.energyPerc = (this.currFuelQuantity / this.tankCapacity)
      } else {
        throw new Error('Invalid fuel quantity was provided');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = Car
