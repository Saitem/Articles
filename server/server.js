const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const modelRoute = require('./routes/api/index')
const authRoute = require('./routes/api/auth')

const config = require('./config/DB')

dotenv.config()


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
// app.use(express.bodyParser())

// app.use(bodyParser.json())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/models', modelRoute)
app.use('/user', authRoute)

app.listen(port, () => console.log(`Server working on port ${port}`))