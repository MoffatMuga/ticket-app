const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/users', authMiddleware.verifyAdmin, userCtrl.getUsers)
router.put('/user/role', authMiddleware.verifyAdmin, userCtrl.updateUserRole)
router.delete('/user/:userId', authMiddleware.verifyAdmin, userCtrl.deleteUser)

module.exports = router