var express = require('express');
var router = express.Router();

const Result = require('../models/result')
const Quiz = require('../models/quiz');


router.get('/', async function(req, res) {
    let current_user = req.app.locals.currentUserID

    // delete after finishing results
    current_user = "5fc94bdf73e92401c8a2d747"


    if(current_user) {
        console.log('there is a user', current_user)
        let list = []
        await Quiz.find().then((result) => {
            result.forEach(element => {
                list.push(element.language)
            })
        })
        var options = [...new Set(list)]

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
                    options: options
                })
            }).catch((error) => {
                console.log(error)
            })

            req.app.locals.currentUserID = current_user
        } else {
            console.log('current user is "" ')
            res.redirect('/login')
        }
    } else {
        console.log('no current user')
        res.redirect('login')
    }
})

module.exports = router