const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const result = new Schema({
    user_id: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    topic: {
        type: Array,
        required: true
    },

    score: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const Result = mongoose.model('Result', result)
module.exports = Result