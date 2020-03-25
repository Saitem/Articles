const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const modelSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        data: Buffer,
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creator_id: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    creator_name: {
        type: String,
        require: true
    }
})

const Model = mongoose.model('Model', modelSchema)

module.exports = Model