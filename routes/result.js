var express = require('express');
var router = express.Router();

const Result = require('../models/result')

// temp
const username = 'username'

router.get('/', function(req, res) {









    res.render('result', { Title: 'Results'})


})

module.exports = router