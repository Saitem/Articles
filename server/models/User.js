const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    fullname: {
        type: String,
        min: 2,
        max: 255
    },
    image: {
        data: Buffer,
        type: String,
        default: ''
    },
    email: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 2,
        max: 1024,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User