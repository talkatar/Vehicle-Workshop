const garageService = require('./garage.service.js')
const logger = require('../../services/logger.service.js')

async function getGarage(req, res) {
  try {
    logger.debug('Getting garage')
    const garage = await garageService.query()
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
async function updateVehicle(req, res) {
  try {
    console.log('updateVehicle');

    console.log('updateVehicle',req.body);
    const updatedVehicle = await garageService.update(req.body)
    console.log('updatedVehicletal',updatedVehicle);
    res.json(updatedVehicle)
  } catch (err) {
    logger.error('Failed to update vehicle', err)
    res.status(500).send({ err: 'Failed to update vehicle' })

  }
}





module.exports = {
  addGarage,
  getGarage,
  getVehicleById,
  removeVehicle,
  updateVehicle
}
