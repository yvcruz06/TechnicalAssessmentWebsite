const { attempt } = require('bluebird');
var express = require('express');
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
    Quiz.find({language: topic}).then((result => {
      // console.log(result)

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
  res.send('something is working here')

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