const vehicleService = require('./vehicle.service.js')
const logger = require('../../services/logger.service')
const garageService = require('../garage/garage.service')

async function getVehicles(req, res) {
  try {
    logger.debug('Getting Vehicles')
    const filterBy = {
      txt: req.query.txt || ''
    }
    const vehicles = await vehicleService.query(filterBy)
    // console.log(vehicles);

    res.json(vehicles)
  } catch (err) {
    logger.error('Failed to get vehicles', err)
    res.status(500).send({ err: 'Failed to get vehicles' })
  }
}

async function getVehicleById(req, res) {
  try {
    const vehicleId = req.params.id
    console.log('vehicleId', vehicleId);
    const vehicle = await vehicleService.getById(vehicleId)
    res.json(vehicle)
  } catch (err) {
    logger.error('Failed to get vehicle', err)
    res.status(500).send({ err: 'Failed to get vehicle' })
  }
}

async function addVehicle(req, res) {
  const { loggedinUser } = req

  try {
    const vehicle = req.body
    vehicle.owner = loggedinUser
    const addedVehicle = await vehicleService.add(vehicle)
    res.json(addedVehicle)
  } catch (err) {
    logger.error('Failed to add vehicle', err)
    res.status(500).send({ err: 'Failed to add vehicle' })
  }
}


async function updateVehicle(req, res) {
  try {
    const vehicle = req.body
    const updatedVehicle = await vehicleService.update(vehicle)
    res.json(updatedVehicle)
  } catch (err) {
    logger.error('Failed to update vehicle', err)
    res.status(500).send({ err: 'Failed to update vehicle' })

  }
}

async function removeVehicle(req, res) {
  try {

    const vehicleId = req.params.id
    const removedId = await vehicleService.remove(vehicleId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove vehicle', err)
    res.status(500).send({ err: 'Failed to remove vehicle' })
  }
}

async function insertVehicle(req, res) {
  try {
    console.log(req.body);
    const {  lisenceNum, company,fullname,phoneNumber } = req.body
    const vehicle = await vehicleService.getById(lisenceNum)
    console.log('insertVehicle',vehicle._id);
    const vehicleInGarage = await garageService.getById(lisenceNum)

    if(!vehicle) {
      res.json({ error: 'No car was found with license number!' });
      return}
    
    else if (vehicle.company !== company.trim()) {
      await garageService.insertBlackList(req.body)
      const stolenVehicle = req.body
      res.json({ error: 'The vehicle is stolen! Your car is in the blacklist!', stolenVehicle });
      return
    }

    else if (vehicleInGarage) {
      res.json({ error: 'The vehicle is already in the garage!' });
      return
    }

    else {
      await garageService.insertVehicle(vehicle, fullname, phoneNumber);
      const insertedVehicle = await garageService.getById(lisenceNum);
    
      res.json({ vehicle: insertedVehicle });
    }
  }


  catch (err) {
    logger.error('Failed to insert vehicle', err);
    if (err.message === 'The vehicle is stolen! Your car is in the blacklist!') {
      res.status(400).send({ err: err.message });
    } else if (err.message === 'The vehicle is already in the garage') {
      res.status(409).send({ err: err.message });
    } else {
      res.status(500).send({ err: 'Failed to insert vehicle' });
    }
  }
}



module.exports = {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  insertVehicle,
  removeVehicle,
}
