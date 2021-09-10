import express from 'express'
import morgan from 'morgan'
import './dbconnection'

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
app.get('/', (req,res)=> res.send('Hello World'))

// Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server listen on port ${PORT}`)
})