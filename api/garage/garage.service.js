const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const Garage = require('../../classes/garage.js')
const Vehicle = require('../../classes/vehicle.js')
const Wheel = require('../../classes/wheel.js')
var gGarage

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('garage')
        const garage = await collection.find({}).toArray()
        if (!garage.length) return null

        if (filterBy) {
            if (filterBy.repairStatus) {
                const regex = new RegExp(filterBy.repairStatus, 'i')
                garage[0].vehicles = garage[0].vehicles.filter(vehicle => regex.test(vehicle.repairStatus))
            }

            if (filterBy.remainRepairs !== undefined) {
                garage[0].vehicles = garage[0].vehicles.filter(
                    vehicle => vehicle.remainRepairs === +filterBy.remainRepairs)
            }
        }


        if (!gGarage) {
            gGarage = { ...garage[0] }
            Object.setPrototypeOf(gGarage, Garage.prototype)
            console.log('query',gGarage);

        }
        return garage
    }

    catch (err) {
        logger.error('cannot find garage', err)
        throw err
    }
}

async function activateWorkers(repairDetails) {
    try {
        if (!gGarage) {
            let garage = (await query())[0]
            gGarage = { ...garage }
            Object.setPrototypeOf(gGarage, Garage.prototype)
        }
        console.log('activateWorkers',gGarage);

        await gGarage.checkingAvailability(repairDetails)
        return  await gGarage.assignWorker(repairDetails)

    }

    catch (err) {
        logger.error(`cannot activate workers `, err);
        throw err;
    }
}

async function update(repairDetails) {
    try {
        console.log('updategGarage',gGarage);
        const { licenseNum, updatedBatteryLife, updatedFuelQuantity, updatedAirQuantity } = repairDetails
        let vehicle = await getById(licenseNum)
        Object.setPrototypeOf(vehicle, Vehicle.prototype)
        // let gGarage = (await query())[0]
        Object.setPrototypeOf(gGarage, Garage.prototype)
        vehicle.repairStatus = "On Progress"

        if (updatedAirQuantity && gGarage.numOfInflationStations) {
            gGarage.numOfInflationStations--
            const wheels = vehicle.wheels
            const numWheels = wheels.length
            vehicle.repairStatus = "Inflation station"

            for (let i = 0; i < numWheels; i++) {
                const wheel = wheels[i]
                Object.setPrototypeOf(wheel, Wheel.prototype)
                vehicle.repairPrice += parseInt(updatedAirQuantity, 10) * 0.1
                try {
                     wheel.inflateWheel(updatedAirQuantity)
                }
                catch {
                    vehicle.wheels.forEach(wheel => wheel.currAirPress = 0)
                     wheel.inflateWheel(vehicle.wheels[0].maxAirPress)
                    const newTire = 350
                    vehicle.repairPrice += newTire * numWheels + parseInt(vehicle.wheels[0].maxAirPress, 10) * 0.1
                }
            }
            vehicle.repairStatus = "On Progress"
            repairDetails.updatedAirQuantity = 0
            var updatedAir=0

            gGarage.numOfInflationStations++
            if (vehicle.wheels[0].currAirPress === vehicle.wheels[0].maxAirPress) vehicle.remainRepairs--

        }

        if (updatedFuelQuantity && gGarage.numOfFuelStations) {
            vehicle.repairStatus = "Fuel station"
            gGarage.numOfFuelStations--
             vehicle.refuelVehicle(updatedFuelQuantity)
            repairDetails.updatedFuelQuantity = 0
            gGarage.numOfFuelStations++
            vehicle.repairStatus = "On Progress"
        }

        else if (updatedBatteryLife && gGarage.numOfChargingStations) {
            vehicle.repairStatus = "Charging station"
            gGarage.numOfChargingStations--
             vehicle.refuelVehicle(updatedBatteryLife)
            repairDetails.updatedFuelQuantity = 0
            gGarage.numOfChargingStations++
            vehicle.repairStatus = "On Progress"
        }

        if (!vehicle.remainRepairs) vehicle.repairStatus = "Ready"
        if(!updatedBatteryLife&&!updatedAir||!updatedFuelQuantity&&!updatedAir){
            const collection = await dbService.getCollection('garage')
            await collection.updateOne({ 'vehicles.licenseNum': vehicle.licenseNum }, { $set: { 'vehicles.$': vehicle } })
            return vehicle

        }

        else  {
            gGarage.numOfWorkers--
            gGarage.checkingAvailability(repairDetails)
        }

    }

    catch (err) {
        logger.error(`cannot update vehicle `, err);
        throw err;
    }
}

async function add(garage) {
    try {
        const collection = await dbService.getCollection('garage')
        const newGarage = new Garage(garage.numOfWorkers, garage.numOfFuelStations, garage.numOfInflationStations, garage.numOfChargingStations)
        if (!gGarage) gGarage = newGarage
        collection.insertOne(newGarage)
        gGarage = { ...newGarage }
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
        vehicle.type = checkingVehicleType(vehicle.licenseNum)
        if (vehicle.currFuelQuantity !== vehicle.tankCapacity || vehicle.currBatteryLife !== vehicle.maxBatteryLife) vehicle.remainRepairs++
        if (vehicle.wheels && averageAirPressure(vehicle.wheels) !== 100) vehicle.remainRepairs++
        const vehicleToSave = { ...vehicle, fullname, phoneNumber, repairStatus: 'Waiting', repairPrice: 0, vehicleType: vehicle.type };
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


function checkingVehicleType(licenseNum) {

    const countA = (licenseNum.match(/A/g) || []).length
    const countB = (licenseNum.match(/B/g) || []).length
    const lastLetter = licenseNum.charAt(licenseNum.length - 1);
    const firstTwoLetters = licenseNum.slice(0, 2)
    const licenseNumLen = licenseNum.length

    if (licenseNumLen === 8) {

        if (/[0123456789]/.test(licenseNum) && /[AB]/.test(licenseNum)) {

            if ((countA % 2 === 0 && countA !== 0) || (countB % 2 === 0 && countB !== 0)) return 'Motorbike';
            else if (countA % 2 !== 0 || countB % 2 !== 0) return 'Electric motorbike'

        }

        else if (/^[0-9]+$/.test(licenseNum)) {
            if (licenseNum.includes("08") && !licenseNum.slice(1, 2).includes("01")) return 'Car'
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
    )
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
    averageAirPressure,
    activateWorkers,

}
