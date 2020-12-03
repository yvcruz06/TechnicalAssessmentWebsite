var express = require('express');
const app = require('../app');
var router = express.Router();

// Model from our Database
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {loginError: false});
});

router.post('/', async(req, res) => {
  
  var user = req.body.usernameInput;
  var pass = req.body.passwordInput;

  const loginExist = await getLogin(req, user, pass);
  console.log(loginExist);
  if (loginExist) {
    //access DB to see if username is taken
    console.log(req.app.locals.currentUserID);
    res.redirect('/');   
  }else {  
    //user does not exists   
    res.render('login', {loginError: true});
  } 
});

//function check db if user exists
async function getLogin(req, user, pass) {
  let found = false;
  await User.findOne({username: user, password: pass})
  .then((result) => {
    console.log(result);
    console.log(user, pass);
    if (result == null) {
      found = false;
    } else {
      req.app.locals.currentUserID = result.id;
      req.session.authenticated = true;
      found = true;
    }
  }).catch((error) => {
    console.log(error);
  });
  return found;
}

module.exports = router;
