var express = require('express');
var router = express.Router();
const active = require("./extensions/activeUser");

// Model from our Database
const User = require('../models/user');


router.get('/', async (req, res) => {
  active.activeUser(req);
  let current_user = req.app.locals.currentUserID
  if (current_user == "") {
    res.render('signup', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin,
      signUpError: false, 
      dontMatch : false
    });
  } else {
    res.redirect('/home');
  }

});

router.post('/', async (req, res) => {
  
  var fname = req.body.fname;
  var lname = req.body.lname;
  var user = req.body.newUsername;
  var pass = req.body.newPassword;
  var confirmPass = req.body.confirmPassword;

  const newUser = User({
    firstName: fname,
    lastName: lname,
    username: user,
    password: pass
  });

  if (pass == confirmPass) {
    //access DB to see if username is taken
      const userExist = await getUser(user);

      if (userExist == null){      //user is not in db
        // save user to db, redirect to login
        newUser.save()
        .then((result) => {
          res.redirect('/login');
        })
        .catch((error) => {
          console.log(error);
        });                
      } else {  //user exists   
        res.render('signup', {
          User: req.app.locals.user,
          Admin: req.app.locals.admin,
          signUpError: true, 
          dontMatch: false
        });
      }       
  } else { //passwords do not match
      res.render('signup', {
        User: req.app.locals.user,
        Admin: req.app.locals.admin,
        signUpError: false, 
        dontMatch: true
      });
  }

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
