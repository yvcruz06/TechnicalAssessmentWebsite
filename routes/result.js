var express = require('express');
var router = express.Router();

const Result = require('../models/result')

router.get('/', function(req, res) {
    activeUser(req);
    res.send('working on results')

})

module.exports = router