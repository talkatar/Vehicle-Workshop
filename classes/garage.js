

class Garage {
    vehicles=[]
    blackList=[]
    constructor(numOfWorkers, numOfFuelStations, numOfInflationStations, numOfChargingStations) {
        this.numOfWorkers = numOfWorkers
        this.numOfFuelStaions = numOfFuelStations
        this.numOfInflationStations = numOfInflationStations
        this.numOfChargingStations = numOfChargingStations
    }

    insertCar(licenseNum,airQuantity) {

        const vehicleType = checkingVehicleType(licenseNum)
        switch (vehicleType) {
            case 'car':
              if (pressure < 30) {
                car.inflateTires();
                console.log('Car tires inflated.');
              }
              break;
              case 'motorbike':
                // Check pressure for motorbike and perform necessary action
                break;
                case 'motorbike':
      // Check pressure for motorbike and perform necessary action
      break;
      case 'motorbike':
      // Check pressure for motorbike and perform necessary action
      break;
      case 'motorbike':
      // Check pressure for motorbike and perform necessary action
      break;

    }
}

    calcTreatmentPrice() {
        return ""
        
    }

    checkingVehicleType(licenseNum) {

        const countA = (licenseNum.match(/A/g) || []).length
        const countB = (licenseNum.match(/B/g) || []).length
        const lastLetter=licenseNum.slice(0, -1)
        const firstTwoLetters=licenseNum.slice(0, 1)
        const licenseNumLen = licenseNum.length
        const isFirstLetDigit = !isNaN(str.charAt(0))

if(licenseNumLen === 8){

    if(/[AB0123456789]/.test(licenseNum)){

        if((countA % 2 === 0 || countA % 2 === 0))return 'motorbike'
        else if (countA % 2 !== 0 || countA % 2 !== 0) return 'electricmotorbike' 
    
    }

    else if(/[0123456789]/.test(licenseNum)){
         if (licenseNum.includes("08") &&(!isFirstLetDigit&& licenseNum.slice(1,2).includes("01"))) return 'car'
         else if (licenseNum.includes("08") &&(isFirstLetDigit&& licenseNum.slice(1,2).includes("01"))) return 'electriccar'
         else if (firstTwoLetters.includes("80")&&(firstTwoLetters.includes("6"))) return 'truck'
    }
}

else if(licenseNumLen === 5){
    if (/[0123456789]/.test(licenseNum))return 'drawn'
}

    }

    get readyVehicle() {

        calcTreatmentPrice = calcTreatmentPrice()
        return calcTreatmentPrice
    }

    get vehicleDetails() {
        return
    }
    get garageVehiclesDetails() {
        return
    }

    get VehicleByLicenseNum() {
        return
    }

   
}
module.exports = Garage;
