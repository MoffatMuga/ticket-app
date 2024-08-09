const Event = require('../models/eventModel')

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
            res.status(201).json({msg: 'Event created successfully'})
        } catch (error) {
            console.error('Error Adding Event', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const { productId } = req.params.productId
            const user = await User.findByIdByDelete(productId)
            if (!user)
                return res.status(400).json({ msg: 'Event Not Found' })
            res.json({ msg: 'Product Deleted Successfully' })
        } catch (error) {
            console.error('Error Deleting Event', error)
            res.status(500).json({ msg: error.msg })
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { productId } = req.params.productId
            const { location, category, date, tickets } = req.body

            const updatedEvent = await Event.findByIdAndUpdate(productId, req.body, { new: true })
            if (!updatedEvent)
                return res.status(400).json({ msg: 'Event Not Found' })

            res.json({ msg: 'Product updated successfully', updatedEvent });

        } catch (error) {
            console.error('Error Updating Event', error)
            res.status(500).json({ msg: error.msg })
        }
    }
}

module.exports = eventCtrl