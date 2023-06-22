
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
const logger = require('../../services/logger.service')

const Car = require('../../classes/car.js');
const Drone = require('../../classes/drone.js');
const ElectricCar = require('../../classes/electricCar.js');
const ElectricMotorbike = require('../../classes/electricMotorbike.js');
const Motorbike = require('../../classes/motorbike.js');
const Truck = require('../../classes/truck.js');
const Garage = require('../../classes/garage.js');



loadVehicles()

export const vehicleService = {
    query,
    getById,
    save,
    remove,
    loadVehicles
}
window.cs = vehicleService

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('vehicle', filterBy)
}

async function loadVehicles() {

    let vehicles = [
        new Motorbike('Dukati', 'Maisto', '108AB123', 80, 'Waiting', 0, '95', 50, 40, 'A1', 40),
        // constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, fuelType, tankCapacity, licenseType, currFuelQuantity,licenseType, engineCapacity) {
        new ElectricMotorbike('Energica', 'R-i', '108ABA23', 60, 'Waiting', 0, 10, 6, 'A2', 125),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice,maxBatteryLife,currBatteryLife,licenseType, engineCapacity) {
        new Car('Bmw', 'X6', '10822123', 30, 'Waiting', 0, '96', 100, 'white', 4, 30),
        // constructor(company, model, licenseNum, energyPerc, treatStatus,treatPrice, fuelType, tankCapacity, color, numOfDoors, currFuelQuantity) {
        new ElectricCar('Tesla', 'Model 3', '90122123', 20, 'Waiting', 0, 20, 4, 'Red', 4),
        // constructor(company, model, licenseNum, energyPerc, treatStatus, treatPrice, maxBatteryLife, currBatteryLife, color, numOfDoors) {
        new Truck('Volvo', 'xc-40', '80123416', 40, 'Waiting', 0, '98', 80, 200, true, 700),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice, fuelType,currFuelQuantity, tankCapacity, isDrivenDangerGoods, rearChargerCapacity) {
        new Drone('Cando', 'Fer', '12345', 30, 'Waiting', 0, 2, 0.6, 2, 'Joystick-providing physical sensations to the user, such as vibrations or resistance, to enhance the gaming experience'),
        // constructor(company, model, licenseNum, energyPerc,treatStatus,treatPrice, maxBatteryLife,currBatteryLife, numOfEngines, controlInterface) {
    ]

    console.log(vehicles);
    logger.debug(vehicles)


    vehicles.map((vehicle) => {
         httpService.post('vehicle', JSON.stringify(vehicle));
      })
    }



async function getById(vehicleId) {
    return httpService.get(`vehicle/${vehicleId}`)
}

async function remove(vehicleId) {
    return httpService.delete(`vehicle/${vehicleId}`)
}
async function save(vehicle) {
    var savedVehicle
    if (vehicle._id) {
        savedVehicle = await httpService.put(`vehicle/${vehicle._id}`, vehicle)

    } else {
        savedVehicle = await httpService.post('vehicle', vehicle)
    }
    return savedVehicle
}







