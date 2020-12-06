var express = require('express');
var router = express.Router();

const Result = require('../models/result')

// temp
const username = 'username'

router.get('/', function(req, res) {
    res.send('working on results')
    // minor chanhes to test new branch
})

module.exports = router