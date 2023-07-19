const garageService = require('./garage.service.js')
const logger = require('../../services/logger.service.js')

async function getGarage(req, res) {
  try {
    const filterBy = {
      repairStatus: req.query.repairStatus || '',
      remainRepairs: req.query.remainRepairs || null,
    }

    logger.debug('Getting garage')
    const garage = await garageService.query(filterBy)
    console.log(garage);
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
    console.log('remove');
    const vehicleId = req.params.id
    const removedId = await garageService.remove(vehicleId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove vehicle', err)
    res.status(500).send({ err: 'Failed to remove vehicle' })
  }
}

// async function updateVehicle(req, res) {
//   try {
//     console.log('function updateVehicle');
//     const updatedVehicle = await garageService.activateWorkers(req.body)
//     console.log('updateVehicle',req.body);
//     res.json(updatedVehicle)
//   } catch (err) {
//     logger.error('Failed to update vehicle', err)
//     res.status(500).send({ err: 'Failed to update vehicle' })

//   }
// }
function updateVehicle(req, res) {
  console.log('function updateVehicle')
  garageService.activateWorkers(req.body)
    .then(updatedVehicle => {
      console.log('updateVehicle', req.body)
      res.json(updatedVehicle);
    })
    .catch(err => {
      console.error('Failed to update vehicle', err);
      res.status(500).send({ err: 'Failed to update vehicle' });
    })
}

module.exports = {
  addGarage,
  getGarage,
  getVehicleById,
  removeVehicle,
  updateVehicle
}
