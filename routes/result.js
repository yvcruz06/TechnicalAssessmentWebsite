var express = require('express');
var router = express.Router();

const Result = require('../models/result')

// temp
const username = 'username'

router.get('/', function(req, res) {
    let current_user = req.app.locals.currentUserID
    if(current_user != '') {

        Result.find({ user_id: current_user }).then((result) => {

            var temp = []
            result.forEach(elememt => {
                temp.push(elememt.topic)
            })

            console.log(temp)

            // const topics = [...new Set(temp)]
            // console.log('updated unique topics', topics)



            res.render('result', {
                Title: 'Result!',
                Results: result
            })

        }).catch((error) => {
            console.log(error)
        })

    } else {
        console.log('current user is "" ')
        res.redirect('/login')
    }

})

module.exports = router