import express from 'express'
import morgan from 'morgan'
import rrssBot from './middlewares/rrssBot'
import './dbconnection'
import './bot'

import news from './middlewares/news'

// Init
const app = express()
const PORT = 3000
// Settings
app.set('port', process.env.PORT || PORT)
app.use(morgan('tiny'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.post('/', (req,res)=> news(req,res, rrssBot))

// Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server listen on port ${PORT}`)
})