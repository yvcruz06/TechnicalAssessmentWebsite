var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('signup', {signUpError: false, dontMatch : false});
  
  var fname = req.body.fname;
  var lname = req.body.lname;
  var user = req.body.newUsername;
  var password = req.body.newPassword;
  var confirmPass = req.body.confirmPassword;
    
  if (password == confirmPass) {
    //access DB to see if username is taken
      if(!results.length){      //user is not in db
        // insert new account into the database
          req.session.login = user;
            if(error) {
              req.session.destroy();
              throw error;
            }    
            res.redirect('/');                
      }else {     
        console.log("User Already Exists!");
        res.render('signUp.ejs', {signUpError: true, dontMatch : false});
      }       
  }else {
      res.render('signUp.ejs', {signUpError : false, dontMatch : true});
  }

});

module.exports = router;
