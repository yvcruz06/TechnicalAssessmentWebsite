var express = require('express');
var router = express.Router();

// Model from our Database
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {loginError: false});
});

router.post('/', async (req, res) => {  
  var user = req.body.usernameInput;
  var pass = req.body.passwordInput;

  const userExist = await getUser(req, user, pass);

  if (userExist) {
    //access DB to see if username is taken
    res.redirect('/');   
  }else {  
    //user does not exists   
    res.render('login', {loginError: true});
  } 
});

// Check db if user exists
async function getUser(req, user, pass) {
  let userFound = false;
  
  await User.findOne({username: user, password: pass})
  .then((result) => {
    if (result != null) {
      req.app.locals.currentUserID = result.id;
      req.session.authenticated = true;
      userFound = true;
    }
  }).catch((error) => {
    console.log(error);
  });

  return userFound;
}

module.exports = router;