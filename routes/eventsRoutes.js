const express = require('express')
const router = express.Router()
const eventCtrl = require('../controllers/eventController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/events', authMiddleware.verifyAdmin, eventCtrl.addEvent)
router.put('/event/:eventId', authMiddleware.verifyAdmin, eventCtrl.updateEvent)
router.delete('/event/:eventId', authMiddleware.verifyAdmin, eventCtrl.deleteEvent)

module.exports = router