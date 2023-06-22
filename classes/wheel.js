
 class Wheel {
    constructor(company, currAirPress, maxAirPress) {
        this.company = company
        this.currAirPress = currAirPress
        this.maxAirPress = maxAirPress
    }

     inflateWheel(extraAir) {
        try {
            if (!isNaN(extraAir) && this.currAirPress + extraAir <= this.maxAirPress && extraAir > 0) {
                this.currAirPress = this.currAirPress + extraAir
            } else {
                throw new Error('Invalid air pressure was provided ')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = Wheel
