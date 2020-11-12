const { attempt } = require('bluebird');
var express = require('express');
var router = express.Router();

// quiz model
const Quiz = require('../models/quiz')

/* GET users listing. */
router.get('/', function(req, res) {

  var topic = req._parsedOriginalUrl.query

  Quiz.find({language: topic}).then((result => {
    // console.log(result)
    res.render('quiz', {
      Title: 'Quiz!',
      Questions: result
    })

  }))




  // res.render('quiz', {
  //   Title: 'Quiz!'
  // })


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