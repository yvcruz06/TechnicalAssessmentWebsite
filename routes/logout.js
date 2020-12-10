var express = require('express');
var router = express.Router();

// Model from our Database
const User = require('../models/user');

router.get("/", function(req, res){
  if (req.app.locals.currentUserID != "") {
    req.app.locals.currentUserID = "";
    req.session.destroy();
    res.redirect('/');
  } else {
    res.redirect('login');
  }
}); // Log the user out

module.exports = router;