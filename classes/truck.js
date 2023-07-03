const Vehicle = require('./vehicle.js')
const Wheel = require('./wheel.js')

class Truck extends Vehicle {
    numOfWheels = 16
    constructor(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl, fuelType, currFuelQuantity, tankCapacity, isDrivenDangerGoods, rearChargerCapacity) {
        super(company, model, licenseNum, energyPerc, repairStatus, repairPrice, remainRepairs, imgUrl)
        this.fuelType = fuelType
        this.currFuelQuantity = currFuelQuantity
        this.tankCapacity = tankCapacity
        this.isDrivenDangerGoods = isDrivenDangerGoods
        this.rearChargerCapacity = rearChargerCapacity
        this.remainRepairs = remainRepairs
        this.imgUrl = imgUrl
        this.wheels = Array(this.numOfWheels).fill().map(() => new Wheel("Wheel Model", 20, 30))
    }

}



module.exports = Truck
