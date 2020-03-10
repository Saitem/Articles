const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const config = require('./config/DB')

const router = require('./routes/api/index')

const port = config.APP_PORT

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(item => {
    console.log('Connected')
}).catch(err => {
    console.log('Caught', err.stack)
})

app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use('/st', express.static('public'))
app.use('/models', router)
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/models', (req, res) =>{
//     res.send('Hello')
// })

app.listen(port, () => console.log(`Server working on port ${port}`))