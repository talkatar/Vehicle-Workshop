
 class Wheel {
    constructor(company, currAirPress, maxAirPress) {
        this.company = company
        this.currAirPress = currAirPress
        this.maxAirPress = maxAirPress
    }

    inflateWheel(updatedAirPress) {
        const deltaAir = updatedAirPress - this.currAirPress
        return new Promise((resolve,reject) => {
        setTimeout(() => {
          try{
            this.currAirPress = parseInt(updatedAirPress, 10)
            resolve()

          }
          catch{
            reject(err)
          }

        }, deltaAir * 500)
      })
      }





}

module.exports = Wheel
