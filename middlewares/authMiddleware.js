const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = {
    verifyUser: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            if (!token) return res.status(401).json({ msg: 'No Token, No Authorization' })

            const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
            if (!verified) return res.status(401).json({ msg: 'Not verified' })

            req.user = verified
            next()

        } catch (error) {
            console.error('Error Authnticating user', error)
            return res.status(401).json({ msg: error.msg })
        }
    },

    verifyAdmin: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            if (!token) res.status(401).json({ msg: 'No Token, No Authorization' })

            const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
            if (!verified) return res.status(401).json({ msg: 'Not verified' })

            const user = await User.findById(verified.id)
            if (user.role !== 'admin') return res.status(403).json({ msg: 'Access denied, not an admin' })

            req.user = verified
            next()
        } catch (error) {
            console.error('Error Authnticating user', error)
            return res.status(401).json({ msg: error.msg })

        }
    }
}


module.exports = authMiddleware