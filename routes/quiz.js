const { attempt } = require('bluebird');
var express = require('express');
const { ConnectionBase } = require('mongoose');
var router = express.Router();

// quiz model
const Quiz = require('../models/quiz')

// it would look like an error if its just
// localhost:3000/quiz
// do it like ...:3000/quiz?C++
// or /quiz?Java
router.get('/', function(req, res) {

  var topic = req._parsedOriginalUrl.query
  console.log(topic)
  if(topic == null) {
    console.log('error...')
    res.redirect('/')
  } else {
    Quiz.find({language: topic }).then((result => {

      res.render('quiz', {
        Title: 'Quiz!',
        Questions: result
      })
    })).catch((error) => {
      console.log(error)
    })

  }
});


router.get('/grade', function(req, res) {

  let score = 0
  var feedback = []
  var user_answers = req.query.answers
  var topic = req.query.topic

  Quiz.find({ language: topic }).then((result => {
    // find answers that were correctly answered
    var correct_index = []
    for(var i = 0; i < result.length; i++) {
      if(user_answers[i] === result[i].answer) {
        correct_index.push(i)
        score++
        feedback.push(' ')
      } else {
        feedback.push(result[i].explanation)
      }
    }

    res.send({
      'score': score,
      'feedback': feedback,
    })

    // for(var i = 0; i < correct_index.length; i++) {
    //   Quiz.findOne({ question: result[correct_index[i]] }).then((result => {
    //     console.log('updating question')
    //     console.log(result)
    //   })).catch((error => {
    //     console.log(error)
    //   }))
    // }

    // result.forEach((answer) => {
    //   console.log(answer.answer)
    // })

  })).catch((error) => {
    console.log(error)
  })








})

// adding?
router.get('/add_new', function(req, res) {

  const new_question = new Quiz({
    topic: 'Core C++',
    language: 'C++',
    question: 'Runtime polymorphism is done by using what?',
    choices: [
      'Function overloading',
      'Virtual classes',
      'Virtual functions',
      'Friend function'
    ],
    answer: 'Virtual functions',
    attempts: 0,
    correct: 0,
    explanation: 'Virtual functions gives the ability to override the functionality of base class into the derived class, achieving dynamic/runtime polymorphism.'
  })

  new_question.save().then((result) => {
    res.send('new question added')
  }).catch((error) => {
    console.log(error)
  })
})
module.exports = router;

/*
new question format

const new_question = new Quiz({
  topic: '',
  language: '',
  question: '',
  choices: ['', '', '', ''],
  answer: '',
  attempts: 0,
  correct: 0
})
*/