

 class Vehicle {
    constructor(company, model, licenseNum, energyPerc,treatStatus,remainTreats,treatPrice,imgUrl) {
        this.company = company
        this.model = model
        this.licenseNum = licenseNum
        this.energyPerc = energyPerc
        this.treatStatus = treatStatus
        this.treatPrice = treatPrice
        this.remainTreats = remainTreats
        this.imgUrl = imgUrl

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

module.exports = Vehicle
