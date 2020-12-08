var express = require('express');
var router = express.Router();

app.get("/logout", function(req, res){
  if (req.app.locals.currentUserID != "") {
    req.app.locals.currentUserID = "";
    req.session.destroy();
    res.redirect('/');
  }
}); // Log the user out