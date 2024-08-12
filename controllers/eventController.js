const Event = require('../models/eventModel')
const Ticket = require('../models/ticketModel')

const eventCtrl = {
    addEvent: async (req, res) => {
        try {
            const { location, category, date, tickets } = req.body

            if (!location || !category || !date)
                return res.status(400).json({ msg: 'all field are required' })

            const newEvent = new Event({
                location, category, date, tickets
            })

            await newEvent.save()
            res.status(201).json({ msg: 'Event created successfully', newEvent })
        } catch (error) {
            console.error('Error Adding Event', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const eventId = req.params.eventId
            const deletedEvent = await Event.findByIdAndDelete(eventId)
            if (!deletedEvent)
                return res.status(400).json({ msg: 'Event Not Found' })
            res.json({ msg: 'Product Deleted Successfully' })
        } catch (error) {
            console.error('Error Deleting Event', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    updateEvent: async (req, res) => {
        try {
            const eventId = req.params.eventId
            const { location, category, date, tickets } = req.body
            const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true })
            if (!updatedEvent)
                return res.status(400).json({ msg: 'Event Not Found' })

            res.json({ msg: 'Event updated successfully', updatedEvent });

        } catch (error) {
            console.error('Error Updating Event', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    getEvents: async (req, res) => {
        try {
            const events = await Event.find().populate({
                path: 'tickets',
                select: 'price category availableTickets'
            }).exec();
            console.log('Populated events:', events);
            
          
            res.json(events)

        } catch (error) {
            console.error('Error Fetching Events', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    getEventById: async (req, res) => {
        try {
            const eventId = req.params.eventId
            const event = await Event.findById(eventId)
            res.json(event)
        } catch (error) {
            console.error('Error Fetching Event', error)
            res.status(500).json({ msg: 'Error Fetching Event' })
        }
    },
    likeEvent: async (req, res) => {
        try {
            const userId = req.params.userId

        } catch (error) {

        }
    }
}

module.exports = eventCtrl