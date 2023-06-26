
const utilService = require('../public/services/util.service.js');


 class Vehicle {
    constructor(company, model, licenseNum, energyPerc,repairStatus,remainTreats,repairPrice,imgUrl) {
        this.company = company
        this.model = model
        this.licenseNum = licenseNum
        this.energyPerc = energyPerc
        this.repairStatus = repairStatus
        this.repairPrice = repairPrice
        this.remainTreats = remainTreats
        this.imgUrl = imgUrl

    }
 

    refuelVehicle(quantity) {
        return new Promise((resolve) => {
          let delay=null
          if(this.currFuelQuantity) delay=250
          else  delay=1000

          setTimeout(() => {
          if(this.currFuelQuantity)  {
            try{
              this.repairStatus="fuel station"
              this.repairPrice += parseInt(quantity, 10) * 5
              this.currFuelQuantity += parseInt(quantity, 10)
              this.energyPerc=100*(this.currFuelQuantity/this.tankCapacity)
              if(this.currFuelQuantity===this.tankCapacity)this.remainRepairs--
            }

            catch{
              refuelVehicle(this.tankCapacity)
              const cleaningDirt=25
              this.repairPrice+=cleaningDirt
            }
          }
         
          else {

            try{
              this.repairStatus="Charge station"
              this.repairPrice += parseInt(quantity, 10) * 10
              this.currBatteryLife += parseInt(quantity, 10)
            this.energyPerc=100*(this.currBatteryLife/this.maxBatteryLife)
            if(this.currBatteryLife===this.maxBatteryLife) this.remainRepairs--
            }

            catch{
              const randomAirPressure=utilService.getRandomInt(wheel.currAirPress+1,wheel.maxAirPress)
              refuelVehicle(randomAirPressure)
              const newBattery=1500
              this.repairPrice+=newBattery
            }
          
        }
            resolve()
          }, 
          quantity * delay);
        });

      }

}

module.exports = Vehicle
