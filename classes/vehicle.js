
const { getRandomInt } = require('../services/util.service');


 class Vehicle {
    constructor(company, model, licenseNum, energyPerc,repairStatus,remainRepairs,repairPrice,imgUrl) {
        this.company = company
        this.model = model
        this.licenseNum = licenseNum
        this.energyPerc = energyPerc
        this.repairStatus = repairStatus
        this.repairPrice = repairPrice
        this.remainRepairs = remainRepairs
        this.imgUrl = imgUrl

    }




 ///sync func

   sleep(ms) {
      const start = Date.now()
      while (Date.now() - start < ms) {
    }}



    refuelVehicle(quantity) {

        var delay = null
        var retries = 0

  
          if (this.currFuelQuantity>=0) {
            delay = 250
            try {
              this.repairPrice += parseInt(quantity, 10) * 5
              this.currFuelQuantity += parseInt(quantity, 10)
              this.energyPerc = 100 * (this.currFuelQuantity / this.tankCapacity)
              if (this.currFuelQuantity === this.tankCapacity) this.remainRepairs--
              console.log('before delay',quantity)
              this.sleep(quantity * delay)
              console.log('after delay',quantity);
            //   retries = 0
            //  return
            }

             catch {
              if (retries < 2) {
                retries++
              const cleaningDirt = 25
              this.repairPrice = cleaningDirt
              this.currFuelQuantity=0
               this.refuelVehicle(this.tankCapacity)}
               else {
                throw new Error('Failed to refuel vehicle')
              }
            }
          } else {
            try {
              delay = 1000
              this.repairPrice += parseInt(quantity, 10) * 10
              this.currBatteryLife += parseInt(quantity, 10)
              this.energyPerc = 100 * (this.currBatteryLife / this.maxBatteryLife)
              if (this.currBatteryLife === this.maxBatteryLife) this.remainRepairs--
              console.log('before delay',quantity)
              this.sleep(quantity * delay)
              console.log('after delay',quantity)
        //       retries = 0
        // return
        //  Promise.resolve()
            } 
            catch {
              if (retries < 2) {
             retries++
              const randomQuantity = this.getRandomInt(this.currBatteryLife, this.maxBatteryLife)
              const newBattery = 1500
              this.repairPrice = newBattery
              this.currBatteryLife=0
               this.refuelVehicle(randomQuantity)
            }
            else {
              throw new Error('Failed to charging vehicle')
            }
          }
        }
      }

         getRandomInt(min, max) {
          min = Math.ceil(min)
          max = Math.floor(max)
          return Math.floor(Math.random() * (max - min + 1)) + min
        }
    

        
    //////////async func version


 

    // refuelVehicle(quantity) {
    //     return new Promise((resolve) => {
    //       let delay=null
    //       if(this.currFuelQuantity) delay=250
    //       else  delay=1000

    //       setTimeout(() => {
    //       if(this.currFuelQuantity)  {
    //         try{
    //           this.repairStatus="fuel station"
    //           this.repairPrice += parseInt(quantity, 10) * 5
    //           this.currFuelQuantity += parseInt(quantity, 10)
    //           this.energyPerc=100*(this.currFuelQuantity/this.tankCapacity)
    //           if(this.currFuelQuantity===this.tankCapacity)this.remainRepairs--
    //         }

    //         catch{
    //           refuelVehicle(this.tankCapacity)
    //           const cleaningDirt=25
    //           this.repairPrice+=cleaningDirt
    //         }
    //       }
         
    //       else {

    //         try{
    //           this.repairStatus="Charge station"
    //           this.repairPrice += parseInt(quantity, 10) * 10
    //           this.currBatteryLife += parseInt(quantity, 10)
    //         this.energyPerc=100*(this.currBatteryLife/this.maxBatteryLife)
    //         if(this.currBatteryLife===this.maxBatteryLife) this.remainRepairs--
    //         }

    // catch {
    //   const randomQuantity = utilService.getRandomInt(
    //     this.currBatteryLife,
    //     this.maxBatteryLife
    //   )
    //   const newBattery = 1500
    //   this.repairPrice += newBattery
    //    refuelVehicle(randomQuantity)
    // }
          
    //     }
    //         resolve()
    //       }, 
    //       quantity * delay);
    //     });

    //   }

}

module.exports = Vehicle
