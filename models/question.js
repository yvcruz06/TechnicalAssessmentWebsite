const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    languague: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    choices: {
        type: String,
        required: true
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
    }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;