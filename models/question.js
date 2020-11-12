const { attempt } = require('bluebird')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const question = new Schema({
    topic: {
        type: String,
        required: true
    },

    language: {
        type: String,
        require: true
    },

    question: {
        type: String,
        require: true
    },

    choices: {
        type: Array,
        require: true
    },

    answer: {
        type: String,
        required: true
    },

    attempts: {
        type: Number,
        required: true
    },

    correct: {
        type: Number,
        required: true
    },

    explanation: {
        type: String,
        require: true
    }

}, { timestamps: true })

const Question = mongoose.model('Question', question)
module.exports = Question