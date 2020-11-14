var express = require('express');
var router = express.Router();

// Model from our Database
const Quiz = require('./../models/quiz');

/* GET admin create questions page. */
router.get('/', (req, res) => {
  res.render('questions', { title: 'Sign Up' });
});

module.exports = router;
