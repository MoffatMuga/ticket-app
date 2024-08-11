const express = require('express')
const router = express.Router()
const ticketCtrl = require('../controllers/ticketController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/tickets', authMiddleware.verifyAdmin, ticketCtrl.addTicket)
router.put('/tickets/:ticketId', authMiddleware.verifyAdmin, ticketCtrl.updateTicket)
router.delete('/tickets/:ticketId', authMiddleware.verifyAdmin, ticketCtrl.deleteTicket)
//router.get('/tickets', ticketCtrl.getTickets)
router.get('/tickets', ticketCtrl.getAvailableTickets)

module.exports = router