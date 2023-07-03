
 class Wheel {
    constructor(company, currAirPress, maxAirPress) {
        this.company = company
        this.currAirPress = currAirPress
        this.maxAirPress = maxAirPress
    }


    sleep(ms) {
      const start = Date.now()
      while (Date.now() - start < ms) {
    }}

 //sync func version
    
      inflateWheel(quantity) {
        this.repairStatus = "Inflation station"
      const delayMs = quantity * 500
      console.log(delayMs);
      try {
        this.currAirPress += +quantity
         this.sleep(delayMs)
        return  
      } catch (err) {
        throw err
      }
    }

        //async func version
    // inflateWheel(updatedAirPress) {
    //     const deltaAir = updatedAirPress - this.currAirPress
    //     return new Promise((resolve,reject) => {
    //     setTimeout(() => {
    //       try{
    //         this.currAirPress = parseInt(updatedAirPress, 10)
    //         resolve()

    //       }
    //       catch{
    //         reject(err)
    //       }

    //     }, deltaAir * 500)
    //   })
    //   }




}

module.exports = Wheel
