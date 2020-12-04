var express = require('express');
var router = express.Router();

const Result = require('../models/result')

// temp
const username = 'username'

router.get('/', function(req, res) {
<<<<<<< HEAD
    res.send('working on results')
    // minor chanhes to test new branch
=======










    res.render('result', { Title: 'Results'})


>>>>>>> 1afd2c33db0ead3981ca8764c4ba2fe936d18d7e
})

module.exports = router