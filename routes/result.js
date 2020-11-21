var express = require('express');
var router = express.Router();

const Result = require('../models/result')

router.get('/', function(req, res) {
    res.send('working on results')

})

module.exports = router