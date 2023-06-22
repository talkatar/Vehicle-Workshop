const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')



class Motorbike extends Vehicle {
  numOfWheels = 2

  constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl, fuelType, tankCapacity, currFuelQuantity,licenseType, engineCapacity) {
    super(company, model, licenseNum, energyPerc, treatStatus, treatPrice,remainTreats,imgUrl)
    this.fuelType = fuelType
    this.currFuelQuantity = currFuelQuantity
    this.tankCapacity = tankCapacity
    this.engineCapacity = engineCapacity
    this.licenseType = licenseType
    this.remainTreats = remainTreats
     this.imgUrl = imgUrl
    this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 2, 25))

  }
  addFuel(quantity) {
    try {
      if (!isNaN(quantity) && this.currFuelQuantity + quantity <= this.maxFuelQuantity && quantity > 0) {
        this.currFuelQuantity += quantity;
      } else {
        throw new Error('Invalid fuel quantity was provided');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Motorbike
