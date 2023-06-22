const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const garageService = require('../garage/garage.service')

// import Vehicle from './vehicle.js';
// import Car  from '../../classes/car.js'
// import Drone  from '../../classes/drone.js'
// import ElectricCar  from '../../classes/electricCar.js'
// import ElectricMotorbike  from '../../classes/electricMotorbike.js'
// import Motorbike  from '../../classes/motorbike.js'
// import Truck  from '../../classes/truck.js'
// import Garage  from '../../classes/garage.js'

const Car = require('../../classes/car.js')
const Drone = require('../../classes/drone.js')
const ElectricCar = require('../../classes/electricCar.js')
const ElectricMotorbike = require('../../classes/electricMotorbike.js')
const Motorbike = require('../../classes/motorbike.js')
const Truck = require('../../classes/truck.js')
const Garage = require('../../classes/garage.js')

loadVehicles()

async function loadVehicles() {
    const collection = await dbService.getCollection('vehicle')
    let vehicles = await collection.find({}).toArray()

    if (vehicles.length === 0) {
     vehicles = [
        new Motorbike('Dukati', 'Maisto', '108AB123', 80, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243518/hyw1vc2uowuucnmhgtc9.jpg', '95', 50, 40, 'A1', 40),
        // constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, fuelType, tankCapacity, licenseType, currFuelQuantity,licenseType, engineCapacity) {
        new ElectricMotorbike('Energica', 'R-i', '108ABA23', 60, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243567/iu2unenwmmo4xrylkkt6.jpg', 10, 6, 'A2', 125),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice,maxBatteryLife,currBatteryLife,licenseType, engineCapacity) {
        new Car('Bmw', 'X6', '10822123', 30, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243398/auwfms1of4p41fewirpw.jpg', '96', 100, 'white', 4, 30),
        // constructor(company, model, licenseNum, energyPerc, treatStatus,treatPrice, fuelType, tankCapacity, color, numOfDoors, currFuelQuantity) {
        new ElectricCar('Tesla', 'Model 3', '90122123', 20, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243567/n8n7gdevyeywf6ix81kj.jpg', 20, 4, 'Red', 4),
        // constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, maxBatteryLife, currBatteryLife, color, numOfDoors) {
        new Truck('Volvo', 'xc-40', '80123416', 40, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243567/jrexdzrkyzcvfnyqhhbm.jpg', '98', 80, 200, "yes", 700),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice, fuelType,currFuelQuantity, tankCapacity, isDrivenDangerGoods, rearChargerCapacity) {
        new Drone('Cando', 'Fer', '12345', 30, '', 0,null,'https://res.cloudinary.com/dm72lanye/image/upload/v1687243566/qfvoaeuq865ybst9pme3.jpg', 2, 0.6, 2, 'Joystick-providing physical sensations to the user, such as vibrations or resistance, to enhance the gaming experience'),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice, maxBatteryLife,currBatteryLife, numOfEngines, controlInterface) {
    ]
    // this.remainTreats = remainTreats
    //     this.imgUrl = imgUrl
    // vehicles.map(vehicle=>collection.insertOne(vehicle))
    await collection.insertMany(vehicles);
}
else return


    }



async function query(filterBy={txt:''}) {
    try {
        const criteria = {
            vendor: { $regex: filterBy.txt, $options: 'i' }
        }
        console.log('vehicle query' );
        const collection = await dbService.getCollection('vehicle')

        var vehicles = await collection.find({}).toArray()
        return vehicles
    } catch (err) {
        logger.error('cannot find vehicles', err)
        throw err 
    }
}

async function getById(vehicleId) {
    try {
        console.log('getById',vehicleId);

        const collection = await dbService.getCollection('vehicle')
        const vehicle = await collection.findOne({ licenseNum: vehicleId })
        console.log('getByIdvehicle',vehicle);

        if (!vehicle) {
            return null
        }
        return vehicle
    } catch (err) {
        logger.error(`while finding vehicle ${vehicleId}`, err)
        throw err
    }
}

async function remove(vehicleId) {
    try {
        const collection = await dbService.getCollection('vehicle')
        await collection.deleteOne({ _id: ObjectId(vehicleId) })
        return vehicleId
    } catch (err) {
        logger.error(`cannot remove vehicle ${vehicleId}`, err)
        throw err
    }
}

async function add(vehicle) {
    try {
        const collection = await dbService.getCollection('vehicle')
        await collection.insertOne(vehicle)
        return vehicle
    } catch (err) {
        logger.error('cannot insert vehicle', err)
        throw err
    }
}

async function update(vehicle) {
    try {
        const vehicleToSave = {
            vendor: vehicle.vendor,
            price: vehicle.price
        }
        const collection = await dbService.getCollection('vehicle')
        await collection.updateOne({ _id: ObjectId(vehicle._id) }, { $set: vehicleToSave })
        return vehicle
    } catch (err) {
        logger.error(`cannot update vehicle ${vehicleId}`, err)
        throw err
    }
}

async function getVehicleCollection() {
    return await dbService.getCollection('vehicle')
}



module.exports = {
    getById,

    remove,
    query,
    add,
    update,
    getVehicleCollection
}
