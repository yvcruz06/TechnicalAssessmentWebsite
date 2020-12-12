var express = require('express');
var router = express.Router();
const User = require('../models/user');

var userInfo;

/* GET users listing. */
router.get('/', async (req, res) => {
  let current_user = req.app.locals.currentUserID;

  if (current_user) {
    userInfo = await getInfo(current_user);
    res.render('users', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin,
      user: userInfo, 
      update: false, 
      passMatch: true
    });
  }
  else {
    res.redirect('/login');
  }
});

router.post('/', async (req, res) => {
  let current_user = req.app.locals.currentUserID;

  var updatePass = req.body.updatePass;
  var confirmNew = req.body.confirmNew;

  if (current_user){
    if (updatePass == confirmNew) {
      await User.updateOne({_id: current_user},{$set: {password: updatePass}})
      res.render('users', {
        User: req.app.locals.user,
        Admin: req.app.locals.admin,
        user: userInfo, 
        update: true, 
        passMatch: true
      });
    }
    else {
      res.render('users', {
        User: req.app.locals.user,
        Admin: req.app.locals.admin,
        user: userInfo, 
        update: false, 
        passMatch: false
      });
    }
  }
  else {
    res.redirect('/login');
  }
});

//function finds user info in DB by using  ID
async function getInfo(userId) {
  let list = [];
  await User.findById(userId)
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