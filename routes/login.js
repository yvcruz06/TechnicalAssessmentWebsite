var express = require('express');
var router = express.Router();
const active = require("./extensions/activeUser");

// Model from our Database
const User = require('../models/user');

router.get('/', async (req, res) => {
  active.activeUser(req);
  let current_user = req.app.locals.currentUserID
  if (current_user == "") {
    res.render('login', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin,
      loginError: false
    });
  } else {
    res.redirect('/home');
  }
  
});

router.post('/', async (req, res) => {  
  var user = req.body.usernameInput;
  var pass = req.body.passwordInput;

  const userExist = await getUser(req, user, pass);

  if (userExist) {
    //access DB to see if username is taken
    res.redirect('/home');  
  }else {  
    //user does not exists
    res.render('login', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin,
      loginError: true
    });
  } 
});

// Check db if user exists
async function getUser(req, user, pass) {
  let userFound = false;
  
  await User.findOne({username: user, password: pass})
  .then((result) => {
    if (result != null) {
      req.app.locals.currentUserID = result.id;
      req.app.locals.user = true;
      req.session.authenticated = true;

      if (active.admin == req.app.locals.currentUserID) {
        req.app.locals.admin = true;
      }

      userFound = true;
    }
  }).catch((error) => {
    console.log(error);
  });

  return userFound;
}

module.exports = router;