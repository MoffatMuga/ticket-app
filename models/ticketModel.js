const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availableTickets: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)