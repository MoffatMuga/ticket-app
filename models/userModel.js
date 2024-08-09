const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    likedEvents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        content: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)