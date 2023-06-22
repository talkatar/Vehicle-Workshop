const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addGarage,getGarage,getVehicleById,removeVehicle } = require('./garage.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getGarage)
router.post('/', requireAuth, addGarage)
router.get('/:id', getVehicleById)
router.delete('/:id',  removeVehicle)


module.exports = router