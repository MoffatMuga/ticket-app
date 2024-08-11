const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routes/authRoutes')
const {notFound, errorHandler} = require('./middlewares/errorHandler')
const eventsRouter = require('./routes/eventsRoutes')
const ticketRouter = require('./routes/ticketRoutes')
require('dotenv').config()

const PORT = process.env.PORT || 8000
const URL = process.env.URI

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/', authRouter)
app.use('/api/', eventsRouter)
app.use('/api/', ticketRouter)
app.use(errorHandler)
app.use(notFound)


const connectApp = async () => {
    try {
        await mongoose.connect(URL)
        console.log('database connected successfuly')

        app.listen(PORT, () => {
            console.log(`app running on PORT ${PORT}`)
        })
    } catch (error) {
        console.error('connection aborted', error)
        process.exit(1)
    }
}

connectApp()
