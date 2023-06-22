const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const vehicleService = require('../vehicle/vehicle.service')



const Garage = require('../../classes/garage.js')


async function query() {
    try {
        const collection = await dbService.getCollection('garage')
        const garage = await collection.find({}).toArray();
        // const garage = await collection.find({})

                console.log('garage service',garage);
                if (!garage.length === 0)  return null
                // if (!Object.keys(garage).length)  return null


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
        console.log('getById-garage');

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

async function insertVehicle(vehicle,fullname,phoneNumber) {
    try {
   console.log();
        const collection = await dbService.getCollection('garage')
        const vehicleToSave = { ...vehicle, fullname, phoneNumber, treatStatus: 'Waiting' };
        console.log('vehicleToSave',vehicleToSave);
        await collection.updateOne({}, { $push: { vehicles: vehicleToSave }})
        // return vehicle
    } catch (err) {
        logger.error(`cannot update garage `, err)
        throw err
    }
}


async function remove(vehicleId) {
    try {
        console.log(vehicleId);
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



async function update(vehicle) {
    try {
        console.log(vehicle);
        const collection = await dbService.getCollection('garage')
        await collection.updateOne( { $push: { blackList: vehicle } })
    } catch (err) {
        logger.error(`cannot insert vehicle `, err)
        throw err
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
async function getGarageCollection() {
    return await dbService.getCollection('garage')
}




module.exports = {
    query,
    add,
    getById,
    remove,
    getGarageCollection,
    update,
    insertVehicle,
    insertBlackList,
    
}
