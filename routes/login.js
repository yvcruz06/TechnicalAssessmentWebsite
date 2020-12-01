var express = require('express');
var router = express.Router();

// Model from our Database
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/', async(req, res) => {
  
  var user = req.body.newUsername;
  var pass = req.body.newPassword;

  

});

//function check db if user exists
async function getUser(user) {
  let list = [];
  await User.findOne({username: user})
  .then((result) => {
    if (result != null) {
      list = result;
    }
    else {
      list = null;
    }
  }).catch((error) => {
    console.log(error);
  });
  return list;
}

module.exports = router;
