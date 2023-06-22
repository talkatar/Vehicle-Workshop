const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

 class Truck extends Vehicle {
    numOfWheels = 16
    constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice,remainTreats,imgUrl, fuelType,currFuelQuantity, tankCapacity, isDrivenDangerGoods, rearChargerCapacity) {
        super(company, model, licenseNum, energyPerc,treatStatus,treatPrice,remainTreats,imgUrl)
        this.fuelType = fuelType
        this.currFuelQuantity=currFuelQuantity
        this.tankCapacity = tankCapacity
        this.isDrivenDangerGoods = isDrivenDangerGoods
        this.rearChargerCapacity = rearChargerCapacity
        this.remainTreats = remainTreats
     this.imgUrl = imgUrl
        this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 20, 30))
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

const myTruck = new Truck("Example Company", "Example Model", "ABC123", 80, 95, 70, true, 20)

myTruck.wheels.forEach((wheel) => {
    wheel.inflateWheel(10);

})


module.exports = Truck
