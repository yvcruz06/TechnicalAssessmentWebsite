var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('quiz', {
    Title: 'Quiz!'
  })


});

router.get('/grade', function(req, res, next) {
  res.send('something is working here')

})

module.exports = router;