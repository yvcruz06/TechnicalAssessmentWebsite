var express = require('express');
var router = express.Router();

const Result = require('../models/result')
const Quiz = require('../models/quiz');


router.get('/', async function(req, res) {
    let current_user = req.app.locals.currentUserID

    if(current_user) {
        let list = [], attempts = [], correct = []
        await Quiz.find().then((result) => {
            result.forEach(element => {
                list.push(element.language)
                attempts.push(element.attempts)
                correct.push(element.correct)
            })
        })
        var options = [...new Set(list)]
        let totals = new Map()
        for(var i = 0; i < options.length; i++) {
            totals.set(options[i], {attempts: 0, correct: 0})
            for(var j = 0; j < attempts.length; j++) {
                if(list[j] === options[i]) {
                    let keys = totals.get(list[j])
                    if(keys) {
                        keys.attempts = keys.attempts + attempts[j]
                        keys.correct = keys.correct + correct[j]
                    } else {
                        console.log('some error...')
                        keys.attempts = keys.attempts + NaN
                        keys.correct = keys.correct + NaN
                    }
                }
            }
        }

        if(current_user != '') {
            Result.find({ user_id: current_user }).then((result) => {
                var label = [], data = [], language = []
                result.forEach(elememt => {
                    label.push(elememt.topic.join('/'))
                    data.push(elememt.score)
                    language.push(elememt.language)
                })
                let average = data.reduce((a, b) => a + b, 0) / result.length

                res.render('result', {
                    Title: 'Result!',
                    Results: result,
                    Label: label,
                    Data: data,
                    average: average,
                    Lang: language,
                    options: options,
                    Totals: totals
                })
            }).catch((error) => {
                console.log(error)
            })

            req.app.locals.currentUserID = current_user
        } else {
            res.redirect('/login');
        }
    } else {
        console.log('no current user')
        res.redirect('/login');
    }
})

module.exports = router