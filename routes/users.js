var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (/*logged in*/ true) {
    //retrive user info from db
    var user //login username

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

//function updates db
async function updateUser(user) {
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
