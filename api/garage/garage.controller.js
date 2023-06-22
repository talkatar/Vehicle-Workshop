const garageService = require('./garage.service.js')
const logger = require('../../services/logger.service.js')

async function getGarage(req, res) {
  try {
    logger.debug('Getting garage')
    const garage = await garageService.query()
    console.log('controller',garage);
    res.json(garage)
  } catch (err) {
    logger.error('Failed to get garage', err)
    res.status(500).send({ err: 'Failed to get garage' })
  }
}

async function addGarage(req, res) {

  try {
    const addedGarage = await garageService.add(req.body)
    console.log(addedGarage);
    res.json(addedGarage)
  } catch (err) {
    logger.error('Failed to add garage', err)
    res.status(500).send({ err: 'Failed to add garage' })
  }
}
async function getVehicleById(req, res) {
  try {
    const vehicleId = req.params.id
    console.log('vehicleId',vehicleId);
    const vehicle = await garageService.getById(vehicleId)
    res.json(vehicle)
  } catch (err) {
    logger.error('Failed to get vehicle', err)
    res.status(500).send({ err: 'Failed to get vehicle' })
  }
}


async function removeVehicle(req, res) {
  try {
    const vehicleId = req.params.id
    const removedId = await garageService.remove(vehicleId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove vehicle', err)
    res.status(500).send({ err: 'Failed to remove vehicle' })
  }
}

module.exports = {
  addGarage,
  getGarage,
  getVehicleById,
  removeVehicle
}
