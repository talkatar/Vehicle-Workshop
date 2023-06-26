const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const vehicleService = require('../vehicle/vehicle.service')
const Garage = require('../../classes/garage.js')
const Vehicle = require('../../classes/vehicle.js')
const Wheel = require('../../classes/wheel.js')




async function query() {
    try {
        const collection = await dbService.getCollection('garage')
        const garage = await collection.find({}).toArray();
        if (!garage.length === 0) return null
        return garage
    } catch (err) {
        logger.error('cannot find garage', err)
        throw err
    }
}




async function add(garage) {
    try {
        const collection = await dbService.getCollection('garage')
        const newGarage = new Garage(garage.numOfWorkers, garage.numOfFuelStations, garage.numOfInflationStations, garage.numOfChargingStations)
        collection.insertOne(newGarage)
        return newGarage
    } catch (err) {
        logger.error('cannot insert garage', err)
        throw err
    }
}

async function getById(vehicleId) {
    try {
        const collection = await dbService.getCollection('garage');
        const garage = await collection.findOne({});
        if (garage) {
            const vehicles = garage.vehicles;
            const foundVehicle = vehicles.find(vehicle => vehicle.licenseNum === vehicleId);
            return foundVehicle
        }
        else return null

    } catch (err) {
        logger.error(`while finding vehicle ${vehicleId}`, err)

    }

}

async function insertVehicle(vehicle, fullname, phoneNumber) {
    try {
        const collection = await dbService.getCollection('garage')
        vehicle.remainRepairs = 0
        vehicle.type=checkingVehicleType(vehicle.licenseNum)
        console.log('vehicle.type',vehicle.type,);
        if (vehicle.currFuelQuantity !== vehicle.tankCapacity || vehicle.currBatteryLife !== vehicle.maxBatteryLife) vehicle.remainRepairs++
        if (vehicle.wheels&&averageAirPressure(vehicle.wheels) !== 100) vehicle.remainRepairs++
        const vehicleToSave = { ...vehicle, fullname, phoneNumber, repairStatus: 'Waiting', repairPrice: 0,vehicleType:vehicle.type};
        await collection.updateOne({}, { $push: { vehicles: vehicleToSave } })
    } catch (err) {
        logger.error(`cannot update garage `, err)
        throw err
    }
}


async function remove(vehicleId) {
    try {
        const collection = await dbService.getCollection('garage')
        await collection.updateOne(
            {},
            { $pull: { vehicles: { _id: ObjectId(vehicleId) } } }
        );
        return vehicleId;
    } catch (err) {
        logger.error(`cannot remove vehicle ${vehicleId}`, err);
        throw err;
    }
}



async function update(repairDetails) {
    try {
        const { licenseNum, updatedBatteryLife, updatedFuelQuantity, updatedAirPressure } = repairDetails
        let vehicle = await getById(licenseNum)
        Object.setPrototypeOf(vehicle, Vehicle.prototype);
        vehicle.repairStatus = "On Progress"

        if (updatedAirPressure) {
            const wheels = vehicle.wheels
            const numWheels = wheels.length
            vehicle.repairStatus = "Inflation station"
            for (let i = 0; i < numWheels; i++) {
                const wheel = wheels[i]
                Object.setPrototypeOf(wheel, Wheel.prototype)
                const deltaAir = updatedAirPressure - wheel.currAirPress
                vehicle.repairPrice += parseInt(deltaAir, 10) * 0.1
                try {
                    await wheel.inflateWheel(updatedAirPressure)
                }
                catch {
                    await wheel.inflateWheel(this.maxAirPress)
                    const newTire = 350
                    vehicle.repairPrice += newTire * numWheels + parseInt(this.maxAirPress - (deltaAir + updatedAirPressure), 10) * 0.1
                }
            }
        }

        
        if (updatedFuelQuantity) {
            await vehicle.refuelVehicle(updatedFuelQuantity)
        }
        else if (updatedBatteryLife) {
            await vehicle.refuelVehicle(updatedBatteryLife)

        }

        if (!vehicle.remainRepairs) vehicle.repairStatus = "Ready"
        const collection = await dbService.getCollection('garage')
        await collection.updateOne({ 'vehicles.licenseNum': vehicle.licenseNum }, { $set: { 'vehicles.$': vehicle } });
        return vehicle

    }

    catch (err) {
        logger.error(`cannot update vehicle `, err);
        throw err;
    }
}


async function insertBlackList(vehicle) {
    try {
        console.log(vehicle);
        const collection = await dbService.getCollection('garage')
        await collection.updateOne({}, { $addToSet: { blackList: vehicle } });
    } catch (err) {
        logger.error(`Cannot insert vehicle into blackList `, err)
        throw err
    }
}

// async function getGarageCollection() {
//     return await dbService.getCollection('garage')
// }



function checkingVehicleType(licenseNum) {
    console.log('checkingVehicleType');

    const countA = (licenseNum.match(/A/g) || []).length
    console.log('countA',countA);
    const countB = (licenseNum.match(/B/g) || []).length
    console.log('countB',countB);
    const lastLetter = licenseNum.charAt(licenseNum.length - 1);
    const firstTwoLetters = licenseNum.slice(0, 2)
    const licenseNumLen = licenseNum.length

    
    console.log(/^[0-9]+$/.test(licenseNum));
    console.log(firstTwoLetters);
    console.log(lastLetter);

    if (licenseNumLen === 8) {

        if (/[0123456789]/.test(licenseNum)&&/[AB]/.test(licenseNum)) {
            console.log('1');

            if ((countA % 2 === 0 && countA !== 0) || (countB % 2 === 0 && countB !== 0)) return 'Motorbike';
            else if (countA % 2 !== 0 || countB % 2 !== 0) return 'Electric motorbike'

        }

        else if (/^[0-9]+$/.test(licenseNum)) {
            console.log('car');
            if (licenseNum.includes("08") &&  !licenseNum.slice(1, 2).includes("01")) return 'Car'
            else if (licenseNum.slice(1, 3).includes("01")) return 'Electric car'
            else if (firstTwoLetters.includes("80") && (lastLetter.includes("6"))) return 'Truck'
        }
    }

    else if (licenseNumLen === 5) {
        if (/[0123456789]/.test(licenseNum)) return 'Drawn'
    }

}


function averageAirPressure(wheels) {
    const totalAirPressure = wheels.reduce(
        (sum, wheel) => sum + wheel.currAirPress,
        0
    );
    const totalMaxAirPressure = wheels.reduce(
        (sum, wheel) => sum + wheel.maxAirPress,
        0
    );
    return (
        (100 * totalAirPressure) / totalMaxAirPressure
    ).toFixed(0);

}


module.exports = {
    query,
    add,
    getById,
    remove,
    update,
    insertVehicle,
    insertBlackList,
    checkingVehicleType,
    averageAirPressure
}
