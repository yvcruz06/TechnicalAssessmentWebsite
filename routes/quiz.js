var express = require('express');
var router = express.Router();

// quiz model
const Quiz = require('../models/quiz')
const Result = require('../models/result')
var grade_quiz = null

router.get('/', async (req, res) => {
  let current_user = req.app.locals.currentUserID
  if(current_user) {
    console.log('there is a user', current_user)
    var topic = req._parsedOriginalUrl.query
    var query = {
      language: topic
    }

    if(topic == null) {
      res.redirect('/home');
    } else {
      Quiz.aggregate([
        { $match: query},
        { $sample: { size: 8 }}
      ]).then((result => {
        grade_quiz = result
        res.render('quiz', {
          Title: 'Quiz!',
          Questions: result
        })
      }))
    }
    req.app.locals.currentUserID = current_user
  } else {
    res.redirect('/login');
  }
});


router.get('/grade', async (req, res) => {

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
    let user_id = req.app.locals.currentUserID
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
      console.log('quiz saved in results')
    }).catch((error) => {
      console.log(error)
    })

    grade_quiz = null
  } else {
    console.log('something wrong here')
    res.redirect('/home');
  }
})

module.exports = router;