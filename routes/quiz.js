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

    for(var i = 0; i < result.length; i++) {
      const filter = {
        question: result[i].question
      }

      var attempts = result[i].attempts + 1

      if(user_answers[i] === result[i].answer) {
        score++
        feedback.push(' ')

        var correct = result[i].correct + 1

        const update = {
          attempts: attempts,
          correct: correct
        }

        Quiz.findOneAndUpdate(filter, update, { new: true }).then((result => {
          console.log('in update one, correct question ' + result)
        })).catch((error => {
          console.log(error)
        }))

      } else {
        feedback.push(result[i].explanation)

        const update = {
          attempts: attempts
        }

        Quiz.findOneAndUpdate(filter, update, { new: true }).then((result => {
          console.log('in update one, incorect question: ' + result)
        }))
      }
    }

    res.send({
      'score': score,
      'feedback': feedback,
    })

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
  correct: 0,
  explanation: ''
})
*/