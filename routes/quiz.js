const { attempt } = require('bluebird');
var express = require('express');
const { ConnectionBase } = require('mongoose');
var router = express.Router();

// quiz model
const Quiz = require('../models/quiz')
const Result = require('../models/result')
var grade_quiz = null


// it would look like an error if its just
// localhost:3000/quiz
// do it like ...:3000/quiz?C++
// or /quiz?Java
router.get('/', function(req, res) {

  console.log('Grade Quiz = ' + grade_quiz)
  console.log(req.app.locals.temp)

  var topic = req._parsedOriginalUrl.query
  var query = {
    language: topic
  }

  if(topic == null) {
    console.log('error...')
    res.redirect('/')
  } else {
    Quiz.aggregate([
      { $match: query},
      { $sample: { size: 10 }}
    ]).then((result => {
      grade_quiz = result
      res.render('quiz', {
        Title: 'Quiz!',
        Questions: result
      })
    }))

  }
});


router.get('/grade', function(req, res) {

  let score = 0
  var feedback = []
  var user_answers = req.query.answers

  if(grade_quiz) {

    for(var i = 0; i < grade_quiz.length; i++) {
      const filter = {
        question: grade_quiz[i].question
      }

      var attempts = grade_quiz[i].attempts + 1

      if(user_answers[i] === grade_quiz[i].answer) {
        score++
        feedback.push(' ')

        var correct = grade_quiz[i].correct + 1

        const update = {
          attempts: attempts,
          correct: correct
        }

        Quiz.findOneAndUpdate(filter, update, { new: true }).then((result => {
          // console.log('in update one, correct question ' + result)
        })).catch((error => {
          console.log(error)
        }))
      } else {
        feedback.push(grade_quiz[i].explanation)

        const update = {
          attempts: attempts
        }

        Quiz.findOneAndUpdate(filter, update, { new: true }).then((result => {
          // console.log('in update one, incorect question: ' + result)
        })).catch((error => {
          console.log(error)
        }))
      }
    }
    score = ((score / grade_quiz.length) * 100).toFixed(2)

    res.send({
      score: score,
      feedback: feedback
    })

    // get results ready here
    // user_id hard-coded for now
    let user_id = 'username'
    let language = grade_quiz[0].language

    var temp = []
    grade_quiz.forEach(element => {
      temp.push(element.topic)
    });

    const topics = [...new Set(temp)]

    const new_result = new Result({
      user_id: user_id,
      language: language,
      topic: topics,
      score: score
    })

    new_result.save().then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })

    grade_quiz = null
  } else {
    console.log('something wrong herer')
    res.redirect('/')
  }
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