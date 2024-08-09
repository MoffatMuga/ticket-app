const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    category : {
        type: String,
        required: true
    },
    location : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        required : true
    },
    tickets : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    likes : {
        type: Number,
        default : 0
    }

})

module.exports = mongoose.model('Event', eventSchema)