const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getVehicles, getVehicleById, addVehicle, updateVehicle, removeVehicle,insertVehicle } = require('./vehicle.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getVehicles)
router.get('/:id', getVehicleById)
// router.post('/', requireAuth, addVehicle)
router.put('/:id', requireAuth, updateVehicle)
router.post('/', requireAuth, insertVehicle)

router.delete('/:id',  removeVehicle)
// router.delete('/:id', requireAuth, requireAdmin, removeVehicle)


module.exports = router