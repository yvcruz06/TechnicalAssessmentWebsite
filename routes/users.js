var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (/*logged in*/ true) {
    //retrive user info from db
    res.render('users');
  }
  else {
    res.render('login');
  }
});

router.post('/', async(req, res) => { 
  var updatePass = req.body.updatePass;
  var confirmNew = req.body.confirmNew;

  if (updatePass == confirmNew) {
    //update db
    res.render('users'); //add message confirmation
  }
});

module.exports = router;
