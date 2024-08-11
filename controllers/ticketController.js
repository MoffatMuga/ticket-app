const mongoose = require('mongoose')
const Ticket = require('../models/ticketModel')
const Event = require('../models/eventModel')

const ticketCtrl = {
    addTicket: async(req, res) => {
        try {
            const { eventId, price, category, availableTickets } = req.body
            const event = await Event.findById(eventId)
            const newTicket = new Ticket({
                price, category, availableTickets, event:eventId
            })
            
            await newTicket.save()
            //event.tickets.push(newTicket._id)
            res.status(400).json({msg: 'Ticket created successfully', newTicket})

        } catch (error) {
            console.log('Error addding Ticket', error)
            res.status(500).json({msg: 'Error Adding Ticket'})
        }
    },
    updateTicket: async(req, res) => {
        try {
            const ticketId = req.params.ticketId
            console.log("Ticket ID:", ticketId);
            const { price, category, availableTickets } = req.body

            const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {new : true})
            

            if(!updatedTicket)
                return res.status(400).json({msg: 'Ticket Not Found'})
            res.status(201).json({msg: 'Ticket updated successfully', updatedTicket})
        } catch (error) {
            console.log('Error updating Ticket', error)
            res.status(500).json({msg: 'Error updating Ticket'})
        }
    },
    deleteTicket: async(req, res) => {
        try {
            const ticketId = req.params.ticketId
            const deletedTicket = await Ticket.findByIdAndDelete(ticketId)
            if(!deletedTicket)
                return res.status(400).json({msg: 'Ticket Not Found'})
            res.json({msg: 'Ticket Deleted Successfully'})
        } catch (error) {
            console.log('Error Deleting Ticket', error)
            res.status(500).json({msg: 'Error Deleting Ticket'})
        }
    },
    getTickets: async(req, res) => {
        try {
            const tickets = await Ticket.find()
            res.json(tickets)
        } catch (error) {
            console.log('Error Fetching Tickets', error)
            res.status(500).json({msg: 'Error Fetching Tickets'})
        }
    },
    getAvailableTickets: async(req, res) => {
        try {
            const tickets = await Ticket.find().populate('event')
            res.status(201).json(tickets)
        } catch (error) {
            console.log('Error Fetching Tickets', error)
            res.status(500).json({msg: 'Error Fetching Tickets'})
        }
    },
    bookTicket: async(req, res) => {
        try {
            const { eventId, category } = req.body
            const userId = req.params.userId

            //Finding Events and available tickets
            const event = await Event.find(eventId).populate('tickets')
            if(!event)
                return res.status(400).json({msg: 'Event Not found'})

            //Finding Tickets and availability
            const ticket = event.ticket.find(t => t.category === category && t.availableTickets > 0)
            if (!ticket) return res.status(400).json({ msg: 'No tickets available for this category' });

            //Book ticket
            ticket.availableTickets -= 1;
            await ticket.save();

            ticket.user = userId
            await ticket.save()

            res.status(200).json({ msg: 'Ticket booked successfully', ticket });
        } catch (error) {
            console.error('Error booking ticket', error);
            res.status(500).json({ msg: 'Server error' });
        }
    }
}

module.exports = ticketCtrl