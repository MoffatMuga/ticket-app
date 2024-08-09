const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {firstName, lastName, mobile, email, password, role} = req.body
            
            if(!lastName || !firstName || !mobile ||!email ||!password)
                return res.status(400).json({msg: 'all details are required'})
            
            const user = await User.findOne({ email })
            if(user)
                return res.status(400).json({msg: 'use already exists'})

            if(password.length < 6)
                return res.status(40).json({msg: 'password must be more than 6 characters'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new User({
                firstName, lastName, mobile, email, password:passwordHash, role:role || 'user'
            })

            await newUser.save()
            res.status(201).json({ msg: 'user registered successfully' })

        } catch (error) {
            console.log('error registering user', error)
            res.status(500).json({msg: error.msg})
        }
    },
    login : async (req, res ) => {
        try {
            const {email, password} = req.body
            if(!email || !password)
                return res.status(400).json({msg: 'all fields required'})

            const user = await User.findOne({ email })
            if(!user)
                return res.status(400).json({msg: 'User does not exist'})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                return res.status(400).json({msg: 'passwords do not match'})

            const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET_TOKEN, {expiresIn : '1day'})
            res.json({
                token,
                user: {
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    mobile:user.mobile,
                    email:user.email

                }
            }) 

        } catch (error) {
            
        }
    },
    getUsers: async(req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log('error fetching users', error)
            res.status(500).json({msg: error.msg})
        }
    },
    updateUserRole: async(req, res) => {
        try {
            const { userId, role} = req.body

            if(!['admin', 'user'].includes(role))
                return res.status(400).json({msg: 'Not A Valid Role'})

            const user = await User.findById(userId)
            if(!user)
                return res.status(400).json({msg: 'No such a user'})

            user.role = role
            await user.save()

            res.status(200).json({ msg: 'User role updated successfully', user });
        } catch (error) {
            console.log('error updating user role', error)
            res.status(500).json({msg: error.msg})
        }
    },
    deleteUser: async(req, res) => {
        try {
            const {userId} = req.params
            const user = await User.findByIdAndDelete(userId)
            if(!user)
                return res.status(400).json({msg: 'user not found'})
            res.json({msg :'user deleted successfully'})
        } catch (error) {
            console.log('error deleting user', error)
            res.status(500).json({msg: error.msg})
        }
    }
}

module.exports = userCtrl