var express = require('express');
var router = express.Router();

// Model from our Database
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

module.exports = router;
